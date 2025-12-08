export interface RuleMetadata {
  id: string;
  title: string;
  description?: string;
  category: RuleCategory;
  subcategory?: string;
  language: string | string[];
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  applicability?: {
    scenarios?: string[];
    frameworks?: string[];
    environments?: string[];
  };
  prerequisites?: string[];
  related?: string[];
  outcomes?: string[];
  version?: string;
  lastUpdated?: string;
  author?: string;
  references?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
}

export type RuleCategory =
  | 'general'
  | 'coding'
  | 'writing'
  | 'research'
  | 'communication'
  | 'data'
  | 'project-management'
  | 'security'
  | 'devops';

export interface Rule {
  metadata: RuleMetadata;
  content: string;
  filePath: string;
}

export interface RuleBundle {
  name: string;
  description: string;
  rules: Rule[];
  scenarios: string[];
}

export interface ScenarioContext {
  type: 'coding' | 'writing' | 'research' | 'communication' | 'data' | 'devops' | 'security' | 'project-management' | 'general';
  language?: string;
  framework?: string;
  environment?: 'development' | 'production' | 'testing';
  complexity?: 'simple' | 'moderate' | 'complex';
  priorities?: Array<'performance' | 'security' | 'maintainability' | 'accessibility'>;
}
