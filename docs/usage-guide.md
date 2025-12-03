# Usage Guide

This guide explains how to use the rules.d collection in your AI-assisted workflows.

## Quick Start

### 1. Choose Your Rules

Browse the repository to find rules relevant to your task:

| Task Type | Recommended Rules |
|-----------|-------------------|
| General AI operations | `general/rules.md` |
| Development work | `general/rules.md` + `coding/rules.md` |
| Python development | Add `coding/python-rules.md` |
| JavaScript/TypeScript | Add `coding/javascript-typescript-rules.md` |
| Version control | Add `coding/git-rules.md` |
| Writing/Documentation | `general/rules.md` + `writing/rules.md` |
| Research tasks | `general/rules.md` + `research/rules.md` |
| Project management | `general/rules.md` + `project-management/rules.md` |
| Security-focused work | Add `security/rules.md` |
| DevOps/Infrastructure | `general/rules.md` + `devops/rules.md` |

### 2. Reference Rules in Your Prompts

Include the relevant rules files in your AI agent prompts:

```markdown
Please follow the rules in:
- rules.d/general/rules.md
- rules.d/coding/rules.md
- rules.d/coding/python-rules.md

Task: [Your specific task here]
```

## Integration Methods

### Method 1: Direct Reference

Reference rule files directly in your prompts or system instructions:

```markdown
Follow these rules for this task:
[Copy and paste relevant rules here]
```

### Method 2: File Path Reference

For AI tools that can read files, reference by path:

```markdown
Read and follow the rules in: /path/to/rules.d/general/rules.md
```

### Method 3: Repository Clone

Clone the repository and reference locally:

```bash
git clone https://github.com/cbwinslow/rules.d.git
```

### Method 4: Symbolic Links

Create symbolic links to rules in your project:

```bash
ln -s /path/to/rules.d ./rules
```

## Tool-Specific Integration

### GitHub Copilot

Create an `agents.md` file in your project root:

```markdown
# AI Agent Instructions

Follow the rules documented in the rules.d/ directory.

Key rules to observe:
- [Include summary of important rules]
```

### Cursor IDE

Place rules in `.cursor/rules/` directory:

```bash
mkdir -p .cursor/rules
cp rules.d/general/rules.md .cursor/rules/general.md
cp rules.d/coding/rules.md .cursor/rules/coding.md
```

### Claude

Reference in your conversation or system prompt:

```markdown
You are an AI assistant. Please follow these behavioral rules:

[Paste relevant rules]
```

### Other AI Tools

Most AI tools support reading instructions. Include rules in:
- System prompts
- Context files
- Project documentation

## Customization

### Extending Rules

Create project-specific rules that extend the base rules:

```markdown
# Project-Specific Rules

These rules extend the base rules in rules.d/

## Additional Coding Standards
- Use TypeScript strict mode
- All functions must have JSDoc comments
- Maximum file length: 300 lines

## Project Conventions
- Component files go in src/components/
- Utility functions go in src/utils/
- Tests go in __tests__/ directories
```

### Overriding Rules

When project needs differ from base rules:

```markdown
# Project Overrides

The following rules override the defaults in rules.d/

## Override: Line Length
- This project uses 120 character line length (not 80)
- Rationale: Team preference for longer lines

## Override: Commit Format
- This project does not require issue references
- Simple descriptive messages are acceptable
```

### Combining Rule Sets

Create composite rule files for common combinations:

```markdown
# Full Stack Development Rules

This document combines rules for full-stack development.

## Included Rule Sets
1. general/rules.md - Core behavioral rules
2. coding/rules.md - General coding standards
3. coding/javascript-typescript-rules.md - JS/TS specifics
4. coding/git-rules.md - Version control
5. security/rules.md - Security practices

[Summary of key points from each]
```

## Best Practices

### DO
- ✅ Start with `general/rules.md` for all tasks
- ✅ Add domain-specific rules as needed
- ✅ Keep rule references concise in prompts
- ✅ Update rules based on experience
- ✅ Customize rules for project needs

### DON'T
- ❌ Include all rules for every task
- ❌ Contradict rules without documenting why
- ❌ Forget to update project-specific rules
- ❌ Use outdated versions of rules

## Workflow Examples

### Example 1: Code Review

```markdown
Please follow the rules in:
- rules.d/general/rules.md
- rules.d/coding/rules.md
- rules.d/security/rules.md

Task: Review this pull request for issues:
[PR details]
```

### Example 2: Documentation Writing

```markdown
Please follow the rules in:
- rules.d/general/rules.md
- rules.d/writing/rules.md

Task: Create API documentation for:
[API endpoint details]
```

### Example 3: Research Task

```markdown
Please follow the rules in:
- rules.d/general/rules.md
- rules.d/research/rules.md
- rules.d/writing/rules.md

Task: Research and summarize:
[Research topic]
```

## Troubleshooting

### Rules Not Being Followed

1. **Check rule visibility**: Ensure the AI can access the rules
2. **Simplify rule count**: Too many rules can dilute focus
3. **Prioritize key rules**: Emphasize most important rules
4. **Provide examples**: Show what following rules looks like

### Conflicting Rules

1. Document which rule takes precedence
2. Create project-specific overrides
3. Consolidate rules to avoid conflicts

### Rules Too Restrictive

1. Start with fewer rules
2. Add rules as needed
3. Create project-specific relaxations

## Feedback and Improvement

Help improve these rules:

1. **Report issues**: Open issues for unclear rules
2. **Suggest improvements**: Submit pull requests
3. **Share use cases**: Help expand documentation
4. **Contribute examples**: Add real-world usage examples
