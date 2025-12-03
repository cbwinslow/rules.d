# DevOps and CI/CD Rules

Rules for AI agents when working with DevOps practices, CI/CD pipelines, and infrastructure.

## Core DevOps Principles

### Automation
- Automate repetitive tasks
- Use infrastructure as code
- Implement CI/CD pipelines
- Automate testing
- Script deployments

### Collaboration
- Break down silos
- Share knowledge
- Use shared tools
- Document processes
- Communicate changes

### Continuous Improvement
- Monitor everything
- Measure performance
- Learn from failures
- Iterate and improve
- Embrace feedback

## CI/CD Pipeline Best Practices

### Pipeline Stages
```yaml
# Typical CI/CD pipeline
stages:
  - build      # Compile, bundle, containerize
  - test       # Unit, integration, security tests
  - analyze    # Code quality, security scanning
  - deploy-dev # Deploy to development
  - deploy-stg # Deploy to staging
  - deploy-prd # Deploy to production
```

### Build Stage
- Use deterministic builds
- Cache dependencies
- Minimize build time
- Version artifacts
- Store build logs

### Test Stage
- Run unit tests first
- Include integration tests
- Add security scanning
- Check code coverage
- Fail fast on errors

### Deploy Stage
- Use immutable infrastructure
- Implement blue-green or canary deployments
- Automate rollbacks
- Verify deployments
- Monitor after deploy

## GitHub Actions

### Workflow Structure
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
```

### Best Practices
- Use specific action versions
- Cache dependencies
- Use secrets for sensitive data
- Limit workflow permissions
- Use matrix builds for multiple environments

## Infrastructure as Code

### Terraform Best Practices
```hcl
# Use modules for reusability
module "vpc" {
  source  = "./modules/vpc"
  
  name    = var.project_name
  cidr    = var.vpc_cidr
  tags    = local.common_tags
}

# Use variables for flexibility
variable "environment" {
  description = "Deployment environment"
  type        = string
}

# Use outputs for visibility
output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}
```

### IaC Principles
- Version control everything
- Use modules for reusability
- Implement state management
- Plan before applying
- Review changes before apply

## Container Best Practices

### Dockerfile Guidelines
```dockerfile
# Use specific base image versions
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Run as non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser
USER appuser

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
```

### Container Security
- Use minimal base images
- Scan for vulnerabilities
- Don't run as root
- Use multi-stage builds
- Limit container resources

## Monitoring and Observability

### Three Pillars
1. **Metrics**: Quantitative measurements
2. **Logs**: Event records
3. **Traces**: Request flow tracking

### Key Metrics to Monitor
- Response time / latency
- Error rate
- Request throughput
- Resource utilization
- Queue depths

### Alerting Rules
- Alert on symptoms, not causes
- Set appropriate thresholds
- Avoid alert fatigue
- Include runbooks
- Test alerts regularly

## Deployment Strategies

### Blue-Green Deployment
```
┌─────────┐     ┌─────────┐
│  Blue   │     │  Green  │
│ (Live)  │     │ (New)   │
└────┬────┘     └────┬────┘
     │               │
     └───────┬───────┘
             │
       ┌─────┴─────┐
       │  Load     │
       │ Balancer  │
       └───────────┘
```

### Canary Deployment
- Deploy to small subset first
- Monitor for issues
- Gradually increase traffic
- Roll back if problems
- Full rollout when stable

### Rolling Deployment
- Update instances incrementally
- Maintain availability
- Easy rollback
- Slower than blue-green

## Environment Management

### Environment Parity
- Keep environments similar
- Use same tools across environments
- Automate environment setup
- Document differences

### Environment Variables
```bash
# Use clear naming conventions
DATABASE_URL=postgres://...
API_KEY=...
LOG_LEVEL=info
ENVIRONMENT=production

# Store in secure vault
# Never commit to repository
```

## Backup and Recovery

### Backup Rules
- Automate backups
- Test restoration regularly
- Store offsite
- Encrypt backup data
- Document procedures

### Disaster Recovery
- Define RPO and RTO
- Document recovery procedures
- Test regularly
- Maintain runbooks
- Train team

## Documentation

### Runbooks Template
```markdown
# Runbook: [Service/Component]

## Overview
What this service does.

## Architecture
Diagram and description.

## Dependencies
What this service depends on.

## Common Issues

### Issue 1: [Description]
**Symptoms**: What you see
**Cause**: Why it happens
**Resolution**: How to fix

## Deployment
How to deploy this service.

## Rollback
How to rollback if needed.

## Contacts
Who to contact for help.
```

## Security in DevOps

### Secure Pipeline
- Scan dependencies
- Run security tests
- Sign artifacts
- Verify deployments
- Audit access

### Secrets Management
- Use vault solutions
- Rotate secrets regularly
- Limit secret access
- Audit secret usage
- Never log secrets
