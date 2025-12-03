# Security Rules

Rules for AI agents when handling security-related tasks and ensuring secure practices.

## Core Security Principles

### Defense in Depth
- Use multiple layers of security
- Don't rely on a single control
- Assume any layer can fail
- Implement redundant protections

### Least Privilege
- Grant minimum necessary access
- Limit scope of permissions
- Review access regularly
- Revoke when no longer needed

### Zero Trust
- Verify explicitly
- Never assume trust
- Authenticate everything
- Minimize blast radius

## Secure Coding Practices

### Input Validation
```python
# Always validate and sanitize input
def process_user_input(data: str) -> str:
    # Validate type
    if not isinstance(data, str):
        raise ValueError("Input must be string")
    
    # Validate length
    if len(data) > MAX_LENGTH:
        raise ValueError("Input too long")
    
    # Sanitize content
    sanitized = escape_special_chars(data)
    
    # Validate format
    if not is_valid_format(sanitized):
        raise ValueError("Invalid format")
    
    return sanitized
```

### Authentication
- Use strong password policies
- Implement multi-factor authentication
- Use secure session management
- Hash passwords with strong algorithms
- Never store plaintext credentials

### Authorization
- Check permissions on every request
- Implement role-based access control
- Validate authorization server-side
- Log authorization failures
- Deny by default

### Data Protection
- Encrypt sensitive data at rest
- Use TLS for data in transit
- Mask sensitive data in logs
- Implement proper key management
- Follow data retention policies

## Secret Management

### Never Commit Secrets
```bash
# Bad - never do this
API_KEY="sk-123456789"
DATABASE_PASSWORD="supersecret"

# Good - use environment variables
API_KEY="${API_KEY}"
DATABASE_PASSWORD="${DATABASE_PASSWORD}"
```

### Environment Variables
- Store secrets in environment variables
- Use secret management tools
- Rotate secrets regularly
- Audit secret access
- Have incident response for exposure

### If Secrets Are Exposed
1. **Immediately** revoke the exposed credential
2. Generate new credentials
3. Update all systems using the credential
4. Review logs for unauthorized access
5. Report the incident
6. Remove from git history if possible

## Common Vulnerabilities

### SQL Injection
```python
# Bad - vulnerable
query = f"SELECT * FROM users WHERE id = {user_id}"

# Good - parameterized query
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))
```

### Cross-Site Scripting (XSS)
```javascript
// Bad - vulnerable
element.innerHTML = userInput;

// Good - escape output
element.textContent = userInput;
// Or use DOMPurify for HTML content
element.innerHTML = DOMPurify.sanitize(userInput);
```

### Cross-Site Request Forgery (CSRF)
- Use anti-CSRF tokens
- Verify token on every state-changing request
- Use SameSite cookie attribute
- Verify origin/referer headers

### Insecure Deserialization
- Never deserialize untrusted data
- Validate data before deserialization
- Use safe serialization formats
- Implement integrity checks

## Security Headers

### Recommended Headers
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=()
```

## Logging and Monitoring

### Security Logging
Log these events:
- Authentication attempts (success and failure)
- Authorization failures
- Input validation failures
- Error conditions
- Administrative actions
- Data access for sensitive data

### Log Security
- Don't log sensitive data
- Protect log files
- Centralize logging
- Set retention policies
- Monitor for anomalies

## Dependency Security

### Best Practices
- Keep dependencies updated
- Use lock files
- Scan for vulnerabilities
- Use minimal dependencies
- Monitor security advisories

### Vulnerability Scanning
```bash
# Python
pip-audit

# Node.js
npm audit

# General
snyk test
```

## Incident Response

### Response Steps
1. **Identify**: Detect and confirm incident
2. **Contain**: Limit spread and damage
3. **Eradicate**: Remove threat
4. **Recover**: Restore systems
5. **Learn**: Post-incident review

### Incident Documentation
```markdown
## Security Incident Report

**Date**: [Date/Time]
**Severity**: Critical / High / Medium / Low
**Status**: Active / Contained / Resolved

### Summary
Brief description of the incident.

### Timeline
- [Time]: Event 1
- [Time]: Event 2

### Impact
What was affected.

### Root Cause
Why it happened.

### Actions Taken
What was done to respond.

### Lessons Learned
How to prevent in future.
```

## Security Review Checklist

### Code Review
- [ ] Input validation implemented
- [ ] Output encoding applied
- [ ] Authentication/authorization correct
- [ ] Sensitive data protected
- [ ] No hardcoded secrets
- [ ] Dependencies up to date
- [ ] Error handling secure
- [ ] Logging appropriate

### Deployment Review
- [ ] Secrets managed properly
- [ ] Access controls configured
- [ ] Security headers set
- [ ] HTTPS enforced
- [ ] Logging enabled
- [ ] Monitoring configured
- [ ] Backup procedures tested
