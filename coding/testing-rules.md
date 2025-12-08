# Testing Best Practices Rules

Universal rules for AI agents focused on software testing across all languages and frameworks.

## Testing Fundamentals

### Test Pyramid
```
             /\
            /E2E\          Few - Slow - High confidence
           /------\
          /  API   \       More - Medium speed
         /----------\
        / Unit Tests \     Many - Fast - Low level
       /--------------\
```

### Testing Principles
1. **Tests should be independent**: Each test runs in isolation
2. **Tests should be repeatable**: Same result every time
3. **Tests should be fast**: Quick feedback loop
4. **Tests should be clear**: Easy to understand what's being tested
5. **Tests should be maintainable**: Easy to update when code changes

## Unit Testing

### Structure Tests with AAA Pattern
```
Arrange: Set up test data and dependencies
Act: Execute the code under test
Assert: Verify the expected outcome

Example (pseudocode):
test "calculateDiscount returns correct value":
    # Arrange
    price = 100
    discountPercent = 10
    
    # Act
    result = calculateDiscount(price, discountPercent)
    
    # Assert
    assert result == 90
```

### Test Naming Conventions
```
Good test names describe:
1. What is being tested
2. Under what conditions
3. What is expected

Examples:
- test_calculate_total_with_valid_items_returns_sum()
- test_user_login_with_invalid_password_returns_error()
- test_empty_cart_checkout_raises_exception()

Patterns:
- [Method]_[Scenario]_[ExpectedBehavior]
- When[Scenario]_Expect[Behavior]
- Should[Behavior]When[Scenario]
```

### What to Test
```
Do test:
✓ Public interfaces and APIs
✓ Edge cases and boundaries
✓ Error conditions and exceptions
✓ Business logic
✓ Complex algorithms
✓ Integration points

Don't test:
✗ Framework code (already tested)
✗ Third-party libraries (trust but verify integration)
✗ Trivial getters/setters
✗ Private methods directly (test through public interface)
```

### Test Coverage
```
Target coverage:
- Critical code: 100% coverage
- Business logic: 80-90% coverage
- Overall application: 70-80% coverage

Coverage metrics:
- Line coverage: Lines of code executed
- Branch coverage: Decision branches taken
- Function coverage: Functions called
- Statement coverage: Statements executed

Note: 100% coverage ≠ bug-free code
Focus on meaningful tests, not just coverage numbers
```

## Test-Driven Development (TDD)

### Red-Green-Refactor Cycle
```
1. Red: Write a failing test
2. Green: Write minimal code to pass the test
3. Refactor: Improve code while keeping tests green

Benefits:
- Better design through testability
- Documentation through tests
- Confidence to refactor
- Faster feedback
```

### TDD Best Practices
```
- Write the test first
- Write the simplest code to pass
- Refactor with confidence
- One test at a time
- Keep tests fast
- Run tests frequently
```

## Integration Testing

### Test Integration Points
```
Integration tests verify:
- Database interactions
- API calls
- Message queues
- File system operations
- External services
- Authentication/authorization

Example:
test "save user to database":
    # Use test database
    db = createTestDatabase()
    
    # Create and save user
    user = User(name="John", email="john@example.com")
    result = userRepository.save(user)
    
    # Verify saved
    assert result.id != null
    savedUser = userRepository.findById(result.id)
    assert savedUser.name == "John"
    
    # Cleanup
    db.cleanup()
```

### Test Doubles
```
Types of test doubles:
1. Dummy: Placeholder object, not used
2. Stub: Returns predefined responses
3. Spy: Records how it was called
4. Mock: Verifies interactions
5. Fake: Working implementation (simpler than real)

When to use:
- Stubs: Control test inputs
- Mocks: Verify interactions
- Fakes: Complex dependencies (databases, APIs)
- Spies: Track behavior without full mocks
```

## End-to-End Testing

### E2E Test Strategy
```
E2E tests verify:
- Complete user workflows
- Critical business paths
- Cross-system integration
- User interface interactions

Keep E2E tests:
- Focused on critical paths
- Few in number (most expensive)
- Stable and reliable
- Independent of each other
```

### E2E Best Practices
```
- Use page object pattern
- Implement proper waits (not sleeps)
- Make tests resilient to UI changes
- Run in CI/CD pipeline
- Use test data factories
- Clean up test data after runs
```

## Testing Strategies by Language

### JavaScript/TypeScript
```javascript
// Jest example
describe('UserService', () => {
  let userService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    };
    userService = new UserService(mockRepository);
  });

  it('should find user by id', async () => {
    const mockUser = { id: 1, name: 'John' };
    mockRepository.findById.mockResolvedValue(mockUser);

    const result = await userService.getUser(1);

    expect(result).toEqual(mockUser);
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
  });
});
```

### Python
```python
# pytest example
import pytest
from unittest.mock import Mock, patch

class TestUserService:
    @pytest.fixture
    def user_service(self):
        repository = Mock()
        return UserService(repository)
    
    def test_get_user_by_id(self, user_service):
        # Arrange
        user_service.repository.find_by_id.return_value = User(id=1, name='John')
        
        # Act
        result = user_service.get_user(1)
        
        # Assert
        assert result.name == 'John'
        user_service.repository.find_by_id.assert_called_once_with(1)
```

### Java
```java
// JUnit 5 + Mockito example
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void getUserById_ValidId_ReturnsUser() {
        // Arrange
        User mockUser = new User(1L, "John");
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        
        // Act
        User result = userService.getUser(1L);
        
        // Assert
        assertEquals("John", result.getName());
        verify(userRepository).findById(1L);
    }
}
```

### Go
```go
// Go testing example
func TestUserService_GetUser(t *testing.T) {
    // Arrange
    mockRepo := &MockUserRepository{}
    service := NewUserService(mockRepo)
    expectedUser := &User{ID: 1, Name: "John"}
    mockRepo.On("FindByID", 1).Return(expectedUser, nil)
    
    // Act
    result, err := service.GetUser(1)
    
    // Assert
    assert.NoError(t, err)
    assert.Equal(t, expectedUser.Name, result.Name)
    mockRepo.AssertExpectations(t)
}
```

## Test Data Management

### Test Data Strategies
```
1. Fixtures: Predefined test data
2. Factories: Generate test data programmatically
3. Builders: Fluent API for creating test objects
4. Object Mother: Centralized test data creation

Example (Builder pattern):
user = UserBuilder()
    .withName("John")
    .withEmail("john@example.com")
    .withRole("admin")
    .build()
```

### Database Testing
```
Best practices:
- Use separate test database
- Reset database between tests
- Use transactions and rollback
- Seed with minimal required data
- Use in-memory database when possible (SQLite, H2)

Migration testing:
- Test database migrations
- Test rollback procedures
- Verify data integrity after migration
```

## API Testing

### REST API Testing
```
Test aspects:
- HTTP status codes
- Response structure
- Response data
- Headers
- Authentication/authorization
- Error handling
- Rate limiting

Example:
test "GET /users/:id returns user":
    response = httpClient.get("/users/1")
    
    assert response.status == 200
    assert response.json.id == 1
    assert response.json.name != null
    assert response.headers["Content-Type"] == "application/json"
```

### Contract Testing
```
Use contract testing for:
- Microservices communication
- API provider/consumer agreements
- Breaking change detection

Tools: Pact, Spring Cloud Contract
```

## Performance Testing

### Types of Performance Tests
```
1. Load testing: Expected normal load
2. Stress testing: Beyond normal capacity
3. Spike testing: Sudden load increases
4. Soak testing: Extended duration
5. Scalability testing: Increasing resources

Metrics to measure:
- Response time (p50, p95, p99)
- Throughput (requests per second)
- Error rate
- Resource utilization (CPU, memory)
```

## Security Testing

### Security Test Checklist
```
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Authentication/authorization
- [ ] Sensitive data handling
- [ ] Rate limiting
- [ ] Dependency vulnerabilities

Tools:
- OWASP ZAP
- Burp Suite
- SonarQube
- npm audit / pip-audit
```

## Test Automation

### CI/CD Integration
```
Automated testing pipeline:
1. Run unit tests on every commit
2. Run integration tests on pull requests
3. Run E2E tests before deployment
4. Run performance tests periodically

Fast feedback:
- Unit tests: < 10 seconds
- Integration tests: < 5 minutes
- E2E tests: < 30 minutes
```

### Continuous Testing
```
Practices:
- Automated test execution
- Parallel test execution
- Test result reporting
- Failed test notifications
- Test flakiness monitoring
- Regular test maintenance
```

## Testing Anti-Patterns

### Avoid These Mistakes
```
1. Testing implementation details
2. Fragile tests (break on small changes)
3. Slow tests
4. Dependent tests (one depends on another)
5. Testing everything (over-testing trivial code)
6. Ignoring failing tests
7. Not testing error cases
8. Tests without assertions
9. Duplicate test code
10. Mystery guest (hidden test dependencies)
```

## Test Maintenance

### Keep Tests Healthy
```
Regular maintenance:
- Remove obsolete tests
- Update tests for new features
- Refactor duplicated test code
- Fix flaky tests immediately
- Document complex test scenarios
- Review test coverage

Code review for tests:
- Tests should be reviewed like production code
- Verify test quality and clarity
- Ensure proper assertions
- Check for good practices
```

## Testing Documentation

### Document Test Strategy
```
Include:
- Testing approach and philosophy
- Test types and coverage goals
- Testing tools and frameworks
- How to run tests locally
- How to write new tests
- Common patterns and utilities
- Troubleshooting guide
```

## Best Practices Summary

1. **Write tests first (TDD)**: Design through testability
2. **Keep tests independent**: No shared state between tests
3. **Test behavior, not implementation**: Focus on what, not how
4. **Make tests readable**: Clear names and structure
5. **Fast feedback**: Keep unit tests fast
6. **Maintain test quality**: Treat test code like production code
7. **Test the right things**: Focus on business logic and integration points
8. **Automate everything**: Run tests in CI/CD
9. **Monitor test health**: Fix flaky tests immediately
10. **Balance coverage**: Aim for meaningful coverage, not 100%

## Testing Checklist

- [ ] Unit tests for business logic
- [ ] Integration tests for external dependencies
- [ ] E2E tests for critical user flows
- [ ] Error case testing
- [ ] Edge case testing
- [ ] Performance testing for critical paths
- [ ] Security testing for vulnerabilities
- [ ] Tests run in CI/CD
- [ ] Test coverage meets goals
- [ ] Tests are maintainable and clear
- [ ] Test data is properly managed
- [ ] Flaky tests are fixed or removed
