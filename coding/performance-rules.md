# Performance Optimization Rules

Universal rules for AI agents focused on performance optimization across all languages and platforms.

## General Performance Principles

### 1. Measure Before Optimizing
- **Always profile first**: Use appropriate profiling tools before making changes
- **Establish baselines**: Measure performance metrics before optimization
- **Focus on bottlenecks**: Optimize the slowest 20% that causes 80% of issues
- **Avoid premature optimization**: Don't optimize until you have data

### 2. Algorithm Complexity
- **Know Big O notation**: Understand time and space complexity
- **Choose appropriate data structures**: Hash tables for lookups, arrays for sequential access
- **Optimize hot paths**: Focus on frequently executed code
- **Consider trade-offs**: Balance time complexity vs space complexity

## Memory Management

### Reduce Allocations
```
Good practices:
- Reuse objects when possible (object pooling)
- Use stack allocation for short-lived data
- Avoid creating temporary objects in loops
- Use buffer pools for byte arrays
- Clear collections instead of creating new ones
```

### Memory Leaks Prevention
```
- Release resources explicitly (close files, connections)
- Unsubscribe from events when done
- Weak references for caching
- Monitor memory usage in production
- Use memory profilers to detect leaks
```

## Database Performance

### Query Optimization
```sql
-- Use indexes on columns in WHERE, JOIN, ORDER BY
CREATE INDEX idx_users_email ON users(email);

-- Avoid SELECT *, specify needed columns
SELECT id, name, email FROM users WHERE active = true;

-- Use LIMIT for pagination
SELECT * FROM users ORDER BY created_at DESC LIMIT 100 OFFSET 200;

-- Use prepared statements
PREPARE user_query AS SELECT * FROM users WHERE id = $1;
```

### N+1 Query Problem
```
Bad: Loading related data in a loop
for user in users:
    orders = fetch_orders(user.id)  # N queries

Good: Use eager loading / joins
users_with_orders = fetch_users_with_orders()  # 1 query
```

### Connection Pooling
```
- Reuse database connections
- Configure appropriate pool size (typically 10-50)
- Use timeout settings
- Monitor active connections
```

## Network Performance

### HTTP Optimization
```
- Use HTTP/2 or HTTP/3 when available
- Enable compression (gzip, brotli)
- Implement caching headers (Cache-Control, ETag)
- Use CDN for static assets
- Implement connection keep-alive
- Bundle and minify assets
```

### API Design
```
- Implement pagination for large datasets
- Use GraphQL or field selection to reduce payload
- Enable compression on responses
- Use appropriate HTTP methods and status codes
- Implement rate limiting
```

## Caching Strategies

### Cache Layers
```
1. Browser cache: Static assets
2. CDN cache: Distributed content
3. Application cache: In-memory data (Redis, Memcached)
4. Database cache: Query results
5. CPU cache: Hot data in L1/L2/L3
```

### Cache Patterns
```
- Cache-aside: Check cache, load from DB if miss
- Write-through: Write to cache and DB simultaneously
- Write-behind: Write to cache, async write to DB
- TTL (Time To Live): Expire cache after duration
- Cache invalidation: Clear when data changes
```

## Concurrency and Parallelism

### Parallel Processing
```
- Use thread pools, not individual threads
- Parallelize independent operations
- Use async I/O for I/O-bound operations
- Use parallel processing for CPU-bound operations
- Be mindful of context switching overhead
```

### Avoiding Contention
```
- Minimize shared mutable state
- Use lock-free data structures when possible
- Reduce critical section size
- Use read-write locks for read-heavy workloads
- Consider thread-local storage
```

## Frontend Performance

### JavaScript Optimization
```javascript
// Debounce frequent events
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Use requestAnimationFrame for animations
function animate() {
    // animation logic
    requestAnimationFrame(animate);
}

// Lazy load images
<img loading="lazy" src="image.jpg" alt="description">
```

### Bundle Optimization
```
- Code splitting: Load only needed code
- Tree shaking: Remove unused code
- Minification: Reduce file size
- Lazy loading: Load components on demand
- Dynamic imports: Load modules when needed
```

### Rendering Performance
```
- Minimize DOM manipulations
- Use virtual DOM frameworks efficiently
- Batch DOM updates
- Use CSS transforms for animations
- Implement virtualization for long lists
```

## Data Structures and Algorithms

### Choose Right Data Structure
```
Lookups:
- Hash table/Map: O(1) average
- Binary search tree: O(log n)
- Array (unsorted): O(n)

Ordered data:
- Balanced BST: O(log n) operations
- Sorted array: O(log n) search, O(n) insert

Frequency counting:
- Hash map with counters

Range queries:
- Segment tree
- Fenwick tree
```

### Common Optimizations
```
1. Two-pointer technique for array problems
2. Sliding window for substring problems
3. Dynamic programming for overlapping subproblems
4. Memoization for recursive functions
5. Binary search for sorted data
```

## I/O Performance

### File Operations
```
- Use buffered I/O
- Read/write in chunks
- Use memory-mapped files for large files
- Implement async I/O for non-blocking operations
- Batch write operations
```

### Serialization
```
- Use binary formats (Protocol Buffers, MessagePack)
- Avoid text formats for large data (JSON, XML)
- Compress data before transmission
- Use streaming for large payloads
- Consider zero-copy serialization
```

## Compiler and Runtime Optimizations

### Compilation Flags
```
C/C++: -O2, -O3 for optimization
Java: -server flag, JIT compilation
Python: Use PyPy for performance-critical code
Rust: --release flag
Go: Use -ldflags for optimization
```

### JIT and Runtime
```
- Warm up JIT compiler with representative workload
- Use inline hints for hot functions
- Avoid reflection in hot paths
- Use native extensions for CPU-intensive tasks
```

## Monitoring and Profiling

### Key Metrics
```
- Response time (p50, p95, p99)
- Throughput (requests per second)
- Error rate
- CPU utilization
- Memory usage
- Database query time
- Cache hit ratio
```

### Profiling Tools
```
- CPU profilers: perf, gprof, pprof
- Memory profilers: valgrind, heaptrack
- Application profilers: JProfiler, VisualVM, py-spy
- Database query analyzers: EXPLAIN, slow query log
- Network tools: tcpdump, Wireshark
```

## Load Testing

### Best Practices
```
- Test with realistic data volumes
- Simulate realistic user patterns
- Test under sustained load
- Test with peak load scenarios
- Monitor resource usage during tests
- Use tools: JMeter, Gatling, k6, Locust
```

## Platform-Specific Optimizations

### Web Browsers
```
- Use Service Workers for offline caching
- Implement resource hints (preload, prefetch, preconnect)
- Optimize Critical Rendering Path
- Reduce reflows and repaints
- Use Web Workers for background processing
```

### Mobile
```
- Minimize battery usage
- Reduce network calls
- Implement efficient background processing
- Use native modules for performance-critical code
- Optimize image sizes and formats
```

### Cloud
```
- Auto-scaling based on load
- Use appropriate instance types
- Implement regional distribution
- Use managed services when appropriate
- Optimize cold start times (serverless)
```

## Anti-Patterns to Avoid

### Performance Killers
```
1. N+1 queries
2. Loading unnecessary data
3. Synchronous I/O in critical paths
4. Excessive logging in production
5. Large transactions
6. Inefficient loops (nested loops on large datasets)
7. Memory leaks
8. Blocking the main thread
9. Unindexed database queries
10. Ignoring cache strategies
```

## Performance Budget

### Set Limits
```
- Page load time: < 3 seconds
- Time to Interactive: < 5 seconds
- Bundle size: < 200KB (gzipped)
- API response time: < 100ms (p95)
- Database query time: < 50ms (p95)
- Memory usage: < 500MB
```

## Best Practices Summary

1. **Measure everything**: You can't improve what you don't measure
2. **Profile before optimizing**: Data-driven decisions
3. **Start with algorithms**: Better algorithm beats micro-optimizations
4. **Cache aggressively**: But invalidate correctly
5. **Async for I/O**: Don't block on I/O operations
6. **Batch operations**: Reduce overhead of individual operations
7. **Use appropriate data structures**: Right tool for the job
8. **Monitor production**: Real-world performance matters
9. **Document optimizations**: Explain why and what was gained
10. **Balance trade-offs**: Performance vs maintainability vs cost
