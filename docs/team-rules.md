# Team Rules & Git Workflow

To ensure smooth pair/group programming during the hackathon, please follow these rules:

1. **Protect the Main Branch**
   * Never commit or push directly to `main` (or `master`).
   * Develop features on dedicated branches (e.g., `feature/login`, `bugfix/api-error`).

2. **Always Keep Up to Date**
   * Pull the latest changes from the remote repository before starting any session or writing new code.
   * `git pull origin main` frequently to resolve merge conflicts early.

3. **Atomic & Clean Commits**
   * Keep commits small, focused, and descriptive.
   * Write clear commit messages (e.g., `feat: add user login form`, `fix: correct database connection timeout`).

4. **Coordinate Work**
   * Do not modify another teammate's active feature files or routes without prior communication and alignment.
   * Assign tasks or declare what files you are working on to avoid conflicts.

5. **Build Check**
   * Ensure that the project builds locally and has no TypeScript or compilation errors before committing/pushing.
   * Run typechecks and tests where applicable.
