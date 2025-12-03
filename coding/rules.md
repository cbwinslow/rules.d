# Coding Rules for AI Agents

Comprehensive rules for AI agents when writing, reviewing, or modifying code.

## Core Development Principles

### 1. Code Quality
- Write clean, readable, and maintainable code
- Follow the principle of least surprise
- Prefer explicit over implicit behavior
- Keep functions small and focused
- Use meaningful variable and function names

### 2. Consistency
- Follow existing code style and conventions in the project
- Use the project's linter and formatter configurations
- Match patterns already established in the codebase
- Maintain consistent naming conventions

### 3. Testing
- Write tests for new functionality
- Maintain or improve existing test coverage
- Test edge cases and error conditions
- Run tests before committing changes

## Language-Specific Rules

### Python
```python
# Follow PEP 8 style guidelines
# Use type hints for function signatures
# Use docstrings for public functions
# Prefer f-strings for string formatting
# Use context managers for resources
```

### JavaScript/TypeScript
```javascript
// Use const by default, let when needed, never var
// Use async/await over raw promises
// Prefer arrow functions for callbacks
// Use TypeScript when available
// Handle errors properly in async code
```

### General
- Use the language's idiomatic patterns
- Leverage standard library before external dependencies
- Follow security best practices for the language

## Code Review Rules

### When Reviewing
1. Check for logical correctness first
2. Verify error handling is complete
3. Look for potential security issues
4. Assess performance implications
5. Evaluate readability and maintainability
6. Ensure tests are adequate

### When Being Reviewed
1. Respond to all feedback
2. Explain reasoning for decisions
3. Make requested changes promptly
4. Ask for clarification if needed

## Version Control Rules

### Commits
- Write clear, descriptive commit messages
- Make atomic commits (one logical change per commit)
- Reference issue numbers when applicable
- Never commit sensitive data (keys, passwords, etc.)

### Commit Message Format
```
type(scope): brief description

Detailed explanation if needed

Refs: #issue-number
```

Types: feat, fix, docs, style, refactor, test, chore

### Branches
- Use descriptive branch names
- Keep branches focused on single features/fixes
- Rebase/merge from main regularly
- Delete branches after merging

## Error Handling Rules

1. Handle all foreseeable errors
2. Use appropriate error types
3. Include helpful error messages
4. Log errors with context
5. Fail fast when appropriate
6. Never swallow errors silently

## Documentation Rules

### Code Comments
- Comment "why" not "what"
- Keep comments up to date
- Remove commented-out code
- Use TODO/FIXME with context

### External Documentation
- Update README for significant changes
- Document APIs and public interfaces
- Include examples where helpful
- Keep documentation in sync with code

## Security Rules

1. Never hardcode credentials
2. Validate all inputs
3. Sanitize outputs appropriately
4. Use parameterized queries
5. Follow least privilege principle
6. Keep dependencies updated
7. Use secure defaults

## Performance Rules

1. Optimize for readability first
2. Profile before optimizing
3. Consider algorithmic complexity
4. Avoid premature optimization
5. Cache appropriately
6. Be mindful of memory usage

## Dependency Management

1. Prefer well-maintained packages
2. Check for security vulnerabilities
3. Pin dependency versions
4. Minimize dependencies when possible
5. Document why dependencies are needed
6. Update dependencies regularly

## Debugging Rules

1. Reproduce the issue first
2. Use proper debugging tools
3. Check logs and error messages
4. Isolate the problem
5. Verify the fix works
6. Add tests to prevent regression

## Code Organization

### Files and Folders
- One concept per file
- Logical folder structure
- Consistent file naming
- Separate concerns appropriately

### Functions and Classes
- Single responsibility principle
- Clear inputs and outputs
- Minimal side effects
- Proper encapsulation

## Refactoring Rules

1. Have tests before refactoring
2. Make small, incremental changes
3. Verify behavior after each change
4. Don't mix refactoring with features
5. Update tests as needed
6. Document significant restructuring
