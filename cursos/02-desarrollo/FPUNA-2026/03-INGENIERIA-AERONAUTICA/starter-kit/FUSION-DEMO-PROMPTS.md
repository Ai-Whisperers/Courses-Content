# Fusion 360 AI Prompts

Use these prompts to test your new Fusion 360 integration with Claude.

## 🚀 Quick Verification

**Copy and paste this into Claude to test the connection:**

> "Create a box in Fusion 360 with width 100mm, depth 100mm, and height 50mm."

## ✈️ Aeronautical Examples

### 1. Simple Fuselage

> "Construct a cylinder along the X-axis to represent a fuselage. It should be 2000mm long and 300mm in diameter. Then create a cone at the front for the nose cone, 400mm long."

### 2. Wing Section (Conceptual)

> "Create a rectangular block to represent a wing section: 1500mm span, 300mm chord, and 40mm thickness. Then apply a fillet of 20mm to the leading edge to round it off."

### 3. Mounting Bracket

> "Create a sketch on the XY plane. Draw a rectangle 50x50mm. Extrude it by 5mm. Then create a hole of diameter 5mm in the center."

## 🔧 Troubleshooting

If Claude says it doesn't have the tools:

1. Ensure **Autodesk Fusion 360** is running.
2. **Restart Claude Desktop** (Quit and Re-open).
3. Check the logs or run the verification script again:
   `python courses/02-development/FPUNA-2026/03-INGENIERIA-AERONAUTICA/starter-kit/verify_fusion_setup.py`
