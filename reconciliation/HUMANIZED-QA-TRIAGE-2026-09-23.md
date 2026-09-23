# Humanized pose QA triage — 2026-09-23

## Hacker

The approved `humanized/master/master.png` has dark hair with electric-blue accents, black and blue techwear, and a plain cyan-outlined dark hexagonal emblem. It has no visible red ear LED. The red LED is an original raccoon-form identifier and is not required in the humanized form. `tools/pose-factory/config/qa-rules.json` has been corrected accordingly.

The existing 40 generated images remain in `humanized/poses/rejected/` pending review. The previous QA report, `tools/pose-factory/qa/hacker-latest.json`, was produced under the superseded LED rule. It must not be read as a current verdict. Do not automatically regenerate or overwrite these images.

Visual spot review and prior QA reasons identify poses **02, 10, 17, 22, 34, 36, 37** as candidates for approval after an updated full visual QA. These images have the requested pose and recognizable humanized identity; their old failure reasons were principally the now-removed LED requirement. This is a shortlist, not automatic approval.

Other poses carry reported independent issues, principally a changed chest emblem, enlarged cybernetic forearm, facial/eye drift, missing object, or pose angle. Review each image against the master before promoting. The old report sometimes includes positive observations in `reasons`; those observations are not independent failures. Prioritize identity and emblem drift before minor pose deviations.

## Forge

`characters/heroes/forge/humanized/master/master.png` visibly depicts the **original gorilla form**, not the approved humanized man. Humanized Forge QA therefore compares against the wrong identity anchor. Quarantine the 10 old PASS and 22 old FAIL judgments pending a corrected master and fresh review. Do not regenerate Forge until the approved humanized source is recovered and verified; preserve the current master in history and all generated artwork.

## Cost and preservation

No image-generation retry was launched for this triage. Existing images stay in GitHub. Re-evaluate rather than regenerate first; do not overwrite approved or manually created assets. The sequential frugal workflow may still be active, so reconcile against the branch head before further commits.

Further source inspection: `archive/roster-images/import-2026-09/character roster.png` does show humanized Forge on the RIGHT side of the panel; `scripts/extract-roster-humanized-masters.ts` uses x=`0.570`, which crops the original gorilla. A corrected crop around x=`0.642`, y=`0.160` captures the humanized man, but the roster artwork itself places the bronze prosthetic on the viewer's RIGHT (his anatomical LEFT). This contradicts the locked anatomical RIGHT-arm rule. Do not install that crop as the definitive master or regenerate from it without resolving the arm orientation and badge; the source itself needs a verified, correctly sided approved master.
