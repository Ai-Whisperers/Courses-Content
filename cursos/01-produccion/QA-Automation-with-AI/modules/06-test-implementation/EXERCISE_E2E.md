# Exercise 10: E2E Testing with Playwright

## Objective

Generate and implement end-to-end tests using Playwright with AI assistance.

## Duration: 2.5 hours

---

## Setup

```bash
mkdir e2e-testing-lab
cd e2e-testing-lab
npm init -y
npm install @playwright/test
npx playwright install
```

### Application Under Test

We'll test a sample todo application. Create `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <style>
    body { font-family: Arial; max-width: 600px; margin: 50px auto; }
    .todo-item { display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #eee; }
    .todo-item.completed span { text-decoration: line-through; color: #888; }
    .todo-item input[type="checkbox"] { margin-right: 10px; }
    .todo-item button { margin-left: auto; }
    #new-todo { width: 70%; padding: 10px; }
    #add-btn { padding: 10px 20px; }
    .filters { margin: 20px 0; }
    .filters button { margin-right: 10px; }
    .filters button.active { font-weight: bold; }
    #clear-completed { float: right; }
    #todo-count { color: #666; }
  </style>
</head>
<body>
  <h1>Todo List</h1>

  <div>
    <input type="text" id="new-todo" placeholder="What needs to be done?">
    <button id="add-btn">Add</button>
  </div>

  <div class="filters">
    <button class="active" data-filter="all">All</button>
    <button data-filter="active">Active</button>
    <button data-filter="completed">Completed</button>
    <button id="clear-completed">Clear Completed</button>
  </div>

  <div id="todo-list"></div>

  <div id="todo-count">0 items left</div>

  <script>
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    let filter = 'all';

    function render() {
      const list = document.getElementById('todo-list');
      const filtered = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      });

      list.innerHTML = filtered.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
          <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
          <span>${todo.text}</span>
          <button onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
      `).join('');

      const active = todos.filter(t => !t.completed).length;
      document.getElementById('todo-count').textContent =
        `${active} item${active !== 1 ? 's' : ''} left`;

      localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodo() {
      const input = document.getElementById('new-todo');
      const text = input.value.trim();
      if (!text) return;

      todos.push({
        id: Date.now(),
        text,
        completed: false
      });

      input.value = '';
      render();
    }

    function toggleTodo(id) {
      todos = todos.map(t =>
        t.id === id ? {...t, completed: !t.completed} : t
      );
      render();
    }

    function deleteTodo(id) {
      todos = todos.filter(t => t.id !== id);
      render();
    }

    document.getElementById('add-btn').addEventListener('click', addTodo);
    document.getElementById('new-todo').addEventListener('keypress', e => {
      if (e.key === 'Enter') addTodo();
    });

    document.querySelectorAll('.filters button[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        document.querySelectorAll('.filters button[data-filter]').forEach(b =>
          b.classList.remove('active')
        );
        btn.classList.add('active');
        render();
      });
    });

    document.getElementById('clear-completed').addEventListener('click', () => {
      todos = todos.filter(t => !t.completed);
      render();
    });

    render();
  </script>
</body>
</html>
```

---

## Part 1: Page Object Model (45 min)

### Task

Generate a Page Object Model for the todo application.

### Prompt

```
Create a Playwright Page Object Model for this todo application:

[Paste HTML]

Include:
1. TodoPage class with:
   - Selectors as properties
   - Methods for all actions
   - Helper methods for common operations

2. Methods needed:
   - navigate()
   - addTodo(text)
   - toggleTodo(index)
   - deleteTodo(index)
   - filterBy(filter: 'all' | 'active' | 'completed')
   - clearCompleted()
   - getTodoCount()
   - getTodoTexts()
   - isTodoCompleted(index)

3. Use Playwright best practices:
   - Locator-based selectors
   - Auto-waiting
   - Descriptive method names

Output TypeScript file: pages/TodoPage.ts
```

### Deliverable

- `pages/TodoPage.ts`

---

## Part 2: Core E2E Tests (45 min)

### Task

Generate comprehensive E2E tests using the Page Object.

### Prompt

```
Generate Playwright E2E tests using this Page Object:

[Paste TodoPage.ts]

Test scenarios:

1. Adding todos:
   - Add single todo
   - Add multiple todos
   - Add with Enter key
   - Cannot add empty todo
   - Todo appears in list

2. Completing todos:
   - Toggle todo complete
   - Toggle back to active
   - Completed todo has strikethrough
   - Count updates correctly

3. Deleting todos:
   - Delete single todo
   - Delete all todos
   - Deleted todo removed from list

4. Filtering:
   - Show all todos
   - Show active only
   - Show completed only
   - Filter persists after adding

5. Clear completed:
   - Removes only completed
   - Active todos remain
   - Count updates

6. Persistence:
   - Todos persist after reload
   - Completed state persists
   - Filter resets after reload

Use:
- describe blocks for grouping
- beforeEach for setup
- Specific assertions
- Visual verification where appropriate
```

### Deliverable

- `tests/todo.spec.ts`

---

## Part 3: Visual and Accessibility Tests (30 min)

### Task

Add visual regression and accessibility tests.

### Prompt

```
Add these test types for the todo application:

1. Visual Regression Tests:
   - Empty state screenshot
   - With items screenshot
   - Completed items screenshot
   - Comparison test

2. Accessibility Tests:
   - Check for ARIA labels
   - Keyboard navigation
   - Focus management
   - Color contrast (where possible)

3. Responsive Tests:
   - Mobile viewport
   - Tablet viewport
   - Desktop viewport

Use Playwright's built-in capabilities:
- toHaveScreenshot()
- accessibility snapshot
- viewport settings
```

### Deliverable

- `tests/visual.spec.ts`
- `tests/accessibility.spec.ts`

---

## Part 4: Advanced Scenarios (30 min)

### Task

Test complex user journeys and edge cases.

### Prompt

```
Generate tests for these advanced scenarios:

1. User Journey: Task Management
   - User adds 5 tasks
   - Completes 3 tasks
   - Filters to see active
   - Deletes one active
   - Clears completed
   - Verifies final state

2. Edge Cases:
   - Very long todo text
   - Special characters in todo
   - HTML injection attempt
   - XSS attempt
   - Many todos (50+)
   - Rapid add/delete

3. Error Recovery:
   - Local storage full
   - Local storage disabled
   - Corrupted local storage data

4. Performance:
   - Page load time < 2s
   - Add todo < 100ms
   - Filter change < 50ms

Include:
- Setup/teardown for each scenario
- Assertions at each step
- Performance measurements
```

### Deliverable

- `tests/advanced.spec.ts`

---

## Part 5: Playwright Configuration (20 min)

### Task

Configure Playwright for optimal test execution.

### Prompt

```
Create an optimal playwright.config.ts with:

1. Multiple browsers (Chrome, Firefox, Safari)
2. Mobile device emulation
3. Screenshot on failure
4. Video on failure
5. Trace on retry
6. Parallel execution
7. Retries for flaky tests
8. CI-specific configuration
9. Reporter configuration
10. Base URL handling

Include comments explaining each setting.
```

### Deliverable

- `playwright.config.ts`

---

## Submission

### Files

```
e2e-testing-lab/
├── pages/
│   └── TodoPage.ts
├── tests/
│   ├── todo.spec.ts
│   ├── visual.spec.ts
│   ├── accessibility.spec.ts
│   └── advanced.spec.ts
├── playwright.config.ts
└── index.html
```

### Test Requirements

- All tests passing
- Screenshots generated
- Report generated
- Multiple browsers tested

### Grading

| Criterion | Points |
|-----------|--------|
| Page Object quality | 25 |
| Core test coverage | 25 |
| Visual/A11y tests | 20 |
| Advanced scenarios | 20 |
| Configuration | 10 |

---

## Tips

- Use `npx playwright test --ui` for debugging
- Use `npx playwright codegen` to record actions
- Use `--project=chromium` to run single browser
- Check `playwright-report/index.html` for results

---

## Bonus Challenge

1. Add API mocking for backend tests
2. Implement custom fixtures
3. Add test data factories
4. Create GitHub Actions workflow for E2E tests

---

*Good luck!*
