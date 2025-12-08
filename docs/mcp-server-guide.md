# MCP Server Guide

This guide explains how to use the rules.d MCP (Model Context Protocol) server to give AI agents access to the universal rules repository.

## What is MCP?

The Model Context Protocol (MCP) is a standardized protocol that allows AI agents to access external data sources and tools. The rules.d MCP server implements this protocol to provide AI agents with programmatic access to all the rules in this repository.

## Installation

### Prerequisites
- Node.js 18 or later
- npm or yarn

### Install from Source

```bash
git clone https://github.com/cbwinslow/rules.d.git
cd rules.d
npm install
npm run build
```

## Running the MCP Server

### Start the Server

```bash
npm start
# or
node dist/mcp/server.js
```

The server runs on stdio (standard input/output) and communicates via JSON-RPC.

### Configure with AI Agents

To use the MCP server with compatible AI agents, add it to your MCP configuration file (usually `~/.mcp/config.json` or similar):

```json
{
  "mcpServers": {
    "rules-d": {
      "command": "node",
      "args": ["/path/to/rules.d/dist/mcp/server.js"],
      "description": "Universal rules repository for AI agents"
    }
  }
}
```

## Available Tools

The MCP server provides the following tools that AI agents can call:

### 1. list_rules

List all available rule files with optional filters.

**Parameters:**
- `category` (optional): Filter by category (general, coding, writing, etc.)
- `language` (optional): Filter by programming language
- `tags` (optional): Array of tags to filter by

**Example:**
```json
{
  "name": "list_rules",
  "arguments": {
    "category": "coding",
    "language": "python"
  }
}
```

### 2. get_rule

Get the full content of a specific rule file.

**Parameters:**
- `ruleId` (required): The ID of the rule to retrieve

**Example:**
```json
{
  "name": "get_rule",
  "arguments": {
    "ruleId": "python-rules"
  }
}
```

### 3. recommend_bundle

Get a recommended bundle of rules for a specific scenario.

**Parameters:**
- `type` (required): Type of task (coding, writing, research, etc.)
- `language` (optional): Programming language
- `framework` (optional): Framework being used
- `priorities` (optional): Array of priority areas (performance, security, maintainability, accessibility)

**Example:**
```json
{
  "name": "recommend_bundle",
  "arguments": {
    "type": "coding",
    "language": "javascript",
    "framework": "react",
    "priorities": ["accessibility", "performance"]
  }
}
```

### 4. get_common_bundles

Get pre-configured bundles for common scenarios.

**Parameters:** None

**Returns:** List of common bundles with their descriptions and rule counts.

### 5. search_rules

Search rules by various criteria.

**Parameters:**
- `query` (optional): Text search query
- `category` (optional): Category filter
- `language` (optional): Language filter
- `tags` (optional): Array of tags to match

**Example:**
```json
{
  "name": "search_rules",
  "arguments": {
    "query": "testing",
    "category": "coding"
  }
}
```

## Available Resources

The MCP server exposes all rule files as resources that can be read directly:

**Resource URI Format:** `rule:///<rule-id>`

**Example:**
```json
{
  "uri": "rule:///python-rules"
}
```

## Common Use Cases

### 1. Get Rules for Python Web Development

```json
{
  "name": "recommend_bundle",
  "arguments": {
    "type": "coding",
    "language": "python",
    "priorities": ["security", "performance"]
  }
}
```

### 2. Find All Security-Related Rules

```json
{
  "name": "list_rules",
  "arguments": {
    "tags": ["security"]
  }
}
```

### 3. Get Specific Rule Content

```json
{
  "name": "get_rule",
  "arguments": {
    "ruleId": "accessibility-rules"
  }
}
```

### 4. Search for Testing Best Practices

```json
{
  "name": "search_rules",
  "arguments": {
    "query": "unit test",
    "category": "coding"
  }
}
```

## Integration Examples

### GitHub Copilot

If using GitHub Copilot with MCP support, the rules.d server can be configured to provide context-aware rules during coding sessions.

### Claude Desktop

Add to your Claude Desktop MCP configuration:

```json
{
  "mcpServers": {
    "rules-d": {
      "command": "node",
      "args": ["/path/to/rules.d/dist/mcp/server.js"]
    }
  }
}
```

### Custom AI Applications

Use the MCP SDK to integrate with custom applications:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['/path/to/rules.d/dist/mcp/server.js'],
});

const client = new Client({
  name: 'my-app',
  version: '1.0.0',
}, {
  capabilities: {},
});

await client.connect(transport);

// List all coding rules
const result = await client.callTool('list_rules', {
  category: 'coding',
});
```

## Troubleshooting

### Server Won't Start

**Issue:** Server fails to start
**Solution:** 
- Ensure Node.js 18+ is installed
- Run `npm install` to install dependencies
- Run `npm run build` to compile TypeScript

### Rules Not Loading

**Issue:** No rules returned from queries
**Solution:**
- Verify rule files exist in the repository
- Check file permissions
- Review server logs for errors

### Type Errors

**Issue:** TypeScript compilation errors
**Solution:**
- Update TypeScript: `npm install typescript@latest`
- Clear build cache: `rm -rf dist/`
- Rebuild: `npm run build`

## Development

### Building from Source

```bash
npm run build
```

### Adding New Tools

To add new tools to the MCP server:

1. Update `src/mcp/server.ts`
2. Add tool definition in `ListToolsRequestSchema` handler
3. Add tool implementation in `CallToolRequestSchema` handler
4. Rebuild and test

### Testing

```bash
# Run all tests
npm test

# Test CLI
node dist/cli/index.js --help
```

## API Reference

See the [MCP SDK documentation](https://modelcontextprotocol.io) for more details on the Model Context Protocol.

## Support

For issues, questions, or contributions, please visit:
https://github.com/cbwinslow/rules.d
