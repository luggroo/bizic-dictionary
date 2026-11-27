// Run only on the generated mobile edition. Published website sources stay shared.
const fs = require('node:fs');
const path = require('node:path');
const babel = require('@babel/core');
const preset = require('@babel/preset-env');

const config = {
  babelrc: false, configFile: false, sourceType: 'script', sourceMaps: false,
  compact: true, comments: false, presets: [[preset, {targets: {chrome: '51'}, modules: false}]]
};
function compile(file, name) {
  // These are classic scripts with shared, intentional top-level bindings. Babel's
  // injected destructuring constants and async helpers must be private to each file.
  const input = fs.readFileSync(file, 'utf8');
  const parse = {babelrc: false, configFile: false, sourceType: 'script'};
  const ast = babel.parseSync(input, parse);
  const originals = new Set();
  babel.traverse(ast, {Program(program) {
    Object.keys(program.scope.bindings).forEach(binding => originals.add(binding));
    program.stop();
  }});
  const compiled = babel.transformFromAstSync(ast, input, {...config, ast: true, code: false}).ast;
  const prefix = '__bizic_' + name.replace(/[^A-Za-z0-9]/g, '_') + '_';
  babel.traverse(compiled, {Program(program) {
    for (const binding of Object.keys(program.scope.bindings)) {
      if (!originals.has(binding)) program.scope.rename(binding, prefix + binding);
    }
    program.stop();
  }});
  return babel.transformFromAstSync(compiled, input, {...parse, compact: true, comments: false}).code;
}
function applyCompatibility(directory) {
  const base = path.resolve(directory);
  // The publication exporter supplies local JS and no executable user content.
  for (const name of fs.readdirSync(base).sort()) {
    if (name.endsWith('.js')) {
      const file = path.join(base, name);
      fs.writeFileSync(file, compile(file, name) + '\n');
    }
  }
  const vendor = path.join(base, 'vendor');
  fs.mkdirSync(vendor, {recursive: true});
  const script = module => fs.readFileSync(require.resolve(module), 'utf8');
  const polyfills = [
    // Old JS engines also need iterable DOM collections before any reader scripts execute.
    "if (!Object.hasOwn || !Array.prototype.at || !NodeList.prototype.forEach || !String.prototype.matchAll) {\n" +
      script('core-js-bundle/minified.js').replace(/^\/\/# sourceMappingURL=.*$/m, '') + '\n}',
    script('abortcontroller-polyfill/dist/polyfill-patch-fetch.js'),
    script('dialog-polyfill'),
    fs.readFileSync(path.join(__dirname, 'dom.js'), 'utf8')
  ];
  fs.writeFileSync(path.join(vendor, 'reader-compat.js'), polyfills.join('\n;\n'));
  // Package upstream licence text with the redistributed runtime.
  const notices = ['core-js-bundle', 'abortcontroller-polyfill', 'dialog-polyfill'].map(pkg => {
    const root = path.dirname(require.resolve(pkg + '/package.json'));
    return pkg + '\n' + fs.readFileSync(path.join(root, 'LICENSE'), 'utf8');
  });
  fs.writeFileSync(path.join(vendor, 'reader-compat-LICENSE.txt'), notices.join('\n\n'));
  const backdrop = fs.readFileSync(require.resolve('dialog-polyfill/dist/dialog-polyfill.css'), 'utf8');
  fs.writeFileSync(path.join(vendor, 'reader-dialog.css'), backdrop);

  function visit(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) { visit(file); continue; }
      if (!entry.name.endsWith('.html')) continue;
      let html = fs.readFileSync(file, 'utf8');
      if (!/<head(?:\s[^>]*)?>/i.test(html)) throw new Error('Missing document head in ' + file);
      html = html.replace(/<head(?:\s[^>]*)?>/i, '$&<link rel="stylesheet" href="/vendor/reader-dialog.css"><script src="/vendor/reader-compat.js" defer></script>');
      fs.writeFileSync(file, html);
    }
  }
  visit(base);
}
module.exports = {applyCompatibility};
if (require.main === module) {
  if (!process.argv[2]) throw new Error('Usage: node build.cjs EXPORTED_SITE');
  applyCompatibility(process.argv[2]);
}
