# Contributing Guidelines

Welcome to the hackathon project! To keep development fast, clean, and conflict-free, please follow these guidelines.

---

## 1. Branch Strategy

We use a lightweight branching strategy to coordinate work among our 3-person team:

```text
main (Production-ready code)
│
└── develop (Integration & testing branch)
     ├── feature/auth (Authentication development)
     ├── feature/dashboard (Dashboard UI/API)
     └── feature/database (Database schemas, migrations & seeding)
```

### Branch Descriptions
* **`main`**: The source of truth. Contains stable, production-ready code. No direct commits are allowed here.
* **`develop`**: The main integration branch. All feature branches merge into `develop` first. This branch must always remain in a buildable state.
* **`feature/*`**: Individual feature branches created from `develop` (e.g., `feature/auth`, `feature/dashboard`, `feature/database`). These are merged back into `develop` via Pull Requests.

---

## 2. Commit Message Format

We follow a clean, structured commit naming convention. This helps track changes quickly.

### Format
`<type>(<scope>): <short description>`

* **`feat`**: A new feature (e.g., `feat(auth): add login page`)
* **`fix`**: A bug fix (e.g., `fix(ui): navbar alignment`)
* **`refactor`**: Code restructuring without changing behavior (e.g., `refactor(db): simplify queries`)
* **`docs`**: Documentation changes only (e.g., `docs: update api contract`)
* **`style`**: Formatting, missing semi-colons, etc. (no production code change)

### Examples
* `feat(auth): add login page`
* `feat(api): create user routes`
* `fix(ui): navbar alignment`
* `refactor(db): simplify queries`
* `docs: update api contract`

---

## 3. Pull Request Checklist

When submitting a pull request to `develop`:
- [ ] The code runs locally without issues.
- [ ] The build succeeds (`npm run build` or equivalent).
- [ ] Merge conflicts are resolved before requesting review.
- [ ] Changes are reviewed or communicated with the team.

---

## 4. Coding Conventions
* **Linter**: Run `npm run lint` (using Oxlint) to fix structural code style errors.
* **TypeScript**: Use strong typing where possible; avoid `any`.
* **Tailwind**: Follow standard Tailwind v4 utility styles. Avoid writing custom inline CSS.

---

## 5. AI Usage Guidelines
* **Use Prompts Repository**: Check [`docs/prompts.md`](file:///c:/Users/Janak/Documents/Arjun/hackathon-project/docs/prompts.md) for standard reusable prompts.
* **No Blind Copy-Pasting**: Always review and understand generated code before adding it to features.
* **Verify Types**: Ensure AI-generated code passes TypeScript typechecks.

---

## 6. "Before Every Commit" Checklist

Always complete these checks before running `git commit`:

1. **Pull Latest Changes**: Ensure you run `git pull origin develop` (or current target) to integrate others' work first.
2. **Ensure Project Builds**: Run TypeScript compilation / build commands to verify no syntax or type errors.
3. **Clean Logs**: Remove accidental `console.log` statements (unless intentionally kept for debugging).
4. **No Secrets**: Never commit API keys, database passwords, or `.env` files (these should be ignored by `.gitignore`).
5. **Update Docs**: If API routes or database schemas have been changed, update the documentation in the `/docs` folder.
