# GitHub Reference Repositories

A curated collection of GitHub repositories relevant to the **QA Automation with AI** course content. These repositories serve as reference materials, learning resources, and practical examples for AI-assisted test automation.

---

## Table of Contents

- [Ready-to-Use Starter Projects](#ready-to-use-starter-projects) ⭐
- [Page Object Model (POM) Examples](#page-object-model-pom-examples) ⭐
- [Practice Applications & Test Targets](#practice-applications--test-targets) ⭐
- [Jest & Pytest Learning Resources](#jest--pytest-learning-resources) ⭐
- [API Testing Examples](#api-testing-examples) ⭐
- [CI/CD Pipeline Examples](#cicd-pipeline-examples) ⭐
- [Prompt Engineering & Claude](#prompt-engineering--claude)
- [AI-Powered Test Automation](#ai-powered-test-automation)
- [Agentic Design Patterns](#agentic-design-patterns)
- [Test Automation Frameworks](#test-automation-frameworks)
- [AI Documentation Generation](#ai-documentation-generation)
- [MCP (Model Context Protocol)](#mcp-model-context-protocol)
- [Additional Resources](#additional-resources)

---

## Ready-to-Use Starter Projects

These boilerplate projects are **ready to clone and run** - perfect for students to get started quickly.

### Playwright + TypeScript Boilerplates

| Repository | Description | Features | Setup |
|------------|-------------|----------|-------|
| [abhaybharti/playwright-framework-template](https://github.com/abhaybharti/playwright-framework-template) | Complete framework for Web, API, Mobile, Load Testing | ESLint, Prettier, Dotenv, AWS Secrets, tagged tests (@smoke) | `npm install && npx playwright test` |
| [akshayp7/playwright-typescript-playwright-test](https://github.com/akshayp7/playwright-typescript-playwright-test) | Full-featured boilerplate with Docker & SonarQube | Video recording, trace files, mobile emulation, visual testing, Slack notifications | `npm install && npx playwright test` |
| [charlyautomatiza/starter-playwright](https://github.com/charlyautomatiza/starter-playwright) | Web/API automation with Allure & Lighthouse | Allure reports, Lighthouse performance, TypeScript | `npm install && npx playwright test` |
| [angelo-loria/playwright-boilerplate](https://github.com/angelo-loria/playwright-boilerplate) | POM-based project with accessibility testing | axe-core accessibility, GitHub Actions, sharding, multiple reporters | `npm install && npx playwright test` |
| [DrSmile444/playwright-boilerplate](https://github.com/DrSmile444/playwright-boilerplate) | Modern TypeScript practices with decorators | Custom decorators, strong typing, scalable architecture | `npm install && npx playwright test` |
| [wasylmowczan/playwright-typescript-boilerplate](https://github.com/wasylmowczan/playwright-typescript-boilerplate) | Well-organized Web/API automation | Components, fixtures, helpers, pages structure | `npm install && npx playwright test` |

### Quick Start Commands

```bash
# Clone any boilerplate
git clone https://github.com/abhaybharti/playwright-framework-template.git
cd playwright-framework-template
npm install
npx playwright install
npx playwright test
```

---

## Page Object Model (POM) Examples

Pre-built POM implementations students can study and extend.

### TypeScript POM Projects

| Repository | Description | Test Target | Best For |
|------------|-------------|-------------|----------|
| [andrewbayd/playwright-page-object](https://github.com/andrewbayd/playwright-page-object) | Simple POM framework | Generic | Beginners learning POM basics |
| [darshan-chavda3/playwright-ts-web-pom](https://github.com/darshan-chavda3/playwright-ts-web-pom) | POM with TypeScript | Swag Labs (SauceDemo) | E-commerce testing practice |
| [jagota-s/playwright-typescript-pom](https://github.com/jagota-s/playwright-typescript-pom) | Boilerplate template with POM & Docker | Generic | Production-ready structure |
| [nareshnavinash/playwright-TS-pom](https://github.com/nareshnavinash/playwright-TS-pom) | POM with GitLab CI & DataDog | Generic | CI/CD integration |

### JavaScript POM Projects

| Repository | Description | Best For |
|------------|-------------|----------|
| [Raghav-Pal/Playwright_PageObjectModel](https://github.com/Raghav-Pal/Playwright_PageObjectModel) | Demo tutorial with step-by-step instructions | Complete beginners |
| [kjnanda/playwright-pom](https://github.com/kjnanda/playwright-pom) | POM with environment variables | Learning environment configs |

### Python POM Tutorial

| Repository | Description |
|------------|-------------|
| [AutomationPanda/playwright-python-tutorial](https://github.com/AutomationPanda/playwright-python-tutorial) | Comprehensive Python tutorial including POM chapter |

### Java POM Template

| Repository | Description |
|------------|-------------|
| [simplytest/template-java-playwright-pageobject](https://github.com/simplytest/template-java-playwright-pageobject) | Java + Maven + TestNG + Allure with POM |

---

## Practice Applications & Test Targets

### Curated Lists of Practice Sites

| Repository | Description | Content |
|------------|-------------|---------|
| [BMayhew/awesome-sites-to-test-on](https://github.com/BMayhew/awesome-sites-to-test-on) | Community-curated practice sites | 50+ sites for UI, API, mobile testing |
| [JapneetSachdeva1/free-sites-to-practice-testing](https://github.com/JapneetSachdeva1/free-sites-to-practice-testing) | Free practice testing sites | UI and API testing resources |

### Top Practice Websites

| Website | URL | Best For |
|---------|-----|----------|
| **Sauce Demo** | https://www.saucedemo.com | E-commerce testing (login, cart, checkout) |
| **The Internet** | https://the-internet.herokuapp.com | Automation pitfalls (frames, shadow DOM, uploads) |
| **UI Test Automation Playground** | http://uitestingplayground.com | Modern web challenges |
| **JSONPlaceholder** | https://jsonplaceholder.typicode.com | REST API testing (6 resources) |
| **Reqres.in** | https://reqres.in | REST API testing with auth |
| **Automation Exercise** | https://automationexercise.com | E-commerce with API endpoints |
| **XYZ Bank** | https://www.globalsqa.com/angularJs-protractor/BankingProject | Angular app testing |
| **QA Brains Practice** | https://qabrains.com/practice-site | Beginner-friendly |

### SauceDemo Automation Examples

Ready-to-run test suites for SauceDemo:

| Repository | Language/Framework | Features |
|------------|-------------------|----------|
| [lakshithadil/Test-Automation-for-Swag-Labs](https://github.com/lakshithadil/Test-Automation-for-Swag-Labs) | Java + Cucumber + Selenium | BDD, test cases, bug reports |
| [ManuBoca92/cypress-swaglabs](https://github.com/ManuBoca92/cypress-swaglabs) | Cypress | BDD framework, CircleCI |
| [JavierKaiser9/Ecommerce-Automation](https://github.com/JavierKaiser9/Ecommerce-Automation) | Java + Selenium + TestNG | Test case analysis, maintainable |
| [radman-s/Automated_Functional_Testing_for_Saucedemo](https://github.com/radman-s/Automated_Functional_Testing_for_Saucedemo) | Python + Selenium | Full checkout flow |
| [pramam/webdriverio-saucedemo-testing](https://github.com/pramam/webdriverio-saucedemo-testing) | WebdriverIO | Allure & HTML reports, FSM approach |

---

## Jest & Pytest Learning Resources

### Jest (TypeScript/JavaScript)

| Repository | Description | Best For |
|------------|-------------|----------|
| [mtiller/ts-jest-sample](https://github.com/mtiller/ts-jest-sample) | Simple Jest + TypeScript setup with coverage | Beginners |
| [kulshekhar/ts-jest](https://github.com/kulshekhar/ts-jest) | Official TypeScript Jest transformer | Production setup |
| [jmfiola/jest-api-test-typescript-example](https://github.com/jmfiola/jest-api-test-typescript-example) | API testing boilerplate with Jest + TypeScript | API testing |
| [geshan/typescript-jest](https://github.com/geshan/typescript-jest) | Tutorial companion repo | Learning TDD |

### Pytest (Python)

| Repository | Description | Best For |
|------------|-------------|----------|
| [pluralsight/intro-to-pytest](https://github.com/pluralsight/intro-to-pytest) | Simple, hackable examples | Complete beginners |
| [poldrack/pytest_tutorial](https://github.com/poldrack/pytest_tutorial) | Data science testing context | Coverage with pytest-cov |
| [hgrif/pytest-exercises](https://github.com/hgrif/pytest-exercises) | Practice exercises | Hands-on learning |
| [jashburn8020/python-testing-with-pytest](https://github.com/jashburn8020/python-testing-with-pytest) | Book excerpts (Brian Okken) | Deep learning |
| [hectorcanto/pytest-samples](https://github.com/hectorcanto/pytest-samples) | Sample tests + slides (EN/ES) | Presentations |

### Quick Start - Jest

```bash
# Clone and run
git clone https://github.com/mtiller/ts-jest-sample.git
cd ts-jest-sample
npm install
npm test
```

### Quick Start - Pytest

```bash
# Clone and run
git clone https://github.com/pluralsight/intro-to-pytest.git
cd intro-to-pytest
pip install pytest
pytest -v -s
```

---

## API Testing Examples

### Postman Collections

| Repository | API Target | Features |
|------------|------------|----------|
| [mathare/api-testing-postman](https://github.com/mathare/api-testing-postman) | JSONPlaceholder | Chai assertions, Newman, kickstart template |
| [iandav/reqres-api-testing](https://github.com/iandav/reqres-api-testing) | Reqres.in | Postman, Newman, JavaScript, Chai BDD |
| [radwanSQA/API-Testing--Postman](https://github.com/radwanSQA/API-Testing--Postman) | Multiple APIs | reqres, JSONPlaceholder, httpbin, GitHub API |
| [Tahani-Saber/reqres.in-API-Testing-Project-](https://github.com/Tahani-Saber/reqres.in-API-Testing-Project-) | Reqres.in | Newman CLI runner |
| [larrybotha/postman-rest-api-testing](https://github.com/larrybotha/postman-rest-api-testing) | Various | Course notes and examples |

### Playwright API Testing

| Repository | Description |
|------------|-------------|
| [testsmith-io/api-test-automation-python-pytest-playwright](https://github.com/testsmith-io/api-test-automation-python-pytest-playwright) | Python + pytest + Playwright API testing with GitHub Actions |

### Free APIs for Practice

| API | URL | Resources |
|-----|-----|-----------|
| JSONPlaceholder | https://jsonplaceholder.typicode.com | posts, comments, albums, photos, todos, users |
| Reqres | https://reqres.in | Users, registration, login with delayed responses |
| HTTPBin | https://httpbin.org | Request inspection, auth methods, status codes |
| GitHub API | https://api.github.com | Real-world API with authentication |

---

## CI/CD Pipeline Examples

### GitHub Actions for Playwright

| Resource | Description |
|----------|-------------|
| [microsoft/playwright-github-action](https://github.com/microsoft/playwright-github-action) | Official Microsoft action |
| [Playwright CI Docs](https://playwright.dev/docs/ci-intro) | Official CI setup guide |

### Basic Workflow Template

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### Projects with CI/CD Already Configured

| Repository | CI Platform | Features |
|------------|-------------|----------|
| [akshayp7/playwright-typescript-playwright-test](https://github.com/akshayp7/playwright-typescript-playwright-test) | GitHub Actions | Slack notifications, Docker |
| [angelo-loria/playwright-boilerplate](https://github.com/angelo-loria/playwright-boilerplate) | GitHub Actions | Sharding, parallel execution |
| [nareshnavinash/playwright-TS-pom](https://github.com/nareshnavinash/playwright-TS-pom) | GitLab CI | DataDog integration |
| [testsmith-io/api-test-automation-python-pytest-playwright](https://github.com/testsmith-io/api-test-automation-python-pytest-playwright) | GitHub Actions | API testing pipeline |

### Best Practices

- **Run locally first** before pushing to catch issues early
- **Use `ubuntu-latest`** for faster execution and better compatibility
- **Never hardcode secrets** - use GitHub Secrets
- **Upload artifacts** (reports, screenshots) for debugging failures
- **Run headless** in CI for performance

---

## Prompt Engineering & Claude

### Official Anthropic Resources

| Repository | Description | Stars | Key Features |
|------------|-------------|-------|--------------|
| [anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) | Official Anthropic prompt engineering course | - | 9 chapters, hands-on exercises, example playgrounds |
| [aws-samples/prompt-engineering-with-anthropic-claude-v-3](https://github.com/aws-samples/prompt-engineering-with-anthropic-claude-v-3) | AWS Bedrock prompt engineering with Claude | - | 9 chapters, practical exercises, advanced methods |

### Community Resources

| Repository | Description | Use Case |
|------------|-------------|----------|
| [langgptai/awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts) | Curated collection of Claude prompt examples | Prompt templates and inspiration |
| [minipuft/claude-prompts-mcp](https://github.com/minipuft/claude-prompts-mcp) | MCP server for intelligent prompt orchestration | Hot-reload prompt management, framework-driven workflows |

### Documentation & Best Practices

- **[Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)** - Official Anthropic engineering guide
- **[Prompt Engineering Guide](https://www.promptingguide.ai/)** - Comprehensive community resource
- **[GitHub Blog: Prompt Engineering for Developers](https://github.blog/ai-and-ml/generative-ai/prompt-engineering-guide-generative-ai-llms/)** - GitHub's approach to prompt engineering

---

## AI-Powered Test Automation

### Playwright + AI Integration

| Repository | Description | Key Features |
|------------|-------------|--------------|
| [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright) | Playwright MCP Server for AI assistants | Works with Claude Desktop, Cursor, Cline; browser automation via AI |
| [microsoft/playwright](https://github.com/microsoft/playwright) | Official Playwright repository | Cross-browser testing, auto-waiting, tracing |
| [microsoft/playwright-pytest](https://github.com/microsoft/playwright-pytest) | Official pytest plugin for Playwright | Fixtures, headless/headed execution, all browsers |

### Learning & Examples

| Repository | Description | Best For |
|------------|-------------|----------|
| [AutomationPanda/playwright-python-tutorial](https://github.com/AutomationPanda/playwright-python-tutorial) | Step-by-step Python Playwright tutorial | Beginners, comprehensive coverage, parallel testing |
| [jsugg/pytest-vs-jest-test-automation](https://github.com/jsugg/pytest-vs-jest-test-automation) | Comparative analysis: Pytest-Selenium vs Jest-Playwright | Framework comparison, performance reviews |
| [testsmith-io/api-test-automation-python-pytest-playwright](https://github.com/testsmith-io/api-test-automation-python-pytest-playwright) | API testing examples with Playwright | API automation, GitHub Actions CI |
| [nirtal85/Playwright-Python-Example](https://github.com/nirtal85/Playwright-Python-Example) | Playwright Python with pytest and Allure | Allure reporting, real-world patterns |
| [infopulse/Playwright-course-python](https://github.com/infopulse/Playwright-course-python) | 2024 approach to web app test automation | Modern best practices |

### Curated Collections

| Repository | Description |
|------------|-------------|
| [mxschmitt/awesome-playwright](https://github.com/mxschmitt/awesome-playwright) | Community-curated Playwright tools and resources |

**Includes:** CI/CD setups, accessibility checks, Jest/pytest examples, Docker workflows, multi-language resources

---

## Agentic Design Patterns

### Core Pattern Repositories

| Repository | Description | Patterns Covered |
|------------|-------------|------------------|
| [arunpshankar/Agentic-Workflow-Patterns](https://github.com/arunpshankar/Agentic-Workflow-Patterns) | Best practices for agentic workflows in Python | Semantic routing, parallel delegation, modular design |
| [codematrix/agentic-ai-design-patterns](https://github.com/codematrix/agentic-ai-design-patterns) | Collection of agentic AI pattern demonstrations | Full autonomy, parallel processing, human-in-the-loop |
| [neural-maze/agentic-patterns-course](https://github.com/neural-maze/agentic-patterns-course) | Andrew Ng's 4 agentic patterns implemented from scratch | Reflection, Tool Use, Planning, Multi-Agent |
| [ksm26/AI-Agentic-Design-Patterns-with-AutoGen](https://github.com/ksm26/AI-Agentic-Design-Patterns-with-AutoGen) | Multi-agent systems with AutoGen | Agent collaboration, coding agents, tool use |
| [nibzard/awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns) | Curated catalogue of agentic AI patterns | Production-ready patterns, real-world implementations |

### Advanced Agentic Systems

| Repository | Description | Key Features |
|------------|-------------|--------------|
| [HKUDS/DeepCode](https://github.com/HKUDS/DeepCode) | Open Agentic Coding (Paper2Code, Text2Web, Text2Backend) | Code planning agent, code generation agent, surpasses human experts |
| [panaversity/learn-agentic-ai](https://github.com/panaversity/learn-agentic-ai) | Learn Agentic AI with DACA Design Pattern | OpenAI Agents SDK, MCP, A2A, Knowledge Graphs, Kubernetes |

### Research & Exploration

- **[GitHub Next: Agentic Workflows](https://githubnext.com/projects/agentic-workflows/)** - Research demonstrator for repository-level natural language behaviors

---

## Test Automation Frameworks

### Jest (JavaScript)

| Repository | Description |
|------------|-------------|
| [facebook/jest](https://github.com/facebook/jest) | Official Jest testing framework |
| [jest-community/awesome-jest](https://github.com/jest-community/awesome-jest) | Curated list of Jest resources |

### Pytest (Python)

| Repository | Description |
|------------|-------------|
| [pytest-dev/pytest](https://github.com/pytest-dev/pytest) | Official pytest framework |
| [pytest-dev/pytest-bdd](https://github.com/pytest-dev/pytest-bdd) | BDD testing with pytest |

### Cross-Framework Resources

| Repository | Description | Use Case |
|------------|-------------|----------|
| [list4c/playwright-python-testing](https://github.com/list4c/playwright-python-testing) | Template for Playwright + Python automation | Project starter template |

---

## AI Documentation Generation

### Documentation Tools

| Repository | Description | Key Features |
|------------|-------------|--------------|
| [connor-john/ai-docs](https://github.com/connor-john/ai-docs) | Generate documentation with Claude AI | Analyzes codebase, generates structured docs |
| [Wytamma/write-the](https://github.com/Wytamma/write-the) | AI-powered documentation and test generation | Write tests, generate docs, refactor code |
| [fynnfluegge/doc-comments-ai](https://github.com/fynnfluegge/doc-comments-ai) | LLM-powered code documentation generation | OpenAI or local LLMs, treesitter, langchain |
| [mintlify/writer](https://github.com/mintlify/writer) | AI-powered documentation writer | One-click doc generation from code |

### Documentation Services

- **[RepoDoc AI](https://repodoc-ai.dev/)** - Generate BRD, TRD, Test Plans from GitHub repos
- **[DocuWriter.ai](https://www.docuwriter.ai/)** - Automated documentation that syncs with code changes

---

## MCP (Model Context Protocol)

### Browser Automation

| Repository | Description | Compatible With |
|------------|-------------|-----------------|
| [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright) | Playwright automation via MCP | Claude Desktop, Cursor, Cline |

### VS Code Installation
```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["@executeautomation/playwright-mcp-server"]}'
```

### Related Articles

- [Claude as tester using Playwright and GitHub MCP](https://madewithlove.com/blog/claude-as-tester-using-playwright-and-github-mcp/)
- [Generating E2E tests with AI and Playwright MCP](https://www.checklyhq.com/blog/generate-end-to-end-tests-with-ai-and-playwright/)
- [Modern Test Automation with AI and Playwright MCP](https://kailash-pathak.medium.com/modern-test-automation-with-ai-llm-and-playwright-mcp-model-context-protocol-0c311292c7fb)

---

## Additional Resources

### GitHub Topics to Explore

Browse these GitHub topics for more repositories:

- [ai-testing](https://github.com/topics/ai-testing)
- [playwright-testing](https://github.com/topics/playwright-testing)
- [agentic-coding](https://github.com/topics/agentic-coding)
- [ai-documentation](https://github.com/topics/ai-documentation)
- [ai-code-generation](https://github.com/topics/ai-code-generation)
- [automated-documentation](https://github.com/topics/automated-documentation)

### Learning Platforms

| Resource | Description |
|----------|-------------|
| [DeepLearning.AI](https://www.deeplearning.ai/) | Andrew Ng's courses on agentic AI patterns |
| [Try Playwright](https://try.playwright.tech/) | Interactive Playwright playground |
| [playwrightsolutions.com](https://playwrightsolutions.com/) | Curated Playwright problems and solutions |

### Integration Frameworks

| Repository | Description |
|------------|-------------|
| [cucumber/cucumber-js](https://github.com/cucumber/cucumber-js) | BDD testing with Cucumber |
| [serenity-js/serenity-js](https://github.com/serenity-js/serenity-js) | Screenplay Pattern for Playwright |

---

## How to Use These References

### For Course Development
1. Study the **Prompt Engineering** repositories for context engineering examples
2. Reference **Agentic Patterns** for Module 8 content
3. Use **Test Automation** examples for exercise development

### For Students
1. Clone interesting repositories for hands-on practice
2. Study code patterns and architecture decisions
3. Contribute back to open-source projects

### For Instructors
1. Use repositories as demonstration materials
2. Create exercises based on real-world patterns
3. Keep content updated with latest best practices

---

## Contributing

Found a useful repository? Add it to this list by:
1. Ensuring it's relevant to AI-assisted QA automation
2. Verifying it's actively maintained
3. Adding it to the appropriate category with description

---

## License

This reference list is part of the QA Automation with AI course materials.
See the main repository LICENSE for details.

---

*Last Updated: November 2025*
