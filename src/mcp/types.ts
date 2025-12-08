// Type definitions for MCP tool arguments

export interface ListRulesArgs {
  category?: string;
  language?: string;
  tags?: string[];
}

export interface GetRuleArgs {
  ruleId: string;
}

export interface RecommendBundleArgs {
  type: 'coding' | 'writing' | 'research' | 'communication' | 'data' | 'devops' | 'security' | 'project-management' | 'general';
  language?: string;
  framework?: string;
  priorities?: Array<'performance' | 'security' | 'maintainability' | 'accessibility'>;
}

export interface SearchRulesArgs {
  query?: string;
  category?: string;
  language?: string;
  tags?: string[];
}
