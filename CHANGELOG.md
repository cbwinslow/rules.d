# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Documentation system with comprehensive guides
  - `docs/rule-format.md` - Standard format for writing rule files
  - `docs/usage-guide.md` - How to use rules in AI workflows
  - `docs/contributing.md` - Contribution guidelines
- Testing system for validating rules
  - `tests/validate-rules.sh` - Validates markdown formatting and structure
  - `tests/check-structure.sh` - Verifies directory structure
  - `tests/test-runner.sh` - Main test runner
- GitHub Actions CI workflow (`.github/workflows/test.yml`)
- `CATALOG.md` - Organized index of all rules by category
- This `CHANGELOG.md` file

### Changed
- Updated README.md with references to new documentation

## [1.0.0] - 2024-01-01

### Added
- Initial release of rules.d
- Core rule files for all categories:
  - `general/rules.md` - Core AI agent behavioral rules
  - `general/journaling-rules.md` - Reasoning log rules
  - `general/todo-rules.md` - Task tracking rules
  - `coding/rules.md` - General coding best practices
  - `coding/python-rules.md` - Python-specific rules
  - `coding/javascript-typescript-rules.md` - JS/TS rules
  - `coding/git-rules.md` - Version control rules
  - `writing/rules.md` - Writing and documentation rules
  - `research/rules.md` - Research methodology rules
  - `communication/rules.md` - Professional communication rules
  - `data/rules.md` - Data analysis rules
  - `project-management/rules.md` - PM best practices
  - `security/rules.md` - Security practices
  - `devops/rules.md` - CI/CD and infrastructure rules
- `README.md` with usage instructions and examples

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|------------|
| Unreleased | - | Documentation, testing, organization |
| 1.0.0 | 2024-01-01 | Initial release with all core rules |

---

## Contributing

When making changes, please update this changelog with your additions under the `[Unreleased]` section. Use the following categories:

- **Added** - New features or files
- **Changed** - Changes to existing functionality
- **Deprecated** - Features that will be removed in future versions
- **Removed** - Features that have been removed
- **Fixed** - Bug fixes
- **Security** - Security-related changes
