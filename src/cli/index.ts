#!/usr/bin/env node

import { Command } from 'commander';
import { RuleAnalyzer } from '../analyzer/rule-analyzer.js';
import { ScenarioContext } from '../types/rule.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('rules-cli')
  .description('CLI tool for managing and querying rules.d repository')
  .version('1.0.0');

// List rules command
program
  .command('list')
  .description('List all available rules')
  .option('-c, --category <category>', 'Filter by category')
  .option('-l, --language <language>', 'Filter by language')
  .option('-t, --tags <tags...>', 'Filter by tags')
  .action(async (options) => {
    const analyzer = new RuleAnalyzer(path.join(__dirname, '../..'));
    await analyzer.initialize();

    let rules = analyzer.getAllRules();

    if (options.category) {
      rules = analyzer.searchByCategory(options.category);
    }

    if (options.language) {
      rules = analyzer.searchByLanguage(options.language);
    }

    if (options.tags) {
      rules = analyzer.searchByTags(options.tags);
    }

    console.log(`Found ${rules.length} rules:\n`);
    rules.forEach((rule) => {
      console.log(`ID: ${rule.metadata.id}`);
      console.log(`Title: ${rule.metadata.title}`);
      console.log(`Category: ${rule.metadata.category}`);
      console.log(`Language: ${Array.isArray(rule.metadata.language) ? rule.metadata.language.join(', ') : rule.metadata.language}`);
      console.log(`Tags: ${rule.metadata.tags.join(', ')}`);
      console.log(`File: ${rule.filePath}`);
      console.log('---');
    });
  });

// Get rule command
program
  .command('get <ruleId>')
  .description('Get the content of a specific rule')
  .action(async (ruleId) => {
    const analyzer = new RuleAnalyzer(path.join(__dirname, '../..'));
    await analyzer.initialize();

    const rules = analyzer.getAllRules();
    const rule = rules.find((r) => r.metadata.id === ruleId);

    if (!rule) {
      console.error(`Rule not found: ${ruleId}`);
      process.exit(1);
    }

    console.log('Metadata:');
    console.log(JSON.stringify(rule.metadata, null, 2));
    console.log('\nContent:');
    console.log(rule.content);
  });

// Recommend bundle command
program
  .command('recommend')
  .description('Get recommended rule bundle for a scenario')
  .requiredOption('-t, --type <type>', 'Task type (coding, writing, etc.)')
  .option('-l, --language <language>', 'Programming language')
  .option('-f, --framework <framework>', 'Framework')
  .option('-p, --priorities <priorities...>', 'Priority areas')
  .action(async (options) => {
    const analyzer = new RuleAnalyzer(path.join(__dirname, '../..'));
    await analyzer.initialize();

    const context: ScenarioContext = {
      type: options.type as any,
      language: options.language,
      framework: options.framework,
      priorities: options.priorities as any,
    };

    const bundle = analyzer.recommendBundle(context);

    console.log(`Bundle: ${bundle.name}`);
    console.log(`Description: ${bundle.description}`);
    console.log(`Scenarios: ${bundle.scenarios.join(', ')}`);
    console.log(`\nRecommended rules (${bundle.rules.length}):\n`);

    bundle.rules.forEach((rule, index) => {
      console.log(`${index + 1}. ${rule.metadata.title}`);
      console.log(`   ID: ${rule.metadata.id}`);
      console.log(`   Category: ${rule.metadata.category}`);
      console.log(`   Priority: ${rule.metadata.priority || 'medium'}`);
      console.log(`   File: ${rule.filePath}`);
      console.log('');
    });
  });

// Common bundles command
program
  .command('bundles')
  .description('List common pre-configured bundles')
  .action(async () => {
    const analyzer = new RuleAnalyzer(path.join(__dirname, '../..'));
    await analyzer.initialize();

    const bundles = analyzer.getCommonBundles();

    console.log('Common bundles:\n');
    Object.entries(bundles).forEach(([key, bundle]) => {
      console.log(`ID: ${key}`);
      console.log(`Name: ${bundle.name}`);
      console.log(`Description: ${bundle.description}`);
      console.log(`Rules: ${bundle.rules.length}`);
      console.log(`Scenarios: ${bundle.scenarios.join(', ')}`);
      console.log('---');
    });
  });

// Search command
program
  .command('search <query>')
  .description('Search rules by text query')
  .option('-c, --category <category>', 'Filter by category')
  .option('-l, --language <language>', 'Filter by language')
  .action(async (query, options) => {
    const analyzer = new RuleAnalyzer(path.join(__dirname, '../..'));
    await analyzer.initialize();

    let rules = analyzer.getAllRules();

    if (options.category) {
      rules = rules.filter((r) => r.metadata.category === options.category);
    }

    if (options.language) {
      rules = analyzer.searchByLanguage(options.language);
    }

    const queryLower = query.toLowerCase();
    rules = rules.filter(
      (r) =>
        r.metadata.title.toLowerCase().includes(queryLower) ||
        r.metadata.description?.toLowerCase().includes(queryLower) ||
        r.content.toLowerCase().includes(queryLower)
    );

    console.log(`Found ${rules.length} rules matching "${query}":\n`);
    rules.forEach((rule) => {
      console.log(`ID: ${rule.metadata.id}`);
      console.log(`Title: ${rule.metadata.title}`);
      console.log(`Category: ${rule.metadata.category}`);
      console.log(`File: ${rule.filePath}`);
      console.log('---');
    });
  });

program.parse();
