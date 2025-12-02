# Presentation Templates

## AI-Assisted Software Development Course

This directory contains presentation templates and resources for instructors delivering the course.

---

## Contents

| File | Description |
|------|-------------|
| [MASTER-SLIDE-TEMPLATE.md](MASTER-SLIDE-TEMPLATE.md) | Base template for all slide decks |
| [MODULE-SLIDE-TEMPLATE.md](MODULE-SLIDE-TEMPLATE.md) | Template for individual module slides |
| [SPEAKER-NOTES-TEMPLATE.md](SPEAKER-NOTES-TEMPLATE.md) | Guide for creating speaker notes |
| [VISUAL-DIAGRAMS.md](VISUAL-DIAGRAMS.md) | ASCII diagrams and visual aids |
| [WORKSHOP-GUIDE.md](WORKSHOP-GUIDE.md) | Interactive workshop facilitation guide |

---

## Slide Design Guidelines

### Color Scheme
- Primary: #2563EB (Blue)
- Secondary: #10B981 (Green)
- Accent: #F59E0B (Amber)
- Background: #FFFFFF or #F3F4F6
- Text: #1F2937

### Typography
- Headings: Sans-serif, bold
- Body: Sans-serif, regular
- Code: Monospace

### Layout Principles
- One idea per slide
- Maximum 6 bullet points
- Large code samples (16pt+ font)
- High-contrast for accessibility

---

## Module Timing Guide

| Module | Slides | Duration |
|--------|--------|----------|
| 1. Overview | ~25 | 2 hours |
| 2. Copilot | ~35 | 2 hours |
| 3. Code Review | ~30 | 2 hours |
| 4. Documentation | ~25 | 1.5 hours |
| 5. Testing | ~25 | 2 hours |
| 6. Architecture | ~20 | 2 hours |
| 7. Security | ~25 | 2 hours |
| 8. Capstone | ~10 | 3 hours |

---

## Presentation Software

Templates are designed for:
- **Marp** (Markdown presentations)
- **reveal.js** (HTML presentations)
- **PowerPoint/Google Slides** (converted from Markdown)

### Converting Markdown to Slides

```bash
# Using Marp CLI
npx @marp-team/marp-cli slides.md --html

# Using Pandoc
pandoc slides.md -t revealjs -o slides.html
```

---

## Best Practices for Delivery

### Before Session
- [ ] Test all live demos
- [ ] Prepare fallback screenshots
- [ ] Check AI tool connectivity
- [ ] Review speaker notes

### During Session
- [ ] Use timer for sections
- [ ] Pause for questions
- [ ] Demonstrate, don't just describe
- [ ] Adapt to audience level

### After Session
- [ ] Collect feedback
- [ ] Note improvements
- [ ] Update materials as needed

---

*Presentation Templates - AI-Assisted Software Development Course*
