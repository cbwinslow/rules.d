# Rust Development Rules

Specific rules for AI agents working with Rust code.

## Code Organization

### Module Structure
```rust
// lib.rs or main.rs
mod config;
mod handler;
mod model;

// Use statements
use std::collections::HashMap;
use std::fs::File;
use std::io::{self, Read};

// External crates
use serde::{Deserialize, Serialize};
use tokio::runtime::Runtime;
```

## Naming Conventions

### Variables and Functions
```rust
// Use snake_case for variables and functions
let user_name = "John";
fn calculate_total() -> i32 { }

// Use PascalCase for types
struct UserAccount { }
enum Status { }
trait Handler { }

// Constants in SCREAMING_SNAKE_CASE
const MAX_CONNECTIONS: usize = 100;
```

## Ownership and Borrowing

### Follow Ownership Rules
```rust
// Move semantics
let s1 = String::from("hello");
let s2 = s1; // s1 is moved to s2

// Borrowing
fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but since it doesn't own the data, nothing happens

let s1 = String::from("hello");
let len = calculate_length(&s1);

// Mutable borrowing
fn change(s: &mut String) {
    s.push_str(", world");
}

let mut s = String::from("hello");
change(&mut s);
```

## Error Handling

### Use Result and Option
```rust
// Result for operations that can fail
fn read_config(path: &str) -> Result<Config, io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(serde_json::from_str(&contents)?)
}

// Option for nullable values
fn find_user(id: u32) -> Option<User> {
    users.iter().find(|u| u.id == id).cloned()
}

// Custom errors
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("IO error: {0}")]
    Io(#[from] io::Error),
    
    #[error("Parse error: {0}")]
    Parse(String),
    
    #[error("Not found: {0}")]
    NotFound(String),
}
```

## Pattern Matching

### Exhaustive Matching
```rust
// Match on enums
match status {
    Status::Pending => process_pending(),
    Status::Active => process_active(),
    Status::Completed => process_completed(),
}

// Match with guards
match value {
    x if x < 0 => println!("negative"),
    0 => println!("zero"),
    x => println!("positive: {}", x),
}

// if let for single pattern
if let Some(user) = find_user(42) {
    println!("Found: {}", user.name);
}
```

## Traits

### Define and Implement Traits
```rust
// Define a trait
pub trait Summary {
    fn summarize(&self) -> String;
    
    // Default implementation
    fn summarize_default(&self) -> String {
        String::from("(Read more...)")
    }
}

// Implement trait
impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}, by {}", self.headline, self.author)
    }
}

// Trait bounds
fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// Multiple trait bounds
fn process<T: Summary + Display>(item: &T) { }
```

## Lifetimes

### Explicit Lifetimes
```rust
// Basic lifetime annotation
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

// Struct with lifetime
struct ImportantExcerpt<'a> {
    part: &'a str,
}

// Multiple lifetimes
fn complex<'a, 'b>(x: &'a str, y: &'b str) -> &'a str {
    x
}
```

## Concurrency

### Safe Concurrent Programming
```rust
use std::sync::{Arc, Mutex};
use std::thread;

// Shared state with Arc and Mutex
let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
    let counter = Arc::clone(&counter);
    let handle = thread::spawn(move || {
        let mut num = counter.lock().unwrap();
        *num += 1;
    });
    handles.push(handle);
}

for handle in handles {
    handle.join().unwrap();
}

// Channels for message passing
use std::sync::mpsc;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    tx.send(String::from("message")).unwrap();
});

let received = rx.recv().unwrap();
```

## Testing

### Unit and Integration Tests
```rust
// Unit tests in the same file
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }

    #[test]
    fn test_divide() {
        let result = divide(10, 2);
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), 5);
    }

    #[test]
    #[should_panic(expected = "divide by zero")]
    fn test_divide_by_zero() {
        divide(10, 0).unwrap();
    }
}

// Benchmarks (requires nightly or criterion)
#[bench]
fn bench_function(b: &mut Bencher) {
    b.iter(|| {
        // code to benchmark
    });
}
```

## Memory Management

### Smart Pointers
```rust
// Box for heap allocation
let b = Box::new(5);

// Rc for multiple ownership
use std::rc::Rc;
let a = Rc::new(5);
let b = Rc::clone(&a);

// RefCell for interior mutability
use std::cell::RefCell;
let value = RefCell::new(5);
*value.borrow_mut() += 1;
```

## Best Practices

### Use derive for common traits
```rust
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct User {
    pub id: u32,
    pub name: String,
    pub email: String,
}
```

### Use iterators
```rust
// Good - use iterator chains
let sum: i32 = numbers
    .iter()
    .filter(|&&x| x > 0)
    .map(|&x| x * 2)
    .sum();

// Avoid collecting unnecessarily
```

### Avoid unwrap in production
```rust
// Good - handle errors properly
let config = read_config("config.toml")
    .expect("Failed to read config");

// Better - propagate errors
let config = read_config("config.toml")?;
```

## Performance

1. Use `cargo build --release` for optimized builds
2. Profile with `cargo flamegraph`
3. Use `#[inline]` for hot functions
4. Consider using `&str` instead of `String` when possible
5. Use `Vec::with_capacity` when size is known

## Security

1. Validate all external input
2. Use `secrecy` crate for sensitive data
3. Avoid `unsafe` code unless necessary
4. Use `#![forbid(unsafe_code)]` when possible
5. Keep dependencies updated with `cargo audit`
