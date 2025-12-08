import { Rule, RuleBundle, ScenarioContext } from '../types/rule.js';
import { RuleLoader } from '../utils/rule-loader.js';

export class RuleAnalyzer {
  private rules: Rule[] = [];
  private loader: RuleLoader;

  constructor(rulesDir?: string) {
    this.loader = new RuleLoader(rulesDir);
  }

  /**
   * Initialize the analyzer by loading all rules
   */
  async initialize(): Promise<void> {
    this.rules = await this.loader.loadAllRules();
  }

  /**
   * Get all rules
   */
  getAllRules(): Rule[] {
    return this.rules;
  }

  /**
   * Search rules by tags
   */
  searchByTags(tags: string[]): Rule[] {
    return this.rules.filter((rule) =>
      tags.some((tag) => rule.metadata.tags.includes(tag))
    );
  }

  /**
   * Search rules by language
   */
  searchByLanguage(language: string): Rule[] {
    return this.rules.filter((rule) => {
      const ruleLangs = Array.isArray(rule.metadata.language)
        ? rule.metadata.language
        : [rule.metadata.language];
      return ruleLangs.includes(language) || ruleLangs.includes('universal');
    });
  }

  /**
   * Search rules by category
   */
  searchByCategory(category: string): Rule[] {
    return this.rules.filter((rule) => rule.metadata.category === category);
  }

  /**
   * Recommend a bundle of rules based on scenario context
   */
  recommendBundle(context: ScenarioContext): RuleBundle {
    const recommendedRules: Rule[] = [];
    const scenarios: string[] = [];

    // Always include general rules
    const generalRules = this.searchByCategory('general');
    recommendedRules.push(...generalRules);
    scenarios.push('general-ai-operations');

    // Add category-specific rules
    if (context.type) {
      const categoryRules = this.searchByCategory(context.type);
      recommendedRules.push(...categoryRules);
      scenarios.push(`${context.type}-tasks`);
    }

    // Add language-specific rules
    if (context.language) {
      const languageRules = this.searchByLanguage(context.language);
      recommendedRules.push(...languageRules);
      scenarios.push(`${context.language}-development`);
    }

    // Add priority-specific rules
    if (context.priorities) {
      for (const priority of context.priorities) {
        const priorityRules = this.searchByTags([priority]);
        recommendedRules.push(...priorityRules);
        scenarios.push(`${priority}-focused`);
      }
    }

    // Add framework-specific rules if applicable
    if (context.framework) {
      const framework = context.framework;
      const frameworkRules = this.rules.filter(
        (rule) =>
          rule.metadata.applicability?.frameworks?.includes(framework)
      );
      recommendedRules.push(...frameworkRules);
      scenarios.push(`${framework}-framework`);
    }

    // Deduplicate rules
    const uniqueRules = this.deduplicateRules(recommendedRules);

    // Sort by priority
    const sortedRules = this.sortByPriority(uniqueRules);

    return {
      name: this.generateBundleName(context),
      description: this.generateBundleDescription(context),
      rules: sortedRules,
      scenarios,
    };
  }

  /**
   * Generate common bundles for typical scenarios
   */
  getCommonBundles(): Record<string, RuleBundle> {
    return {
      'python-web-development': this.recommendBundle({
        type: 'coding',
        language: 'python',
        priorities: ['security', 'performance'],
      }),
      'javascript-frontend': this.recommendBundle({
        type: 'coding',
        language: 'javascript',
        priorities: ['accessibility', 'performance'],
      }),
      'api-development': this.recommendBundle({
        type: 'coding',
        priorities: ['security', 'performance'],
      }),
      'documentation-writing': this.recommendBundle({
        type: 'writing',
        priorities: ['accessibility'],
      }),
      'data-analysis': this.recommendBundle({
        type: 'data',
        language: 'python',
      }),
      'devops-cicd': this.recommendBundle({
        type: 'devops',
        priorities: ['security'],
      }),
    };
  }

  /**
   * Get related rules for a given rule
   */
  getRelatedRules(ruleId: string): Rule[] {
    const rule = this.rules.find((r) => r.metadata.id === ruleId);
    if (!rule || !rule.metadata.related) {
      return [];
    }

    return this.rules.filter((r) =>
      rule.metadata.related!.includes(r.metadata.id)
    );
  }

  /**
   * Get prerequisite rules for a given rule
   */
  getPrerequisites(ruleId: string): Rule[] {
    const rule = this.rules.find((r) => r.metadata.id === ruleId);
    if (!rule || !rule.metadata.prerequisites) {
      return [];
    }

    return this.rules.filter((r) =>
      rule.metadata.prerequisites!.includes(r.metadata.id)
    );
  }

  private deduplicateRules(rules: Rule[]): Rule[] {
    const seen = new Set<string>();
    return rules.filter((rule) => {
      if (seen.has(rule.metadata.id)) {
        return false;
      }
      seen.add(rule.metadata.id);
      return true;
    });
  }

  private sortByPriority(rules: Rule[]): Rule[] {
    const priorityOrder: Record<string, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
    };

    return rules.sort((a, b) => {
      const aPriority = priorityOrder[a.metadata.priority || 'medium'];
      const bPriority = priorityOrder[b.metadata.priority || 'medium'];
      return aPriority - bPriority;
    });
  }

  private generateBundleName(context: ScenarioContext): string {
    const parts: string[] = [];
    
    if (context.language) {
      parts.push(context.language);
    }
    
    if (context.type) {
      parts.push(context.type);
    }
    
    if (context.framework) {
      parts.push(context.framework);
    }

    return parts.length > 0 ? parts.join('-') + '-bundle' : 'custom-bundle';
  }

  private generateBundleDescription(context: ScenarioContext): string {
    const parts: string[] = ['Rules for'];
    
    if (context.language) {
      parts.push(context.language);
    }
    
    if (context.type) {
      parts.push(context.type);
    }
    
    if (context.framework) {
      parts.push(`using ${context.framework}`);
    }

    if (context.priorities && context.priorities.length > 0) {
      parts.push(`with focus on ${context.priorities.join(', ')}`);
    }

    return parts.join(' ');
  }
}
