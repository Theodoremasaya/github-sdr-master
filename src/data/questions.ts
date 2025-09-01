import { Question } from '../types/index.ts';

export const questions: Question[] = [
  {
    id: 'github-actions-basics',
    category: 'devops',
    difficulty: 'beginner',
    type: 'multiple-choice',
    question: {
      en: 'What is GitHub Actions primarily used for?',
      ja: 'GitHub Actionsは主に何に使用されますか？'
    },
    options: [
      {
        en: 'Code collaboration',
        ja: 'コード共同作業'
      },
      {
        en: 'CI/CD automation',
        ja: 'CI/CD自動化'
      },
      {
        en: 'Issue tracking',
        ja: '課題管理'
      },
      {
        en: 'Code review',
        ja: 'コードレビュー'
      }
    ],
    correctAnswer: 1,
    explanation: {
      en: 'GitHub Actions is a CI/CD platform that allows you to automate your build, test, and deployment pipeline.',
      ja: 'GitHub Actionsは、ビルド、テスト、デプロイメントパイプラインを自動化できるCI/CDプラットフォームです。'
    },
    useCase: {
      en: 'Perfect for enterprise teams wanting to automate their software delivery process and reduce manual deployment errors.',
      ja: 'ソフトウェア配信プロセスを自動化し、手動デプロイエラーを削減したい企業チームに最適です。'
    },
    customerScenario: {
      en: 'A fintech company needs to deploy code changes safely with automated testing. GitHub Actions can run their test suite on every pull request and automatically deploy to staging environments.',
      ja: 'フィンテック企業が自動テストでコード変更を安全にデプロイする必要があります。GitHub Actionsは、すべてのプルリクエストでテストスイートを実行し、ステージング環境に自動的にデプロイできます。'
    },
    points: 100,
    tags: ['automation', 'ci-cd', 'enterprise']
  },
  {
    id: 'copilot-enterprise',
    category: 'ai-features',
    difficulty: 'intermediate',
    type: 'multiple-choice',
    question: {
      en: 'Which GitHub Copilot feature helps with enterprise code security?',
      ja: '企業のコードセキュリティに役立つGitHub Copilotの機能はどれですか？'
    },
    options: [
      {
        en: 'Code completion suggestions',
        ja: 'コード補完の提案'
      },
      {
        en: 'Vulnerability filtering',
        ja: '脆弱性フィルタリング'
      },
      {
        en: 'Documentation generation',
        ja: 'ドキュメント生成'
      },
      {
        en: 'Code translation',
        ja: 'コード翻訳'
      }
    ],
    correctAnswer: 1,
    explanation: {
      en: 'GitHub Copilot Enterprise includes vulnerability filtering that blocks suggestions containing known security vulnerabilities.',
      ja: 'GitHub Copilot Enterpriseには、既知のセキュリティ脆弱性を含む提案をブロックする脆弱性フィルタリングが含まれています。'
    },
    useCase: {
      en: 'Enterprise customers concerned about code security can ensure AI-generated suggestions meet their security standards.',
      ja: 'コードセキュリティを懸念する企業顧客は、AI生成の提案がセキュリティ基準を満たすことを確保できます。'
    },
    customerScenario: {
      en: 'A healthcare company needs to ensure their patient data systems don\'t have vulnerabilities. Copilot Enterprise prevents insecure code patterns from being suggested.',
      ja: '医療会社は患者データシステムに脆弱性がないことを確保する必要があります。Copilot Enterpriseは、安全でないコードパターンの提案を防ぎます。'
    },
    points: 150,
    tags: ['ai', 'security', 'enterprise', 'copilot']
  },
  {
    id: 'github-advanced-security',
    category: 'security',
    difficulty: 'advanced',
    type: 'multiple-choice',
    question: {
      en: 'Which GitHub Advanced Security feature helps prevent secrets from being committed?',
      ja: 'シークレットのコミットを防ぐのに役立つGitHub Advanced Securityの機能はどれですか？'
    },
    options: [
      {
        en: 'Dependency Review',
        ja: '依存関係レビュー'
      },
      {
        en: 'Code Scanning',
        ja: 'コードスキャニング'
      },
      {
        en: 'Secret Scanning',
        ja: 'シークレットスキャニング'
      },
      {
        en: 'Security Advisories',
        ja: 'セキュリティアドバイザリ'
      }
    ],
    correctAnswer: 2,
    explanation: {
      en: 'Secret Scanning automatically detects and alerts when secrets like API keys, tokens, or passwords are committed to repositories.',
      ja: 'シークレットスキャニングは、APIキー、トークン、パスワードなどのシークレットがリポジトリにコミットされたときに自動的に検出してアラートします。'
    },
    useCase: {
      en: 'Critical for enterprises handling sensitive data - prevents accidental exposure of credentials that could lead to security breaches.',
      ja: '機密データを扱う企業にとって重要 - セキュリティ侵害につながる可能性のある認証情報の偶発的な露出を防ぎます。'
    },
    customerScenario: {
      en: 'A banking client accidentally commits database credentials. Secret Scanning immediately alerts the security team and helps revoke the compromised credentials before any breach occurs.',
      ja: '銀行クライアントが誤ってデータベース認証情報をコミットしました。シークレットスキャニングは、セキュリティチームに即座にアラートし、侵害が発生する前に危険にさらされた認証情報の取り消しを支援します。'
    },
    points: 200,
    tags: ['security', 'enterprise', 'secrets', 'advanced']
  },
  {
    id: 'github-enterprise-collaboration',
    category: 'collaboration',
    difficulty: 'intermediate',
    type: 'scenario',
    question: {
      en: 'A large enterprise team of 500 developers needs better code review processes. Which GitHub feature combination would you recommend?',
      ja: '500人の開発者からなる大企業チームは、より良いコードレビュープロセスが必要です。どのGitHub機能の組み合わせを推奨しますか？'
    },
    options: [
      {
        en: 'Pull Requests + Branch Protection Rules + CODEOWNERS',
        ja: 'プルリクエスト + ブランチ保護ルール + CODEOWNERS'
      },
      {
        en: 'Issues + Projects + Wikis',
        ja: '課題 + プロジェクト + Wiki'
      },
      {
        en: 'GitHub Pages + Actions + Packages',
        ja: 'GitHub Pages + Actions + Packages'
      },
      {
        en: 'Discussions + Releases + Insights',
        ja: 'ディスカッション + リリース + インサイト'
      }
    ],
    correctAnswer: 0,
    explanation: {
      en: 'This combination ensures structured code reviews, prevents direct pushes to main branches, and automatically assigns the right reviewers.',
      ja: 'この組み合わせは、構造化されたコードレビューを確保し、メインブランチへの直接プッシュを防ぎ、適切なレビューアーを自動的に割り当てます。'
    },
    useCase: {
      en: 'Essential for large teams to maintain code quality and ensure proper review processes without bottlenecks.',
      ja: '大規模チームがボトルネックなしでコード品質を維持し、適切なレビュープロセスを確保するために不可欠です。'
    },
    customerScenario: {
      en: 'Microsoft\'s Windows team uses this exact setup to manage contributions from hundreds of developers while maintaining high code quality standards.',
      ja: 'マイクロソフトのWindowsチームは、高いコード品質基準を維持しながら、何百人もの開発者からの貢献を管理するために、まさにこの設定を使用しています。'
    },
    points: 175,
    tags: ['collaboration', 'enterprise', 'code-review', 'workflow']
  },
  {
    id: 'github-pricing-enterprise',
    category: 'pricing',
    difficulty: 'beginner',
    type: 'multiple-choice',
    question: {
      en: 'What\'s the key difference between GitHub Team and GitHub Enterprise plans?',
      ja: 'GitHub TeamプランとGitHub Enterpriseプランの主な違いは何ですか？'
    },
    options: [
      {
        en: 'Number of repositories',
        ja: 'リポジトリ数'
      },
      {
        en: 'Advanced security features and compliance',
        ja: '高度なセキュリティ機能とコンプライアンス'
      },
      {
        en: 'GitHub Actions minutes',
        ja: 'GitHub Actions分数'
      },
      {
        en: 'Storage capacity',
        ja: 'ストレージ容量'
      }
    ],
    correctAnswer: 1,
    explanation: {
      en: 'Enterprise plans include GitHub Advanced Security, SAML/SCIM, audit logs, and compliance features that Team plans don\'t have.',
      ja: 'Enterpriseプランには、TeamプランにはないGitHub Advanced Security、SAML/SCIM、監査ログ、コンプライアンス機能が含まれています。'
    },
    useCase: {
      en: 'Perfect selling point for regulated industries like finance, healthcare, and government that need compliance features.',
      ja: 'コンプライアンス機能を必要とする金融、医療、政府などの規制業界にとって完璧なセールスポイントです。'
    },
    points: 125,
    tags: ['pricing', 'enterprise', 'compliance', 'security']
  }
];

export const badges = [
  {
    id: 'first-steps',
    name: {
      en: 'First Steps',
      ja: '最初の一歩'
    },
    description: {
      en: 'Answered your first question correctly',
      ja: '最初の問題を正解しました'
    },
    icon: '🎯',
    rarity: 'common' as const
  },
  {
    id: 'streak-master',
    name: {
      en: 'Streak Master',
      ja: '連続マスター'
    },
    description: {
      en: 'Maintained a 7-day study streak',
      ja: '7日間の学習連続記録を達成'
    },
    icon: '🔥',
    rarity: 'rare' as const
  },
  {
    id: 'security-expert',
    name: {
      en: 'Security Expert',
      ja: 'セキュリティエキスパート'
    },
    description: {
      en: 'Mastered all security-related questions',
      ja: 'セキュリティ関連の全問題をマスター'
    },
    icon: '🛡️',
    rarity: 'epic' as const
  },
  {
    id: 'perfect-score',
    name: {
      en: 'Perfect Score',
      ja: '満点獲得'
    },
    description: {
      en: 'Achieved 100% accuracy in a challenge mode',
      ja: 'チャレンジモードで100%の正解率を達成'
    },
    icon: '💎',
    rarity: 'legendary' as const
  }
];