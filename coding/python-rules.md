# Python Development Rules

Specific rules for AI agents working with Python code.

## Style and Formatting

### PEP 8 Compliance
- Maximum line length: 88 characters (Black default) or 79 (strict PEP 8)
- Use 4 spaces for indentation
- Two blank lines between top-level definitions
- One blank line between method definitions
- Imports at the top of the file

### Import Organization
```python
# Standard library imports
import os
import sys
from typing import List, Optional

# Third-party imports
import requests
import pandas as pd

# Local imports
from mymodule import myfunction
```

### Naming Conventions
```python
# Variables and functions: snake_case
user_name = "john"
def calculate_total():
    pass

# Classes: PascalCase
class UserAccount:
    pass

# Constants: UPPER_SNAKE_CASE
MAX_CONNECTIONS = 100

# Private: leading underscore
_internal_variable = "private"
def _helper_function():
    pass
```

## Type Hints

### Always Use Type Hints
```python
from typing import List, Dict, Optional, Union, Callable

def process_user(user_id: int, name: str) -> dict:
    """Process user information."""
    return {"id": user_id, "name": name}

def get_users(limit: Optional[int] = None) -> List[dict]:
    """Get list of users."""
    pass

def transform(data: List[str], func: Callable[[str], str]) -> List[str]:
    """Apply transformation function to data."""
    return [func(item) for item in data]
```

## Documentation

### Docstrings
```python
def complex_function(param1: str, param2: int, optional: bool = False) -> dict:
    """Brief description of function.
    
    Longer description if needed, explaining the purpose,
    behavior, and any important details.
    
    Args:
        param1: Description of first parameter.
        param2: Description of second parameter.
        optional: Description of optional parameter. Defaults to False.
    
    Returns:
        Description of return value.
    
    Raises:
        ValueError: When param2 is negative.
        TypeError: When param1 is not a string.
    
    Example:
        >>> result = complex_function("test", 42)
        >>> print(result)
        {'status': 'success'}
    """
    pass
```

## Error Handling

### Exception Handling
```python
# Be specific about exceptions
try:
    result = risky_operation()
except ValueError as e:
    logger.error(f"Invalid value: {e}")
    raise
except FileNotFoundError as e:
    logger.warning(f"File not found: {e}")
    return None
except Exception as e:
    logger.exception("Unexpected error")
    raise

# Use context managers
with open("file.txt") as f:
    content = f.read()

# Custom exceptions
class CustomError(Exception):
    """Description of custom error."""
    pass
```

## Best Practices

### Use Context Managers
```python
# Files
with open("file.txt", "r") as f:
    data = f.read()

# Database connections
with database.connect() as conn:
    conn.execute(query)

# Locks
with threading.Lock():
    critical_section()
```

### Use F-strings
```python
# Good
message = f"User {username} logged in at {timestamp}"

# Avoid
message = "User %s logged in at %s" % (username, timestamp)
message = "User {} logged in at {}".format(username, timestamp)
```

### Use List Comprehensions
```python
# Good
squares = [x**2 for x in range(10)]
filtered = [x for x in items if x.is_valid]

# Keep comprehensions simple - use loops for complex logic
```

### Use Dataclasses for Data Structures
```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    age: Optional[int] = None
```

## Testing

### Use pytest
```python
import pytest

def test_function_normal_case():
    """Test function with normal input."""
    result = my_function("input")
    assert result == "expected"

def test_function_edge_case():
    """Test function with edge case."""
    result = my_function("")
    assert result is None

def test_function_raises_error():
    """Test function raises error for invalid input."""
    with pytest.raises(ValueError, match="Invalid"):
        my_function(None)

@pytest.fixture
def sample_data():
    """Fixture providing sample data."""
    return {"key": "value"}

def test_with_fixture(sample_data):
    """Test using fixture."""
    assert "key" in sample_data
```

## Virtual Environments

```bash
# Create virtual environment
python -m venv venv

# Activate (Unix)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Freeze dependencies
pip freeze > requirements.txt
```

## Common Patterns

### Singleton
```python
class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

### Factory
```python
def create_handler(handler_type: str) -> Handler:
    handlers = {
        "file": FileHandler,
        "database": DatabaseHandler,
        "api": APIHandler,
    }
    handler_class = handlers.get(handler_type)
    if handler_class is None:
        raise ValueError(f"Unknown handler type: {handler_type}")
    return handler_class()
```

## Security

1. Never use `eval()` or `exec()` with untrusted input
2. Use `secrets` module for cryptographic operations
3. Sanitize file paths
4. Use parameterized queries for databases
5. Validate all external input
