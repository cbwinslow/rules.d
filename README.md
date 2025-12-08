# rules.d

[![Test Rules](https://github.com/cbwinslow/rules.d/actions/workflows/test.yml/badge.svg)](https://github.com/cbwinslow/rules.d/actions/workflows/test.yml)

A universal source for practical, high-quality rules across all coding languages and domains, with an MCP server for AI agent integration.

## Purpose

This repository provides a centralized, organized system of behavioral rules and best practices for AI agents and developers. These rules lead to better code quality, improved performance, enhanced security, tighter results, less waste, more efficiency, and consistent outcomes across different use cases.

## ✨ New Features

- **🌍 Universal Language Coverage**: Rules for Python, JavaScript/TypeScript, Go, Rust, Java, C#, and more
- **🎯 Smart Rule Bundling**: AI-powered rule analyzer that recommends optimal rule combinations for your scenario
- **🔌 MCP Server**: Model Context Protocol server for seamless AI agent integration
- **⚡ Performance Rules**: Comprehensive optimization guidelines
- **♿ Accessibility Rules**: Complete accessibility best practices
- **🧪 Testing Rules**: Test-driven development and testing strategies
- **🔍 Rule Search & Discovery**: CLI tools for finding the right rules
- **📦 Pre-configured Bundles**: Common scenarios covered out-of-the-box

## 📚 Documentation

- **[CATALOG.md](CATALOG.md)** - Complete index of all rules by category
- **[docs/mcp-server-guide.md](docs/mcp-server-guide.md)** - MCP server setup and usage guide
- **[docs/usage-guide.md](docs/usage-guide.md)** - How to use these rules in your workflows
- **[docs/rule-format.md](docs/rule-format.md)** - Standard format for writing rule files
- **[docs/contributing.md](docs/contributing.md)** - Contribution guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes

## 🚀 Quick Start

### For AI Agents via MCP

1. **Install dependencies:**
   ```bash
   npm install
   npm run build
   ```

2. **Configure your AI agent** to use the MCP server (see [MCP Server Guide](docs/mcp-server-guide.md))

3. **Access rules programmatically** through the MCP protocol

### Using the CLI

```bash
# List all rules
node dist/cli/index.js list

# Get recommended rules for Python web development
node dist/cli/index.js recommend --type coding --language python --priorities security performance

# Search for specific rules
node dist/cli/index.js search "testing"

# View common bundles
node dist/cli/index.js bundles
```

### Manual Usage

Reference the appropriate rules file(s) in your AI agent prompts:

```markdown
Please follow the rules in:
- rules.d/general/rules.md (always)
- rules.d/coding/python-rules.md
- rules.d/coding/performance-rules.md
- rules.d/coding/testing-rules.md
```

## 📖 Available Rules

### Language-Specific Rules
- **Python** - Type hints, testing, best practices
- **JavaScript/TypeScript** - Modern JS/TS patterns, async/await, React
- **Go** - Concurrency, error handling, idiomatic Go
- **Rust** - Ownership, lifetimes, safety
- **Java** - Spring Boot, modern Java features, design patterns
- **C#** - .NET, LINQ, async patterns

### Universal Rules
- **Performance Optimization** - Algorithms, caching, profiling
- **Accessibility** - WCAG compliance, semantic HTML, ARIA
- **Testing** - TDD, unit/integration/E2E testing
- **Security** - OWASP best practices, secure coding
- **Git** - Branching strategies, commit messages

### Domain Rules
- **General** - Core AI agent behavior
- **Writing** - Documentation, technical writing
- **Research** - Methodology, analysis
- **DevOps** - CI/CD, infrastructure
- **Data** - Analysis, processing
- **Project Management** - Planning, execution

## 🔧 MCP Server

The rules.d MCP server provides programmatic access to all rules for AI agents:

**Available Tools:**
- `list_rules` - Browse rules with filters
- `get_rule` - Retrieve specific rule content
- `recommend_bundle` - Get optimal rule combinations for scenarios
- `get_common_bundles` - Access pre-configured bundles
- `search_rules` - Search across all rules

**Example Usage:**
```bash
npm start  # Start MCP server
```

See [MCP Server Guide](docs/mcp-server-guide.md) for detailed setup and integration instructions.

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