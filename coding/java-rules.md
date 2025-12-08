# Java Development Rules

Specific rules for AI agents working with Java code.

## Code Organization

### Package and Import Structure
```java
package com.example.myapp.service;

// Java standard library
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// Third-party libraries
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

// Internal imports
import com.example.myapp.model.User;
import com.example.myapp.repository.UserRepository;
```

## Naming Conventions

### Variables and Methods
```java
// Variables: camelCase
private String userName;
private int accountBalance;

// Methods: camelCase
public void calculateTotal() { }
public String getUserName() { }

// Classes: PascalCase
public class UserAccount { }

// Constants: UPPER_SNAKE_CASE
public static final int MAX_CONNECTIONS = 100;
public static final String DEFAULT_ENCODING = "UTF-8";

// Interfaces: typically start with 'I' or descriptive names
public interface UserService { }
public interface IHandler { }
```

## Class Design

### SOLID Principles
```java
// Single Responsibility Principle
public class UserValidator {
    public boolean isValid(User user) {
        return user.getName() != null && user.getEmail() != null;
    }
}

public class UserRepository {
    public User save(User user) {
        // database logic
    }
}

// Dependency Injection
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserValidator userValidator;
    
    public User createUser(User user) {
        if (!userValidator.isValid(user)) {
            throw new IllegalArgumentException("Invalid user");
        }
        return userRepository.save(user);
    }
}
```

## Modern Java Features

### Records (Java 14+)
```java
// Immutable data carrier
public record User(Long id, String name, String email) {
    // Compact constructor for validation
    public User {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be blank");
        }
    }
}
```

### Pattern Matching (Java 16+)
```java
// Pattern matching for instanceof
if (obj instanceof String s) {
    System.out.println(s.toUpperCase());
}

// Switch expressions (Java 14+)
String result = switch (status) {
    case PENDING -> "Waiting";
    case ACTIVE -> "Running";
    case COMPLETED -> "Done";
    default -> "Unknown";
};
```

### Text Blocks (Java 15+)
```java
String json = """
    {
        "name": "John",
        "age": 30,
        "email": "john@example.com"
    }
    """;
```

## Optional and Null Safety

### Use Optional
```java
// Return Optional instead of null
public Optional<User> findUserById(Long id) {
    return userRepository.findById(id);
}

// Use Optional methods
Optional<User> user = findUserById(1L);
user.ifPresent(u -> System.out.println(u.getName()));

String name = user
    .map(User::getName)
    .orElse("Unknown");

User result = user
    .orElseThrow(() -> new UserNotFoundException("User not found"));
```

## Error Handling

### Exception Handling
```java
// Custom exceptions
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}

// Try-catch with specific exceptions
public User processUser(Long id) {
    try {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
    } catch (UserNotFoundException e) {
        logger.error("User not found: {}", id, e);
        throw e;
    } catch (Exception e) {
        logger.error("Unexpected error processing user: {}", id, e);
        throw new RuntimeException("Processing failed", e);
    }
}

// Try-with-resources
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    String line = reader.readLine();
    // process line
} catch (IOException e) {
    logger.error("Failed to read file", e);
}
```

## Collections and Streams

### Stream API
```java
// Filter and map
List<String> names = users.stream()
    .filter(user -> user.getAge() > 18)
    .map(User::getName)
    .collect(Collectors.toList());

// Reduce
int totalAge = users.stream()
    .map(User::getAge)
    .reduce(0, Integer::sum);

// GroupBy
Map<String, List<User>> usersByRole = users.stream()
    .collect(Collectors.groupingBy(User::getRole));

// FlatMap
List<String> allEmails = departments.stream()
    .flatMap(dept -> dept.getUsers().stream())
    .map(User::getEmail)
    .collect(Collectors.toList());
```

## Concurrency

### Thread Safety
```java
// Use concurrent collections
private final ConcurrentHashMap<Long, User> cache = new ConcurrentHashMap<>();

// ExecutorService for thread pools
ExecutorService executor = Executors.newFixedThreadPool(10);

executor.submit(() -> {
    // task logic
});

executor.shutdown();

// CompletableFuture for async operations
CompletableFuture<User> future = CompletableFuture.supplyAsync(() -> {
    return fetchUser(id);
});

future.thenApply(user -> user.getName())
      .thenAccept(name -> System.out.println(name));
```

## Testing

### JUnit 5
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void testCreateUser() {
        // Arrange
        User user = new User(null, "John", "john@example.com");
        when(userRepository.save(any(User.class)))
            .thenReturn(new User(1L, "John", "john@example.com"));
        
        // Act
        User result = userService.createUser(user);
        
        // Assert
        assertNotNull(result.getId());
        assertEquals("John", result.getName());
        verify(userRepository).save(user);
    }
    
    @Test
    void testFindUser_NotFound() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> {
            userService.getUser(1L);
        });
    }
    
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "  "})
    void testInvalidName(String name) {
        assertThrows(IllegalArgumentException.class, () -> {
            new User(1L, name, "email@example.com");
        });
    }
}
```

## Spring Boot Specific

### REST Controllers
```java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDto userDto) {
        User user = userService.create(userDto);
        return ResponseEntity
            .created(URI.create("/api/users/" + user.getId()))
            .body(user);
    }
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(UserNotFoundException e) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(e.getMessage()));
    }
}
```

## Lombok Usage

### Common Annotations
```java
@Data  // Generates getters, setters, toString, equals, hashCode
@Builder  // Builder pattern
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private String email;
}

@Slf4j  // Logger
@Service
public class UserService {
    public void processUser(User user) {
        log.info("Processing user: {}", user.getName());
        log.debug("User details: {}", user);
    }
}
```

## Best Practices

### Immutability
```java
// Prefer immutable objects
public final class User {
    private final Long id;
    private final String name;
    
    public User(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    
    // Only getters, no setters
    public Long getId() { return id; }
    public String getName() { return name; }
}
```

### Builder Pattern
```java
public class User {
    private final Long id;
    private final String name;
    private final String email;
    
    private User(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.email = builder.email;
    }
    
    public static class Builder {
        private Long id;
        private String name;
        private String email;
        
        public Builder id(Long id) {
            this.id = id;
            return this;
        }
        
        public Builder name(String name) {
            this.name = name;
            return this;
        }
        
        public Builder email(String email) {
            this.email = email;
            return this;
        }
        
        public User build() {
            return new User(this);
        }
    }
}

// Usage
User user = new User.Builder()
    .id(1L)
    .name("John")
    .email("john@example.com")
    .build();
```

## Performance

1. Use StringBuilder for string concatenation in loops
2. Prefer primitive types over wrapper classes when possible
3. Use lazy initialization for expensive objects
4. Profile with JProfiler or VisualVM before optimizing
5. Use parallel streams for CPU-intensive operations on large datasets

## Security

1. Validate all input with Bean Validation
2. Use parameterized queries to prevent SQL injection
3. Sanitize output to prevent XSS
4. Use strong encryption for sensitive data
5. Keep dependencies updated
6. Never log sensitive information
