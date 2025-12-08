# Go Development Rules

Specific rules for AI agents working with Go code.

## Code Organization

### Package Structure
```go
// Package declaration at the top
package main

// Imports organized by groups
import (
    // Standard library
    "context"
    "fmt"
    "log"
    
    // Third-party packages
    "github.com/gorilla/mux"
    "github.com/lib/pq"
    
    // Internal packages
    "myapp/internal/handler"
    "myapp/internal/model"
)
```

## Naming Conventions

### Variables and Functions
```go
// Use camelCase for unexported names
var myVariable int
func calculateTotal() int { }

// Use PascalCase for exported names
var MyExportedVariable int
func CalculateTotal() int { }

// Constants
const MaxConnections = 100
const (
    StatusPending = "pending"
    StatusActive  = "active"
)

// Acronyms should be consistent
func ServeHTTP()  // Good
func ServeHttp()  // Bad
```

## Error Handling

### Always Check Errors
```go
// Good - check errors immediately
result, err := doSomething()
if err != nil {
    return fmt.Errorf("doing something: %w", err)
}

// Use %w to wrap errors for proper error chains
if err := process(); err != nil {
    return fmt.Errorf("processing failed: %w", err)
}

// Custom errors
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}
```

## Interfaces

### Keep Interfaces Small
```go
// Good - small, focused interfaces
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// Accept interfaces, return structs
func ProcessData(r Reader) (*Result, error) {
    // implementation
}
```

## Concurrency

### Goroutines and Channels
```go
// Use goroutines for concurrent operations
go func() {
    result := longRunningOperation()
    resultChan <- result
}()

// Use channels for communication
ch := make(chan int, 10) // buffered channel

// Use context for cancellation
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

// Use sync.WaitGroup for coordination
var wg sync.WaitGroup
for _, item := range items {
    wg.Add(1)
    go func(item Item) {
        defer wg.Done()
        process(item)
    }(item)
}
wg.Wait()

// Use sync.Mutex for shared state
type SafeCounter struct {
    mu    sync.Mutex
    count int
}

func (c *SafeCounter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}
```

## Testing

### Table-Driven Tests
```go
func TestCalculate(t *testing.T) {
    tests := []struct {
        name     string
        input    int
        expected int
        wantErr  bool
    }{
        {"positive number", 5, 25, false},
        {"zero", 0, 0, false},
        {"negative", -1, 0, true},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := Calculate(tt.input)
            if (err != nil) != tt.wantErr {
                t.Errorf("Calculate() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if got != tt.expected {
                t.Errorf("Calculate() = %v, want %v", got, tt.expected)
            }
        })
    }
}
```

## Documentation

### Package and Function Comments
```go
// Package mypackage provides utilities for data processing.
// It includes functions for validation, transformation, and storage.
package mypackage

// ProcessData processes the input data and returns a result.
// It validates the input, transforms it according to the rules,
// and stores it in the database.
//
// Returns an error if validation fails or database operation fails.
func ProcessData(input *Data) (*Result, error) {
    // implementation
}
```

## Best Practices

### Use defer for cleanup
```go
func readFile(path string) error {
    f, err := os.Open(path)
    if err != nil {
        return err
    }
    defer f.Close() // Always close file
    
    // process file
    return nil
}
```

### Use struct embedding
```go
type Base struct {
    ID   int
    Name string
}

type Extended struct {
    Base  // Embedding
    Extra string
}
```

### Initialize with constructors
```go
type Config struct {
    Host string
    Port int
}

// NewConfig creates a new Config with sensible defaults
func NewConfig() *Config {
    return &Config{
        Host: "localhost",
        Port: 8080,
    }
}
```

## Performance

1. Use pointers for large structs to avoid copying
2. Reuse buffers with sync.Pool
3. Profile with pprof before optimizing
4. Use benchmarks for performance-critical code
5. Avoid premature optimization

## Security

1. Validate all external input
2. Use crypto/rand for cryptographic operations
3. Never ignore errors from Close()
4. Use prepared statements for SQL
5. Implement timeouts for network operations
