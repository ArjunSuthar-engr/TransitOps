# AI Prompts Template Repository

Use these prompt structures when working with AI coding assistants to maintain code quality, styling, and architectural alignment.

---

## React Component Generation

```text
Create a functional React component named [ComponentName] using TypeScript.
- Follow Tailwind CSS styling principles.
- Put the component in `src/components/[ComponentName].tsx`.
- Use TypeScript interfaces for props.
- Do not add mock styles; use existing Tailwind utility classes.
- Ensure the component is fully responsive and accessible.
```

---

## Express Route Generation

```text
Generate an Express route for [Resource Name] inside `backend/src/routes/[resource].js`.
- It should map the following REST endpoints: [Endpoints, e.g., GET /api/users, POST /api/users].
- It should use controllers imported from `backend/src/controllers/[resource]Controller.js`.
- Include appropriate validation middleware.
- Adhere to the API contract error format: { success: false, error: { message, code } }.
```

---

## SQL Schema Generation

```text
Generate a MySQL migration script for table `[TableName]` under `database/migrations/[timestamp]_[name].sql`.
- Follow our naming conventions: snake_case for columns/tables, singular_table_name_id for foreign keys.
- Include columns: id (INT AUTO_INCREMENT PRIMARY KEY), [custom columns], created_at/updated_at timestamps.
- Add foreign key constraints explicitly with ON DELETE CASCADE where appropriate.
```

---

## Bug Fixing

```text
Debug the following issue: [describe bug/error message].
Here is the context of the related file:
[paste file content or relevant lines]
- Diagnose the root cause.
- Provide a precise diff of the fix.
- Ensure no side effects are introduced to other functions.
```

---

## Refactoring

```text
Refactor the following code block to improve readability, performance, or scalability:
[paste code block]
- Do not modify external APIs or contracts.
- Follow ES6+ features and best TypeScript/JavaScript practices.
- Add comments explaining the performance or architectural improvements.
```
