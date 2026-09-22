# Sterling Production Correction — 2026-09-22

The first automated production attempt for humanized Sterling poses 20–40 generated 21 candidates, and visual QA rejected all 21.

## Root causes

1. The Sterling pose manifest said **amber-gold eyes**, while the user-authorized latest approved humanized master visibly establishes **bright blue eyes**. QA therefore produced contradictory eye-color reasoning depending on whether it followed text lock or master image.
2. Generated candidates frequently placed the monocle over Sterling's anatomical LEFT eye instead of the locked RIGHT eye.
3. A small number of poses also had pose-specific drift (for example pose 21 standing instead of seated/armchair-style; pose 29 appearing airborne instead of tiptoe).

## Canon correction

Under the previously authorized rule that the **latest approved humanized image is authoritative**, Sterling's humanized eye color is now locked to **bright blue**.

The generator now explicitly maps Sterling's anatomical RIGHT-eye monocle to the VIEWER'S LEFT in front-facing imagery.

## Disposition

- Existing manually approved Sterling poses 1–19 remain untouched.
- The 21 failed automated candidates remain rejected evidence and are not promoted.
- Poses 20–40 require regeneration after the corrected lock.
