#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { RuleAnalyzer } from '../analyzer/rule-analyzer.js';
import { ScenarioContext } from '../types/rule.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize analyzer
const rulesDir = path.join(__dirname, '../..');
const analyzer = new RuleAnalyzer(rulesDir);

// Create server instance
const server = new Server(
  {
    name: 'rules-d-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Initialize analyzer when server starts
analyzer.initialize().then(() => {
  console.error('Rules loaded successfully');
}).catch((error) => {
  console.error('Failed to load rules:', error);
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_rules',
        description: 'List all available rule files with their metadata',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by category (general, coding, writing, etc.)',
            },
            language: {
              type: 'string',
              description: 'Filter by programming language',
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Filter by tags',
            },
          },
        },
      },
      {
        name: 'get_rule',
        description: 'Get the full content of a specific rule file',
        inputSchema: {
          type: 'object',
          properties: {
            ruleId: {
              type: 'string',
              description: 'The ID of the rule to retrieve',
            },
          },
          required: ['ruleId'],
        },
      },
      {
        name: 'recommend_bundle',
        description: 'Get a recommended bundle of rules for a specific scenario',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['coding', 'writing', 'research', 'communication', 'data', 'devops', 'security', 'project-management', 'general'],
              description: 'Type of task',
            },
            language: {
              type: 'string',
              description: 'Programming language (for coding tasks)',
            },
            framework: {
              type: 'string',
              description: 'Framework being used',
            },
            priorities: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['performance', 'security', 'maintainability', 'accessibility'],
              },
              description: 'Priority areas to focus on',
            },
          },
          required: ['type'],
        },
      },
      {
        name: 'get_common_bundles',
        description: 'Get pre-configured bundles for common scenarios',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'search_rules',
        description: 'Search rules by various criteria',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query',
            },
            category: {
              type: 'string',
              description: 'Category filter',
            },
            language: {
              type: 'string',
              description: 'Language filter',
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tags to match',
            },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_rules': {
        let rules = analyzer.getAllRules();

        if (args?.category) {
          rules = rules.filter((r) => r.metadata.category === args.category);
        }

        if (args?.language && typeof args.language === 'string') {
          rules = analyzer.searchByLanguage(args.language);
        }

        if (args?.tags && Array.isArray(args.tags)) {
          rules = analyzer.searchByTags(args.tags as string[]);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                rules.map((r) => ({
                  id: r.metadata.id,
                  title: r.metadata.title,
                  category: r.metadata.category,
                  language: r.metadata.language,
                  tags: r.metadata.tags,
                  filePath: r.filePath,
                })),
                null,
                2
              ),
            },
          ],
        };
      }

      case 'get_rule': {
        const rules = analyzer.getAllRules();
        const ruleId = (args as any)?.ruleId;
        const rule = rules.find((r) => r.metadata.id === ruleId);

        if (!rule) {
          throw new Error(`Rule not found: ${ruleId}`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  metadata: rule.metadata,
                  content: rule.content,
                  filePath: rule.filePath,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case 'recommend_bundle': {
        const argsAny = args as any;
        const context: ScenarioContext = {
          type: argsAny.type,
          language: argsAny.language,
          framework: argsAny.framework,
          priorities: argsAny.priorities,
        };

        const bundle = analyzer.recommendBundle(context);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  name: bundle.name,
                  description: bundle.description,
                  scenarios: bundle.scenarios,
                  rules: bundle.rules.map((r) => ({
                    id: r.metadata.id,
                    title: r.metadata.title,
                    category: r.metadata.category,
                    filePath: r.filePath,
                    priority: r.metadata.priority,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case 'get_common_bundles': {
        const bundles = analyzer.getCommonBundles();
        const bundleList = Object.entries(bundles).map(([key, bundle]) => ({
          id: key,
          name: bundle.name,
          description: bundle.description,
          ruleCount: bundle.rules.length,
          scenarios: bundle.scenarios,
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(bundleList, null, 2),
            },
          ],
        };
      }

      case 'search_rules': {
        let rules = analyzer.getAllRules();
        const argsAny = args as any;

        if (argsAny?.category) {
          rules = rules.filter((r) => r.metadata.category === argsAny.category);
        }

        if (argsAny?.language && typeof argsAny.language === 'string') {
          rules = analyzer.searchByLanguage(argsAny.language);
        }

        if (argsAny?.tags && Array.isArray(argsAny.tags)) {
          rules = analyzer.searchByTags(argsAny.tags);
        }

        if (argsAny?.query && typeof argsAny.query === 'string') {
          const query = argsAny.query.toLowerCase();
          rules = rules.filter(
            (r) =>
              r.metadata.title.toLowerCase().includes(query) ||
              r.metadata.description?.toLowerCase().includes(query) ||
              r.content.toLowerCase().includes(query)
          );
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                rules.map((r) => ({
                  id: r.metadata.id,
                  title: r.metadata.title,
                  description: r.metadata.description,
                  category: r.metadata.category,
                  tags: r.metadata.tags,
                  filePath: r.filePath,
                })),
                null,
                2
              ),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorMessage }),
        },
      ],
      isError: true,
    };
  }
});

// List resources (rule files as resources)
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const rules = analyzer.getAllRules();

  return {
    resources: rules.map((rule) => ({
      uri: `rule:///${rule.metadata.id}`,
      name: rule.metadata.title,
      description: rule.metadata.description,
      mimeType: 'text/markdown',
    })),
  };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const ruleId = uri.replace('rule:///', '');

  const rules = analyzer.getAllRules();
  const rule = rules.find((r) => r.metadata.id === ruleId);

  if (!rule) {
    throw new Error(`Rule not found: ${ruleId}`);
  }

  return {
    contents: [
      {
        uri,
        mimeType: 'text/markdown',
        text: rule.content,
      },
    ],
  };
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Rules.d MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
