# AI Coding Instructions (AGENTS.md)

This file details instructions, project setup, rules, and style guides for AI coding assistants working on this repository.

---

## Project Overview
* **Frontend**: React (v19) + Vite + TypeScript
* **Styling**: Tailwind CSS (v4)
* **Database & Auth**: Supabase (PostgreSQL)

> [!NOTE]
> The repository contains a `backend` folder containing an unused Express/MySQL scaffold. This is not part of the active runtime architecture and should not be modified, running, or documented as part of the live stack.

---

## Project Structure
* **`frontend/`**: The React single-page app. Source files are under `frontend/src/` with aliases configured for `@/` pointing to `frontend/src/`.
* **`supabase/`**: Local Supabase CLI configurations.
* **`database/`**: Space reserved for Supabase schema SQL and test seed SQL files.
* **`docs/`**: Reference guides, database structures, and prompting conventions.

---

## Development Rules
* **Strict Scope**: Never modify files unrelated to the requested change. Keep changes minimal and focused.
* **Reuse Abstractions**: Reuse existing components, helper functions, and services before creating new ones.
* **React**: Prefer functional React components with hooks.
* **Path Aliases**: Always use the `@/` import alias instead of relative paths for imports under `src/` (e.g., `@/components/Navbar` instead of `../../components/Navbar`).
* **Application Layer**: 
  * All application and query logic lives inside:
    - `frontend/src/services`
    - `frontend/src/hooks`
    - `frontend/src/utils`
  * React components must **never** communicate directly with Supabase. They must always use the service layer.
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
