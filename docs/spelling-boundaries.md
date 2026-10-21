# Reviewed spelling boundaries

Boundary decisions are stored separately in `site/spelling-boundaries.js` and attached as `spellingBoundaries` metadata after dictionary merging. Original `notations`, attestation text, IPA, IDs and senses remain unchanged. No invisible characters are inserted into IPA.

The current batch contains 61 reviewed forms, matching 60 current entries. `kati-kuli` is documented in the grammar but has no standalone dictionary entry; its approval is recorded without creating one. Unreviewed spellings and differently shaped source variants remain unchanged.

Northern accent spelling and Ye spelling display the approved boundaries. Search indexes both existing spellings and separated display forms. Source transcription panels continue to show original records.

Rules: spaces for reviewed phrases; hyphens for reviewed affixes; a single hyphen before a verb's entire following marker string. Nominalizers can receive another boundary when a specific form has been reviewed. Only `asi-kuli`, `meti-kuli` and the grammar-attested `kati-kuli` are approved for kuli segmentation; bu words remain unchanged.

Validation: `node scripts/test-spelling-boundaries.cjs` checks both spelling modes, verb marker grouping, retained unsplit words, and byte equality of source notations and all non-boundary word data. Search, merge and southern spelling regression tests also pass.
