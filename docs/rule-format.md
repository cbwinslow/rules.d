# Rule File Format Guide

This document describes the standard format for writing rule files in this repository.

## File Structure

Each rule file should follow this consistent structure:

```markdown
# Rule Title

Brief description of what this rule file covers (1-2 sentences).

---

**Category**: [Category Name]  
**Version**: [Version Number]  
**Last Updated**: [YYYY-MM-DD]  
**Tags**: [tag1], [tag2], [tag3]

---

## Purpose

Explanation of why this rule exists and what problem it solves.

## Rules

### 1. First Rule Category
- Rule item
- Rule item
- Rule item

### 2. Second Rule Category
- Rule item
- Rule item

## Examples

### Good Example
```[language]
// Good practice example
```

### Bad Example
```[language]
// What to avoid
```

## Related Rules

- [Related Rule 1](path/to/rule.md)
- [Related Rule 2](path/to/rule.md)

## References

- External reference links if applicable
```

## Metadata Fields

### Category
The domain this rule belongs to. Valid categories:
- `general` - Core behavioral rules
- `coding` - Software development
- `writing` - Content creation
- `research` - Research methodology
- `communication` - Professional communications
- `data` - Data analysis and processing
- `project-management` - Project planning
- `security` - Security practices
- `devops` - CI/CD and infrastructure

### Version
Semantic versioning format: `MAJOR.MINOR.PATCH`
- MAJOR: Breaking changes to rule behavior
- MINOR: New rules added
- PATCH: Clarifications and minor fixes

### Tags
Lowercase, descriptive tags for searchability:
- `best-practices`
- `style-guide`
- `checklist`
- `template`
- `language-specific`
- `tool-specific`
- `security`
- `performance`

## Formatting Guidelines

### Headings
- Use `#` for the main title (only one per file)
- Use `##` for major sections
- Use `###` for subsections
- Use `####` sparingly for sub-subsections

### Lists
- Use `-` for unordered lists
- Use `1.` for ordered/sequential lists
- Maintain consistent indentation (2 spaces)

### Code Blocks
- Always specify the language for syntax highlighting
- Use inline code (backticks) for short references
- Use code blocks for examples longer than one line

### Emphasis
- Use **bold** for key terms and important points
- Use *italics* for emphasis or introducing terms
- Use `code formatting` for technical terms, commands, file names

### Tables
Use tables for structured data:
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |
```

## Naming Conventions

### File Names
- Use lowercase letters
- Use hyphens to separate words
- End with `.md` extension
- Be descriptive but concise
- Examples:
  - `rules.md` - Main rules file for a category
  - `python-rules.md` - Language-specific rules
  - `git-rules.md` - Tool-specific rules

### Directory Names
- Use lowercase letters
- Use hyphens for multi-word names
- Keep names short and descriptive

## Content Guidelines

### Clarity
- Write in clear, simple language
- One concept per rule
- Avoid jargon unless defined
- Use active voice

### Actionability
- Rules should be specific and actionable
- Use imperative mood ("Do this" not "You should do this")
- Provide concrete examples

### Completeness
- Include both what to do AND what to avoid
- Provide context for why rules exist
- Link to related rules and external resources

### Consistency
- Follow existing patterns in the repository
- Use consistent terminology
- Match the tone and style of other rules

## Example Complete Rule File

See `general/rules.md` for a complete example of proper rule file format.

## Checklist for New Rules

Before submitting a new rule file:

- [ ] File follows the standard structure
- [ ] Metadata fields are complete and accurate
- [ ] Rules are clear and actionable
- [ ] Examples are provided where helpful
- [ ] Related rules are linked
- [ ] File is placed in the correct category directory
- [ ] File name follows naming conventions
- [ ] Markdown formatting is correct
- [ ] Content has been reviewed for accuracy
