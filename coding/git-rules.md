# Git and Version Control Rules

Rules for AI agents when working with Git and version control systems.

## Commit Messages

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, no code change
- `refactor`: Code restructuring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add password reset functionality

Implement password reset flow with email verification.
Includes new API endpoint and email templates.

Closes #123
```

```
fix(api): handle null response from external service

The external API occasionally returns null instead of
an empty array. This change adds proper null checking.

Fixes #456
```

## Branching Strategy

### Branch Naming
```
feature/description-of-feature
bugfix/description-of-bug
hotfix/critical-fix-description
release/version-number
docs/documentation-update
```

### Branch Workflow
1. Create branch from main/develop
2. Make changes with atomic commits
3. Keep branch up to date with base
4. Open pull request when ready
5. Address review feedback
6. Merge after approval
7. Delete branch after merge

## Pull Requests

### PR Title Format
```
[Type] Brief description of changes
```

### PR Description Template
```markdown
## Summary
Brief description of what this PR does.

## Changes
- Change 1
- Change 2
- Change 3

## Testing
Describe how to test these changes.

## Related Issues
Closes #123
Related to #456

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## Best Practices

### Do
- Make atomic commits (one logical change per commit)
- Write meaningful commit messages
- Pull/rebase frequently
- Review your own changes before pushing
- Use `.gitignore` appropriately

### Don't
- Commit sensitive data (secrets, keys, passwords)
- Commit build artifacts or dependencies
- Force push to shared branches
- Commit broken code to main/develop
- Use merge commits when rebasing is cleaner

## Git Commands Reference

### Daily Operations
```bash
# Check status
git status

# Stage changes
git add <file>
git add .

# Commit
git commit -m "type: message"

# Push
git push origin <branch>

# Pull latest
git pull origin <branch>

# Create branch
git checkout -b <branch-name>

# Switch branch
git checkout <branch-name>
```

### Undoing Changes
```bash
# Unstage file
git reset HEAD <file>

# Discard local changes
git checkout -- <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Viewing History
```bash
# View log
git log --oneline -10

# View changes
git diff

# View file history
git log -p <file>
```

## .gitignore Best Practices

### Common Patterns
```gitignore
# Dependencies
node_modules/
vendor/
venv/

# Build outputs
dist/
build/
*.o
*.pyc

# IDE/Editor
.idea/
.vscode/
*.swp

# Environment
.env
.env.local

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db
```

## Sensitive Data

### Never Commit
- API keys and secrets
- Passwords and credentials
- Private SSH keys
- Personal access tokens
- Database connection strings
- Environment files with secrets

### If Accidentally Committed
1. Remove the file from repo
2. Add to .gitignore
3. Rotate the exposed credentials immediately
4. Consider using git-filter-branch or BFG to remove from history
5. Force push (if allowed) or contact repo admin
