import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { globSync } from 'glob';
import { Rule, RuleMetadata } from '../types/rule.js';

export class RuleLoader {
  private rulesDir: string;

  constructor(rulesDir?: string) {
    this.rulesDir = rulesDir || path.join(__dirname, '../..');
  }

  /**
   * Load all rule files from the rules directory
   */
  async loadAllRules(): Promise<Rule[]> {
    const ruleFiles = this.findRuleFiles();
    const rules: Rule[] = [];

    for (const filePath of ruleFiles) {
      try {
        const rule = await this.loadRule(filePath);
        if (rule) {
          rules.push(rule);
        }
      } catch (error) {
        console.error(`Error loading rule from ${filePath}:`, error);
      }
    }

    return rules;
  }

  /**
   * Load a single rule file
   */
  async loadRule(filePath: string): Promise<Rule | null> {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.join(this.rulesDir, filePath);

    if (!fs.existsSync(absolutePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    const parsed = matter(fileContent);

    // Generate metadata from filename and content if not present in frontmatter
    const metadata = this.generateMetadata(filePath, parsed.data, parsed.content);

    return {
      metadata,
      content: parsed.content,
      filePath: path.relative(this.rulesDir, absolutePath),
    };
  }

  /**
   * Find all rule files in the repository
   */
  private findRuleFiles(): string[] {
    const patterns = [
      '**/rules.md',
      '**/*-rules.md',
    ];

    const files: string[] = [];
    for (const pattern of patterns) {
      const matches = globSync(pattern, {
        cwd: this.rulesDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
      });
      files.push(...matches);
    }

    return [...new Set(files)];
  }

  /**
   * Generate metadata from file path and content
   */
  private generateMetadata(
    filePath: string,
    frontmatter: any,
    content: string
  ): RuleMetadata {
    const relativePath = path.relative(this.rulesDir, filePath);
    const parts = relativePath.split(path.sep);
    const category = this.inferCategory(parts[0]);
    const filename = path.basename(filePath, '.md');
    
    // Extract title from content if not in frontmatter
    const title = frontmatter.title || this.extractTitle(content) || this.formatTitle(filename);
    
    // Generate ID from filename
    const id = frontmatter.id || filename;
    
    // Infer language from filename
    const language = this.inferLanguage(filename, content);
    
    // Generate tags
    const tags = frontmatter.tags || this.generateTags(filename, content);

    return {
      id,
      title,
      description: frontmatter.description,
      category,
      subcategory: frontmatter.subcategory,
      language,
      tags,
      difficulty: frontmatter.difficulty,
      priority: frontmatter.priority,
      applicability: frontmatter.applicability,
      prerequisites: frontmatter.prerequisites,
      related: frontmatter.related,
      outcomes: frontmatter.outcomes,
      version: frontmatter.version || '1.0.0',
      lastUpdated: frontmatter.lastUpdated,
      author: frontmatter.author,
      references: frontmatter.references,
    };
  }

  private inferCategory(dirName: string): any {
    const validCategories = [
      'general',
      'coding',
      'writing',
      'research',
      'communication',
      'data',
      'project-management',
      'security',
      'devops',
    ];

    return validCategories.includes(dirName) ? dirName : 'general';
  }

  private extractTitle(content: string): string | null {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
  }

  private formatTitle(filename: string): string {
    return filename
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private inferLanguage(filename: string, content: string): string | string[] {
    const languageMap: Record<string, string> = {
      python: 'python',
      javascript: 'javascript',
      typescript: 'typescript',
      go: 'go',
      rust: 'rust',
      java: 'java',
      csharp: 'csharp',
      'c#': 'csharp',
    };

    // Check filename
    for (const [key, value] of Object.entries(languageMap)) {
      if (filename.toLowerCase().includes(key)) {
        return value;
      }
    }

    // Check content for language indicators
    const languages: string[] = [];
    const contentLower = content.toLowerCase();
    for (const [key, value] of Object.entries(languageMap)) {
      if (contentLower.includes(key)) {
        languages.push(value);
      }
    }

    return languages.length > 0 ? languages : 'universal';
  }

  private generateTags(filename: string, content: string): string[] {
    const tags = new Set<string>();

    // Add category-based tags
    const commonTags: Record<string, string[]> = {
      performance: ['performance', 'optimization'],
      security: ['security'],
      testing: ['testing', 'tdd', 'unit-tests'],
      accessibility: ['accessibility', 'a11y'],
      'best-practices': ['best-practices'],
    };

    const lowerFilename = filename.toLowerCase();
    const lowerContent = content.toLowerCase();

    for (const [key, values] of Object.entries(commonTags)) {
      if (lowerFilename.includes(key) || lowerContent.includes(key)) {
        values.forEach((tag) => tags.add(tag));
      }
    }

    // Add at least one tag
    if (tags.size === 0) {
      tags.add('best-practices');
    }

    return Array.from(tags);
  }
}
