# AI Agent Todo List Rules

These rules govern how AI agents should manage todo lists, track tasks, and commit changes to GitHub.

## Purpose

Todo management serves to:
- Track pending and completed work
- Maintain project organization
- Provide visibility into progress
- Enable handoffs and collaboration

## Todo File Structure

### Location
- All todo items MUST be logged to `todos.md` in the project root
- If `todos.md` does not exist, create it with the header shown below

### Todo File Header Template
```markdown
# Project Todo List

This file tracks tasks, action items, and work progress.

Last Updated: {YYYY-MM-DD HH:MM:SS}

---
```

## Todo Item Format

### Standard Item
```markdown
- [ ] {Task description} [Priority: {High/Medium/Low}] [Due: {date if applicable}]
```

### Completed Item
```markdown
- [x] {Task description} [Completed: {YYYY-MM-DD}]
```

### Detailed Item (for complex tasks)
```markdown
- [ ] **{Task Title}** [Priority: {level}]
  - Description: {Detailed description}
  - Acceptance Criteria: {What defines "done"}
  - Dependencies: {Related tasks or blockers}
  - Assigned: {AI Agent / Human / Team}
  - Notes: {Additional context}
```

## Todo Categories

Organize todos into sections:

```markdown
## 🔴 High Priority
- [ ] Critical task 1
- [ ] Critical task 2

## 🟡 Medium Priority  
- [ ] Important task 1
- [ ] Important task 2

## 🟢 Low Priority
- [ ] Nice-to-have task 1
- [ ] Nice-to-have task 2

## ✅ Completed
- [x] Done task 1 [Completed: 2024-01-15]
- [x] Done task 2 [Completed: 2024-01-14]

## 🚫 Blocked / On Hold
- [ ] Blocked task 1 (Reason: waiting for API access)
```

## Management Rules

### 1. Adding Todos
- Create todo items when new tasks are identified
- Be specific about what needs to be done
- Assign appropriate priority
- Include context for future reference
- Link to related journal entries when applicable
- Add todos discovered during testing or code review
- Reference test results that identified the need for the task
- Include feedback that led to the todo creation

### 2. Updating Todos
- Update status as work progresses
- Add notes about partial progress
- Revise priority as circumstances change
- Update the "Last Updated" timestamp
- Log test results that affect task status or priority
- Document feedback received that impacts the todo
- Add summary notes about blockers or obstacles encountered

### 3. Completing Todos
- Mark items complete immediately when finished
- Add completion date
- Move completed items to the Completed section
- Include brief notes on what was done
- Reference test results that verify completion
- Note any feedback that confirmed task completion
- Summarize outcomes and lessons learned

### 4. Removing Todos
- Never delete todos entirely (for audit trail)
- Mark cancelled items as cancelled with reason
- Example: `- [x] ~~Cancelled task~~ [Cancelled: 2024-01-15 - No longer needed]`

## Commit Rules

### 1. When to Commit Todos
- After adding new significant todo items
- After completing one or more items
- After reprioritizing or reorganizing
- At the end of each work session
- Before switching to a different project

### 2. Combined Journal + Todo Commits
When both journal.md and todos.md are updated:

```bash
# Stage both files
git add journal.md todos.md

# Commit with combined message
git commit -m "docs: update journal and todos

- journal: {brief description of reasoning logged}
- todos: {brief description of todo changes}"

# Push to GitHub
git push origin {current-branch}
```

### 3. Todo-Only Commits
```bash
git add todos.md
git commit -m "todos: {description of changes}"
git push origin {current-branch}
```

### 4. Commit Message Examples
```
todos: add authentication implementation tasks
todos: complete API endpoint documentation
todos: reprioritize security audit items
docs: update journal and todos after sprint planning
```

## Logging Information to Todos

### Test Results
When test results impact tasks:
- Add todos for failing tests that need fixes
- Update existing todos with test outcomes
- Note test coverage gaps as new todos
- Reference specific test names and error messages
- Example: `- [ ] Fix failing test: test_user_authentication - AssertionError on line 45`

### Summaries and Progress
Include progress summaries in todo notes:
- Brief summary of what was accomplished
- Obstacles encountered and how they were addressed
- Current state of partially completed tasks
- Estimated remaining effort
- Example: `- [ ] Complete user API (50% done - GET/POST working, PUT/DELETE pending)`

### Feedback Integration
Log feedback as or in todos:
- Create todos for feedback items requiring action
- Reference feedback source and date
- Include specific feedback points in todo description
- Track feedback resolution status
- Example: `- [ ] Address code review feedback: add input validation to login endpoint [Reviewer: @senior-dev, Date: 2024-01-15]`

### Information Capture
When adding context to todos:
- Link to relevant documentation or resources
- Include error messages or logs that motivate the task
- Reference related issues or pull requests
- Note dependencies on other systems or teams
- Document assumptions or constraints

## Integration Guidelines

### With Task Context (task-rules.md)
- Reference current task.md from related todos
- Create todos for items discovered in task.md
- Keep todos.md and task.md objectives synchronized
- Use todos for long-term tracking, task.md for current session

### With Journaling (journaling-rules.md)
- Reference todo items in journal entries when relevant
- Log reasoning for priority decisions in journal
- Cross-reference with journal when completing complex todos

### With Project Management
- Sync with external issue trackers if applicable
- Keep todos aligned with sprint/milestone goals
- Use todos for granular task tracking

## Automation Hooks

AI agents should execute these checks:

### At Session Start
1. Read current todos.md
2. Review high-priority items
3. Log session start in journal

### During Work
1. Update todos as work progresses
2. Add new todos when discovered
3. Log reasoning for any priority changes

### At Session End
1. Mark completed items as done
2. Commit all changes (journal + todos)
3. Push to GitHub

## Example Workflow

```bash
# 1. Check current state
cat todos.md

# 2. Work on tasks, update as you go
# (Edit todos.md as work progresses)

# 3. Stage changes
git add todos.md journal.md

# 4. Commit with descriptive message
git commit -m "docs: update journal and todos

- journal: logged reasoning for database schema decisions
- todos: complete user table design, add index optimization task"

# 5. Push to remote
git push origin main
```

## Full Todo File Example

```markdown
# Project Todo List

This file tracks tasks, action items, and work progress.

Last Updated: 2024-01-15 14:30:00

---

## 🔴 High Priority
- [ ] Fix security vulnerability in auth module [Priority: High] [Due: 2024-01-16]
  - Description: Patch JWT token expiration bypass
  - Dependencies: None
  - Notes: See journal entry 2024-01-15 10:00

## 🟡 Medium Priority  
- [ ] Implement user profile page [Priority: Medium]
- [ ] Add unit tests for payment service [Priority: Medium]
- [ ] Update API documentation [Priority: Medium]

## 🟢 Low Priority
- [ ] Refactor legacy utility functions [Priority: Low]
- [ ] Add dark mode support [Priority: Low]

## ✅ Completed
- [x] Set up CI/CD pipeline [Completed: 2024-01-14]
- [x] Configure database connection pooling [Completed: 2024-01-13]
- [x] Initial project scaffolding [Completed: 2024-01-10]

## 🚫 Blocked / On Hold
- [ ] Integrate third-party payment processor (Blocked: awaiting API credentials)

---

*Managed by AI Agent following todo-rules.md*
```
