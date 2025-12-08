# AI Agent Task Context Rules

These rules govern how AI agents should maintain task context in task.md for the current work session.

## Purpose

The task.md file serves to:
- Document the current task being worked on
- Track session-specific context and progress
- Record test results and validation outcomes
- Log feedback received and responses
- Maintain a focused view of the active work
- Provide clear handoff information

## Task File Structure

### Location
- The task context MUST be logged to `task.md` in the project root
- If `task.md` does not exist, create it at the start of a new task
- Replace or archive previous task content when starting a new task

### Task File Template
```markdown
# Current Task

**Status**: {In Progress / Blocked / Under Review / Complete}
**Started**: {YYYY-MM-DD HH:MM:SS}
**Last Updated**: {YYYY-MM-DD HH:MM:SS}

---

## Task Description

{Clear, detailed description of what needs to be accomplished}

## Objectives

- [ ] {Specific objective 1}
- [ ] {Specific objective 2}
- [ ] {Specific objective 3}

## Acceptance Criteria

- {Criterion 1: What defines success}
- {Criterion 2: How to verify completion}
- {Criterion 3: Quality requirements}

## Context & Background

{Relevant information, history, or constraints that inform the work}

### Related Resources
- Link to issue/ticket: {URL or reference}
- Related documentation: {URLs}
- Dependencies: {Other tasks or systems}

---

## Progress Log

### {YYYY-MM-DD HH:MM:SS} - Session Start
**Focus**: {What you're working on this session}

### {YYYY-MM-DD HH:MM:SS} - Progress Update
**Completed**:
- {What was accomplished}

**Current Status**:
- {What's being worked on now}

**Next Steps**:
- {What comes next}

---

## Test Results

### {Test Run Date/Time}
**Test Suite**: {Name of test suite}
- **Total Tests**: {count}
- **Passed**: {count} ✅
- **Failed**: {count} ❌
- **Skipped**: {count} ⏭️
- **Coverage**: {percentage}%

**Failed Tests**:
1. {Test name}: {Brief error description}
   - Error: {Error message}
   - Action: {What needs to be fixed}

**Performance**:
- Execution time: {duration}
- {Other relevant metrics}

**Analysis**:
{Summary of what the test results indicate}

---

## Feedback Received

### {YYYY-MM-DD HH:MM:SS} - {Feedback Source}
**Type**: {Code Review / User Feedback / Automated Tool / Peer Review}

**Feedback Points**:
1. {Specific feedback item}
   - **Response**: {How addressed or why declined}
   - **Action**: {What was done}
   - **Status**: {Completed / In Progress / Deferred}

2. {Next feedback item}
   - **Response**: {How addressed or why declined}
   - **Action**: {What was done}
   - **Status**: {Completed / In Progress / Deferred}

**Summary**:
{Overall assessment of feedback and changes made}

---

## Obstacles & Resolutions

### {Date} - {Obstacle Description}
**Problem**: {What blocked progress}
**Impact**: {How it affects the task}
**Resolution**: {How it was solved or workaround used}
**Status**: {Resolved / Workaround / Escalated}

---

## Decisions Made

### {Date} - {Decision Title}
**Context**: {What required a decision}
**Options Considered**:
1. {Option A}: {Pros/cons}
2. {Option B}: {Pros/cons}

**Decision**: {What was chosen}
**Rationale**: {Why this option was selected}

---

## Summary & Next Steps

### Completed This Session
- {Accomplishment 1}
- {Accomplishment 2}

### Remaining Work
- {What still needs to be done}

### Next Actions
1. {Immediate next step}
2. {Following steps}

### Open Questions
- {Question 1 that needs clarification}
- {Question 2 that needs input}

---

*Last updated: {YYYY-MM-DD HH:MM:SS}*
```

## Task Management Rules

### 1. Starting a New Task
When beginning a new task:
1. Create or clear task.md with the template
2. Fill in task description, objectives, and acceptance criteria
3. Document relevant context and background
4. Link to related resources and todos
5. Commit the initial task.md to version control

### 2. During Work Sessions
Throughout active work:
1. Update progress log with regular status updates
2. Log all test results immediately after running tests
3. Document feedback as soon as it's received
4. Record obstacles when encountered
5. Note decisions and their rationale
6. Keep "Last Updated" timestamp current
7. Update objective checkboxes as they're completed

### 3. Recording Test Results
After running any tests:
1. Create a new test results entry with timestamp
2. Include comprehensive test metrics
3. List specific failures with error details
4. Document what actions are needed
5. Analyze what the results mean for task completion
6. Reference test results in progress updates

### 4. Logging Feedback
When feedback is received:
1. Create a dated feedback section
2. List each feedback point separately
3. Document your response to each item
4. Note what action was taken
5. Track completion status of feedback responses
6. Summarize overall feedback impact

### 5. Completing a Task
When finishing a task:
1. Update status to "Complete"
2. Check off all objectives
3. Document final summary
4. Note any follow-up tasks (add to todos.md)
5. Archive or create new task.md for next task
6. Update related todos.md items to completed

### 6. Task Handoffs
When pausing or handing off work:
1. Update summary section thoroughly
2. List all open questions clearly
3. Document current state and blockers
4. Specify exact next steps
5. Commit all changes
6. Cross-reference with todos.md

## Integration with Other Files

### With todos.md
- Reference todo items from task.md
- Update todos.md when tasks are completed
- Add newly discovered tasks to todos.md
- Link task.md objectives to specific todo items

### With journal.md
- Keep task.md focused on current task
- Move detailed reasoning to journal.md
- Reference journal entries from task.md when relevant
- Use journal.md for decision archaeology, task.md for current decisions

### File Purpose Distinction
- **task.md**: Current task focus, progress, results, feedback (session-specific)
- **todos.md**: All tasks across the project (persistent backlog)
- **journal.md**: Reasoning and decision audit trail (historical record)

## Commit Rules

### When to Commit task.md
- After creating initial task context
- After running tests (with results logged)
- After receiving and addressing feedback
- After significant progress updates
- When encountering or resolving obstacles
- At natural breakpoints in work
- When updating task status
- Before ending a work session

### Commit Message Format
```
task: {brief description of update}

Examples:
task: initialize context for user authentication feature
task: add test results for API endpoint tests
task: document code review feedback and responses
task: update progress - completed database migration
task: mark task complete with final summary
```

### Combined Commits
When updating multiple log files together:
```bash
git add task.md todos.md journal.md
git commit -m "docs: update task progress and logs

- task: completed integration tests with results
- todos: marked authentication tasks complete
- journal: logged decision on JWT implementation"
```

## Best Practices

### Clarity
- Use clear, specific language
- Avoid vague terms like "some" or "might"
- Include concrete examples and evidence
- Make status and progress unambiguous

### Completeness
- Don't leave sections blank without noting "N/A"
- Include all test runs, not just failures
- Document both positive and negative feedback
- Record decisions even when they seem obvious

### Timeliness
- Update task.md as events happen, not later
- Log test results immediately after running
- Record feedback when received, not when addressed
- Timestamp all significant updates

### Actionability
- Always include "Next Steps"
- Make action items specific and concrete
- Assign or note responsibility for actions
- Set priorities where appropriate

### Accessibility
- Use formatting for easy scanning
- Employ consistent structure
- Make important information prominent
- Use status indicators: ✅ (completed), ❌ (failed/blocked), 🔄 (in progress)

## Example task.md File

```markdown
# Current Task

**Status**: In Progress
**Started**: 2024-01-15 09:00:00
**Last Updated**: 2024-01-15 14:30:00

---

## Task Description

Implement JWT-based authentication system for the REST API, including user registration, login, token refresh, and logout endpoints.

## Objectives

- [x] Design authentication database schema
- [x] Implement user registration endpoint
- [x] Implement login with JWT generation
- [ ] Implement token refresh mechanism
- [ ] Add logout/token invalidation
- [ ] Write comprehensive tests
- [ ] Update API documentation

## Acceptance Criteria

- All endpoints return appropriate HTTP status codes
- JWT tokens are properly signed and validated
- Passwords are hashed using bcrypt
- Token expiration is properly enforced
- All tests pass with >80% coverage
- API documentation is complete and accurate

## Context & Background

The application currently has no authentication. Users need secure access to protected resources. The frontend team is ready to integrate once endpoints are available.

### Related Resources
- Issue: #123 "Implement User Authentication"
- API Design Doc: docs/api-design.md
- Security Guidelines: docs/security.md
- Related TODO: todos.md - High Priority section

---

## Progress Log

### 2024-01-15 09:00:00 - Session Start
**Focus**: Setting up authentication infrastructure and implementing registration endpoint

### 2024-01-15 11:30:00 - Progress Update
**Completed**:
- Created users table with proper constraints
- Implemented password hashing with bcrypt
- Built registration endpoint with validation
- Added basic input sanitization

**Current Status**:
- Working on login endpoint and JWT generation

**Next Steps**:
- Complete login endpoint
- Add JWT token generation
- Write tests for auth endpoints

### 2024-01-15 14:30:00 - Progress Update
**Completed**:
- Implemented login endpoint
- Integrated JWT token generation
- Added token validation middleware
- Ran initial test suite

**Current Status**:
- Reviewing test results and fixing failures

**Next Steps**:
- Fix failing token validation test
- Implement token refresh endpoint
- Add logout functionality

---

## Test Results

### 2024-01-15 14:15:00
**Test Suite**: Authentication API Tests
- **Total Tests**: 12
- **Passed**: 10 ✅
- **Failed**: 2 ❌
- **Skipped**: 0 ⏭️
- **Coverage**: 78.5%

**Failed Tests**:
1. test_token_validation_with_expired_token
   - Error: AssertionError: Expected 401 but got 500
   - Action: Add proper error handling for expired tokens

2. test_login_with_invalid_credentials
   - Error: Response missing error message field
   - Action: Ensure error responses include descriptive messages

**Performance**:
- Execution time: 2.3 seconds
- Average response time: 145ms per request

**Analysis**:
Most authentication logic is working correctly. Two edge cases need fixes:
1. Expired token handling needs proper error response
2. Error message format needs consistency

---

## Feedback Received

### 2024-01-15 13:45:00 - Code Review (Senior Dev)
**Type**: Code Review

**Feedback Points**:
1. Add rate limiting to login endpoint to prevent brute force attacks
   - **Response**: Agreed, critical security measure
   - **Action**: Implemented rate limiting with 5 attempts per 15 minutes
   - **Status**: Completed ✅

2. Use refresh token rotation for better security
   - **Response**: Good practice, will implement
   - **Action**: Added to objectives, implementing next
   - **Status**: In Progress 🔄

3. Consider adding email verification
   - **Response**: Important but out of scope for this task
   - **Action**: Added to todos.md as separate task
   - **Status**: Deferred to future task

**Summary**:
Addressed immediate security concerns with rate limiting. Refresh token rotation being implemented as part of current objectives. Email verification logged for future work.

---

## Obstacles & Resolutions

### 2024-01-15 10:30:00 - JWT Library Configuration
**Problem**: JWT library throwing errors on token verification due to algorithm mismatch
**Impact**: Blocked testing of token validation
**Resolution**: Set algorithm explicitly to 'HS256' in both sign and verify calls
**Status**: Resolved ✅

### 2024-01-15 12:15:00 - Database Connection Pool Exhaustion
**Problem**: Tests failing due to connection pool running out
**Impact**: Cannot run full test suite reliably
**Resolution**: Increased pool size and added proper connection cleanup in test teardown
**Status**: Resolved ✅

---

## Decisions Made

### 2024-01-15 09:30:00 - Token Storage Strategy
**Context**: Need to decide how to handle JWT token storage and invalidation
**Options Considered**:
1. Stateless JWT only: Simple but cannot invalidate tokens
2. JWT with blacklist: Can invalidate but requires storage
3. JWT with refresh tokens: Best security, moderate complexity

**Decision**: JWT with refresh tokens (Option 3)
**Rationale**: Provides best balance of security and functionality. Allows proper logout, token revocation, and shorter access token lifetime. Complexity is manageable with proper implementation.

---

## Summary & Next Steps

### Completed This Session
- Database schema created and migrated
- User registration endpoint fully implemented and tested
- Login endpoint with JWT generation complete
- Token validation middleware working
- Rate limiting added for security
- Initial test suite created and run

### Remaining Work
- Fix 2 failing tests related to error handling
- Implement token refresh mechanism
- Add logout functionality
- Increase test coverage to >80%
- Update API documentation

### Next Actions
1. Fix expired token error handling
2. Fix error message format in login failure
3. Implement refresh token endpoint
4. Add token invalidation on logout
5. Write additional test cases
6. Update docs/api-design.md with endpoints

### Open Questions
- Should we implement "remember me" functionality?
- What should the access token expiration time be? (considering 15 min)
- Do we need account lockout after X failed attempts?

---

*Last updated: 2024-01-15 14:30:00*
```

## Usage Examples

### Starting a New Task
```bash
# Create task.md with initial context
cat > task.md << 'EOF'
# Current Task

**Status**: In Progress
**Started**: 2024-01-15 14:00:00
**Last Updated**: 2024-01-15 14:00:00

---

## Task Description
{Fill in your task description}
...
EOF

# Commit initial task context
git add task.md
git commit -m "task: initialize context for {task name}"
git push origin {current-branch}
```

### Logging Test Results
```bash
# After running tests, append results to task.md
# Edit task.md to add test results section
# Then commit
git add task.md
git commit -m "task: add test results for {component} tests"
git push origin {current-branch}
```

### Recording Feedback
```bash
# After receiving feedback, update task.md
# Document each feedback point and response
# Then commit changes
git add task.md
git commit -m "task: document code review feedback and responses"
git push origin {current-branch}
```

### Completing a Task
```bash
# Update task.md with final status and summary
# Mark task as complete in todos.md
git add task.md todos.md
git commit -m "docs: complete authentication task

- task: mark complete with final summary
- todos: update authentication items to completed"
git push origin {current-branch}
```
