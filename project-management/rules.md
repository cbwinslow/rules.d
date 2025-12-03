# Project Management Rules

Rules for AI agents when assisting with project management tasks.

## Core Project Management Principles

### Planning
- Define clear objectives
- Break work into manageable tasks
- Estimate realistically
- Identify dependencies
- Plan for risks

### Execution
- Track progress regularly
- Communicate status clearly
- Manage scope carefully
- Address issues promptly
- Maintain quality

### Closing
- Verify completion
- Document outcomes
- Capture lessons learned
- Celebrate success
- Archive materials

## Project Planning

### Project Charter Template
```markdown
# Project Charter: [Project Name]

## Executive Summary
Brief overview of the project.

## Objectives
- Objective 1
- Objective 2

## Scope
### In Scope
- Item 1
- Item 2

### Out of Scope
- Item 1
- Item 2

## Success Criteria
- Criterion 1
- Criterion 2

## Timeline
- Start Date: [Date]
- End Date: [Date]
- Key Milestones: [List]

## Resources
- Team members
- Budget
- Tools

## Risks
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Risk 1 | High | Medium | Mitigation plan |

## Stakeholders
- Stakeholder 1: Role
- Stakeholder 2: Role
```

### Work Breakdown Structure
- Start with major deliverables
- Break into smaller components
- Continue until tasks are manageable
- Assign owners to each task
- Estimate effort for each item

### Task Estimation
| Size | Definition | Typical Duration |
|------|------------|------------------|
| XS | Trivial change | < 2 hours |
| S | Simple task | 2-4 hours |
| M | Standard task | 1-2 days |
| L | Complex task | 3-5 days |
| XL | Major effort | 1-2 weeks |

## Status Reporting

### Weekly Status Template
```markdown
# Weekly Status: [Project Name]
**Period**: [Start Date] to [End Date]

## Summary
Overall status: 🟢 On Track / 🟡 At Risk / 🔴 Off Track

## Accomplishments This Week
- Accomplishment 1
- Accomplishment 2

## Planned for Next Week
- Task 1
- Task 2

## Risks and Issues
| Item | Type | Status | Owner | Action |
|------|------|--------|-------|--------|
| Issue 1 | Issue | Open | Name | Action |

## Metrics
- Tasks completed: X of Y
- Budget spent: $X of $Y
- Timeline: X% complete

## Decisions Needed
- Decision 1: [Context and options]
```

## Risk Management

### Risk Assessment
```markdown
## Risk: [Risk Name]

**Description**: Detailed description of the risk.

**Category**: Technical / Schedule / Budget / Resource / External

**Probability**: Low (1) / Medium (2) / High (3)

**Impact**: Low (1) / Medium (2) / High (3)

**Risk Score**: [Probability × Impact]

**Mitigation Strategy**: How to reduce probability.

**Contingency Plan**: What to do if risk occurs.

**Owner**: [Name]

**Status**: Identified / Active / Mitigated / Closed
```

### Risk Register
| ID | Risk | Category | Prob | Impact | Score | Mitigation | Owner |
|----|------|----------|------|--------|-------|------------|-------|
| R1 | Description | Technical | 2 | 3 | 6 | Action | Name |

## Meeting Management

### Meeting Preparation
1. Define clear objective
2. Create detailed agenda
3. Invite necessary attendees only
4. Share materials in advance
5. Set appropriate duration

### Meeting Agenda Template
```markdown
# Meeting: [Title]
**Date**: [Date]  
**Time**: [Time] ([Duration])  
**Attendees**: [Names]

## Objective
What we need to accomplish.

## Agenda
| Time | Topic | Lead | Type |
|------|-------|------|------|
| 5 min | Review action items | [Name] | Review |
| 15 min | Topic 1 | [Name] | Discussion |
| 15 min | Topic 2 | [Name] | Decision |
| 5 min | Next steps | [Name] | Action |

## Pre-work
Materials to review before the meeting.
```

### Action Item Tracking
```markdown
## Action Items

| ID | Action | Owner | Due Date | Status |
|----|--------|-------|----------|--------|
| A1 | Description | Name | Date | Open |
| A2 | Description | Name | Date | Complete |
```

## Stakeholder Management

### Stakeholder Map
| Stakeholder | Interest | Influence | Engagement | Communication |
|-------------|----------|-----------|------------|---------------|
| Sponsor | High | High | Manage closely | Weekly 1:1 |
| User Group | High | Low | Keep informed | Monthly update |
| IT Team | Medium | Medium | Keep satisfied | Bi-weekly sync |

### Communication Plan
| Audience | Message | Frequency | Channel | Owner |
|----------|---------|-----------|---------|-------|
| Sponsors | Status | Weekly | Email | PM |
| Team | Updates | Daily | Standup | PM |
| Stakeholders | Progress | Monthly | Report | PM |

## Agile Practices

### Sprint Planning
1. Review and refine backlog
2. Set sprint goal
3. Team selects items to commit
4. Break items into tasks
5. Verify capacity

### Daily Standup
Each team member shares:
- What I did yesterday
- What I'm doing today
- Any blockers

### Sprint Retrospective
- What went well?
- What could be improved?
- What will we change?
- Action items for improvement

## Decision Making

### Decision Log Template
```markdown
## Decision: [Title]
**Date**: [Date]  
**Decision Maker**: [Name]

**Context**: Background and why decision is needed.

**Options Considered**:
1. Option 1: [Description] - Pros/Cons
2. Option 2: [Description] - Pros/Cons

**Decision**: What was decided.

**Rationale**: Why this option was chosen.

**Impact**: What changes as a result.

**Status**: Proposed / Approved / Implemented
```

## Change Management

### Change Request Template
```markdown
## Change Request: [Title]
**ID**: CR-[Number]  
**Date**: [Date]  
**Requestor**: [Name]

**Description**: What is being requested.

**Justification**: Why this change is needed.

**Impact Assessment**:
- Scope: [Impact description]
- Schedule: [Impact description]
- Budget: [Impact description]
- Resources: [Impact description]

**Recommendation**: Approve / Reject / More info needed

**Approval**: [Name, Date]
```
