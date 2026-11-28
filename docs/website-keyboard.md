# Website keyboard

The keyboard in `site/keyboard/` is adapted from `luggroo/bizic-keyboard` commit `d5f9b87`. It uses the same C++ core compiled to a WASI reactor and the same word resources and IPA completions. Handwriting controls and model are not shipped. `engine-data.js.gz` expands in the Pages workflow together with the other compressed site datasets. For a local preview, expand the gzip files as described in `GITHUB_PAGES.md`.

The input and IPA interfaces use the local engine and word lists. The voice panel calls the TujiaNLP public Gradio ASR and TTS services directly; it sends recordings or text only after the relevant action. Voice availability depends on those services and their access from a visitor's network. The personal word list and settings are stored in the browser, and the current note is retained for the tab session.

To update the engine, build the corresponding keyboard revision with WASI SDK 25 using `tools/web-demo/build-core.sh`, then run `tools/web-demo/embed-core.py`. Remove the `pen` data field from the generated JSON (the website does not expose handwriting), gzip the JavaScript with `gzip -n -9`, and update the keyboard UI and IPA completion data together. Retain notices in `site/keyboard/licenses/`.
