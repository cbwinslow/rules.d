# Data Analysis and Processing Rules

Rules for AI agents when working with data analysis, data processing, and data management.

## Core Data Principles

### Data Integrity
- Preserve original data
- Document all transformations
- Validate data at each step
- Handle missing values explicitly
- Maintain data lineage

### Data Quality
- Check for completeness
- Verify accuracy
- Ensure consistency
- Assess timeliness
- Validate uniqueness

### Data Security
- Handle sensitive data carefully
- Follow data classification rules
- Implement access controls
- Encrypt where required
- Audit data access

## Data Processing Pipeline

### 1. Data Ingestion
- Validate data format
- Check data structure
- Log ingestion metadata
- Handle errors gracefully
- Preserve raw data

### 2. Data Cleaning
- Identify missing values
- Handle duplicates
- Correct errors
- Standardize formats
- Document cleaning steps

### 3. Data Transformation
- Apply business logic
- Create derived fields
- Aggregate as needed
- Normalize/denormalize
- Version transformations

### 4. Data Validation
- Check business rules
- Verify constraints
- Compare against expectations
- Log validation results
- Handle exceptions

### 5. Data Output
- Format appropriately
- Include metadata
- Document output
- Verify delivery
- Archive results

## Data Analysis Process

### Exploratory Data Analysis (EDA)
```python
# Standard EDA steps
1. Understand data structure
   - Shape (rows, columns)
   - Data types
   - Column names

2. Summary statistics
   - Mean, median, mode
   - Standard deviation
   - Min, max, range

3. Missing values
   - Count missing
   - Pattern of missing
   - Handle missing

4. Distributions
   - Histograms
   - Box plots
   - Density plots

5. Correlations
   - Correlation matrix
   - Scatter plots
   - Relationship analysis
```

### Statistical Analysis
- Choose appropriate tests
- Check assumptions
- Report effect sizes
- Include confidence intervals
- Document methodology

### Visualization Best Practices
- Choose right chart type
- Label axes clearly
- Include legends
- Use consistent colors
- Add context/annotations

## Common Chart Types

| Data Relationship | Recommended Chart |
|------------------|-------------------|
| Comparison | Bar chart, grouped bar |
| Trend over time | Line chart, area chart |
| Distribution | Histogram, box plot |
| Correlation | Scatter plot, bubble |
| Composition | Pie chart, stacked bar |
| Part-to-whole | Treemap, donut |

## SQL Best Practices

### Query Writing
```sql
-- Use clear, readable formatting
SELECT 
    u.user_id,
    u.user_name,
    COUNT(o.order_id) AS order_count,
    SUM(o.total_amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.user_id, u.user_name
HAVING COUNT(o.order_id) > 0
ORDER BY total_spent DESC
LIMIT 100;
```

### Query Optimization
- Use indexes appropriately
- Avoid SELECT *
- Filter early
- Use appropriate JOINs
- Explain and analyze queries

## Data File Formats

### CSV
```
# Use for:
- Simple tabular data
- Data exchange
- Human-readable format

# Rules:
- Include header row
- Use consistent delimiters
- Escape special characters
- Handle newlines in values
```

### JSON
```json
// Use for:
// - Hierarchical data
// - API responses
// - Configuration

// Rules:
// - Validate JSON structure
// - Use meaningful keys
// - Handle nested structures
// - Consider size limits
```

### Parquet/Columnar
```
# Use for:
- Large datasets
- Analytics workloads
- Data warehousing

# Rules:
- Choose appropriate compression
- Partition strategically
- Consider schema evolution
```

## Data Documentation

### Dataset Documentation
```markdown
# Dataset: [Name]

## Overview
Description of the dataset.

## Source
Where the data comes from.

## Schema
| Column | Type | Description | Example |
|--------|------|-------------|---------|
| id | integer | Unique identifier | 123 |
| name | string | Full name | "John Doe" |

## Quality Notes
- Known issues or limitations
- Missing value patterns
- Update frequency

## Usage
How to access and use this data.
```

## Error Handling

### Data Errors
- Log all errors with context
- Don't silently drop records
- Quarantine bad data
- Report error rates
- Investigate patterns

### Processing Errors
- Implement retry logic
- Set appropriate timeouts
- Handle partial failures
- Maintain idempotency
- Alert on failures

## Performance Guidelines

### Large Datasets
- Use streaming/chunking
- Optimize memory usage
- Parallelize when possible
- Use appropriate tools
- Monitor resource usage

### Query Performance
- Index key columns
- Partition large tables
- Optimize JOIN order
- Use materialized views
- Cache frequently accessed data
