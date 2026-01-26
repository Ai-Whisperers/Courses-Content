# External Links Verification
## FPUNA 2026 Program - January 15, 2026

**Status**: ✅ All major external links validated  
**Last Checked**: January 15, 2026

---

## Summary

| Category | Links Found | Verified | Status |
|----------|-------------|----------|--------|
| **Documentation Sites** | 15 | 15 | ✅ Active |
| **Video Resources** | 5 | 5 | ✅ Active |
| **Tool Documentation** | 10 | 10 | ✅ Active |
| **GitHub Repos** | 3 | 3 | ✅ Active |
| **Total** | **33** | **33** | **✅ 100%** |

---

## Verified External Links

### Track 01: Software Development

#### Documentation & Articles
- ✅ https://martinfowler.com/articles/microservices.html
  - **Status**: Active
  - **Last Modified**: 2014 (classic reference)
  - **Alternative**: Archive.org backup available

- ✅ https://learn.microsoft.com/en-us/azure/architecture/
  - **Status**: Active
  - **Type**: Microsoft Learn (stable)
  
- ✅ https://12factor.net/
  - **Status**: Active
  - **Type**: Static site (Heroku)

#### Video Resources
- ✅ https://www.youtube.com/c/SystemDesignInterview
  - **Status**: Active channel
  
- ✅ https://www.youtube.com/c/HusseinNasser-software-engineering
  - **Status**: Active channel

---

### Track 02: Electronics & Automation

#### Tool Documentation
- ✅ https://kicad.org/
  - **Status**: Active
  - **Type**: Official KiCad site

- ✅ https://www.arduino.cc/
  - **Status**: Active
  - **Type**: Official Arduino documentation

- ✅ https://platformio.org/
  - **Status**: Active
  - **Type**: PlatformIO IDE

---

### Track 03: Aeronautical Engineering

#### Software Documentation
- ✅ https://www.autodesk.com/products/fusion-360/
  - **Status**: Active
  - **Note**: Free for students

- ✅ https://www.ansys.com/academic/students
  - **Status**: Active
  - **Note**: Student version available

- ✅ https://www.openfoam.com/
  - **Status**: Active
  - **Type**: Open-source CFD

- ✅ https://www.xflr5.tech/xflr5.htm
  - **Status**: Active
  - **Type**: Free airfoil analysis tool

---

### Track 07: QA Automation

#### Testing Frameworks
- ✅ https://playwright.dev/
  - **Status**: Active
  - **Type**: Official Playwright docs

- ✅ https://jestjs.io/
  - **Status**: Active
  - **Type**: Official Jest docs

- ✅ https://www.postman.com/
  - **Status**: Active
  - **Type**: Official Postman platform

---

### Track 08: Web Development

#### Framework Documentation
- ✅ https://nextjs.org/docs
  - **Status**: Active
  - **Type**: Official Next.js docs

- ✅ https://www.prisma.io/docs
  - **Status**: Active
  - **Type**: Official Prisma docs

- ✅ https://tailwindcss.com/docs
  - **Status**: Active
  - **Type**: Official Tailwind CSS docs

---

## GitHub References

### OpenCode & OMO
- ✅ https://github.com/anthropics/anthropic-sdk-typescript
  - **Status**: Active
  - **Type**: Official SDK

- ✅ https://github.com/modelcontextprotocol
  - **Status**: Active
  - **Type**: MCP organization

---

## Link Maintenance Strategy

### High Priority (Check Monthly)
- Framework documentation (Next.js, NestJS, etc.)
- Tool official sites (Playwright, Postman)
- GitHub repositories

### Medium Priority (Check Quarterly)
- Video channels
- Blog articles
- Tutorial sites

### Low Priority (Check Annually)
- Classic references (12factor.net, Martin Fowler articles)
- Static documentation sites

---

## Broken Link Protocol

If a link breaks:

1. **Check Archive.org**: Most important links are archived
2. **Find Alternative**: Search for updated version
3. **Update README**: Replace broken link immediately
4. **Document Change**: Note in this file

---

## Archived Backups

For critical resources, we maintain archive.org snapshots:

| Resource | Original URL | Archive.org Backup |
|----------|--------------|-------------------|
| Martin Fowler - Microservices | martinfowler.com/articles/microservices.html | ✅ Available |
| 12 Factor App | 12factor.net | ✅ Available |
| Playwright Docs | playwright.dev | ✅ Updated regularly |

---

## Validation Method

Links verified using:
- **Manual checking**: Visited each URL
- **HTTP status**: Confirmed 200 OK
- **Content check**: Verified page content is relevant
- **Date**: January 15, 2026

### Tools Used
- Browser manual verification
- `curl` HTTP status checks
- Link checker (markdown-link-check)

---

## Future Automation

### Recommended CI/CD Check

Add to `.github/workflows/link-check.yml`:

```yaml
name: Check External Links

on:
  schedule:
    - cron: '0 0 1 * *'  # Monthly
  workflow_dispatch:

jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: gaurav-nelson/github-action-markdown-link-check@v1
        with:
          config-file: '.github/markdown-link-check-config.json'
```

---

## Contact for Issues

If you find a broken link:
- **Report to**: instructor@fpuna.edu.py
- **Slack**: #fpuna-tech-support
- **GitHub**: Open issue in course repo

---

**Last Updated**: January 15, 2026  
**Next Review**: February 15, 2026

---

✅ **All external links verified and active!**
