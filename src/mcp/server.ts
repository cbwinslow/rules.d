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
import { ListRulesArgs, GetRuleArgs, RecommendBundleArgs, SearchRulesArgs } from './types.js';
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
        const listArgs = args as ListRulesArgs;
        let rules = analyzer.getAllRules();

        if (listArgs?.category) {
          rules = rules.filter((r) => r.metadata.category === listArgs.category);
        }

        if (listArgs?.language) {
          rules = analyzer.searchByLanguage(listArgs.language);
        }

        if (listArgs?.tags) {
          rules = analyzer.searchByTags(listArgs.tags);
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
        const getRuleArgs = args as unknown as GetRuleArgs;
        const rules = analyzer.getAllRules();
        const rule = rules.find((r) => r.metadata.id === getRuleArgs.ruleId);

        if (!rule) {
          throw new Error(`Rule not found: ${getRuleArgs.ruleId}`);
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
        const bundleArgs = args as unknown as RecommendBundleArgs;
        const context: ScenarioContext = {
          type: bundleArgs.type,
          language: bundleArgs.language,
          framework: bundleArgs.framework,
          priorities: bundleArgs.priorities,
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
        const searchArgs = args as SearchRulesArgs;
        let rules = analyzer.getAllRules();

        if (searchArgs?.category) {
          rules = rules.filter((r) => r.metadata.category === searchArgs.category);
        }

        if (searchArgs?.language) {
          rules = analyzer.searchByLanguage(searchArgs.language);
        }

        if (searchArgs?.tags) {
          rules = analyzer.searchByTags(searchArgs.tags);
        }

        if (searchArgs?.query) {
          const query = searchArgs.query.toLowerCase();
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
