# Examples

Example configurations and usage patterns for the rules.d repository.

## MCP Server Configuration

### Claude Desktop

Add to your Claude config file:

```json
{
  "mcpServers": {
    "rules-d": {
      "command": "node",
      "args": ["/absolute/path/to/rules.d/dist/mcp/server.js"]
    }
  }
}
```

## CLI Examples

```bash
# List all Python rules
node dist/cli/index.js list --language python

# Get recommendations for React development
node dist/cli/index.js recommend --type coding --language javascript --framework react

# Search for security rules
node dist/cli/index.js search "security"

# View common bundles
node dist/cli/index.js bundles
```

See [MCP Server Guide](../docs/mcp-server-guide.md) for more examples.
