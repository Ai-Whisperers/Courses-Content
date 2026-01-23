# GitHub Pages Setup Guide

Deploy your courses as a browsable website using GitHub Pages + Docusaurus/MkDocs.

---

## Why GitHub Pages?

**Benefits:**
- Free hosting for public repositories
- Custom domain support
- Automatic deployment via GitHub Actions
- Professional presentation
- Better SEO and discoverability
- Searchable documentation

**Recommended For:**
- Public course catalogs
- Student-facing documentation
- Marketing/showcase pages

---

## Option 1: Docusaurus (Recommended)

### Pros
- React-based, modern UI
- Built-in search
- Versioning support
- Great for technical documentation
- Active community

### Quick Setup

```bash
# Install Docusaurus in docs-site folder
npx create-docusaurus@latest docs-site classic

# Navigate to docs-site
cd docs-site

# Copy course content
cp -r ../courses ./docs/courses
cp ../README.md ./docs/intro.md

# Start development server
npm start

# Build for production
npm run build

# Test production build
npm run serve
```

### Configuration

Edit `docusaurus.config.js`:

```javascript
module.exports = {
  title: 'AI Whisperers Courses',
  tagline: 'Professional AI Training Programs',
  url: 'https://ai-whisperers.github.io',
  baseUrl: '/Courses-Content/',
  organizationName: 'AI-Whisperers',
  projectName: 'Courses-Content',
  
  themeConfig: {
    navbar: {
      title: 'AI Whisperers',
      items: [
        {to: 'courses/', label: 'Courses', position: 'left'},
        {to: 'about', label: 'About', position: 'left'},
        {href: 'https://github.com/AI-Whisperers', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} AI Whisperers`,
    },
  },
};
```

### GitHub Actions Deployment

Create `.github/workflows/deploy-docs.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm
          cache-dependency-path: docs-site/package-lock.json
      
      - name: Install dependencies
        working-directory: ./docs-site
        run: npm ci
      
      - name: Build
        working-directory: ./docs-site
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs-site/build
```

---

## Option 2: MkDocs (Simpler)

### Pros
- Python-based, easy to learn
- Lightweight
- Material theme looks great
- Quick setup

### Quick Setup

```bash
# Install MkDocs
pip install mkdocs-material

# Initialize project
mkdocs new docs-site
cd docs-site

# Configure mkdocs.yml
# (see below)

# Start dev server
mkdocs serve

# Build static site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

### Configuration

Edit `mkdocs.yml`:

```yaml
site_name: AI Whisperers Courses
site_url: https://ai-whisperers.github.io/Courses-Content
repo_url: https://github.com/AI-Whisperers/Courses-Content

theme:
  name: material
  palette:
    primary: indigo
    accent: indigo
  features:
    - navigation.tabs
    - navigation.sections
    - toc.integrate
    - search.suggest

nav:
  - Home: index.md
  - Courses:
      - Overview: courses/INDEX.md
      - Production: courses/production.md
      - Beta: courses/beta.md
  - About: about.md

plugins:
  - search
  - awesome-pages

markdown_extensions:
  - admonition
  - codehilite
  - toc:
      permalink: true
```

---

## Enable GitHub Pages

1. **Go to Repository Settings**
   - Navigate to your GitHub repository
   - Click "Settings" tab
   - Scroll to "Pages" section

2. **Configure Source**
   - Source: "GitHub Actions" (recommended) OR "gh-pages" branch
   - Save

3. **Set Custom Domain (Optional)**
   - Add CNAME file with your domain
   - Configure DNS:
     ```
     CNAME: courses.ai-whisperers.com -> ai-whisperers.github.io
     ```

4. **Enforce HTTPS**
   - Check "Enforce HTTPS" option

---

## Content Organization

### Recommended Structure

```
docs-site/
├── docs/
│   ├── index.md                    # Home page
│   ├── courses/
│   │   ├── INDEX.md                # Course catalog
│   │   ├── production/
│   │   │   ├── qa-automation.md
│   │   │   └── prompt-engineering.md
│   │   ├── development/
│   │   │   └── fpuna-2026.md
│   │   └── beta/
│   ├── guides/
│   │   ├── getting-started.md
│   │   └── for-instructors.md
│   └── about/
│       ├── mission.md
│       └── team.md
├── static/                         # Images, PDFs, etc.
└── docusaurus.config.js            # (or mkdocs.yml)
```

### Link Conversion

Since course content is in markdown, minimal changes needed:

```bash
# Copy courses maintaining structure
cp -r ../courses ./docs/courses

# Update relative links if needed
# (Most should work as-is)
```

---

## Customization

### Add Search

Docusaurus includes search by default.

For MkDocs, enable in `mkdocs.yml`:

```yaml
plugins:
  - search:
      lang: en
```

### Add Analytics

Docusaurus:
```javascript
// docusaurus.config.js
module.exports = {
  themeConfig: {
    gtag: {
      trackingID: 'G-XXXXXXXXXX',
    },
  },
};
```

MkDocs:
```yaml
# mkdocs.yml
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX
```

### Custom Domain

1. Add `CNAME` file to static folder:
   ```
   courses.ai-whisperers.com
   ```

2. Configure DNS with your provider:
   ```
   Type: CNAME
   Name: courses (or @)
   Value: ai-whisperers.github.io
   ```

---

## Maintenance

### Update Workflow

1. **Make changes** to course content in main repo
2. **Automatic deployment** via GitHub Actions
3. **Verify** at your GitHub Pages URL

### Manual Deployment

Docusaurus:
```bash
cd docs-site
npm run build
npm run serve  # Test locally
npm run deploy  # Deploy to gh-pages
```

MkDocs:
```bash
cd docs-site
mkdocs build  # Test build
mkdocs gh-deploy  # Deploy to GitHub Pages
```

---

## Best Practices

1. **Keep source in main repo**
   - Don't duplicate content
   - Use symlinks or copy scripts

2. **Automate deployment**
   - Use GitHub Actions for automatic updates
   - Deploy on push to main branch

3. **Test locally first**
   - Always test with `npm start` or `mkdocs serve`
   - Check all links work

4. **Use versioning**
   - For course updates, consider Docusaurus versions feature
   - Keep old versions accessible

5. **Monitor analytics**
   - Track which courses are popular
   - Identify confusing areas (high bounce rate)

---

## Troubleshooting

### Build Fails

Check:
- Node.js version (18+ for Docusaurus)
- All dependencies installed: `npm ci`
- No broken markdown links
- Proper file paths (case-sensitive on Linux)

### Links Broken

- Use relative links: `../other-page.md`
- Not absolute: `/courses/page.md`
- Test with `npm run serve` before deploying

### Styles Missing

- Ensure static assets copied to build folder
- Check baseUrl in config matches GitHub repo name
- Clear browser cache

---

## Next Steps

1. Choose Docusaurus (feature-rich) or MkDocs (simpler)
2. Set up docs-site folder with chosen tool
3. Copy course content
4. Test locally
5. Configure GitHub Actions
6. Enable GitHub Pages
7. Deploy and verify

---

**Questions?** Check:
- [Docusaurus Docs](https://docusaurus.io/docs)
- [MkDocs Docs](https://www.mkdocs.org/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Last Updated:** January 23, 2026
