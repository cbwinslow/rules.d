# Contributing to rules.d

Thank you for your interest in contributing to the rules.d collection! This document provides guidelines for contributing new rules, improving existing ones, and maintaining quality across the repository.

## Ways to Contribute

### 1. Add New Rules

Create new rule files for domains not yet covered or expand existing categories.

### 2. Improve Existing Rules

- Clarify unclear instructions
- Add missing examples
- Fix errors or outdated information
- Improve formatting and readability

### 3. Report Issues

- Identify unclear or conflicting rules
- Suggest improvements
- Report bugs in documentation

### 4. Share Use Cases

- Contribute examples of rules in action
- Add integration guides for specific tools
- Share feedback on rule effectiveness

## Getting Started

### 1. Fork the Repository

```bash
# Fork via GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/rules.d.git
cd rules.d
```

### 2. Create a Branch

```bash
git checkout -b feature/your-contribution
```

### 3. Make Your Changes

Follow the guidelines below for different types of contributions.

### 4. Submit a Pull Request

- Push your changes to your fork
- Create a pull request against the main repository
- Fill out the PR template with relevant details

## Contribution Guidelines

### Adding New Rule Files

#### Step 1: Choose the Right Category

Place your rule file in the appropriate directory:

| Directory | Use Case |
|-----------|----------|
| `general/` | Universal rules, core behaviors |
| `coding/` | Software development practices |
| `writing/` | Content creation, documentation |
| `research/` | Research methodology |
| `communication/` | Professional communications |
| `data/` | Data analysis and processing |
| `project-management/` | Project planning and execution |
| `security/` | Security practices |
| `devops/` | CI/CD, infrastructure |

#### Step 2: Follow the Standard Format

Use the format documented in `docs/rule-format.md`:

```markdown
# Rule Title

Brief description of what this rule file covers.

---

**Category**: [category-name]  
**Version**: 1.0.0  
**Last Updated**: YYYY-MM-DD  
**Tags**: [tag1], [tag2]

---

## Purpose
[Why this rule exists]

## Rules
[The actual rules]

## Examples
[Code or practical examples]

## Related Rules
[Links to related files]
```

#### Step 3: Name Your File

- Use lowercase letters and hyphens
- Be descriptive but concise
- Use `.md` extension
- Examples:
  - `rust-rules.md`
  - `code-review-rules.md`
  - `api-design-rules.md`

### Improving Existing Rules

#### Minor Changes

For typos, clarifications, and small fixes:
- Make the change directly
- Commit with a clear message
- Submit a PR

#### Major Changes

For significant restructuring or new content:
1. Open an issue first to discuss
2. Get feedback from maintainers
3. Make changes incrementally
4. Update version number if applicable

### Writing Quality Rules

#### Be Specific

```markdown
# ❌ Too Vague
- Write good code

# ✅ Specific and Actionable
- Functions should be no longer than 30 lines
- Each function should have a single responsibility
- Use descriptive names that indicate the function's purpose
```

#### Be Practical

```markdown
# ❌ Theoretical Only
Use design patterns appropriately.

# ✅ Practical with Examples
Use the Factory pattern when:
- You need to create objects without specifying exact classes
- The creation process is complex

Example:
```python
def create_handler(type: str) -> Handler:
    handlers = {"file": FileHandler, "db": DatabaseHandler}
    return handlers.get(type)()
```
```

#### Be Consistent

Match the tone, style, and formatting of existing rules in the repository.

### Documentation Standards

#### Required Sections

Every rule file must have:
- Title and description
- Purpose section
- Actual rules
- At least one example

#### Optional Sections

Include when relevant:
- Related rules
- External references
- Troubleshooting
- FAQ

### Commit Message Format

Use clear, descriptive commit messages:

```
type(scope): brief description

Detailed explanation if needed

Refs: #issue-number
```

**Types**:
- `feat`: New rules or features
- `fix`: Corrections to existing rules
- `docs`: Documentation improvements
- `style`: Formatting changes
- `refactor`: Rule restructuring
- `test`: Test-related changes

**Examples**:
```
feat(coding): add Rust-specific rules

Add comprehensive rules for Rust development including:
- Memory safety guidelines
- Error handling patterns
- Cargo best practices

Refs: #42
```

```
fix(security): clarify password hashing recommendations

Update to recommend Argon2id over bcrypt for new projects
based on current security best practices.
```

## Review Process

### What We Look For

1. **Accuracy**: Rules should be correct and up-to-date
2. **Clarity**: Instructions should be clear and unambiguous
3. **Consistency**: Follow existing patterns and conventions
4. **Completeness**: Include necessary context and examples
5. **Practicality**: Rules should be usable in real scenarios

### Review Timeline

- Initial review within 3-5 business days
- Feedback addressed within conversation
- Merge upon approval

### Feedback Expectations

Reviewers may request:
- Additional examples
- Clarification of vague points
- Formatting adjustments
- Consolidation with existing rules

## Code of Conduct

### Be Respectful

- Treat all contributors with respect
- Provide constructive feedback
- Welcome newcomers

### Be Collaborative

- Work together on improvements
- Share knowledge freely
- Credit contributions appropriately

### Be Patient

- Not everyone has the same experience level
- Changes may take time to review
- Complex decisions need discussion

## Questions?

- Open an issue for questions about contributing
- Tag issues with `question` label
- Check existing issues for answers

## Recognition

All contributors are appreciated! Significant contributors may be:
- Listed in repository acknowledgments
- Invited to become maintainers
- Credited in release notes

Thank you for helping improve rules.d! 🎉
