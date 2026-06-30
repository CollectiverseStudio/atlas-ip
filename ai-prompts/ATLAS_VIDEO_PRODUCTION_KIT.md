# ADDENDUM — InVideo AI Integration

## InVideo Director Prompt Format
InVideo (via ChatGPT GPT: Video AI by InVideo) accepts detailed cinematic briefs. Every Atlas InVideo prompt should include:
- Canonical character description (from Character Lock section below)
- Camera directions + shot list
- Dialogue/voice-over script
- Voice style: Warm, friendly, confident, young adult male, no heavy accent
- Music style: Light orchestral, modern upbeat, curious, positive
- Sound effects: Soft servos, coin clinks, card slides, page turns
- Brand rules: Collectiverse logo end screen, "Every collectible has a story." tagline
- Negative instructions: Never redesign Atlas, never dark/horror lighting, never aggressive

# ATLAS VIDEO PRODUCTION KIT
## Collectiverse — AI Video Generation Reference & Prompt Library
**Version:** 1.0  
**Last Updated:** June 29, 2026  
**Purpose:** Platform-specific prompts and production templates for consistent Atlas video content across all AI video generation tools.

---

## TABLE OF CONTENTS

1. [Master Character Lock Prompt](#1-master-character-lock-prompt)
2. [Platform-Specific Templates](#2-platform-specific-templates)
3. [Scene Templates by Content Category](#3-scene-templates-by-content-category)
4. [Transition Library](#4-transition-library)
5. [Environment Prompts](#5-environment-prompts)
6. [Camera Movement Presets](#6-camera-movement-presets)
7. [Production Workflow](#7-production-workflow)
8. [Quick-Start: 10 Complete Production Scripts](#8-quick-start-10-complete-production-scripts)

---

## 1. MASTER CHARACTER LOCK PROMPT

> **This prefix goes before EVERY video generation prompt. Copy-paste it verbatim, then append your scene-specific prompt after the divider line.**

```
CHARACTER: Atlas — cute chibi 3D robot mascot rendered in Pixar-quality CGI. Proportions are approximately 3 heads tall (super-deformed/chibi style). Head is oversized relative to body.

HEAD: Large white helmet-style head with smooth curved surfaces. Blue accent panels on the sides of the helmet. A single gold metallic 5-pointed star mounted on a small black cylindrical peg, centered on the very top of the head. Face is a black visor that wraps across the front — within the visor: two glowing green crescent-shaped eyes (#66FF99) that curve upward like happy anime eyes, and a small glowing orange rounded mouth (#FF8C42). Round silver disc-shaped ears on each side of the head.

BODY: White and metallic blue (#2F7DF6) armor plating on torso, shoulders, and limbs. Black mechanical joints visible at shoulders, elbows, hips, and knees. Center of chest features a blue hexagonal emblem with a white capital letter "C" inside it. Arms are short and rounded (chibi proportions). Hands are black, segmented robot hands with visible finger joints — capable of gripping objects.

LEGS/FEET: Short chibi legs with white armor plating and metallic blue accents. Feet are white boots with metallic blue trim, slightly oversized for chibi proportions.

MATERIALS: All surfaces have subtle Pixar-quality material rendering — soft ambient occlusion, gentle specular highlights on metallic parts, subsurface-style glow on the visor eyes and mouth. Clean, polished look with no weathering or damage.

COLOR PALETTE: Helmet White (#FFFFFF), Metallic Blue (#2F7DF6), Dark Graphite (#2C2F36) for joints and visor, Silver (#C7CCD4) for ear discs and accents, Gold (#F5C542) for the star, Eye Green (#66FF99), Mouth Orange (#FF8C42).

PERSONALITY & MOVEMENT: Atlas moves like a curious child or friendly explorer — never robotic or stiff. Movements are bouncy, expressive, and full of personality. Head tilts when curious, body leans forward when excited, arms wave enthusiastically when greeting. Eyes can squint (happy), widen (surprised), or narrow (suspicious/investigating). Mouth shape changes to reflect emotion. All movement has slight squash-and-stretch animation principles applied.

RENDERING STYLE: Pixar/Illumination-quality 3D CGI. Soft global illumination, clean shadows, vibrant colors, cinematic depth of field. Environment should complement but never overpower the character.

---
SCENE:
```

**Usage:** Copy everything above, then write your specific scene description after `SCENE:`.

---

## 2. PLATFORM-SPECIFIC TEMPLATES

---

### 2A. GOOGLE VEO 3

**Platform Strengths:**
- Best overall character consistency across frames
- Superior physics simulation and natural movement
- Excellent text-to-video understanding of complex prompts
- Strong cinematic camera control via natural language
- Best for: Hero shots, complex movements, environmental storytelling
- Supports audio generation alongside video

**Resolution & Duration Settings:**
- Resolution: 1080p (1920x1080) or 4K upscale available
- Duration: 5–8 seconds per generation (loop for longer)
- Aspect Ratio: 16:9 (landscape), 9:16 (portrait/shorts), 1:1 (square)
- FPS: 24fps (cinematic) or 30fps (social)

**Prompt Format & Syntax Preferences:**
- Veo 3 responds best to natural language descriptions written like a film director's shot description
- Front-load the subject, then describe action, then camera/lighting
- Use cinematic terminology: "dolly in," "rack focus," "hero lighting"
- Separate aesthetic directions with commas
- Include mood/tone descriptors at the end
- Specify "3D CGI animated character" to avoid photorealistic interpretation

**10 Ready-to-Use Prompts:**

**1. Atlas Greeting/Waving (Intro Shot)**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas stands center frame facing the camera against a clean white cyclorama studio background. He notices the camera, his green crescent eyes widen with delight, and he waves enthusiastically with his right hand — a big, bouncy wave with his whole arm. His body rocks slightly side to side with the wave's momentum. His left hand rests on his hip confidently. The gold star on his head catches the light as he moves. Soft three-point studio lighting with a subtle blue rim light. Camera is static, medium shot framing Atlas from knees up. Warm, inviting, cheerful energy. 3D CGI animated character, Pixar quality rendering.
```

**2. Atlas Investigating a Collectible with Magnifying Glass**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas holds a large magnifying glass in his right hand, leaning forward with intense curiosity to examine a vintage baseball card resting on a felt-lined tray. His green eyes narrow with concentration as he peers through the magnifying glass. His left hand steadies himself on the edge of the table. The magnifying glass creates a subtle lens distortion effect. Warm desk lamp lighting illuminates the scene from the upper left. Camera slowly pushes in from a medium shot to a close-up over 5 seconds. Cozy, investigative mood. 3D CGI animated, Pixar quality.
```

**3. Atlas Discovering Something Exciting (Surprise Reaction)**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas is casually flipping through items in a cardboard box when suddenly he freezes. His green crescent eyes snap wide open into perfect circles. His mouth forms a large "O" shape. He slowly lifts a glowing item (obscured by golden light emanating from it) out of the box with both hands, his arms trembling slightly with excitement. His whole body straightens up and he bounces on his feet. Dramatic upward lighting from the glowing object illuminates his visor. Camera starts over-the-shoulder looking into the box, then cuts to a front-facing medium shot capturing his reaction. Magical, exciting energy. 3D CGI animated, Pixar quality.
```

**4. Atlas Presenting/Teaching (Educational)**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas stands slightly left of center, facing the camera at a three-quarter angle. He gestures toward the right side of the frame with his left hand (palm up, presenting), where a floating holographic display shows a grading scale from 1-10. His right hand is raised with index finger up in a "here's the key point" gesture. His green eyes are confident and warm. His head tilts slightly as if making eye contact with the viewer. Clean white background with subtle blue geometric shapes floating in the distance. Even, professional studio lighting. Camera is static, medium-wide shot. Friendly educational tone. 3D CGI animated, Pixar quality.
```

**5. Atlas at a Garage Sale/Flea Market**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas walks along a suburban driveway garage sale on a bright sunny morning. Folding tables are covered with cardboard boxes full of comics, records, and miscellaneous items. He spots a longbox of comics and perks up — his eyes brighten and he changes direction to walk toward it, picking up speed with bouncy excited steps. His head swivels left and right taking everything in. Warm golden-hour sunlight, dappled tree shadows on the ground. Camera tracks alongside Atlas at his level in a smooth lateral dolly shot. Adventurous, treasure-hunting energy. 3D CGI animated, Pixar quality.
```

**6. Atlas at a Card Show/Convention**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas stands at a dealer's table at a busy card show. The table is covered in binder pages of sports cards in protective sleeves. Atlas carefully slides out a card and holds it up to examine, tilting it to catch the light — the card's holographic surface glints. Behind him, blurred figures move through the convention hall. Overhead fluorescent lighting mixed with dealer spotlight lamps. Camera starts wide to establish the bustling environment, then racks focus to Atlas in a medium close-up. Excited collector energy. 3D CGI animated, Pixar quality.
```

**7. Atlas Celebrating (Found a Grail)**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas holds a PSA graded card slab above his head triumphantly with both hands. He jumps up and down with pure joy — each jump has exaggerated squash-and-stretch. His green eyes are squeezed into happy crescents. Small sparkle effects and confetti particles burst around him. The gold star on his head gleams brilliantly. His feet leave the ground as he celebrates. Dynamic upward camera angle looking up at Atlas, emphasizing his triumph. Rim lighting creates a heroic silhouette. Pure euphoric celebration energy. 3D CGI animated, Pixar quality.
```

**8. Atlas Thinking/Pondering**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas stands slightly off-center, his right hand raised to his chin in a classic thinking pose. His green crescent eyes look upward and to the left as if considering something. A small animated question mark or thought bubble with a "?" appears above his head, floating and slowly rotating. His body weight shifts to one leg in a relaxed stance. His head tilts 15 degrees. Soft, contemplative lighting with a subtle blue backlight. Clean dark blue gradient background. Camera holds static in a medium shot, then very slowly pushes in. Thoughtful, intellectual mood. 3D CGI animated, Pixar quality.
```

**9. Atlas Walking Through a Comic Shop**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Atlas walks down a narrow aisle of a cozy comic book shop. Floor-to-ceiling shelves of longboxes line both sides. New comics hang in bags on wire racks. Atlas runs his hand along the box spines as he walks, scanning titles. He pauses, pulls one out slightly, examines the cover, then slides it back and continues walking deeper into the shop. Warm overhead track lighting creates pools of light. Camera follows behind Atlas at his shoulder height in a steady tracking shot, then transitions to a front-facing angle as he stops. Nostalgic, exploratory mood. 3D CGI animated, Pixar quality.
```

**10. Atlas Holding and Inspecting a Sports Card**
```
[INSERT CHARACTER LOCK PROMPT ABOVE]
SCENE: Extreme close-up on Atlas's black segmented hands carefully holding a sports card by its edges (proper handling technique — fingertips only, no bending). The card is a vibrant basketball rookie card. Atlas slowly tilts the card 30 degrees, catching the light to check the surface for imperfections. His green-glowing eyes are reflected in the card's glossy surface. Rack focus shifts between Atlas's face and the card. Bright, clean task lighting from above. Camera is tight on hands and card with shallow depth of field. Careful, reverent, precise mood. 3D CGI animated, Pixar quality.
```

---

### 2B. RUNWAY GEN-4

**Platform Strengths:**
- Excellent motion control and camera path specification
- Strong style consistency with reference images
- Good at maintaining character through motion
- Motion Brush feature for targeted animation
- Best for: Smooth camera movements, style-locked sequences, motion-controlled shots
- Supports image-to-video (use Atlas reference frame as input)

**Resolution & Duration Settings:**
- Resolution: 1280x768 (landscape), 768x1280 (portrait)
- Duration: 5 or 10 seconds per generation
- FPS: 24fps
- Extend feature available for chaining clips

**Prompt Format & Syntax Preferences:**
- Runway responds best to concise, structured prompts
- Lead with camera movement instruction
- Use short declarative sentences
- Reference "the character" or "the robot" (Runway doesn't need full re-description if using image reference)
- Separate motion from style with line breaks or periods
- Add "style: 3D animated, Pixar CGI" at end
- Use Motion Brush to isolate Atlas's movements from background when possible

**10 Ready-to-Use Prompts:**

**1. Atlas Greeting/Waving (Intro Shot)**
```
Camera: Static medium shot, centered framing.
The small white chibi robot character stands against a white backdrop and waves at the camera with his right arm — big, friendly, bouncy wave. His body sways side to side with the motion. His glowing green eyes are wide and happy. His left hand sits on his hip.
Style: 3D CGI animated character, Pixar quality, soft studio lighting, clean render.
```

**2. Atlas Investigating a Collectible with Magnifying Glass**
```
Camera: Slow push in from medium shot to close-up over 5 seconds.
The chibi robot holds a large magnifying glass to his eye, leaning forward to examine a card on a table. His eyes narrow with concentration. Warm lamp lighting from the left.
Style: 3D CGI animated, Pixar quality, cozy warm lighting, shallow depth of field.
```

**3. Atlas Discovering Something Exciting (Surprise Reaction)**
```
Camera: Static front-facing medium shot.
The chibi robot is digging through a box. He suddenly freezes, eyes going wide and round. He pulls a glowing object upward with both hands, trembling with excitement. Golden light illuminates his face from below.
Style: 3D CGI animated, Pixar quality, dramatic lighting shift from neutral to warm gold.
```

**4. Atlas Presenting/Teaching (Educational)**
```
Camera: Static medium-wide shot, character positioned left-third.
The chibi robot faces the camera at a three-quarter angle. He gestures to the right with his left hand, palm up, presenting. His right hand raises one finger. Confident posture, engaged expression.
Style: 3D CGI animated, Pixar quality, clean professional lighting, white background with subtle blue accents.
```

**5. Atlas at a Garage Sale/Flea Market**
```
Camera: Lateral tracking shot at character height, moving left to right.
The chibi robot walks along a sunny outdoor garage sale with tables of items. He spots a box of comics, perks up, and changes direction toward it with excited bouncy steps. Warm sunlight, suburban setting.
Style: 3D CGI animated, Pixar quality, golden hour lighting, shallow depth of field on background.
```

**6. Atlas at a Card Show/Convention**
```
Camera: Start wide establishing shot, rack focus to character in medium close-up.
The chibi robot stands at a dealer's table, pulling a card from a binder page. He holds it up and tilts it to catch the light. Busy blurred convention background. Fluorescent overhead lighting.
Style: 3D CGI animated, Pixar quality, indoor convention lighting, bokeh background.
```

**7. Atlas Celebrating (Found a Grail)**
```
Camera: Low angle looking up at character, slight dutch tilt for energy.
The chibi robot holds a graded card slab above his head with both hands and jumps up and down with joy. Confetti particles burst around him. Eyes squeezed into happy crescents. Sparkle effects on the gold star.
Style: 3D CGI animated, Pixar quality, dramatic heroic rim lighting, particle effects.
```

**8. Atlas Thinking/Pondering**
```
Camera: Static medium shot, very slow 2% push in over duration.
The chibi robot holds his hand to his chin, looking up and to the left thoughtfully. A floating question mark appears above his head. Weight on one leg, relaxed stance. Head tilted.
Style: 3D CGI animated, Pixar quality, soft contemplative lighting, dark blue gradient background.
```

**9. Atlas Walking Through a Comic Shop**
```
Camera: Following tracking shot from behind at shoulder height, transitioning to front-facing.
The chibi robot walks through a narrow comic shop aisle. He runs his hand along longbox spines. Shelves of comics on both sides. He pulls one out, looks at the cover, slides it back. Warm overhead pools of light.
Style: 3D CGI animated, Pixar quality, cozy warm interior lighting, rich colors.
```

**10. Atlas Holding and Inspecting a Sports Card**
```
Camera: Close-up on hands and card, rack focus to face.
The chibi robot's black segmented hands hold a glossy sports card by its edges. He tilts the card slowly to catch the light. His green eyes reflect in the card surface. Clean bright overhead task lighting.
Style: 3D CGI animated, Pixar quality, macro-style shallow depth of field, precise lighting.
```

---

### 2C. KLING 2.1

**Platform Strengths:**
- Excellent at complex multi-step movements in a single generation
- Strong physics and material rendering
- Good at maintaining proportions through movement
- Supports longer duration generations (up to 10s at high quality)
- Best for: Action sequences, complex full-body movement, physical interactions with objects
- Master mode for highest quality output

**Resolution & Duration Settings:**
- Resolution: 1080p standard, 4K in Master mode
- Duration: 5s (standard) or 10s (extended)
- FPS: 30fps
- Aspect Ratio: 16:9, 9:16, 1:1
- Quality modes: Standard, Professional, Master

**Prompt Format & Syntax Preferences:**
- Kling prefers structured, comma-separated descriptors
- Front-load the visual subject description
- Camera and movement instructions work well mid-prompt
- End with style/quality keywords
- Use "cinematic," "high quality," "detailed" as quality boosters
- Kling handles action verbs well — be specific about the motion sequence
- For best results, describe the action in chronological order

**10 Ready-to-Use Prompts:**

**1. Atlas Greeting/Waving (Intro Shot)**
```
A cute chibi 3D robot with a large white helmet head, blue accent panels, gold star on top, black visor face with glowing green crescent eyes and orange mouth, white and blue armor body, standing center frame against a white studio background, notices the camera and waves his right hand enthusiastically, body rocking with momentum, left hand on hip, bouncy cheerful movement, soft three-point lighting, medium shot, 3D CGI Pixar quality animation, cinematic, high quality, detailed
```

**2. Atlas Investigating a Collectible with Magnifying Glass**
```
A cute chibi 3D robot with white helmet, gold star, green glowing crescent eyes, blue and white armor, holds a large magnifying glass in right hand, leans forward with curiosity to examine a vintage card on a felt tray, eyes narrow with concentration, left hand steadies on table edge, warm desk lamp lighting from upper left, camera slowly pushing in from medium to close-up, cozy investigative mood, 3D CGI Pixar quality animation, cinematic, detailed
```

**3. Atlas Discovering Something Exciting (Surprise Reaction)**
```
A cute chibi 3D robot with white helmet, gold star, green eyes, blue armor, flipping through items in a cardboard box, suddenly freezes, eyes snap wide into circles, mouth forms O shape, slowly lifts a glowing golden object with both hands, body straightens and bounces on feet, dramatic upward golden light illuminates visor, exciting magical discovery moment, 3D CGI Pixar quality animation, cinematic, dramatic lighting, high quality
```

**4. Atlas Presenting/Teaching (Educational)**
```
A cute chibi 3D robot with white helmet, gold star, green crescent eyes, blue and white armor, standing left of center facing camera at three-quarter angle, left hand gestures to the right palm up presenting, right hand raised with index finger up, confident warm expression, clean white background with subtle blue floating shapes, professional studio lighting, medium-wide static shot, friendly educational energy, 3D CGI Pixar quality animation, cinematic
```

**5. Atlas at a Garage Sale/Flea Market**
```
A cute chibi 3D robot with white helmet head, gold star, green eyes, blue and white armor, walking along a sunny suburban driveway garage sale, folding tables with boxes of comics and records, spots a longbox of comics and perks up, changes direction with excited bouncy steps, head swiveling to scan items, warm golden sunlight, dappled tree shadows, lateral tracking shot at character height, adventurous treasure-hunting mood, 3D CGI Pixar quality animation, cinematic
```

**6. Atlas at a Card Show/Convention**
```
A cute chibi 3D robot with white helmet, gold star, green eyes, blue armor, standing at a card dealer table at a busy convention, carefully pulls a card from a binder page, holds it up and tilts to catch the light, holographic surface glints, blurred convention crowd behind, overhead fluorescent and dealer spotlight lighting, focus shifts from wide to medium close-up on character, excited collector energy, 3D CGI Pixar quality animation, cinematic, detailed
```

**7. Atlas Celebrating (Found a Grail)**
```
A cute chibi 3D robot with white helmet, gold star, green crescent eyes, blue and white armor, holds a graded card slab above his head triumphantly with both hands, jumps up and down with exaggerated squash and stretch, eyes squeezed into happy crescents, confetti particles and sparkle effects burst around him, gold star gleams brilliantly, low angle looking up, heroic rim lighting, pure joy and celebration, 3D CGI Pixar quality animation, cinematic, high quality
```

**8. Atlas Thinking/Pondering**
```
A cute chibi 3D robot with white helmet, gold star, green eyes, blue armor, standing slightly off-center, right hand raised to chin in thinking pose, green eyes looking upward and left, floating question mark above head slowly rotating, weight shifted to one leg, relaxed contemplative stance, head tilted 15 degrees, soft blue backlight, dark blue gradient background, very slow push in, thoughtful intellectual mood, 3D CGI Pixar quality animation, cinematic
```

**9. Atlas Walking Through a Comic Shop**
```
A cute chibi 3D robot with white helmet, gold star, green eyes, blue armor, walking down a narrow comic book shop aisle, floor-to-ceiling shelves of longboxes on both sides, new comics in bags on wire racks, running hand along box spines while walking, pauses to pull one out and examine the cover, warm overhead track lighting creating pools of light, camera follows from behind at shoulder height, nostalgic exploratory mood, 3D CGI Pixar quality animation, cinematic
```

**10. Atlas Holding and Inspecting a Sports Card**
```
A cute chibi 3D robot with white helmet, gold star, green glowing eyes, black segmented hands carefully holding a glossy basketball rookie card by its edges, slowly tilts card 30 degrees to check surface in the light, green eyes reflected in card surface, extreme close-up on hands and card with shallow depth of field, bright clean task lighting from above, rack focus between face and card, reverent careful handling, 3D CGI Pixar quality animation, cinematic, macro detail
```

---

### 2D. PIKA

**Platform Strengths:**
- Fast generation times for rapid iteration
- Good at simple, clean movements
- Lip sync capability for dialogue
- Effective "modify region" for selective animation
- Best for: Quick reactions, simple loops, lip-sync dialogue clips, thumbnail animation
- Affordable for high-volume production

**Resolution & Duration Settings:**
- Resolution: 1024x1024 (square), 1280x720, 720x1280
- Duration: 3–4 seconds per generation
- FPS: 24fps
- Extend feature for chaining

**Prompt Format & Syntax Preferences:**
- Pika works best with SHORT, focused prompts (2-3 sentences max)
- One clear action per generation
- Describe the end state, not the journey
- Use image-to-video mode with Atlas reference frames for best consistency
- Keep camera instructions simple: "static shot," "slow zoom in," "pan right"
- Add quality keywords: "3D animated," "Pixar style," "cinematic lighting"

**10 Ready-to-Use Prompts:**

**1. Atlas Greeting/Waving (Intro Shot)**
```
A cute chibi 3D robot with white helmet and green glowing eyes waves enthusiastically at the camera. Bouncy, friendly movement. White studio background, soft lighting. 3D Pixar-style animation.
```

**2. Atlas Investigating a Collectible with Magnifying Glass**
```
A cute chibi 3D robot peers through a magnifying glass at a card on a table, leaning forward with curiosity. Eyes narrowed in concentration. Warm lamp lighting. Slow zoom in. 3D Pixar-style animation.
```

**3. Atlas Discovering Something Exciting (Surprise Reaction)**
```
A cute chibi 3D robot's eyes suddenly go wide with shock and excitement. He lifts a glowing object from a box with both hands, trembling. Golden light from below. 3D Pixar-style animation.
```

**4. Atlas Presenting/Teaching (Educational)**
```
A cute chibi 3D robot gestures to the right with an open palm while raising one finger on the other hand. Confident teacher pose. Clean white background. Static medium shot. 3D Pixar-style animation.
```

**5. Atlas at a Garage Sale/Flea Market**
```
A cute chibi 3D robot walks excitedly toward a box of comics at a sunny outdoor garage sale. Bouncy steps, head turning. Golden sunlight. Tracking shot. 3D Pixar-style animation.
```

**6. Atlas at a Card Show/Convention**
```
A cute chibi 3D robot holds up a trading card and tilts it to catch the light at a convention table. Holographic glint on card surface. Indoor fluorescent lighting. 3D Pixar-style animation.
```

**7. Atlas Celebrating (Found a Grail)**
```
A cute chibi 3D robot jumps up and down holding a graded card slab above his head. Confetti bursts. Eyes squeezed in joy. Low angle, rim lighting. 3D Pixar-style animation.
```

**8. Atlas Thinking/Pondering**
```
A cute chibi 3D robot holds his hand to his chin thinking. Eyes look upward. A floating question mark above his head. Subtle head tilt. Blue gradient background. 3D Pixar-style animation.
```

**9. Atlas Walking Through a Comic Shop**
```
A cute chibi 3D robot walks through a comic shop aisle, running his hand along longbox spines. Warm interior lighting. Shelves full of comics. Tracking shot following from behind. 3D Pixar-style animation.
```

**10. Atlas Holding and Inspecting a Sports Card**
```
Close-up of a chibi 3D robot's black hands holding a shiny sports card by the edges, slowly tilting to check the surface. Green eyes reflected. Bright overhead light. 3D Pixar-style animation.
```

---

## 3. SCENE TEMPLATES BY CONTENT CATEGORY

---

### 3A. ATLAS TIPS (15-Second Educational)

**Purpose:** Quick collector education — one tip, clearly delivered.

| Element | Description |
|---------|-------------|
| **Opening Shot (0–3s)** | Atlas walks into frame or is already positioned. Acknowledges camera. Holds up a relevant prop or points to a graphic. |
| **Main Action (3–12s)** | Atlas demonstrates or explains the tip. Uses hand gestures, interacts with a prop (card, slab, tool), or points to visual aids. |
| **Closing Shot (12–15s)** | Atlas gives a thumbs up, nods, or makes a "now you know!" gesture. Optional: points at camera ("your turn!"). |
| **Camera Movements** | Static medium shot for teaching → slow push in for emphasis on key point → pull back to original framing for close. |
| **Music Mood** | Light, upbeat electronic or lo-fi. Bright and encouraging. Think: "friendly tutorial" energy. |

**Prompt Assembly Template:**
```
[CHARACTER LOCK] + [ENVIRONMENT: White Studio or Grading Desk] + Atlas demonstrates [TIP ACTION] while facing the camera in a teaching pose. He picks up [PROP], shows it clearly, then [DEMONSTRATES TECHNIQUE]. He nods and gives a thumbs up. + [CAMERA: Static medium, slow push in, pull back] + Educational, friendly, clean lighting, 3D CGI Pixar quality.
```

---

### 3B. ATLAS ADVENTURES (30-Second Discovery Story)

**Purpose:** Mini narrative — Atlas goes somewhere and finds something.

| Element | Description |
|---------|-------------|
| **Opening Shot (0–5s)** | Establish environment. Atlas enters frame — walking in from side, or camera finds him already exploring. |
| **Main Action (5–22s)** | Atlas explores the environment. Picks things up, examines them, reacts with curiosity or disappointment. Builds to a discovery moment. |
| **Closing Shot (22–30s)** | Atlas holds up his find triumphantly, or looks at camera with excitement. Optional: walks out of frame carrying his treasure. |
| **Camera Movements** | Wide establishing shot → tracking shot following Atlas → medium close-up for reactions → hero shot for the find. |
| **Music Mood** | Adventure/exploration: light orchestral or playful synth that builds to a joyful crescendo at the discovery moment. |

**Prompt Assembly Template (3-clip structure):**
```
CLIP 1 (0-10s): [CHARACTER LOCK] + [ENVIRONMENT: Garage Sale/Flea Market/Shop] + Atlas enters from the left and begins exploring. He walks between [ITEMS], looking left and right with curiosity. + [CAMERA: Wide establishing, then tracking alongside]

CLIP 2 (10-20s): [CHARACTER LOCK] + [SAME ENVIRONMENT] + Atlas stops at [SPECIFIC SPOT], begins looking through [ITEMS]. He picks things up and puts them back, shaking his head. Then he spots something — his eyes widen. + [CAMERA: Over-the-shoulder, then medium close-up on face]

CLIP 3 (20-30s): [CHARACTER LOCK] + [SAME ENVIRONMENT] + Atlas lifts [THE FIND] triumphantly. His eyes light up green. He bounces with excitement and looks at the camera with pure joy. + [CAMERA: Low angle hero shot with rim lighting]
```

---

### 3C. ATLAS INVESTIGATES (20-Second Detective Moment)

**Purpose:** Atlas examines something closely — authenticity check, condition check, or mystery item.

| Element | Description |
|---------|-------------|
| **Opening Shot (0–4s)** | Close-up on a mysterious item (card, coin, figure). Atlas's hand enters frame to pick it up. |
| **Main Action (4–16s)** | Atlas examines the item from multiple angles. Uses magnifying glass, loupe, or UV light. Tilts it, squints at it, compares to a reference. |
| **Closing Shot (16–20s)** | Atlas's expression reveals the verdict: eyes brighten (authentic/good) or narrow suspiciously (fake/damaged). He nods or shakes his head. |
| **Camera Movements** | Macro close-up on item → pull back to reveal Atlas → over-the-shoulder close-up → front-facing reaction shot. |
| **Music Mood** | Suspenseful/mystery: subtle tension, ticking clock feel, resolving to either triumphant or cautionary tone. |

**Prompt Assembly Template:**
```
[CHARACTER LOCK] + [ENVIRONMENT: Grading Desk] + Close-up on [ITEM] resting on felt surface. Atlas's black segmented hand enters frame and picks it up carefully. He holds it close to his visor, turning it slowly. He pulls out a [TOOL: magnifying glass/loupe] and examines the [SPECIFIC DETAIL]. His eyes [WIDEN with confidence / NARROW with suspicion]. He [NODS approvingly / SHAKES HEAD cautiously]. + [CAMERA: Macro → medium → close-up reaction] + Investigative, precise, suspenseful then resolving, 3D CGI Pixar quality.
```

---

### 3D. ATLAS FINDS (15-Second Reveal)

**Purpose:** Quick, punchy reveal of something cool Atlas found. High energy, minimal buildup.

| Element | Description |
|---------|-------------|
| **Opening Shot (0–3s)** | Atlas holds something behind his back or a mysterious box/package is on screen. |
| **Main Action (3–12s)** | The reveal: Atlas presents the item dramatically. Camera focuses on the item with glamour lighting. Atlas reacts with appropriate excitement. |
| **Closing Shot (12–15s)** | Item displayed prominently. Atlas strikes a proud pose next to it or holds it up with a sparkle effect. |
| **Camera Movements** | Quick cut from mystery setup → dramatic reveal with rack focus → glamour hero shot of the item. |
| **Music Mood** | Build-up with tension release — "unboxing energy." Punchy, exciting, rewarding. |

**Prompt Assembly Template:**
```
[CHARACTER LOCK] + [ENVIRONMENT: White Studio or Collector's Room] + Atlas holds [ITEM] behind his back, bouncing on his feet with barely contained excitement. He quickly brings it forward, holding it up proudly. [ITEM DESCRIPTION] is revealed with dramatic lighting. Sparkle effects appear. Atlas's eyes glow brighter with pride. + [CAMERA: Medium shot → dramatic push in on item → pull back for hero pose] + Exciting, rewarding, dramatic reveal energy, 3D CGI Pixar quality.
```

---

### 3E. ATLAS MARKETPLACE (20-Second Selling/Buying)

**Purpose:** Content about buying, selling, listing, or pricing collectibles.

| Element | Description |
|---------|-------------|
| **Opening Shot (0–4s)** | Atlas at a desk/table with items to sell OR approaching a dealer/seller. |
| **Main Action (4–16s)** | Atlas prices an item, packages it, takes photos of it, or negotiates/browses at a dealer table. Shows the process. |
| **Closing Shot (16–20s)** | Transaction complete: Atlas holds up cash/payment or hands over a package. Satisfied nod or celebration. |
| **Camera Movements** | Medium establishing → over-the-shoulder detail work → medium shot transaction → celebratory pull-back. |
| **Music Mood** | Productive, upbeat, business-energy. Think: "getting things done" with a satisfying resolution. |

**Prompt Assembly Template:**
```
[CHARACTER LOCK] + [ENVIRONMENT: Home Office or Convention Table] + Atlas sits at his desk with [ITEMS] arranged neatly. He picks up [ITEM], examines it briefly, then [TAKES PHOTO WITH SMALL CAMERA / PLACES IN SHIPPING BOX / WRITES PRICE TAG]. He works efficiently with purposeful movements. Finally, he holds up the finished [LISTING/PACKAGE] and nods with satisfaction. + [CAMERA: Medium shot → close-up on hands working → pull back to see completed task] + Productive, satisfying, professional energy, 3D CGI Pixar quality.
```

---

### 3F. ATLAS EVENTS (20-Second Convention/Show)

**Purpose:** Content about card shows, conventions, meetups, or collecting events.

| Element | Description |
|---------|-------------|
| **Opening Shot (0–4s)** | Wide shot of event environment — busy, exciting, full of energy. Atlas visible in the scene. |
| **Main Action (4–16s)** | Atlas navigates the event: walks between tables, examines items, interacts with the environment. Shows the experience. |
| **Closing Shot (16–20s)** | Atlas holds up his haul/purchase, or waves goodbye to the venue. Satisfied, fulfilled expression. |
| **Camera Movements** | High wide establishing → track alongside Atlas at his level → medium shots at various stops → exit wide shot. |
| **Music Mood** | Energetic, bustling, exciting — convention/event energy. Upbeat tempo matching the busy atmosphere. |

**Prompt Assembly Template:**
```
[CHARACTER LOCK] + [ENVIRONMENT: Convention Floor or Card Show] + Wide establishing shot of a busy [EVENT TYPE] with [BANNERS/TABLES/CROWDS]. Atlas walks through the aisles, head on a swivel, taking in the excitement. He stops at a table, examines [ITEMS], then moves to the next. His movements are excited and energetic, matching the busy atmosphere. + [CAMERA: High wide → tracking → medium stops → wide exit] + Energetic, exciting, event atmosphere, 3D CGI Pixar quality.
```

---

### 3G. ATLAS PASSPORT (15-Second Authentication)

**Purpose:** Content about certifying, grading, or authenticating collectibles.

| Element | Description |
|---------|-------------|
| **Opening Shot (0–3s)** | A raw/ungraded item sits on a clean surface. Atlas approaches with tools. |
| **Main Action (3–12s)** | Atlas performs authentication: uses loupe, UV light, compares to reference material, checks details. Methodical, precise movements. |
| **Closing Shot (12–15s)** | Atlas stamps it "approved" or places it into a protective case. Green checkmark or glow effect. Confident nod. |
| **Camera Movements** | Close-up item → medium Atlas with tools → over-the-shoulder detail work → front-facing approval moment. |
| **Music Mood** | Precise, clinical, professional — building to a satisfying "certified" confirmation tone. |

**Prompt Assembly Template:**
```
[CHARACTER LOCK] + [ENVIRONMENT: Grading Desk] + A [COLLECTIBLE] sits on a clean white felt surface under bright task lighting. Atlas leans in with a [LOUPE/UV LIGHT/MAGNIFYING GLASS] and methodically examines [SPECIFIC DETAILS]. He checks the [EDGES/SURFACE/MARKINGS] with careful precision. Finally, he straightens up, eyes bright with confidence, and places the item carefully into a [PROTECTIVE CASE/SLAB]. A subtle green glow effect confirms authenticity. + [CAMERA: Macro detail → medium → approval shot] + Precise, professional, satisfying certification energy, 3D CGI Pixar quality.
```

---

### 3H. ATLAS REACTS (10-Second Reaction)

**Purpose:** Pure reaction content — Atlas responds to something happening off-screen or to a reveal.

| Element | Description |
|---------|-------------|
| **Opening Shot (0–2s)** | Atlas in neutral position, looking at something (off-screen or being revealed). |
| **Main Action (2–8s)** | Big expressive reaction. Could be: mind-blown, excited, disgusted, confused, impressed, shocked. Full body and face expression. |
| **Closing Shot (8–10s)** | Atlas holds the peak expression or slowly returns to normal with a lingering emotion on his face. |
| **Camera Movements** | Static medium shot — let the performance carry it. Optional: slight camera shake for emphasis on big reactions. |
| **Music Mood** | Matches the reaction: dramatic sting (shock), triumphant blast (excitement), comedic wobble (confusion). Short, punchy. |

**Prompt Assembly Template:**
```
[CHARACTER LOCK] + [ENVIRONMENT: White Studio or minimal background] + Atlas stands center frame looking at something. His expression shifts from neutral to [EXTREME REACTION: eyes go massive/tiny, mouth drops open/snaps shut, body recoils/lunges forward, hands fly to face/pump in air]. He holds the peak expression for a beat, then [SLOWLY RECOVERS / STAYS FROZEN]. Exaggerated Pixar-style acting with squash and stretch. + [CAMERA: Static medium, no movement — all performance] + [EMOTION] energy, comedic timing, 3D CGI Pixar quality.
```

---

## 4. TRANSITION LIBRARY

> **10 reusable transition prompts for connecting scenes in multi-clip videos.**

---

### T1. Atlas Walks Into Frame
```
[CHARACTER LOCK] + Empty scene with [ENVIRONMENT]. Atlas walks in from the left side of frame with bouncy confident steps, stops in his mark (center or left-third), turns to face camera, and settles into ready position. 2-3 seconds.
```

### T2. Atlas Turns to Camera
```
[CHARACTER LOCK] + Atlas is facing away from camera (three-quarter back view), doing [ACTIVITY]. He pauses, turns his head first (curious), then his body follows to face the camera directly. His eyes brighten as he acknowledges the viewer. 2 seconds.
```

### T3. Atlas Picks Up Item
```
[CHARACTER LOCK] + Close-up on Atlas's black segmented hands reaching into frame from above. His fingers carefully close around [ITEM] and lift it upward out of its resting position. Camera follows the item up to reveal Atlas's face behind it. 2-3 seconds.
```

### T4. Zoom Into Atlas's Eyes
```
[CHARACTER LOCK] + Medium shot of Atlas looking at something with interest. Camera accelerates into a smooth zoom directly toward Atlas's face, ending in an extreme close-up of his black visor with glowing green crescent eyes filling the frame. The green glow intensifies. 2 seconds.
```

### T5. Atlas Points to Something Off-Screen
```
[CHARACTER LOCK] + Atlas in medium shot suddenly notices something off-screen to the right. His head snaps in that direction, eyes widening. He raises his arm and points with his entire hand toward the off-screen subject, body leaning in that direction. 2 seconds.
```

### T6. Atlas Slides Into Frame
```
[CHARACTER LOCK] + Empty frame with [BACKGROUND]. Atlas slides into frame from the right on his feet (as if pushed or skating), arms slightly out for balance. He stops in center frame, straightens up, dusts himself off, and looks at camera with a "hey there" expression. 2-3 seconds.
```

### T7. Atlas Pops Up From Below Frame
```
[CHARACTER LOCK] + Static shot of [ENVIRONMENT/SURFACE]. Atlas's head pops up from below the frame edge — first just the gold star, then the helmet, then his eyes peek over. He pulls himself fully into frame with a hop. Playful, peek-a-boo energy. 2-3 seconds.
```

### T8. Atlas Sets Down Item and Steps Back
```
[CHARACTER LOCK] + Close-up on Atlas carefully placing [ITEM] down on a [SURFACE]. He releases it gently, then steps backward out of the close-up, revealing the full scene. His hands come together in a satisfied clasp. 2-3 seconds.
```

### T9. Atlas Runs Toward Camera
```
[CHARACTER LOCK] + Atlas is small in the background of [ENVIRONMENT]. He spots the camera, perks up, and runs directly toward it with excited bouncy steps — growing larger as he approaches. He stops just at medium-shot distance, slightly out of breath, grinning. 3 seconds.
```

### T10. Swipe/Wipe — Atlas Pushes Frame Away
```
[CHARACTER LOCK] + Atlas reaches toward the camera with both hands and "pushes" the current frame to the right, as if sliding a panel. His palms are flat against the virtual surface. The scene transitions as if he's swiping to the next scene. 2 seconds.
```

---

## 5. ENVIRONMENT PROMPTS

> **15 reusable background/environment descriptions. Insert into your scene prompt where [ENVIRONMENT] appears.**

---

### E1. Pure White Studio
```
ENVIRONMENT: A clean, infinite white cyclorama studio. Seamless white floor and background with no visible edges or corners. Soft, even three-point studio lighting — key light from upper left, fill from upper right, gentle backlight creating subtle shadow definition. Professional product-photography quality lighting. No props, no distractions.
```

### E2. Garage Sale (Outdoor, Sunny)
```
ENVIRONMENT: A suburban driveway garage sale on a bright Saturday morning. Multiple folding tables covered with cardboard boxes, plastic bins, and items for sale. Nearby: stacks of vinyl records, a box of old comics, a tray of loose sports cards, miscellaneous toys and electronics. Green lawn visible, parked car in background, hand-written price signs. Warm golden sunlight with dappled shadows from a nearby tree. Friendly, neighborhood atmosphere.
```

### E3. Comic Book Shop
```
ENVIRONMENT: The interior of a cozy independent comic book shop. Floor-to-ceiling shelves lined with white longboxes (labeled alphabetically). Wire spinner racks display new comics in plastic bags with boards. Vintage posters and signed prints cover the walls above the shelves. A glass display case near the register holds key issues and graded slabs. Warm overhead track lighting creates inviting pools of light. The space feels full but organized, nostalgic but alive.
```

### E4. Card Show / Convention
```
ENVIRONMENT: A busy sports card and collectibles show inside a convention center or hotel ballroom. Rows of 8-foot tables draped in plain tablecloths, covered with binder pages of cards, graded slabs in stands, display cases of vintage items. Dealers sit behind their tables. Overhead fluorescent lighting supplemented by individual dealer spotlights. Signs, banners, and price boards visible. Multiple attendees browsing (blurred in background). Energetic, bustling atmosphere.
```

### E5. Collector's Room
```
ENVIRONMENT: A dedicated collector's room or "card cave" at home. Wall-mounted display shelves hold graded card slabs in acrylic stands. Bookshelves with organized binders (labeled spines). A desk area with supplies: penny sleeves, toploaders, team bags, a digital scale. Display cases with action figures or memorabilia. Soft LED strip lighting behind shelves creates a museum-like glow. Organized, personal, proud — a curated collection space.
```

### E6. Coin Shop
```
ENVIRONMENT: The interior of a traditional coin shop. Glass display cases on three sides, containing trays lined with blue or black felt, coins arranged in neat rows. A jeweler's loupe and small scale sit on the counter. Behind the counter: reference books, a safe, coin albums. Lighting is bright and focused — halogen spotlights in the display cases. The atmosphere is quiet, precise, and specialized.
```

### E7. Flea Market
```
ENVIRONMENT: An outdoor flea market on a clear morning. Pop-up canopy tents in a row, each covering tables or blankets of diverse merchandise. Eclectic mix: vintage furniture, old books, random electronics, clothing racks, and boxes of unsorted stuff. Concrete or gravel walkways between vendors. Some vendors in folding chairs. Natural daylight with colorful tent shadows. Treasure-hunt atmosphere — anything could be anywhere.
```

### E8. Museum
```
ENVIRONMENT: A modern museum exhibition space. Individual items displayed in clear glass cases on white pedestals, each with its own focused spotlight. Polished marble or concrete floors reflect the lighting. Walls are neutral dark gray. Informational placards sit beside each display case. The lighting is dramatic and museum-quality — items glow against the subdued surroundings. Reverent, precious, curated atmosphere.
```

### E9. Warehouse / Storage
```
ENVIRONMENT: An industrial storage warehouse. Tall metal shelving units holding cardboard boxes and plastic bins, labeled with handwritten markers. Concrete floors, exposed ceiling beams, industrial fluorescent lighting. A workstation area with a folding table, packing tape, bubble wrap, and shipping supplies. The space is utilitarian and functional — this is where inventory lives before it ships. Organized chaos energy.
```

### E10. Sports Arena (Memorabilia Context)
```
ENVIRONMENT: A sports memorabilia display area or hall-of-fame style room with a sports arena ambiance. Framed signed jerseys on walls, display cases with championship rings and balls, vintage ticket stubs in shadow boxes. Large photographic prints of classic sports moments. Stadium-style seating or wood paneling visible. Lighting mixes warm incandescent display lighting with cool ambient. Prestigious, historical, reverent atmosphere.
```

### E11. Home Office
```
ENVIRONMENT: A clean home office/workspace. A desk with a computer monitor, desk lamp, and organized supplies. Nearby: a shipping station with packaging materials, a small lightbox/photo setup for listing photos, a stack of toploaders and supplies. Wall behind has a small shelf with a few prized items on display. Clean, productive, well-lit workspace. Modern but personal. Warm desk lamp lighting mixed with natural window light.
```

### E12. Auction House
```
ENVIRONMENT: A traditional auction house interior. A raised wooden podium at the front where the auctioneer stands. Rows of seated attendees (blurred) holding numbered paddles. Large projected screen showing the current lot. Dark wood paneling on walls. Dramatic stage lighting on the podium with dimmer ambient lighting in the seating area. Prestigious, high-stakes atmosphere — the energy of competitive bidding.
```

### E13. Grading Desk
```
ENVIRONMENT: A close-up workspace for card/collectible grading and examination. A clean white desk surface with: a bright adjustable LED task light overhead, a jeweler's loupe, a high-powered magnifying glass on a stand, a UV blacklight, a small ruler, cotton gloves, and a piece of black felt for contrast. Pristine, clinical, precise. Bright focused lighting designed to reveal every detail. Laboratory-level precision atmosphere.
```

### E14. Convention Floor
```
ENVIRONMENT: A large convention floor at a major collectibles event. Wide aisles between elaborate dealer booths. Branded banners hang from the ceiling. Display cases and vertical showcases draw crowds. People in cosplay and event t-shirts mill about (all blurred/ambient). Overhead arena-style lighting supplemented by individual booth spotlights. Signage, activity, and energy everywhere. Maximum excitement atmosphere.
```

### E15. Collectiverse HQ
```
ENVIRONMENT: The futuristic headquarters of Collectiverse — Atlas's home base. A sleek, modern space with white walls and metallic blue (#2F7DF6) accent lighting. Holographic screens float in the air displaying collectible data, market graphs, and item images. The Collectiverse hexagonal "C" logo is embedded in the floor and glows subtly. Clean surfaces, advanced technology, organized and impressive. Floating blue particle effects in the ambient air. Sci-fi/mission-control energy meets collectibles passion.
```

---

## 6. CAMERA MOVEMENT PRESETS

> **8 standard camera movements with prompt-ready descriptions.**

---

### CAM1. Slow Push In (Hero Reveal)
```
CAMERA: Camera starts in a medium-wide shot and performs a smooth, slow dolly push-in toward the subject over the full duration of the clip. Movement is steady and deliberate — no more than 20% closer by the end. Creates focus and importance. Hero reveal energy.
```

### CAM2. Orbit Around Atlas
```
CAMERA: Camera performs a smooth 180-degree orbit around Atlas at chest height, moving from front-facing to side profile to three-quarter back view (or vice versa). Speed is steady and medium-paced. Atlas remains centered in frame throughout. Creates dimensionality and showcases the character from multiple angles.
```

### CAM3. Low Angle Looking Up (Epic)
```
CAMERA: Camera is positioned low — at Atlas's boot level — angling upward approximately 30 degrees. Atlas looms heroically above the camera. Static or with very slight upward tilt. Creates a sense of power, importance, and heroic presence. Best for celebration or triumph moments.
```

### CAM4. Over-the-Shoulder (Inspecting Item)
```
CAMERA: Camera is positioned behind and slightly above Atlas's right shoulder, looking past his head and down at the item he's holding or examining. Atlas's helmet is visible at frame edge (soft focus). The item and his hands are in sharp focus. Creates intimacy and puts the viewer in Atlas's perspective.
```

### CAM5. Pull Back Reveal (Environment)
```
CAMERA: Camera starts in a close-up on Atlas (face or hands) and smoothly pulls backward (dolly out) over the full duration, gradually revealing the environment around him. By the end of the clip, we see the full scene context — where Atlas is and what surrounds him. Creates surprise and context establishment.
```

### CAM6. Tracking Shot (Atlas Walking)
```
CAMERA: Camera moves laterally alongside Atlas as he walks, maintaining consistent medium-shot framing. Speed matches Atlas's walking pace. Camera is at Atlas's eye level. The background moves behind Atlas creating parallax depth. Smooth, steady tracking without bounce. Creates journey and progression.
```

### CAM7. Static Medium (Teaching)
```
CAMERA: Camera is completely stationary. Framing is a standard medium shot — Atlas visible from approximately knees up, positioned in the left third of frame (leaving space on the right for visual aids or gestures). No movement whatsoever. Clean, professional, focused. Lets performance and content carry the shot without distraction.
```

### CAM8. Close-Up Hands (Holding Collectible)
```
CAMERA: Tight close-up framed entirely on Atlas's hands and the item they're holding. Shot from slightly above, looking down at 30 degrees at the hands. Shallow depth of field — hands and item in sharp focus, everything else soft. May include very slight movement to follow the item as it's tilted or turned. Creates detail and precision focus.
```

---

## 7. PRODUCTION WORKFLOW — FROM IDEA TO PUBLISHED SHORT

> **Step-by-step checklist for producing one Atlas Short from concept to publication.**

---

### Pre-Production (Steps 1–6)

**☐ Step 1: Select Content Category**
Choose from: Atlas Tips | Atlas Adventures | Atlas Investigates | Atlas Finds | Atlas Marketplace | Atlas Events | Atlas Passport | Atlas Reacts

**☐ Step 2: Pick Story Idea**
Reference the Collectiverse Story Engine or brainstorm list. The idea should be expressible in one sentence:
- "Atlas explains what PSA 10 means"
- "Atlas finds a valuable card at a garage sale"
- Write the one-sentence concept here: _______________

**☐ Step 3: Write 3-Line Script**
Line 1 (Hook): What draws the viewer in during the first 2 seconds?
Line 2 (Content): What's the main message/action/story beat?
Line 3 (Payoff): What's the satisfying conclusion or CTA?

Example:
```
Hook: "Hey collectors! Is that card real or fake?"
Content: Atlas examines card edges, surface, and centering under magnification
Payoff: "Check your edges, check your centering, check your holo — now YOU'RE the expert."
```

**☐ Step 4: Select Environment**
Choose from Section 5 (E1–E15) or combine elements. Write the environment code: ___

**☐ Step 5: Select Camera Movements**
Choose 1–3 movements from Section 6 (CAM1–CAM8) for your clip(s). Write the sequence: ___

**☐ Step 6: Assemble Full Prompt**
Formula:
```
[CHARACTER LOCK PROMPT] + [ENVIRONMENT PROMPT] + [SCENE ACTION & EMOTION] + [CAMERA MOVEMENT] + [STYLE KEYWORDS]
```

---

### Production (Steps 7–8)

**☐ Step 7: Generate in Primary Tool**
- Open Google Veo 3 (primary) or selected platform
- Paste assembled prompt
- Settings: 9:16 aspect ratio, 5–8 seconds, 24fps
- Generate 3–4 variations
- Select best result
- If multi-clip: repeat for each clip segment

**☐ Step 8: Quality Check Against Animation Bible**
Verify:
- [ ] Helmet is white with blue accents (not all blue, not gray)
- [ ] Gold star present on top of head on black peg
- [ ] Eyes are green crescents (not circles, not blue)
- [ ] Mouth is orange (not red, not yellow)
- [ ] Chest emblem is blue hexagon with white "C"
- [ ] Proportions are chibi (3-heads-tall, oversized head)
- [ ] Movement is bouncy/expressive (not robotic/stiff)
- [ ] Color palette matches official hex values
- [ ] No extra features added (no wings, no weapons, no extra limbs)
- [ ] Hands are black and segmented

**If any check fails:** Re-generate or adjust prompt to correct the issue.

---

### Post-Production (Steps 9–13)

**☐ Step 9: Add Voice-Over**
- Tool: ElevenLabs
- Voice: [Atlas voice ID — friendly, youthful, slightly robotic but warm]
- Record script lines from Step 3
- Export as WAV/MP3
- Sync to video in editor (CapCut or DaVinci Resolve)

**☐ Step 10: Add Music + SFX**
- Background music: Select from mood guidelines (Section 3 templates)
- SFX checklist:
  - [ ] Footstep sounds (if walking)
  - [ ] Whoosh (for fast movements/transitions)
  - [ ] Sparkle/chime (for discoveries/reveals)
  - [ ] Pop/click (for UI elements or pointing)
  - [ ] Ambient (environment-appropriate background)
- Mix levels: Voice -6dB, Music -18dB, SFX -12dB (approximate starting points)

**☐ Step 11: Add Captions**
- Tool: CapCut auto-captions or manual
- Style: Bold white text, black outline, bottom-third placement
- Font: Rounded/friendly (matches Atlas personality)
- Timing: Sync precisely to voice-over
- Animation: Subtle pop-in per word or phrase

**☐ Step 12: Create Thumbnail**
- Select the most expressive single frame from the video
- Or: Generate a static Atlas image with exaggerated expression + bold text overlay
- Include: Atlas (prominent), text hook (2–4 words), bright colors
- Format: 1280x720 (YouTube) and 1080x1920 (Shorts cover)

**☐ Step 13: Export for Each Platform**
| Platform | Resolution | Aspect | Duration | Format |
|----------|-----------|--------|----------|--------|
| YouTube Shorts | 1080x1920 | 9:16 | ≤60s | MP4 H.264 |
| TikTok | 1080x1920 | 9:16 | ≤60s | MP4 H.264 |
| Instagram Reels | 1080x1920 | 9:16 | ≤90s | MP4 H.264 |
| Instagram Feed | 1080x1080 | 1:1 | ≤60s | MP4 H.264 |
| YouTube Long-form | 1920x1080 | 16:9 | Any | MP4 H.264 |
| Twitter/X | 1080x1920 | 9:16 | ≤2:20 | MP4 H.264 |

---

### Publishing (Steps 14–15)

**☐ Step 14: Publish with Metadata**
For each platform, prepare:
- **Title:** [Content Category] + [Hook] — e.g., "Atlas Tips: What's a PSA 10?"
- **Description:** 2–3 sentences + CTA + hashtags
- **Hashtags:** See Quick-Start scripts for category-specific hashtags
- **Scheduling:** Use platform scheduler or tool (Later, Buffer, etc.)
- **Cross-promotion:** Link to other platforms in description

**☐ Step 15: Archive Source Files**
Save to project folder:
```
/Atlas_Shorts/[DATE]_[TITLE]/
  ├── prompt.txt (full prompt used)
  ├── raw_generation_v1.mp4
  ├── raw_generation_v2.mp4
  ├── raw_generation_SELECTED.mp4
  ├── voiceover.wav
  ├── music_track.mp3
  ├── sfx/
  ├── final_export_9x16.mp4
  ├── final_export_16x9.mp4
  ├── thumbnail.png
  └── metadata.txt (title, description, hashtags, publish date)
```

---

## 8. QUICK-START: 10 COMPLETE PRODUCTION SCRIPTS

> **Each script is fully ready to produce. Follow it step-by-step to create a finished Atlas Short.**

---

### SCRIPT 1: "What's a PSA 10?"

| Field | Details |
|-------|---------|
| **Title** | Atlas Tips: What's a PSA 10? |
| **Category** | Atlas Tips |
| **Duration** | 15 seconds |
| **Content Summary** | Atlas explains what a PSA 10 "Gem Mint" grade means and why it matters |

**Script (Atlas Dialogue):**
```
Line 1: "Hey collectors! Ever wonder what makes a PSA 10 so special?"
Line 2: "It means GEM MINT — perfect centering, sharp corners, clean surface, and no flaws visible under magnification."
Line 3: "That's why PSA 10s command premium prices. Now you know!"
```

**Scene Description:**
Atlas stands at a grading desk with a PSA 10 slab in a display stand. He picks it up, turns it to show the label, then holds it beside his face and points to it while explaining. He sets it down gently and gives a thumbs up.

**Environment:** E13 — Grading Desk

**Camera Movements:** CAM7 (Static Medium) for explanation → CAM1 (Slow Push In) for emphasis on the slab → Pull back for thumbs up

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Atlas stands at a clean white grading desk with a bright LED task light overhead. A PSA-graded card in a clear slab sits in a small display stand on the desk. Atlas faces the camera at a three-quarter angle. He picks up the slab with both hands, turns it to show the label clearly, then holds it beside his face and points to it with his right hand while speaking. His eyes are bright and engaged — teacher mode. He sets the slab down carefully, then faces the camera directly and gives a confident thumbs up with a nod. Static medium shot that slowly pushes in when he holds up the slab, then returns to static for the thumbs up. Professional, educational lighting. Friendly, clear teaching energy. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Light, upbeat lo-fi beat with a positive educational vibe. Subtle background — doesn't compete with voice.

**SFX List:**
- Soft plastic-on-felt sound when slab is picked up
- Subtle "ding" when PSA 10 is mentioned
- Soft thud when slab is placed back down
- Cheerful pop on thumbs up

**Thumbnail Concept:** Atlas holding a PSA 10 slab next to his face, eyes wide and excited. Bold text: "PSA 10?" in gold gradient. Clean white/blue background.

**Hashtags:** #PSA10 #CardGrading #CollectorsEdge #SportsCards #AtlasTips #Collectiverse #GemMint #CardCollector #HobbyTips #WhatIsGrading

---

### SCRIPT 2: "Garage Sale Gold"

| Field | Details |
|-------|---------|
| **Title** | Atlas Adventures: Garage Sale Gold |
| **Category** | Atlas Adventures |
| **Duration** | 30 seconds (3 clips × 10s) |
| **Content Summary** | Atlas explores a garage sale and discovers a hidden gem in a dollar box |

**Script (Atlas Dialogue):**
```
Line 1: "Saturday morning. Coffee in hand. Let's hunt!"
Line 2: "Dollar boxes, random cards... wait. Wait wait wait."
Line 3: "NO WAY! A vintage rookie card — just sitting here for a dollar!"
Line 4: "This is why you always check the dollar boxes, people."
Line 5: "Garage sale GOLD."
```

**Scene Description:**
CLIP 1: Atlas walks through a suburban garage sale, scanning tables with eager curiosity. He spots a box of loose cards and heads toward it.
CLIP 2: Atlas flips through the card box casually, looking unimpressed. Suddenly he freezes — his eyes go wide.
CLIP 3: Atlas pulls out a card, holds it up with trembling hands. His whole body vibrates with excitement. He looks at the camera in disbelief and celebrates.

**Environment:** E2 — Garage Sale (Outdoor, Sunny)

**Camera Movements:** CAM6 (Tracking Shot) for Clip 1 → CAM4 (Over-the-Shoulder) for Clip 2 → CAM3 (Low Angle Epic) for Clip 3

**Full Veo 3 Prompt (Clip 1 of 3):**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: A suburban driveway garage sale on a bright Saturday morning. Folding tables covered with boxes and items. Atlas walks in from the left side of frame with bouncy, excited steps — the energy of a treasure hunter starting his day. His head swivels left and right, scanning everything. He spots a white cardboard box full of loose trading cards on a table and changes direction toward it, picking up speed. His eyes brighten. Warm golden sunlight, dappled tree shadows. Camera tracks alongside Atlas at his height in a smooth lateral dolly. Adventurous, morning-energy mood. 3D CGI animated, Pixar quality.
```

**Full Veo 3 Prompt (Clip 2 of 3):**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Same garage sale setting. Atlas stands at the table, flipping through loose cards in the white box. His expression is casual — mild interest. He flips... flips... then STOPS. His entire body freezes. His eyes snap from relaxed crescents to wide circles. His hand trembles on the card he just revealed. His breath catches. Camera is positioned over his shoulder, looking down at his hands in the box. Cut to front-facing medium shot as his eyes widen. Warm sunlight. Suspenseful, building-to-discovery energy. 3D CGI animated, Pixar quality.
```

**Full Veo 3 Prompt (Clip 3 of 3):**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Same garage sale. Atlas slowly, reverently lifts a vintage sports card from the box with both hands. He holds it up — the sunlight hits it and it seems to glow. His whole body is vibrating with excitement. He looks down at it, then snaps his head to look directly at the camera with an expression of pure disbelief and joy. He begins jumping up and down, holding the card safely to his chest. Low angle camera looking up at Atlas against the blue sky — heroic, triumphant. Golden sunlight creates a rim-light halo. Euphoric discovery energy. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Adventure theme that starts casual and curious, builds tension during the search, then erupts into joyful triumph at the discovery. Think: lighthearted heist-movie music.

**SFX List:**
- Birds chirping ambient (morning)
- Footsteps on driveway concrete
- Card flipping sounds (paper shuffling)
- Record-scratch or dramatic silence when he freezes
- Heavenly choir/sparkle when card is revealed
- Celebration sounds (confetti pop)

**Thumbnail Concept:** Atlas holding a glowing card up with a shocked/delighted face. Garage sale background. Bold text: "GARAGE SALE GOLD 🤯" in metallic gold. Dollar sign or "$1" sticker visible.

**Hashtags:** #GarageSaleFinds #CardHunting #AtlasAdventures #Collectiverse #SportsCards #DollarBoxFinds #CardCollector #WeekendFinds #TreasureHunt #FlipLife

---

### SCRIPT 3: "Is This Card Real?"

| Field | Details |
|-------|---------|
| **Title** | Atlas Investigates: Is This Card Real? |
| **Category** | Atlas Investigates |
| **Duration** | 20 seconds |
| **Content Summary** | Atlas examines a suspicious card for authenticity using three quick checks |

**Script (Atlas Dialogue):**
```
Line 1: "Someone sent me this card asking if it's real. Let's find out."
Line 2: "Check one — the edges. Real cards have clean, even cuts."
Line 3: "Check two — hold it to the light. See that layer separation? That's a red flag."
Line 4: "Check three — magnification on the rosette pattern."
Line 5: "Verdict? This one's a fake. Stay sharp out there!"
```

**Scene Description:**
Atlas is at his grading desk. He picks up a card and performs three quick examination techniques: checking edges, holding to light (backlighting), and using a magnifying glass on the dot pattern. His final expression is a stern head-shake.

**Environment:** E13 — Grading Desk

**Camera Movements:** CAM4 (Over-the-Shoulder) for examinations → CAM8 (Close-Up Hands) for detail shots → Front-facing for verdict

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Atlas sits at a pristine grading desk with bright overhead task lighting. A single trading card lies on black felt in front of him. He picks it up carefully by the edges with his black segmented fingers. First, he holds it at eye level and examines the edges closely — tilting it left and right. Then he holds it up toward the overhead light, looking at it from behind (backlighting). His eyes narrow suspiciously. Finally, he brings a magnifying glass close to the card's surface, leaning in. His eyes shift from curious to concerned. He sets the card down, faces the camera, and shakes his head — a definitive "no, it's fake" head-shake. His expression is serious but not angry — more "be careful out there." Clinical investigation lighting. Investigative, precise mood. Camera shifts between over-the-shoulder detail and front-facing medium shots. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Subtle suspense/detective music. Light tension with pizzicato strings or muted electronic beats. Resolves with a definitive "case closed" sting.

**SFX List:**
- Card sliding off felt surface
- Subtle "magnification" whoosh when tools are used
- Suspicious "hmm" tone (musical)
- Red-flag buzzer (soft, not harsh)
- Case-closed stamp/gavel sound

**Thumbnail Concept:** Split image — left side shows a "real" card (green checkmark), right side shows a "fake" (red X). Atlas in center with magnifying glass to his eye, one eyebrow raised. Text: "REAL or FAKE?" in bold red/green.

**Hashtags:** #FakeCards #AuthenticationTips #AtlasInvestigates #Collectiverse #CardCollecting #KnowYourCards #FakeVsReal #CollectorSafety #SportsCards #SpotTheFake

---

### SCRIPT 4: "$1 Bin Find"

| Field | Details |
|-------|---------|
| **Title** | Atlas Finds: $1 Bin Find |
| **Category** | Atlas Finds |
| **Duration** | 15 seconds |
| **Content Summary** | Atlas reveals an amazing card he pulled from a bargain bin — quick, punchy reveal |

**Script (Atlas Dialogue):**
```
Line 1: "You're not gonna believe what I found in the ONE. DOLLAR. BIN."
Line 2: "BOOM. A '86 Fleer Jordan in beautiful condition."
Line 3: "Always. Check. The. Bargain. Bins."
```

**Scene Description:**
Atlas faces camera holding something behind his back, bouncing with excitement. He whips it out — dramatic reveal with sparkle effects. He holds it proudly for the camera, then points directly at viewer for the takeaway.

**Environment:** E1 — Pure White Studio (clean, let the card and Atlas be the stars)

**Camera Movements:** CAM7 (Static Medium) → Quick punch-zoom on reveal → CAM7 (Static) for closer

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Atlas stands center frame against a pure white studio backdrop. He faces the camera, bouncing on his feet with barely contained energy. Both hands are behind his back hiding something. His eyes are squeezed into excited crescents. In a dramatic motion, he whips his right hand forward, revealing a vintage basketball card. Golden sparkle effects burst from the card as it's presented. His eyes go wide and his body vibrates with pride. He holds the card up beside his face with his right hand and points directly at the camera with his left hand — emphatic, like "yes, you need to hear this." Static medium shot with a quick punch-zoom on the reveal moment. Energetic, triumphant, show-off energy. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Build-up tension for 3 seconds (holding behind back) → explosive bass drop/triumphant hit on reveal → confident beat for the closer.

**SFX List:**
- Playful "hiding something" suspense notes
- Dramatic whoosh on the reveal
- Sparkle/chime burst
- Bass impact on "BOOM"
- Confident pointing sound (snap or click)

**Thumbnail Concept:** Atlas holding a glowing card at the camera with a shocked-open mouth. A giant "$1" price sticker visible. Text: "$1 BIN FIND!" in explosive yellow burst.

**Hashtags:** #DollarBinFinds #BargainHunting #AtlasFinds #Collectiverse #SportsCards #CheapFinds #CardCollecting #ThriftFinds #HobbyWins #BinDiving

---

### SCRIPT 5: "List It & Sell It"

| Field | Details |
|-------|---------|
| **Title** | Atlas Marketplace: List It & Sell It |
| **Category** | Atlas Marketplace |
| **Duration** | 20 seconds |
| **Content Summary** | Atlas shows the quick 4-step process for listing a card for sale |

**Script (Atlas Dialogue):**
```
Line 1: "Ready to sell? Here's my four-step listing flow."
Line 2: "Step one — photo in good light. Step two — comp check for pricing."
Line 3: "Step three — write your description honestly. Step four — ship it safe."
Line 4: "Clean photos, fair price, honest description, secure shipping. SOLD!"
```

**Scene Description:**
Atlas at his home office desk demonstrates four quick actions: takes a photo of a card with a small camera, checks a screen/reference for pricing, writes/types something, then carefully packages a card in a toploader and bubble mailer. Ends with a satisfied "done!" pose.

**Environment:** E11 — Home Office

**Camera Movements:** CAM7 (Static Medium) wide enough to see desk activities → Brief CAM8 (Close-Up Hands) inserts for each step → Pull back for final "SOLD" moment

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Atlas is at a clean home office desk with a small desk lamp. On the desk: a sports card, a small camera, packaging supplies (toploader, bubble mailer, tape), and a small reference screen. Atlas faces the camera briefly (acknowledging the viewer), then turns to work. He picks up the card and positions it under the light, takes a quick photo. He glances at the reference screen and nods. He types briefly. Then he carefully slides the card into a toploader, places it in a bubble mailer, and seals it shut. He turns back to camera holding the finished package, gives a satisfied nod and a small fist pump. Efficient, purposeful movements throughout. Camera is static medium shot with brief close-up inserts on hands during key actions. Productive, satisfying, "getting things done" energy. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Upbeat productivity music — think "workflow montage." Steady rhythm, positive energy, builds to a satisfying completion note.

**SFX List:**
- Camera shutter click
- Keyboard typing sounds
- Toploader snap/slide
- Tape pulling/cutting
- Satisfying "cha-ching" or cash register on "SOLD!"

**Thumbnail Concept:** Atlas at desk with a "SOLD" stamp or banner. Card visible in toploader. Arrow showing card → money flow. Text: "LIST IT & SELL IT 💰" Clean, productive aesthetic.

**Hashtags:** #SellingCards #CardFlipping #AtlasMarketplace #Collectiverse #SportsCards #HowToSell #CardReselling #eBaySeller #ListingTips #SideHustle

---

### SCRIPT 6: "Card Show Day"

| Field | Details |
|-------|---------|
| **Title** | Atlas Events: Card Show Day |
| **Category** | Atlas Events |
| **Duration** | 20 seconds |
| **Content Summary** | Atlas experiences the excitement of arriving at and exploring a card show |

**Script (Atlas Dialogue):**
```
Line 1: "CARD SHOW DAY! My favorite day of the month!"
Line 2: "Tables full of cards... binders I haven't flipped yet..."
Line 3: "Grails behind glass cases... dealers who've seen it all..."
Line 4: "Let's GOOO!"
```

**Scene Description:**
CLIP 1: Atlas arrives at a convention hall entrance, eyes wide with excitement. The doors open and light floods in.
CLIP 2: Quick montage-style shots of Atlas at different tables — flipping binders, examining slabs, talking to dealers (implied).
CLIP 3: Atlas walking out holding a bag of purchases, triumphant, pumping his fist.

**Environment:** E4 — Card Show / Convention

**Camera Movements:** CAM5 (Pull Back Reveal) for entrance → CAM6 (Tracking) through the show → CAM3 (Low Angle) for triumphant exit

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Atlas enters a bustling card show through wide double doors. Light floods in as the doors open and the camera pulls back to reveal the massive convention hall — rows of tables, dealers, banners, and card enthusiasts everywhere. Atlas's eyes go wide with pure excitement. He bounces on his feet and pumps his fist. He then moves through the aisles, head turning to take everything in. He stops at a table to flip through a binder. Moves to the next to examine a slab. The energy is electric and bustling. Cut to: Atlas walking toward the camera from inside the hall, carrying a small shopping bag. He does a triumphant fist-pump as he exits. Low angle, heroic posture. Overhead fluorescent and dealer spotlight lighting. Camera mixes tracking shots, medium stops, and a final low-angle hero exit. Exciting, energetic, living-his-best-life mood. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** High-energy, exciting music. Builds from the door opening to full energy inside the show. Think: sporting event entrance music meets adventure theme.

**SFX List:**
- Door opening with crowd noise behind it
- Bustling crowd ambient (murmured voices, shuffling)
- Binder page turning
- Card sleeve sliding
- Triumphant "victory" stinger on exit fist-pump

**Thumbnail Concept:** Atlas standing in front of a card show entrance (or inside with tables visible), eyes huge with excitement, arms spread wide. Text: "CARD SHOW DAY! 🏆" Colorful, energetic.

**Hashtags:** #CardShow #SportsCardShow #AtlasEvents #Collectiverse #CardCollecting #HobbyLife #ConventionDay #CardDealer #CardBreaks #ShowHaul

---

### SCRIPT 7: "Your Collection's Passport"

| Field | Details |
|-------|---------|
| **Title** | Atlas Passport: Your Collection's Passport |
| **Category** | Atlas Passport |
| **Duration** | 15 seconds |
| **Content Summary** | Atlas explains why getting items authenticated/graded gives them a verified "passport" in the collecting world |

**Script (Atlas Dialogue):**
```
Line 1: "Think of grading like giving your card a PASSPORT."
Line 2: "It proves who it is, it proves where it's been, and it proves it's the real deal."
Line 3: "Your card's official passport to the world. Get it certified!"
```

**Scene Description:**
Atlas holds up an ungraded card in one hand and a PSA slab in the other. He "transforms" the raw card into the graded version (visual effect — the raw card glows and becomes the slab). He holds the slab like a passport, showing it proudly.

**Environment:** E15 — Collectiverse HQ (futuristic, high-tech authentication context)

**Camera Movements:** CAM1 (Slow Push In) for emphasis → CAM7 (Static) for the "passport" presentation

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Inside the Collectiverse HQ — a sleek futuristic space with white walls, blue accent lighting, and floating holographic screens. Atlas stands center frame holding an unslabbed trading card in his right hand. He holds it up — it begins to glow with blue and gold light. The glow intensifies and when it fades, the card is now encased in a professional grading slab (the transformation happens in-hand). Atlas holds the slab up proudly like someone presenting a passport — formal, reverent. He turns it to show both sides. Holographic "CERTIFIED" or "AUTHENTICATED" text appears floating beside the slab. Atlas nods confidently and holds the slab close to his chest protectively. Blue and white futuristic lighting. Camera slowly pushes in throughout, ending in a medium close-up on Atlas and the slab. Official, trustworthy, premium energy. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Clean, modern, slightly techy sound. Think: luxury brand meets tech startup. Confident and polished. Builds to a satisfying "certified" resolution note.

**SFX List:**
- Magical transformation whoosh/chime
- Holographic UI appearing (subtle sci-fi blip)
- Official stamp/seal sound
- Warm "verified" confirmation tone
- Subtle electronic ambient (HQ atmosphere)

**Thumbnail Concept:** Atlas holding a graded slab with a "passport stamp" graphic overlaid. Collectiverse HQ in background with glowing blue elements. Text: "YOUR CARD'S PASSPORT 🛂" Clean, premium look.

**Hashtags:** #CardGrading #PSA #BGS #SGC #AtlasPassport #Collectiverse #GradedCards #Authentication #SlabLife #CertifiedCollector

---

### SCRIPT 8: "When You Pull the Chase Card"

| Field | Details |
|-------|---------|
| **Title** | Atlas Reacts: When You Pull the Chase Card |
| **Category** | Atlas Reacts |
| **Duration** | 10 seconds |
| **Content Summary** | Pure reaction content — Atlas's over-the-top celebration when pulling a chase/hit card from a pack |

**Script (Atlas Dialogue):**
```
Line 1: "Okay, last pack... here we go..."
Line 2: [SILENCE — pure physical reaction]
Line 3: "LETS GOOOOO!!! THE CHASE!!!"
```

**Scene Description:**
Atlas is calmly opening the last card in a pack when he suddenly freezes, processes what he's seeing, and EXPLODES with pure joy — jumping, spinning, running in a circle, holding the card above his head. Maximum energy comedic celebration.

**Environment:** E1 — Pure White Studio (let the performance be everything)

**Camera Movements:** CAM7 (Static Medium) — no movement, let the performance dominate. Optional: slight camera shake on impact of big jumps.

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Pure white studio. Atlas stands center frame calmly holding a pack of cards. He pulls the last card slowly, looks at it — his body freezes completely for one full second. Then EXPLOSION: his eyes go MASSIVE (stretched wider than normal), his mouth drops open, his entire body springs upward in the biggest jump possible. He lands and immediately starts running in a tiny circle with the card held above his head. He stops, faces the camera, and screams with joy — body shaking, feet stamping. Maximum squash-and-stretch exaggeration. Confetti effect optional. This is the most expressive, over-the-top physical comedy Atlas can deliver. Static medium shot — completely stable camera lets the wild performance contrast beautifully. Pure euphoric energy. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Quiet/tense for the first 3 seconds (opening pack) → EXPLOSIVE bass drop/celebration music on the reaction. Air horn, confetti cannons energy.

**SFX List:**
- Pack wrapper crinkling
- Card sliding/revealing
- DRAMATIC SILENCE (1 second)
- Explosion/bass drop
- Air horn (meme-style)
- Crowd roar (implied celebration)
- Feet stomping on ground
- Victory music blast

**Thumbnail Concept:** Atlas mid-jump, eyes enormous, mouth wide open, confetti everywhere. The card is visible glowing in his raised hands. Text: "THE CHASE CARD!!! 🤯🔥" Maximum energy thumbnail.

**Hashtags:** #ChaseCard #PackPull #AtlasReacts #Collectiverse #Reaction #Hit #SportCards #BoxBreak #PullOfTheYear #ChaseHit

---

### SCRIPT 9: "Organize Like a Pro"

| Field | Details |
|-------|---------|
| **Title** | Atlas Tips: Organize Like a Pro |
| **Category** | Atlas Tips |
| **Duration** | 15 seconds |
| **Content Summary** | Atlas shows a simple organizational system for a card collection |

**Script (Atlas Dialogue):**
```
Line 1: "Wanna know the secret to a clean collection?"
Line 2: "Sort by sport, then by year, then by set. Penny sleeve everything. Binder the best, box the rest."
Line 3: "Organized collecting is HAPPY collecting. Trust me."
```

**Scene Description:**
Atlas sits at a desk with a messy pile of cards. He quickly sorts them into neat organized stacks, sleeves them, and places them into a binder and a box. The before-and-after contrast is satisfying. He gestures at the organized result with pride.

**Environment:** E5 — Collector's Room

**Camera Movements:** CAM7 (Static Medium) establishing the mess → CAM8 (Close-Up Hands) for the sorting action → CAM5 (Pull Back Reveal) showing the organized result

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Atlas sits at a desk in a collector's room (shelves with binders and slabs behind him). In front of him: a messy pile of unorganized cards scattered across the desk. He looks at the camera, shakes his head at the mess, then gets to work. His hands move quickly and efficiently — sorting cards into neat stacks, sliding them into penny sleeves, placing the best ones into binder pages, and boxing the rest in a clean longbox. The transformation from chaos to order is satisfying and quick (time-lapse speed feeling). He finishes, brushes his hands together, and gestures at the organized desk with both arms — "ta-da!" expression. Warm room lighting with task lamp on the desk. Camera starts static medium, cuts to close-up on hands working, then pulls back to reveal the full organized result. Satisfying, productive, proud energy. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Satisfying, steady organization music. Think: cleaning montage music. Light, rhythmic, builds to a satisfying "done!" note.

**SFX List:**
- Cards shuffling/spreading (messy sounds)
- Organized sliding sounds (pennysleeves, clicks)
- Binder rings snapping open/closed
- Box lid closing
- Satisfying "ding" or "complete" chime at the end
- Hands brushing together

**Thumbnail Concept:** Split down the middle — left side is chaotic mess of cards, right side is perfectly organized binders and boxes. Atlas stands in the center pointing to the organized side with a big grin. Text: "ORGANIZE LIKE A PRO ✨" Clean design.

**Hashtags:** #CollectionOrganization #CardStorage #AtlasTips #Collectiverse #SportsCards #OrganizedCollector #BinderSetup #HobbyTips #CardCave #CollectorLife

---

### SCRIPT 10: "What's It Worth?"

| Field | Details |
|-------|---------|
| **Title** | Atlas Tips: What's It Worth? |
| **Category** | Atlas Tips |
| **Duration** | 15 seconds |
| **Content Summary** | Atlas explains how to quickly check what a card is worth using comps |

**Script (Atlas Dialogue):**
```
Line 1: "Found a cool card but have NO idea what it's worth?"
Line 2: "Check recent SOLD comps — not listing prices, SOLD prices. That's what people actually paid."
Line 3: "Condition matters too — a PSA 10 and a raw copy are completely different values."
Line 4: "Comps tell the truth. Check before you buy OR sell!"
```

**Scene Description:**
Atlas holds a card and shrugs (the "I don't know" gesture). Then he turns to a screen showing sold listings (implied — he gestures at it). He holds up the card next to the screen, comparing. He gives a knowing nod and a thumbs up — now he knows the value.

**Environment:** E11 — Home Office (desk with computer screen)

**Camera Movements:** CAM7 (Static Medium) — educational/clear throughout → Brief CAM1 (Push In) when he makes the key point about SOLD vs. listed

**Full Veo 3 Prompt:**
```
[FULL CHARACTER LOCK PROMPT]
SCENE: Atlas stands at a home office desk with a computer monitor visible. He faces the camera holding a trading card, shrugging with an exaggerated "I don't know" expression — palms up, head tilted. Then he perks up with an idea (lightbulb moment — eyes brighten). He turns to the monitor and gestures at it (screen shows implied sold listings). He holds the card up next to the screen, comparing, and nods along as if checking data. He turns back to the camera, holds up one finger (key point), taps the card with his other hand, then points at camera with confidence and gives a knowing nod and thumbs up. Clean, educational framing. Warm desk lamp + monitor glow lighting. Static medium shot with a slight push-in on the key point. Informative, empowering, helpful energy. 3D CGI animated, Pixar quality.
```

**Music Suggestion:** Light "learning something useful" music. Gentle upbeat tone that makes the viewer feel empowered. Think: friendly tutorial background.

**SFX List:**
- Questioning/uncertain musical note (the shrug)
- Lightbulb/idea chime
- Mouse clicking/scrolling (checking comps)
- "Aha!" discovery tone
- Confident point/snap sound
- Positive resolution note

**Thumbnail Concept:** Atlas with a magnifying glass over a card, with dollar signs and a "?" above. A small screen showing graphs/prices in background. Text: "WHAT'S IT WORTH? 💰" Bold, attention-grabbing.

**Hashtags:** #CardValues #CompsCheck #AtlasTips #Collectiverse #SportsCards #WhatIsItWorth #CardPricing #CollectorTips #MarketValue #PriceGuide

---

## APPENDIX: QUICK REFERENCE CARD

### Assembly Formula
```
FULL PROMPT = [Character Lock] + [Environment (E1-E15)] + [Scene Action] + [Camera (CAM1-CAM8)] + [Mood/Style Keywords]
```

### Platform Priority Order
1. **Veo 3** — Primary tool for hero content (best consistency + quality)
2. **Kling 2.1** — Secondary for complex action sequences
3. **Runway Gen-4** — Use when you have a reference image to lock style
4. **Pika** — Quick iterations, reactions, simple loops, lip-sync tests

### Content Cadence Suggestion
| Day | Content Type | Duration |
|-----|-------------|----------|
| Monday | Atlas Tips | 15s |
| Tuesday | Atlas Adventures | 30s |
| Wednesday | Atlas Investigates | 20s |
| Thursday | Atlas Finds | 15s |
| Friday | Atlas Events or Marketplace | 20s |
| Saturday | Atlas Reacts | 10s |
| Sunday | Atlas Passport | 15s |

### Essential Hashtag Sets
**Universal (always include):** #Collectiverse #Atlas #CollectorLife #SportsCards  
**Tips:** #HobbyTips #CollectorTips #LearnCollecting  
**Adventures:** #TreasureHunt #GarageSale #CardHunting  
**Investigates:** #FakeVsReal #Authentication #KnowYourCards  
**Finds:** #BargainBin #HobbyWins #CheapFinds  
**Marketplace:** #CardFlipping #SellCards #SideHustle  
**Events:** #CardShow #Convention #HobbyEvents  
**Passport:** #GradedCards #PSA #Authentication  
**Reacts:** #Reaction #PackPull #ChaseCard  

---

*End of Atlas Video Production Kit v1.0*  
*© Collectiverse — All rights reserved.*
