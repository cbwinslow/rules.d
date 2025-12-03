# AI Agent Journaling Rules

These rules govern how AI agents should log their reasoning tokens and maintain a journal of their thought processes.

## Purpose

Journaling serves to:
- Create an audit trail of AI reasoning and decision-making
- Enable debugging and improvement of AI behavior
- Provide transparency into AI operations
- Support learning and process improvement

## Journal File Structure

### Location
- All journal entries MUST be logged to `journal.md` in the project root
- If `journal.md` does not exist, create it with the header shown below

### Journal Header Template
```markdown
# AI Agent Journal

This file contains the reasoning logs and decision records from AI agent operations.

---
```

## Logging Rules

### 1. Entry Format
Each journal entry MUST follow this format:
```markdown
## [YYYY-MM-DD HH:MM:SS] Task: {Brief Task Description}

### Context
- **Trigger**: {What initiated this task}
- **User Request**: {Original user request if applicable}
- **Starting State**: {Relevant initial conditions}

### Reasoning Process
{Detailed reasoning tokens and thought process}

### Decision Made
- **Action Taken**: {What action was decided}
- **Rationale**: {Why this action was chosen}
- **Alternatives Considered**: {Other options that were evaluated}

### Outcome
- **Result**: {Success/Failure/Partial}
- **Notes**: {Any additional observations}

---
```

### 2. What to Log
Always log reasoning tokens for:
- Complex decision-making processes
- Ambiguous or unclear requirements
- Error handling and recovery
- Trade-off evaluations
- Assumption validation
- Creative problem-solving
- Task prioritization decisions
- Risk assessments

### 3. Logging Frequency
- Log at the START of significant tasks
- Log at DECISION POINTS during execution
- Log at the END of tasks with outcomes
- Log any UNEXPECTED events or errors

### 4. Detail Level
- Be thorough but not redundant
- Include relevant context
- Omit trivial or routine decisions
- Focus on reasoning, not just actions

## Commit Rules

### 1. When to Commit
- After each significant journal entry
- At natural breakpoints in work
- Before switching to a different task
- At the end of each work session

### 2. Commit Message Format
```
journal: {brief description of logged reasoning}

Example: journal: logged decision-making process for API design
```

### 3. Git Operations
```bash
# Stage the journal
git add journal.md

# Commit with descriptive message
git commit -m "journal: {description}"

# Push to GitHub
git push origin {current-branch}
```

## Integration with Other Rules

- Journaling should complement, not replace, code comments
- Journal entries may reference related todo items
- Cross-reference with todo-rules.md for task tracking integration
- Use consistent timestamps with other logging systems

## Privacy and Security

- Never log sensitive information (passwords, API keys, personal data)
- Redact any accidentally logged sensitive content immediately
- Be mindful of what information is appropriate for version control

## Example Entry

```markdown
## [2024-01-15 14:30:22] Task: Implementing User Authentication

### Context
- **Trigger**: User requested login functionality
- **User Request**: "Add secure user login to the application"
- **Starting State**: No existing auth system, basic Express app

### Reasoning Process
Evaluating authentication options:
1. Session-based auth: Simple but requires session storage
2. JWT tokens: Stateless, good for APIs, slightly more complex
3. OAuth: Best UX for users, requires third-party integration

Considering project constraints:
- This is an API-first application → JWT makes sense
- No existing session store → JWT avoids new infrastructure
- Future mobile app planned → JWT is more compatible

### Decision Made
- **Action Taken**: Implement JWT-based authentication
- **Rationale**: Best fit for API-first architecture and future scalability
- **Alternatives Considered**: Session-based auth (rejected due to stateful nature)

### Outcome
- **Result**: Success
- **Notes**: Used jsonwebtoken library, implemented refresh token pattern

---
```
