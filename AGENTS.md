# AI Coding Instructions (AGENTS.md)

This file details instructions, project setup, rules, and style guides for AI coding assistants working on this repository.

---

## Project Overview
* **Frontend**: React (v19) + Vite + TypeScript
* **Backend**: Express (Node.js)
* **Database**: MySQL (using `mysql2` driver)
* **Styling**: Tailwind CSS (v4)
* **HTTP Client**: Axios

---

## Project Structure
* **`frontend/`**: The React single-page app. Source files are under `frontend/src/` with aliases configured for `@/` pointing to `frontend/src/`.
* **`backend/`**: Express server. Startup code is in `backend/server.js` and configurations, controllers, middleware, models, routes, and services are under `backend/src/`.
* **`database/`**: Space reserved for MySQL database design files, schemas, and migrations.
* **`docs/`**: Reference guides, API contracts, database structures, and prompting conventions.

---

## Development Rules
* **Strict Scope**: Never modify files unrelated to the requested change. Keep changes minimal and focused.
* **Reuse Abstractions**: Reuse existing components, helper functions, and services before creating new ones.
* **React**: Prefer functional React components with hooks.
* **Path Aliases**: Always use the `@/` import alias instead of relative paths for imports under `src/` (e.g., `@/components/Navbar` instead of `../../components/Navbar`).
* **Express Architecture**: Keep controllers thin. Extract business logic into services and database queries into models.
* **Database Separation**: SQL access and query logic must remain separated from Express routing layers.
* **Dependencies**: Do not install new npm packages unless explicitly requested by the user.

---

## Git Rules
* **Branching**: Never modify or push directly to `main` (or `master`). Always work on feature-specific branches.
* **Commits**: Keep commits small, atomic, and focused on a single change. Follow the commit prefix rules (e.g., `feat(scope):`, `fix(scope):`).

---

## Code Style
* **Naming**: Use descriptive, self-documenting variable and function names.
* **Function Size**: Keep functions small and focused on a single responsibility.
* **DRY**: Avoid duplicate code blocks. Abstract common behaviors when appropriate.
* **Simplicity**: Prefer clear, readable code over clever or overly optimized designs.

---

## Before Finishing
Before completing any task, verify that:
1. The project builds successfully (`npm run build` in the frontend succeeds).
2. There are no TypeScript compiler or syntax errors (`npx tsc --noEmit` yields no warnings/errors).
3. There are no unused imports, variables, or functions.
4. No secrets, passwords, or credentials are added to the git-tracked files.
