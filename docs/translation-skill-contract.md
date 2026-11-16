# Translation Skill compatibility contract

The website is the canonical linguistic data source. The translation Skill is a
separate repository with a versioned static export and independent embedding index.

## Published contracts

The production build generates:

- `/text/catalog.json`: existing static query templates and source discovery.
- `/text/contract.json`: read-only SHA-256 fingerprints of the canonical
  `site/dictionary.json.gz`, `site/data.json.gz`, required notation converters,
  entry IDs, attestation IDs, witness/source associations and source IDs.
- `/text/lookup/zh/{query}.html`, `/text/initial/zh/{initial}.html`,
  `/text/entry/{entry_id}.html`: stable no-JavaScript witness routes.

No browser script loads the contract. There is no per-query server computation.

## Compatibility expectations

Preserve existing entry/attestation IDs, source attribution, original spellings,
tone and dialect scopes, source qualifications and canonical text links. If an
identity migration is unavoidable, coordinate it with bizic-translator rather than
allowing an unattended synchronization to reassign prior evidence.

A Git source commit changing only presentation need not invalidate the translation
lexicon: compare actual content hashes, not only source revision strings.

## Test

After the production preparation steps:

```sh
node scripts/test-skill-contract.cjs site
node scripts/test-readable-dictionary.cjs site
```

The first test verifies the actual generated contract and injects duplicate IDs,
source and converter drift and changed URLs. The existing second test checks full
published entry coverage and follows real text links without JavaScript on desktop
and mobile. Both are covered by the PR workflow, and the contract by Pages CI.

The companion translator verifier validates every static shard, pronunciation
representation and source witness against a single pinned dictionary checkout,
and blocks unattended ID removal or reassignment.

Web modernization tooling must not be a translation Skill runtime dependency.
