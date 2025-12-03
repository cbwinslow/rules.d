# rules.d

[![Test Rules](https://github.com/cbwinslow/rules.d/actions/workflows/test.yml/badge.svg)](https://github.com/cbwinslow/rules.d/actions/workflows/test.yml)

A comprehensive collection of rules.md files for AI agents to follow across various domains and applications.

## Purpose

This repository provides a centralized, organized system of behavioral rules and guidelines for AI agents. These rules help ensure consistent, high-quality, and safe AI-assisted operations across different use cases.

## 📚 Documentation

- **[CATALOG.md](CATALOG.md)** - Complete index of all rules by category
- **[docs/usage-guide.md](docs/usage-guide.md)** - How to use these rules in your workflows
- **[docs/rule-format.md](docs/rule-format.md)** - Standard format for writing rule files
- **[docs/contributing.md](docs/contributing.md)** - Contribution guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes

## Directory Structure

```
rules.d/
├── README.md                    # This file
├── CATALOG.md                   # Complete rules index
├── CHANGELOG.md                 # Version history
├── docs/                        # Documentation
│   ├── rule-format.md           # Rule file format guide
│   ├── usage-guide.md           # How to use these rules
│   └── contributing.md          # Contribution guidelines
├── tests/                       # Testing infrastructure
│   ├── test-runner.sh           # Main test runner
│   ├── validate-rules.sh        # Rule file validation
│   └── check-structure.sh       # Directory structure checks
├── .github/workflows/           # CI/CD
│   └── test.yml                 # GitHub Actions workflow
├── general/                     # General-purpose rules for everyday operations
│   ├── rules.md                 # Core AI agent behavioral rules
│   ├── journaling-rules.md      # Rules for logging reasoning to journal.md
│   └── todo-rules.md            # Rules for todo lists and GitHub commits
├── coding/                      # Software development rules
│   ├── rules.md                 # General coding best practices
│   ├── python-rules.md          # Python-specific rules
│   ├── javascript-typescript-rules.md  # JS/TS-specific rules
│   └── git-rules.md             # Version control rules
├── writing/                     # Content creation rules
│   └── rules.md                 # Writing and documentation rules
├── research/                    # Research and analysis rules
│   └── rules.md                 # Research methodology rules
├── communication/               # Communication rules
│   └── rules.md                 # Email, messaging, meeting rules
├── data/                        # Data processing rules
│   └── rules.md                 # Data analysis and management rules
├── project-management/          # Project management rules
│   └── rules.md                 # PM best practices and templates
├── security/                    # Security-focused rules
│   └── rules.md                 # Security best practices
└── devops/                      # DevOps and CI/CD rules
    └── rules.md                 # Infrastructure and deployment rules
```

## Quick Start

### For AI Agents

Reference the appropriate rules file(s) based on the task:

```markdown
Please follow the rules in:
- rules.d/general/rules.md (always)
- rules.d/coding/rules.md (for development tasks)
- rules.d/general/journaling-rules.md (for logging reasoning)
- rules.d/general/todo-rules.md (for task management)
```

### For Humans

1. Browse the folders to find relevant rules for your use case
2. Include the rules file path in your AI agent prompts
3. Customize rules as needed for your specific project

## Key Features

### General Purpose Rules

The `general/` folder contains everyday operational rules:

- **rules.md**: Core behavioral principles for all AI operations
- **journaling-rules.md**: Instructions for logging reasoning tokens to `journal.md` and committing to GitHub
- **todo-rules.md**: Guidelines for managing todo lists in `todos.md` and syncing with GitHub

### Domain-Specific Rules

Each domain folder contains specialized rules:

| Folder | Purpose |
|--------|---------|
| `coding/` | Software development best practices |
| `writing/` | Content creation and documentation |
| `research/` | Research methodology and analysis |
| `communication/` | Professional communications |
| `data/` | Data analysis and processing |
| `project-management/` | Project planning and execution |
| `security/` | Security practices and guidelines |
| `devops/` | CI/CD and infrastructure |

## Usage Examples

### Example 1: Daily Operations with Journaling

```markdown
Follow the rules in:
- rules.d/general/rules.md
- rules.d/general/journaling-rules.md
- rules.d/general/todo-rules.md

For this session:
1. Log all reasoning to journal.md
2. Track tasks in todos.md
3. Commit both files to GitHub after changes
```

### Example 2: Code Development

```markdown
Follow the rules in:
- rules.d/general/rules.md
- rules.d/coding/rules.md
- rules.d/coding/python-rules.md  # for Python projects
- rules.d/coding/git-rules.md

Task: [Your development task here]
```

### Example 3: Research Project

```markdown
Follow the rules in:
- rules.d/general/rules.md
- rules.d/research/rules.md
- rules.d/writing/rules.md

Research topic: [Your research question here]
```

## Journaling and Todo Workflow

The `general/journaling-rules.md` and `general/todo-rules.md` files establish a workflow for:

1. **Reasoning Logs**: AI agents log their decision-making process to `journal.md`
2. **Task Tracking**: All tasks are tracked in `todos.md` with proper formatting
3. **Version Control**: Both files are committed to GitHub after updates

### File Templates

When following these rules, AI agents will create/maintain:

**journal.md** - Reasoning and decision logs:
```markdown
# AI Agent Journal
## [2024-01-15 14:30:22] Task: [Description]
### Reasoning Process
[Detailed reasoning tokens]
### Decision Made
[What was decided and why]
```

**todos.md** - Task tracking:
```markdown
# Project Todo List
## 🔴 High Priority
- [ ] Critical task
## ✅ Completed
- [x] Done task [Completed: 2024-01-15]
```

## Contributing

See [docs/contributing.md](docs/contributing.md) for detailed contribution guidelines.

Quick ways to contribute:
- Add new rules files for additional domains
- Improve existing rules based on experience
- Submit issues for unclear or missing guidelines
- Help improve documentation

## Testing

Run the test suite locally:

```bash
./tests/test-runner.sh
```

Individual test scripts:
```bash
./tests/check-structure.sh    # Verify directory structure
./tests/validate-rules.sh     # Validate rule file formatting
```

## License

This project is open source. Feel free to use and adapt these rules for your AI agent workflows.