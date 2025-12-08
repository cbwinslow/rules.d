# C# Development Rules

Specific rules for AI agents working with C# code.

## Code Organization

### Namespace and Using Directives
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Third-party
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

// Internal
using MyApp.Models;
using MyApp.Services;

namespace MyApp.Services
{
    public class UserService
    {
        // class implementation
    }
}
```

## Naming Conventions

### Microsoft Naming Guidelines
```csharp
// Classes, methods, properties: PascalCase
public class UserAccount { }
public void CalculateTotal() { }
public string UserName { get; set; }

// Local variables, parameters: camelCase
int itemCount;
void ProcessItem(string itemName) { }

// Private fields: _camelCase (with underscore)
private string _userName;
private readonly ILogger _logger;

// Constants: PascalCase
public const int MaxConnections = 100;

// Interfaces: I prefix
public interface IUserService { }
```

## Properties and Fields

### Auto-Properties and Expression Bodies
```csharp
// Auto-implemented properties
public string Name { get; set; }
public int Age { get; private set; }

// Expression-bodied properties
public string FullName => $"{FirstName} {LastName}";

// Init-only properties (C# 9.0+)
public record User
{
    public int Id { get; init; }
    public string Name { get; init; }
}

// Property with backing field
private string _email;
public string Email
{
    get => _email;
    set
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Email cannot be empty");
        _email = value;
    }
}
```

## Modern C# Features

### Records (C# 9.0+)
```csharp
// Immutable record
public record User(int Id, string Name, string Email);

// Record with additional members
public record Product(int Id, string Name, decimal Price)
{
    public decimal DiscountedPrice => Price * 0.9m;
}

// With expressions for non-destructive mutation
var user1 = new User(1, "John", "john@example.com");
var user2 = user1 with { Name = "Jane" };
```

### Pattern Matching
```csharp
// Type patterns
if (obj is string str)
{
    Console.WriteLine(str.ToUpper());
}

// Switch expressions
string result = status switch
{
    Status.Pending => "Waiting",
    Status.Active => "Running",
    Status.Completed => "Done",
    _ => "Unknown"
};

// Property patterns
bool isAdult = person switch
{
    { Age: >= 18 } => true,
    _ => false
};

// Relational patterns
string category = value switch
{
    < 0 => "Negative",
    0 => "Zero",
    > 0 and <= 10 => "Small",
    > 10 => "Large"
};
```

### Nullable Reference Types (C# 8.0+)
```csharp
// Enable in project file
// <Nullable>enable</Nullable>

// Nullable reference type
string? nullableString = null;

// Non-nullable reference type
string nonNullableString = "value";

// Null-forgiving operator
string value = nullableString!;

// Null-conditional operator
int? length = nullableString?.Length;

// Null-coalescing operator
string result = nullableString ?? "default";
```

## Async/Await

### Asynchronous Programming
```csharp
// Async method
public async Task<User> GetUserAsync(int id)
{
    using var client = new HttpClient();
    var response = await client.GetAsync($"/api/users/{id}");
    response.EnsureSuccessStatusCode();
    
    var content = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<User>(content);
}

// Async with cancellation
public async Task<List<User>> GetUsersAsync(CancellationToken cancellationToken)
{
    var users = await _dbContext.Users
        .ToListAsync(cancellationToken);
    return users;
}

// Task.WhenAll for parallel operations
var tasks = new[]
{
    GetUserAsync(1),
    GetUserAsync(2),
    GetUserAsync(3)
};
var users = await Task.WhenAll(tasks);

// ValueTask for hot paths
public async ValueTask<int> GetCachedValueAsync(string key)
{
    if (_cache.TryGetValue(key, out var value))
        return value;
    
    return await FetchFromDatabaseAsync(key);
}
```

## Error Handling

### Exception Handling
```csharp
// Custom exception
public class UserNotFoundException : Exception
{
    public int UserId { get; }
    
    public UserNotFoundException(int userId)
        : base($"User with ID {userId} was not found")
    {
        UserId = userId;
    }
}

// Try-catch with specific exceptions
public User GetUser(int id)
{
    try
    {
        var user = _repository.FindById(id);
        if (user == null)
            throw new UserNotFoundException(id);
        return user;
    }
    catch (UserNotFoundException)
    {
        _logger.LogWarning("User {UserId} not found", id);
        throw;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error retrieving user {UserId}", id);
        throw;
    }
}

// Using statement (IDisposable)
using (var connection = new SqlConnection(connectionString))
{
    connection.Open();
    // use connection
} // automatically disposed
```

## LINQ

### Language Integrated Query
```csharp
// Method syntax
var adults = users
    .Where(u => u.Age >= 18)
    .OrderBy(u => u.Name)
    .Select(u => new { u.Id, u.Name })
    .ToList();

// Query syntax
var adults = from u in users
             where u.Age >= 18
             orderby u.Name
             select new { u.Id, u.Name };

// GroupBy
var usersByAge = users
    .GroupBy(u => u.Age)
    .ToDictionary(g => g.Key, g => g.ToList());

// Join
var userOrders = from u in users
                 join o in orders on u.Id equals o.UserId
                 select new { u.Name, o.Total };
```

## Dependency Injection

### ASP.NET Core DI
```csharp
// Register services
public void ConfigureServices(IServiceCollection services)
{
    services.AddScoped<IUserService, UserService>();
    services.AddSingleton<IConfiguration>(Configuration);
    services.AddTransient<IEmailSender, EmailSender>();
}

// Constructor injection
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;
    
    public UserController(
        IUserService userService,
        ILogger<UserController> logger)
    {
        _userService = userService;
        _logger = logger;
    }
}
```

## Testing

### xUnit
```csharp
public class UserServiceTests
{
    private readonly Mock<IUserRepository> _mockRepository;
    private readonly UserService _userService;
    
    public UserServiceTests()
    {
        _mockRepository = new Mock<IUserRepository>();
        _userService = new UserService(_mockRepository.Object);
    }
    
    [Fact]
    public async Task GetUserAsync_ValidId_ReturnsUser()
    {
        // Arrange
        var userId = 1;
        var expectedUser = new User(userId, "John", "john@example.com");
        _mockRepository
            .Setup(r => r.GetByIdAsync(userId))
            .ReturnsAsync(expectedUser);
        
        // Act
        var result = await _userService.GetUserAsync(userId);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(expectedUser.Id, result.Id);
        Assert.Equal(expectedUser.Name, result.Name);
    }
    
    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public async Task GetUserAsync_InvalidId_ThrowsException(int userId)
    {
        // Arrange
        _mockRepository
            .Setup(r => r.GetByIdAsync(userId))
            .ThrowsAsync(new ArgumentException());
        
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(
            () => _userService.GetUserAsync(userId));
    }
}
```

## Entity Framework Core

### DbContext
```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.HasIndex(e => e.Email).IsUnique();
        });
        
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId);
    }
}

// Usage
var users = await _dbContext.Users
    .Include(u => u.Orders)
    .Where(u => u.IsActive)
    .ToListAsync();
```

## Best Practices

### Use Expression-Bodied Members
```csharp
// Methods
public int GetTotal() => items.Sum(i => i.Price);

// Properties
public bool IsValid => Age >= 18;

// Constructors
public User(string name) => Name = name;
```

### String Interpolation
```csharp
// Good
string message = $"User {name} has {count} items";

// With formatting
string price = $"Price: {amount:C2}";
string date = $"Date: {DateTime.Now:yyyy-MM-dd}";
```

### Collection Initialization
```csharp
// Collection initializer
var list = new List<string> { "a", "b", "c" };

// Dictionary initializer
var dict = new Dictionary<string, int>
{
    ["one"] = 1,
    ["two"] = 2
};
```

## Performance

1. Use `Span<T>` and `Memory<T>` for high-performance scenarios
2. Use `ValueTask<T>` for frequently-called async methods
3. Use `ArrayPool<T>` for temporary arrays
4. Avoid boxing with generics and value types
5. Use `stackalloc` for small, short-lived arrays

## Security

1. Use parameterized queries (EF Core does this automatically)
2. Validate all input with Data Annotations
3. Use IConfiguration for sensitive settings, never hardcode
4. Use ASP.NET Core's built-in authentication and authorization
5. Enable HTTPS and HSTS
6. Use secrets management (Azure Key Vault, etc.)
