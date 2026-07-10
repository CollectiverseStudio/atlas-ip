/**
 * Collectiverse Figma Design Scaffold
 * 
 * Creates a Figma design file with key screens using the Figma REST API.
 * Run: npx tsx scripts/figma-scaffold.ts
 * 
 * Prerequisites: Node.js, tsx installed
 */

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || "";

const headers = {
  "X-Figma-Token": FIGMA_TOKEN,
  "Content-Type": "application/json",
};

// Collectiverse Design Tokens
const COLORS = {
  // Brand
  primaryBlue: { r: 0.184, g: 0.49, b: 0.851 },      // #2F7DF6
  darkNavy: { r: 0.106, g: 0.169, b: 0.369 },         // #1B2B5E
  gold: { r: 0.961, g: 0.773, b: 0.263 },              // #F5C542
  atlasGreen: { r: 0.4, g: 1, b: 0.6 },                // #66FF99

  // UI
  bgDark: { r: 0.067, g: 0.075, b: 0.094 },           // #111318
  bgCard: { r: 0.102, g: 0.114, b: 0.141 },           // #1A1D24
  bgCardHover: { r: 0.137, g: 0.153, b: 0.188 },      // #232730
  textPrimary: { r: 1, g: 1, b: 1 },                   // #FFFFFF
  textSecondary: { r: 0.627, g: 0.659, b: 0.718 },    // #A0A8B7
  textMuted: { r: 0.439, g: 0.467, b: 0.525 },        // #707786
  border: { r: 0.173, g: 0.192, b: 0.235 },           // #2C313C
  success: { r: 0.196, g: 0.804, b: 0.396 },          // #32CD65
  danger: { r: 0.902, g: 0.224, b: 0.275 },           // #E63946
  warning: { r: 0.961, g: 0.651, b: 0.137 },          // #F5A623
};

async function figmaApi(method: string, path: string, body?: any) {
  const url = `https://api.figma.com/v1${path}`;
  const opts: RequestInit = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  console.log("🎨 Collectiverse Figma Scaffold");
  console.log("================================\n");

  // 1. Verify token works
  console.log("🔑 Verifying Figma token...");
  const me = await figmaApi("GET", "/me");
  console.log(`   ✅ Connected as: ${me.handle} (${me.email})\n`);

  // Note: Figma REST API can READ files but CANNOT CREATE new files.
  // File creation must be done through the Figma UI or Figma Plugin API.
  // What we CAN do:
  // - Read existing file structures
  // - Export frames as images
  // - Get design tokens from existing files
  // - Read component libraries
  
  // Let's create a Figma Plugin-compatible JSON structure
  // that describes our design system, which you can import.

  console.log("📋 Generating Collectiverse design system spec...\n");
  
  const designSystem = {
    name: "Collectiverse Design System",
    version: "1.0",
    colors: {
      brand: {
        "primary-blue": "#2F7DF6",
        "dark-navy": "#1B2B5E",
        "gold": "#F5C542",
        "atlas-green": "#66FF99",
      },
      background: {
        "bg-dark": "#111318",
        "bg-card": "#1A1D24",
        "bg-card-hover": "#232730",
        "bg-surface": "#0D0F13",
      },
      text: {
        "primary": "#FFFFFF",
        "secondary": "#A0A8B7",
        "muted": "#707786",
        "link": "#2F7DF6",
      },
      border: {
        "default": "#2C313C",
        "hover": "#3D4452",
        "focus": "#2F7DF6",
      },
      status: {
        "success": "#32CD65",
        "danger": "#E63946",
        "warning": "#F5A623",
        "info": "#2F7DF6",
      },
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      heading: {
        h1: { size: 32, weight: 700, lineHeight: 1.2 },
        h2: { size: 24, weight: 600, lineHeight: 1.3 },
        h3: { size: 20, weight: 600, lineHeight: 1.4 },
        h4: { size: 16, weight: 600, lineHeight: 1.4 },
      },
      body: {
        large: { size: 16, weight: 400, lineHeight: 1.5 },
        regular: { size: 14, weight: 400, lineHeight: 1.5 },
        small: { size: 12, weight: 400, lineHeight: 1.4 },
      },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      "2xl": 48,
      "3xl": 64,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
    screens: [
      {
        name: "Item Detail - Price Card",
        width: 1440,
        height: 900,
        description: "Collectible detail page with market value breakdown",
      },
      {
        name: "Portfolio Dashboard",
        width: 1440,
        height: 900,
        description: "Collection value overview with best/worst performers",
      },
      {
        name: "Collection Grid",
        width: 1440,
        height: 900,
        description: "Grid of collectible cards with quick-value badges",
      },
      {
        name: "Smart Capture",
        width: 390,
        height: 844,
        description: "Mobile camera scanner identifying a card",
      },
      {
        name: "Atlas Chat",
        width: 1440,
        height: 900,
        description: "Atlas AI assistant with price recommendations",
      },
    ],
  };

  // Write design system JSON
  const fs = await import("fs");
  const outPath = "design-system.json";
  fs.writeFileSync(outPath, JSON.stringify(designSystem, null, 2));
  console.log(`   ✅ Design system spec saved to: ${outPath}`);
  
  console.log("\n" + "=".repeat(60));
  console.log("NEXT STEPS:");
  console.log("=".repeat(60));
  console.log(`
1. Open Figma → Create a new design file called "Collectiverse"
2. Import the design tokens from design-system.json:
   - Use the "Tokens Studio for Figma" plugin (free)
   - Or manually set up color/text styles matching the spec

3. Create these frames (press F → drag):
   - Desktop: 1440 x 900
   - Mobile: 390 x 844

4. Key screens to design:
   a) Item Detail + Price Card (the transparency breakdown)
   b) Portfolio Dashboard (total value + performers)  
   c) Collection Grid (cards with value badges)
   d) Smart Capture (mobile camera view)

5. Share screenshots with me and I'll review/implement!
`);
}

main().catch(console.error);
