# JavaScript/TypeScript Development Rules

Specific rules for AI agents working with JavaScript and TypeScript code.

## TypeScript Preferences

### Always Prefer TypeScript
- Use TypeScript for new projects when possible
- Add type definitions to JavaScript projects
- Enable strict mode in tsconfig.json

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "target": "ES2020",
    "module": "commonjs"
  }
}
```

## Variables and Declarations

### Use const and let
```typescript
// Good - use const by default
const userName = "john";
const config = { debug: true };

// Use let when reassignment is needed
let count = 0;
count += 1;

// Never use var
```

### Type Annotations
```typescript
// Variables
const name: string = "John";
const age: number = 30;
const isActive: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];
const items: Array<string> = ["a", "b", "c"];

// Objects
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

const user: User = {
  id: 1,
  name: "John",
};
```

## Functions

### Function Declarations
```typescript
// Named function with types
function calculateTotal(items: Item[], tax: number): number {
  return items.reduce((sum, item) => sum + item.price, 0) * (1 + tax);
}

// Arrow function
const add = (a: number, b: number): number => a + b;

// Function with optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// Function with default parameters
function createUser(name: string, role: string = "user"): User {
  return { name, role };
}
```

### Async/Await
```typescript
// Always use async/await over raw promises
async function fetchUser(id: number): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}

// Parallel operations
async function fetchAll(): Promise<[User[], Product[]]> {
  return Promise.all([
    fetchUsers(),
    fetchProducts(),
  ]);
}
```

## Error Handling

### Try-Catch with Types
```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

async function processData(data: unknown): Promise<Result> {
  try {
    const validated = validateData(data);
    return await saveData(validated);
  } catch (error) {
    if (error instanceof AppError) {
      console.error(`App error [${error.code}]: ${error.message}`);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }
}
```

## Objects and Interfaces

### Interface Definitions
```typescript
// Use interfaces for object shapes
interface UserProfile {
  id: number;
  name: string;
  email: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
  language: string;
}

// Use type for unions and complex types
type Status = "pending" | "active" | "completed";
type Handler = (event: Event) => void;
type Result<T> = { success: true; data: T } | { success: false; error: string };
```

### Object Manipulation
```typescript
// Destructuring
const { name, email } = user;
const [first, second, ...rest] = items;

// Spread operator
const updated = { ...user, name: "New Name" };
const combined = [...array1, ...array2];

// Optional chaining
const city = user?.address?.city;
const value = map.get(key)?.property;

// Nullish coalescing
const displayName = user.name ?? "Anonymous";
```

## Arrays

### Array Methods
```typescript
// Use appropriate array methods
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
const hasNegative = numbers.some((n) => n < 0);
const allPositive = numbers.every((n) => n > 0);
const found = items.find((item) => item.id === targetId);

// Avoid mutating original arrays
const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
```

## Modules

### Import/Export
```typescript
// Named exports
export function helper(): void {}
export const CONSTANT = "value";
export interface Config {}

// Default export
export default class Service {}

// Imports
import Service from "./service";
import { helper, CONSTANT } from "./utils";
import type { Config } from "./types";
```

## Testing

### Jest/Testing Library
```typescript
import { render, screen, fireEvent } from "@testing-library/react";

describe("Component", () => {
  it("should render correctly", () => {
    render(<Component />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("should handle click", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);
    
    fireEvent.click(screen.getByRole("button"));
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## React Specific

### Functional Components
```typescript
interface Props {
  title: string;
  onAction: () => void;
  children?: React.ReactNode;
}

const MyComponent: React.FC<Props> = ({ title, onAction, children }) => {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
    onAction();
  }, [onAction]);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Count: {count}</button>
      {children}
    </div>
  );
};
```

## Node.js Specific

### Environment Variables
```typescript
// Use process.env with validation
const PORT = parseInt(process.env.PORT || "3000", 10);
const NODE_ENV = process.env.NODE_ENV || "development";

// Never commit .env files
// Use .env.example as a template
```

### File System
```typescript
import { promises as fs } from "fs";
import path from "path";

async function readConfig(): Promise<Config> {
  const configPath = path.join(__dirname, "config.json");
  const content = await fs.readFile(configPath, "utf-8");
  return JSON.parse(content);
}
```

## Security

1. Never use `eval()` or `new Function()` with user input
2. Sanitize HTML to prevent XSS
3. Use HTTPS for all external requests
4. Validate and sanitize all user input
5. Use environment variables for secrets
6. Keep dependencies updated
