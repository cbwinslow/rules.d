# Writing and Content Creation Rules

Rules for AI agents when creating written content, documentation, and communications.

## Core Writing Principles

### Clarity
- Write in clear, simple language
- Use short sentences and paragraphs
- Avoid jargon unless necessary for the audience
- Define technical terms when first used
- One idea per paragraph

### Conciseness
- Remove unnecessary words
- Get to the point quickly
- Avoid redundancy
- Use active voice
- Cut filler phrases

### Accuracy
- Verify facts before writing
- Cite sources when appropriate
- Be precise with numbers and dates
- Avoid exaggeration
- Acknowledge uncertainty

## Document Types

### Technical Documentation
```markdown
# Document Title

## Overview
Brief description of what this document covers.

## Prerequisites
What the reader needs to know or have.

## Step-by-Step Instructions
1. First step with details
2. Second step with details
3. Continue as needed

## Examples
Code or practical examples.

## Troubleshooting
Common issues and solutions.

## References
Related documentation and resources.
```

### README Files
```markdown
# Project Name

Brief description of the project.

## Features
- Feature 1
- Feature 2

## Installation
Step-by-step installation guide.

## Usage
Basic usage examples.

## Configuration
Available configuration options.

## Contributing
How to contribute to the project.

## License
License information.
```

### API Documentation
```markdown
## Endpoint Name

Brief description of what this endpoint does.

### Request

**Method**: GET/POST/PUT/DELETE  
**URL**: `/api/resource`

**Headers**:
| Header | Value | Required |
|--------|-------|----------|
| Authorization | Bearer {token} | Yes |

**Parameters**:
| Name | Type | Description | Required |
|------|------|-------------|----------|
| id | string | Resource ID | Yes |

### Response

**Success (200)**:
```json
{
  "data": {}
}
```

**Error (400)**:
```json
{
  "error": "Error message"
}
```
```

## Style Guidelines

### Tone
- Professional but approachable
- Helpful and supportive
- Confident but not arrogant
- Respectful and inclusive

### Formatting
- Use headings to organize content
- Use bullet points for lists
- Use numbered lists for sequences
- Use code blocks for code
- Use tables for structured data
- Use emphasis sparingly

### Grammar
- Use consistent tense
- Maintain subject-verb agreement
- Use correct punctuation
- Spell check everything
- Watch for common errors (its/it's, their/they're/there)

## Content Structure

### Introduction
- Hook the reader
- State the purpose
- Preview the content

### Body
- Organize logically
- Use transitions
- Support claims with evidence
- Break up long sections

### Conclusion
- Summarize key points
- Provide next steps
- End with a clear call to action

## Audience Awareness

### Consider
- Technical level of the audience
- What they already know
- What they need to know
- How they'll use the information
- Their goals and pain points

### Adapt
- Vocabulary complexity
- Level of detail
- Examples used
- Tone and formality

## Review Checklist

- [ ] Is the purpose clear?
- [ ] Is the content accurate?
- [ ] Is it well-organized?
- [ ] Is it the right length?
- [ ] Is the language appropriate?
- [ ] Are there any errors?
- [ ] Is formatting consistent?
- [ ] Are all links working?

## Editing Process

### First Pass: Structure
- Check organization and flow
- Verify all sections are present
- Ensure logical order

### Second Pass: Content
- Verify accuracy
- Check completeness
- Remove redundancy

### Third Pass: Language
- Simplify sentences
- Fix grammar
- Improve word choice

### Final Pass: Polish
- Check formatting
- Fix typos
- Verify links and references
