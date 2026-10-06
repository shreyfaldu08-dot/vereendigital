export interface SolutionCard {
  num: string;
  category: string;
  specId: string;
  title: string;
  subtitle: string;
  desc: string;
  slides: string[];
  points: string[];
  tech: string[];
  accentColor: string;
}

export interface ServiceOffering {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  deliverables: string[];
}

export interface StoryBlock {
  num: string;
  tag: string;
  title: string;
  desc: string;
}

export interface ServicePageConfig {
  slug: string;
  name: string;
  titlePart1: string;
  titlePart2: string;
  heroTagline: string;
  heroCoordinate: string;
  echoText: string;
  thesisEyebrow: string;
  thesisHeadline: string;
  storyBlocks: StoryBlock[];
  solutions: SolutionCard[];
  offerings: ServiceOffering[];
  workingModelsHeader?: string;
  tickerTrack1?: string[];
  tickerTrack2?: string[];
}

export const SERVICES_LIST = [
  { name: 'AI SEO', slug: 'ai-seo', href: '/services/ai-seo' },
  { name: 'Google Ads', slug: 'google-ads', href: '/services/google-ads' },
  { name: 'Meta Ads', slug: 'meta-ads', href: '/services/meta-ads' },
  { name: 'ChatGPT Ads', slug: 'chatgpt-ads', href: '/services/chatgpt-ads' },
  { name: 'Web Development', slug: 'web-development', href: '/services/web-development' },
];

export const SERVICES_CONFIG: Record<string, ServicePageConfig> = {
  overview: {
    slug: '',
    name: 'All Services Overview',
    titlePart1: 'OUR',
    titlePart2: 'SERVICES',
    heroTagline: 'Everything Generative AI, Deterministic Search & Spatial Architecture is our Playground.',
    heroCoordinate: 'SYSTEM ARCHITECTURE & VECTOR RETRIEVAL',
    echoText: 'GENERATIVE SERVICES',
    tickerTrack1: ['GENERATIVE SERVICES', 'SYSTEM ARCHITECTURE', '120 FPS LIVING SPATIAL', 'DETERMINISTIC MACHINE ONTOLOGIES', 'VEREEN DIGITAL'],
    tickerTrack2: ['SUB-50MS GLOBAL EDGE', 'PERPLEXITY & SEARCHGPT SUPREMACY', 'ZERO SEMANTIC DRIFT', 'CLOSED-WON PIPELINE', 'AVANT-GARDE CRAFT'],
    thesisEyebrow: '02 — THE ARCHITECTURAL THESIS',
    thesisHeadline: 'In this rapidly moving generative space, we are...',
    storyBlocks: [
      {
        num: '01',
        tag: 'ARTISTRY & AUTHORITY',
        title: 'Merging Artistry with Algorithmic Authority.',
        desc: 'Harness the power of deterministic machine ontologies and avant-garde spatial engineering to elevate your enterprise above the noise. We construct architectures that command attention across both human eyes and generative AI answer feeds.'
      },
      {
        num: '02',
        tag: 'IMMERSIVE CRAFT',
        title: 'Crafting Unique Digital Journeys.',
        desc: 'Passionately creating unique, fluid 120 FPS digital ecosystems that captivate and convert. By blending artistic spatial depth with sub-50ms edge rendering, we transform high-intent visitors into committed enterprise advocates.'
      },
      {
        num: '03',
        tag: 'BOUNDARY DESTRUCTION',
        title: 'Pushing Beyond Conventional Search.',
        desc: 'We don\'t optimize for dying 10-blue-link algorithms. We engineer Answer-First semantic chunks and vector alignments that force Perplexity Sonar, OpenAI SearchGPT, Claude, and Google AI to cite your brand as the canonical industry truth.'
      }
    ],
    solutions: [
      {
        num: '01',
        category: 'RETRIEVAL',
        specId: 'SPEC: GEO-256T',
        title: 'Generative Engine Optimization',
        subtitle: 'Brand Supremacy Inside LLM Answers',
        desc: 'We engineer semantic vector embeddings and structured schemas so AI models cite your brand as the canonical authority.',
        slides: [
          'Generative Engine SEO (GEO)',
          'Perplexity Sonar Protocol',
          'Wikidata Entity Reconciliation',
          'Semantic Vector Chunking'
        ],
        points: [
          '256-Token Semantic Chunking',
          'Vector Distance Calibration',
          'Perplexity Canonical Citations',
          'Multi-Turn Prompt Ingestion'
        ],
        tech: ['Schema.org', 'Wikidata SPARQL', 'Vector RAG'],
        accentColor: '#89bc30'
      },
      {
        num: '02',
        category: 'TAXONOMY',
        specId: 'SPEC: KGD-QNODE',
        title: 'Knowledge Graph Ontologies',
        subtitle: 'Eradicating Model Hallucinations',
        desc: 'Deterministic JSON-LD @graph frameworks anchoring your enterprise into global machine ontologies with zero semantic drift.',
        slides: [
          'Zero-Drift Graph Ontology',
          'Google Knowledge Panel Sync',
          'Bing Entity Index Reconciliation',
          'Cryptographic Entity Claims'
        ],
        points: [
          'Wikidata Q-Node Binding',
          'Google Knowledge Panel Sync',
          'Cryptographic Entity Claims',
          'Copilot Index Verification'
        ],
        tech: ['Wikidata SPARQL', 'Google KG API', 'JSON-LD @graph'],
        accentColor: '#89bc30'
      },
      {
        num: '03',
        category: 'PERFORMANCE',
        specId: 'SPEC: WGL-120FPS',
        title: 'Kinetic & WebGL Spatial Engines',
        subtitle: '120 FPS Living Spatial Interfaces',
        desc: 'Living digital universes built on hardware-accelerated WebGL shaders, fluid Lenis momentum, and sub-50ms edge rendering.',
        slides: [
          '120 FPS WebGL Shaders',
          'Lenis Momentum Physics',
          'Headless Next.js 16 Edge',
          'Spatial Typography Fields'
        ],
        points: [
          'Custom WebGL GLSL Shaders',
          '120 FPS Momentum Physics',
          'Headless Next.js Edge SSR',
          'Dynamic Ambient Glow Lighting'
        ],
        tech: ['Three.js WebGL', 'Lenis Physics', 'Next.js Edge'],
        accentColor: '#89bc30'
      },
      {
        num: '04',
        category: 'ATTRIBUTION',
        specId: 'SPEC: ARR-ATTRIB',
        title: 'Conversational Revenue Attribution',
        subtitle: 'Closed-Loop Generative Search ARR',
        desc: 'Direct telemetry connecting conversational AI search citations directly to closed-won enterprise pipeline and verified ARR.',
        slides: [
          'Multi-Touch LLM Attribution',
          'Conversational Lead Telemetry',
          'Direct Closed-Won ARR Sync',
          'Executive Pipeline Dashboards'
        ],
        points: [
          'AI Citation Referral Tracking',
          'Closed-Won ARR Pipeline Sync',
          'Bi-Directional CRM Telemetry',
          'Boardroom Attribution Dashboards'
        ],
        tech: ['Attribution APIs', 'Salesforce Sync', 'ClickHouse'],
        accentColor: '#89bc30'
      }
    ],
    offerings: [
      {
        num: '01',
        title: 'Generative Engine Optimization (GEO)',
        subtitle: 'LLM Search Positioning & Vector Retrieval',
        desc: 'We engineer answer-first 256-token semantic blocks and vector embeddings that force Perplexity Sonar, OpenAI SearchGPT, Claude, and Google AI to cite your brand as the primary authority.',
        deliverables: ['256-Token Semantic Chunking', 'Cosine Distance Calibration', 'Perplexity Sonar Canonical Anchors', 'Multi-Turn Prompt Ingestion']
      },
      {
        num: '02',
        title: 'Knowledge Graph Disambiguation (KGD)',
        subtitle: 'Deterministic Entity Ontologies & Graph Truth',
        desc: 'Eradicate model hallucinations and brand misattribution by anchoring your enterprise, leadership, and products into Wikidata and the Google Knowledge Graph with zero semantic drift.',
        deliverables: ['Wikidata sameAs Claim Reconciliation', 'Google Knowledge Panel Claim', 'Multi-Layered JSON-LD @graph', 'Bing Enterprise Index Sync']
      },
      {
        num: '03',
        title: 'Kinetic & WebGL Digital Ecosystems',
        subtitle: '120 FPS Avant-Garde Spatial Experiences',
        desc: 'Bespoke digital flagships engineered with custom WebGL shaders, normalized Lenis momentum scrolling, and kinetic typography that transform enterprise prospects into brand evangelists.',
        deliverables: ['Hardware-Accelerated WebGL', 'Sub-50ms First Input Delay', 'Headless Next.js Edge SSR', 'Dynamic Dark Ambient Lighting']
      },
      {
        num: '04',
        title: 'Autonomous AI Operational Systems',
        subtitle: 'Self-Healing Multi-Agent Pipelines',
        desc: 'Deploying autonomous AI agents that monitor model citation changes, audit competitive generative share-of-voice 24/7, and automatically refresh outdated schema metadata.',
        deliverables: ['24/7 Citation Radar Scans', 'Automated Hallucination Defense', 'Continuous Vector Re-indexing', 'Real-Time Drift Alerts']
      },
      {
        num: '05',
        title: 'Global Cloud & Sub-50ms Edge Infrastructure',
        subtitle: 'Multi-Region V8 Isolates & Streaming SSR',
        desc: 'Enterprise infrastructure deployed across 300+ global edge points of presence with streaming server-side rendering, sub-30ms TTFB, and 100/100 Core Web Vitals guarantees.',
        deliverables: ['Global Edge CDN Routing', 'V8 Isolate Hydration', 'Automated CI/CD Pipelines', 'SOC2 Enterprise Compliance']
      },
      {
        num: '06',
        title: 'Conversational Revenue Attribution',
        subtitle: 'Closed-Loop Generative Search ARR',
        desc: 'Direct attribution connecting conversational AI citations to closed-won deals. Know exactly which prompts, citations, and models generated enterprise pipeline.',
        deliverables: ['AI Referral Intent Scoring', 'Salesforce & HubSpot Bi-Directional Sync', 'Sales Cycle Acceleration Analytics', 'Audited Boardroom Telemetry']
      }
    ]
  },

  'ai-seo': {
    slug: 'ai-seo',
    name: 'AI SEO',
    titlePart1: 'AI',
    titlePart2: 'SEO',
    heroTagline: 'Engineered Vector Embeddings, Answer-First Semantic Retrieval & Perplexity / SearchGPT Authority.',
    heroCoordinate: 'VECTOR EMBEDDINGS & GENERATIVE CITATIONS',
    echoText: 'AI SEO • GEO',
    tickerTrack1: ['AI SEO', 'GENERATIVE ENGINE OPTIMIZATION', 'PERPLEXITY CITATIONS', 'SEARCHGPT RETRIEVAL', '256-TOKEN CHUNKING', 'VEREEN DIGITAL'],
    tickerTrack2: ['ZERO-DRIFT ONTOLOGIES', 'W3C SCHEMA @GRAPH', 'WIKIDATA Q-NODES', 'ALGORITHMIC AUTHORITY', 'CLOSED-WON ARR PIPELINE'],
    thesisEyebrow: '02 — THE AI SEARCH REVOLUTION',
    thesisHeadline: 'Search is no longer 10 blue links. It is conversational synthesis...',
    storyBlocks: [
      {
        num: '01',
        tag: 'VECTOR EMBEDDINGS',
        title: 'Calibrating High-Dimensional Brand Vectors.',
        desc: 'Generative search engines read dense vector embeddings, not meta keywords. We optimize your brand knowledge chunks to match high-intent cosine similarity clusters across Perplexity, ChatGPT, and Claude.'
      },
      {
        num: '02',
        tag: 'ANSWER SYNTHESIS',
        title: 'Becoming the Definitive Synthesis Source.',
        desc: 'When an executive asks an AI engine for architectural recommendations, our semantic framing guarantees that your enterprise appears in the first generated answer paragraph.'
      },
      {
        num: '03',
        tag: 'ONTOLOGICAL DEFENSE',
        title: 'Eradicating Competitive Model Hallucination.',
        desc: 'Prevent generative models from conflating your capabilities with competitors. We publish cryptographic JSON-LD @graph ontologies that anchor truth into foundational models.'
      }
    ],
    solutions: [
      {
        num: '01',
        category: 'GEO RETRIEVAL',
        specId: 'SPEC: GEO-PERPLEX',
        title: 'Perplexity & SearchGPT Optimization',
        subtitle: 'Guaranteed Primary Citation Anchors',
        desc: 'We format your core thought leadership into 256-token answer snippets engineered for direct Perplexity Sonar retrieval.',
        slides: [
          'Perplexity Sonar Deep-Retrieval',
          'SearchGPT Web Corpus Sync',
          'Cosine Similarity Maximization',
          'Token-Efficient Source Formatting'
        ],
        points: [
          'Direct Answer-First Snippets',
          'Sonar Retrieval Tuning',
          'Perplexity Citation Injection',
          'Zero-Loss Semantic Chunking'
        ],
        tech: ['Perplexity Sonar', 'SearchGPT', 'Vector RAG'],
        accentColor: '#89bc30'
      },
      {
        num: '02',
        category: 'GRAPH SYNC',
        specId: 'SPEC: GEO-WIKI',
        title: 'Knowledge Entity Disambiguation',
        subtitle: 'Wikidata & Machine Ontologies',
        desc: 'Anchor your enterprise into the global semantic web. We align your entity across Wikidata, Google KG, and DBpedia.',
        slides: [
          'Wikidata Q-Node Association',
          'Deterministic Schema Graph',
          'Entity Disambiguation Protocol',
          'Knowledge Panel Sync'
        ],
        points: [
          'Wikidata Entity Verification',
          'JSON-LD @graph Validation',
          'SameAs Citation Clustering',
          'Continuous Entity Guard'
        ],
        tech: ['Wikidata SPARQL', 'Google KG', 'JSON-LD'],
        accentColor: '#89bc30'
      },
      {
        num: '03',
        category: 'MONITORING',
        specId: 'SPEC: GEO-RADAR',
        title: '24/7 AI Share-of-Voice Radar',
        subtitle: 'Continuous Model Probing & Defense',
        desc: 'Automated agent pods probe OpenAI, Gemini, and Claude daily to monitor brand mention velocity and detect competitor encroachment.',
        slides: [
          'Automated LLM Probing Swarms',
          'Share-of-Voice Share Metric',
          'Hallucination Alert Triggers',
          'Semantic Shift Analysis'
        ],
        points: [
          'Daily Prompt-Batch Simulation',
          'LLM Sentiment Scoring',
          'Competitor Displacement Radar',
          'Instant Drift Notifications'
        ],
        tech: ['OpenAI API', 'Anthropic Claude', 'Gemini Pro'],
        accentColor: '#89bc30'
      },
      {
        num: '04',
        category: 'CONVERSION',
        specId: 'SPEC: GEO-PIPELINE',
        title: 'Generative Search ARR Attribution',
        subtitle: 'From LLM Recommendation to Revenue',
        desc: 'Link Perplexity and conversational search referrers directly to pipeline milestones and high-value contract closes.',
        slides: [
          'Conversational Referrer Tracking',
          'Closed-Loop Pipeline Sync',
          'Enterprise CRM Bi-Directional Feed',
          'AI CAC & ROAS Analytics'
        ],
        points: [
          'LLM Referrer Decryption',
          'Closed-Won ARR Association',
          'Salesforce Multi-Touch Modeling',
          'Boardroom Executive Reporting'
        ],
        tech: ['Attribution APIs', 'HubSpot', 'Salesforce'],
        accentColor: '#89bc30'
      }
    ],
    offerings: [
      {
        num: '01',
        title: 'Answer-First Semantic Chunking',
        subtitle: '256-Token Dense Information Blocks',
        desc: 'Restructure your enterprise documentation into mathematical vector blocks tailored for LLM context window ingestion without lossy compression.',
        deliverables: ['Context Window Optimization', 'High Cosine Alignment', 'Markdown Ingestion Formatting', 'Direct Answer Priming']
      },
      {
        num: '02',
        title: 'SearchGPT & Perplexity Authority Sprints',
        subtitle: 'Fast-Track First-Page Citation Status',
        desc: 'Targeted campaigns engineered to insert your technical whitepapers into authoritative corpora crawled by Perplexity, SearchGPT, and Claude.',
        deliverables: ['Target Citation Seeding', 'Domain Authority Calibration', 'Canonical Anchor Mapping', 'Citation Proof Telemetry']
      },
      {
        num: '03',
        title: 'Multi-Model Entity Claim Reconciliation',
        subtitle: 'Deterministic Knowledge Graph Anchors',
        desc: 'Eliminate brand name collisions and establish clear machine-readable ownership of your proprietary intellectual property and products.',
        deliverables: ['Wikidata Q-Node Binding', 'Google Knowledge Graph Verification', 'Structured Schema Graph Audit', 'Entity Drift Defense']
      },
      {
        num: '04',
        title: 'Generative Competitor Displacement',
        subtitle: 'Replacing Legacy Brands in LLM Responses',
        desc: 'Strategic semantic positioning that shifts conversational model recommendations from legacy vendors to your modern enterprise platform.',
        deliverables: ['Comparative Vector Benchmarks', 'Alternative Query Injection', 'Technical Feature Superiority Claims', 'Win-Rate Telemetry']
      },
      {
        num: '05',
        title: 'Hallucination Mitigation & Brand Protection',
        subtitle: 'Safeguard Corporate Reputation Across AI Models',
        desc: 'Detect and correct inaccurate model responses regarding your pricing, security standards, compliance status, or platform capabilities.',
        deliverables: ['24/7 Hallucination Scanner', 'Correction Corpus Publishing', 'Model Re-alignment Protocols', 'Legal & PR Guardrails']
      },
      {
        num: '06',
        title: 'Conversational Search Conversion Tracking',
        subtitle: 'End-to-End Generative Revenue Analytics',
        desc: 'Attribute high-value enterprise leads directly to conversational search queries, calculating real ROI on your Generative Engine Optimization.',
        deliverables: ['AI UTM Decoupling', 'Pipeline Multi-Touch Attribution', 'Lead Intent Scoring', 'Executive Dashboard Reports']
      }
    ]
  },

  'google-ads': {
    slug: 'google-ads',
    name: 'Google Ads',
    titlePart1: 'GOOGLE',
    titlePart2: 'ADS',
    heroTagline: 'Precision Algorithmic Bidding, High-Intent Search Capture & Scalable Revenue Pipeline.',
    heroCoordinate: 'ALGORITHMIC BIDDING & SEARCH ARBITRAGE',
    echoText: 'GOOGLE ADS • SEARCH',
    tickerTrack1: ['GOOGLE ADS', 'HIGH-INTENT SEARCH ARBITRAGE', '10/10 QUALITY SCORE', 'PERFORMANCE MAX ENGINE', 'FIRST-PARTY CRM SIGNALS', 'VEREEN DIGITAL'],
    tickerTrack2: ['ALGORITHMIC VALUE BIDDING', 'OFFLINE CONVERSION SYNC', 'NEGATIVE KEYWORD SHIELD', 'SUB-50MS CONVERSION FUNNELS', 'BOARDROOM ATTRIBUTION'],
    thesisEyebrow: '02 — THE HIGH-INTENT ADVANTAGE',
    thesisHeadline: 'Google Search captures intent at the exact moment of decision...',
    storyBlocks: [
      {
        num: '01',
        tag: 'INTENT HARVESTING',
        title: 'Capturing High-Value Commercial Intent.',
        desc: 'We engineer precision Google Search campaigns that isolate ready-to-buy decision-makers, eliminating wasteful spend on broad, low-intent vanity terms.'
      },
      {
        num: '02',
        tag: 'ALGORITHMIC BIDDING',
        title: 'Mastering Smart Bidding & First-Party Data.',
        desc: 'Feed Google\'s AI algorithms clean, enriched first-party CRM conversion signals so bidding models prioritize leads with the highest customer lifetime value.'
      },
      {
        num: '03',
        tag: 'FULL-FUNNEL SYNC',
        title: 'Seamless Search to Landing Page Continuity.',
        desc: 'Pair dynamic search ads with ultra-fast sub-50ms landing experiences engineered for maximum conversion velocity and unrivaled Quality Scores.'
      }
    ],
    solutions: [
      {
        num: '01',
        category: 'SEARCH ARBITRAGE',
        specId: 'SPEC: GADS-ALPHA',
        title: 'High-Intent Alpha Search Clusters',
        subtitle: 'Dominating Exact & Phrase Match Intent',
        desc: 'Hyper-segmented search ad architectures designed to capture enterprise buyers with surgical precision and lower acquisition costs.',
        slides: [
          'Single-Theme Ad Grouping (STAG)',
          'Negative Keyword Safeguard Filters',
          'Auction Insight Competitor Defense',
          'Dynamic Keyword Insertion Modules'
        ],
        points: [
          'High-Intent Commercial Focus',
          'Exclusion of Non-Converting Queries',
          'Dynamic Value Bidding',
          'Top-of-Page Impression Dominance'
        ],
        tech: ['Google Ads API', 'Scripts Automation', 'Search Console'],
        accentColor: '#89bc30'
      },
      {
        num: '02',
        category: 'PERFORMANCE MAX',
        specId: 'SPEC: GADS-PMAX',
        title: 'Advanced Performance Max Architecture',
        subtitle: 'Audience Signal Calibration & Asset Control',
        desc: 'Restructure Performance Max from a black box into a revenue engine using proprietary audience signals, custom negatives, and asset groups.',
        slides: [
          'Enriched First-Party Audience Signals',
          'Exclusion of Brand Cannibalization',
          'Asset Group Distinction by Value',
          'Placement Exclusion Scripts'
        ],
        points: [
          'First-Party Customer Lists',
          'Custom Brand Exclusion Lists',
          'Multi-Asset Visual Syndication',
          'Granular Channel Performance Audits'
        ],
        tech: ['Google PMax', 'Customer Match', 'GA4 BigQuery'],
        accentColor: '#89bc30'
      },
      {
        num: '03',
        category: 'OFFLINE CONVERSIONS',
        specId: 'SPEC: GADS-OCT',
        title: 'Offline Conversion Tracking (OCT)',
        subtitle: 'Feeding Qualified Pipeline Back to Google',
        desc: 'Close the loop by uploading qualified pipeline stages and closed-won contract values directly into Google Ads for profit-driven bidding.',
        slides: [
          'GCLID & Enhanced Conversions',
          'CRM Milestone Synchronization',
          'Target ROAS Profit Calibration',
          'Junk Lead De-biasing'
        ],
        points: [
          'Salesforce & HubSpot Sync',
          'Value-Based Bidding Optimization',
          'Suppression of Fake Leads',
          'Higher Pipeline Velocity'
        ],
        tech: ['Google Enhanced Conversions', 'Salesforce', 'BigQuery'],
        accentColor: '#89bc30'
      },
      {
        num: '04',
        category: 'QUALITY SCORE',
        specId: 'SPEC: GADS-QS10',
        title: 'Quality Score Engineering',
        subtitle: 'Driving Down Cost-Per-Click by 30-50%',
        desc: 'Architect landing pages that match search query semantics with sub-second load times, locking in 9/10 and 10/10 Quality Scores.',
        slides: [
          'Semantic Headline Injection',
          'Sub-50ms Edge Page Speeds',
          'High Expected CTR Creatives',
          'Ad Relevance Optimization'
        ],
        points: [
          'Lower Average CPCs',
          'Superior Ad Rank Position',
          'Near-Instant Mobile Renders',
          'Higher Conversion Rates'
        ],
        tech: ['Next.js Edge', 'Google Lighthouse', 'PageSpeed 100'],
        accentColor: '#89bc30'
      }
    ],
    offerings: [
      {
        num: '01',
        title: 'Enterprise Search Campaign Engineering',
        subtitle: 'High-Intent Acquisition Structures',
        desc: 'Build scalable search account structures with granular ad groupings, strict negative keyword protocols, and high-converting ad copy.',
        deliverables: ['Custom Account Architecture', 'Exhaustive Negative Keyword Libraries', 'Responsive Search Ad Variations', 'Bid Strategy Tuning']
      },
      {
        num: '02',
        title: 'First-Party Data & Value-Based Bidding',
        subtitle: 'Aligning Google AI with Bottom-Line Profit',
        desc: 'Configure Enhanced Conversions and value-based bidding so algorithms hunt for high-ticket buyers rather than cheap volume clicks.',
        deliverables: ['Enhanced Conversion Setup', 'Lifetime Value Bid Rules', 'CRM Pipeline Integration', 'Margin-Optimized Target ROAS']
      },
      {
        num: '03',
        title: 'Performance Max Precision Tuning',
        subtitle: 'Unlocking Cross-Channel Scale Safely',
        desc: 'Transform PMax campaigns through disciplined asset grouping, audience signals, placement cleaning, and brand search separation.',
        deliverables: ['Audience Signal Blueprints', 'Custom Negative Keyword Lists', 'High-Converting Creative Sets', 'Placement Quality Audits']
      },
      {
        num: '04',
        title: 'Competitor Conquesting & Brand Defense',
        subtitle: 'Protect Your Trademark & Capture Market Share',
        desc: 'Defend your branded search queries against competitor poachers while strategically intercepting searches for competing solutions.',
        deliverables: ['Branded CPC Compression', 'Competitor Comparison Ad Sets', 'Trademark Policy Defense', 'Search Impression Share Maximization']
      },
      {
        num: '05',
        title: 'Landing Page Conversion Synchronization',
        subtitle: 'Sub-Second Speeds & Dynamic Personalization',
        desc: 'Eliminate bounce rates with hyper-relevant landing pages that echo search keywords dynamically and achieve 10/10 Google Quality Scores.',
        deliverables: ['Dynamic Keyword Landing Pages', 'Core Web Vitals Optimization', 'A/B Split Test Experiments', 'Frictionless Conversion Flows']
      },
      {
        num: '06',
        title: 'Real-Time Pipeline Attribution & Reporting',
        subtitle: 'Transparent Dashboards for Executive Leadership',
        desc: 'Eliminate vanity metrics with live dashboards detailing Cost-Per-Acquired-Customer, pipeline generation, and actual closed revenue.',
        deliverables: ['Live Looker Studio Dashboards', 'Blended CAC Modeling', 'Pipeline Velocity Tracking', 'Executive Weekly Briefings']
      }
    ]
  },

  'meta-ads': {
    slug: 'meta-ads',
    name: 'Meta Ads',
    titlePart1: 'META',
    titlePart2: 'ADS',
    heroTagline: 'Hyper-Targeted Paid Social Funnels, High-Converting Creative Engines & Compounding ROAS.',
    heroCoordinate: 'CREATIVE VELOCITY & ALGORITHMIC TARGETING',
    echoText: 'META ADS • SOCIAL',
    tickerTrack1: ['META ADS', 'HIGH-VELOCITY CREATIVE SANDBOX', 'SERVER-SIDE CAPI GATEWAY', 'ADVANTAGE+ SHOPPING SCALE', 'EVERGREEN WINNERS', 'VEREEN DIGITAL'],
    tickerTrack2: ['EVENT MATCH QUALITY 9.0+', 'BROAD AUDIENCE LIQUIDITY', 'HIGH-CONVERTING ADVERTORIALS', 'MER BLENDED GROWTH', 'COMPOUNDING ROAS'],
    thesisEyebrow: '02 — CREATIVE IS THE TARGETING',
    thesisHeadline: 'On Meta, the creative does the algorithmic heavy lifting...',
    storyBlocks: [
      {
        num: '01',
        tag: 'CREATIVE VELOCITY',
        title: 'Creative as the New Targeting Engine.',
        desc: 'Meta\'s Andromeda algorithm matches audiences through visual and hook semantics. We deploy rapid creative testing frameworks that isolate breakout winners week after week.'
      },
      {
        num: '02',
        tag: 'SIGNAL RECOVERY',
        title: 'Server-Side Conversions API (CAPI).',
        desc: 'Recover lost iOS signals with 100% server-to-server CAPI integration, providing Meta\'s machine learning with pristine match quality scores above 9.0/10.'
      },
      {
        num: '03',
        tag: 'EXPONENTIAL SCALE',
        title: 'Broad Audience Scaling Without Ad Fatigue.',
        desc: 'Scale budgets predictably using diversified creative angles, iterative format variations, and disciplined testing sandbox accounts.'
      }
    ],
    solutions: [
      {
        num: '01',
        category: 'CREATIVE ENGINE',
        specId: 'SPEC: META-CREATIVE',
        title: 'High-Velocity Creative Testing Sandbox',
        subtitle: 'Iterating Hooks, Visuals & Angles Weekly',
        desc: 'A scientific testing framework that screens 10-20 creative hypotheses weekly to uncover breakout evergreen ad winners.',
        slides: [
          'Dynamic Creative Testing (DCT)',
          'Hook Rate & Hold Rate Optimization',
          'Iterative Angle Diversification',
          'Fatigue Prevention Pipelines'
        ],
        points: [
          'Data-Driven Hook Testing',
          'Video Retention Beyond 3 Seconds',
          'Angle Diversification',
          'Systematized Creative Iteration'
        ],
        tech: ['Motion App', 'Meta Graph API', 'Creative OS'],
        accentColor: '#89bc30'
      },
      {
        num: '02',
        category: 'TRACKING & SIGNALS',
        specId: 'SPEC: META-CAPI',
        title: 'Meta Conversions API (CAPI) Gateway',
        subtitle: 'Zero Data Loss via Server-Side Hydration',
        desc: 'Bypass ad blockers and iOS privacy barriers by piping server-side conversion telemetry directly to Meta via AWS/Cloudflare Gateway.',
        slides: [
          'Server-to-Server Event Dispatch',
          'Event Match Quality (EMQ) 9.0+',
          'Deduplicated Pixel & CAPI Pipeline',
          'Custom First-Party Cookie Lifetime'
        ],
        points: [
          'High Match Quality Scores',
          'Resilience to Browser Blocks',
          'Offline Deal Stage Sync',
          'Accurate Multi-Touch Telemetry'
        ],
        tech: ['Meta CAPI', 'Cloudflare Workers', 'Stape/AWS'],
        accentColor: '#89bc30'
      },
      {
        num: '03',
        category: 'SCALING ARCHITECTURE',
        specId: 'SPEC: META-SCALE',
        title: 'Broad Audience Advantage+ Campaigns',
        subtitle: 'Uncapped Growth with Minimal Fragmentation',
        desc: 'Consolidate account structures into high-liquidity Advantage+ Shopping and Broad campaigns that let machine learning maximize revenue efficiency.',
        slides: [
          'Advantage+ Shopping Campaigns (ASC)',
          'Broad Audience Consolidation',
          'Dynamic Cost-Cap Guardrails',
          'Audience Overlap Elimination'
        ],
        points: [
          'Maximized Algorithmic Liquidity',
          'Zero Audience Cannibalization',
          'Controlled CAC Guardrails',
          'Scalable Spend Deployment'
        ],
        tech: ['Advantage+ Bidding', 'Meta Ads Manager'],
        accentColor: '#89bc30'
      },
      {
        num: '04',
        category: 'RETENTION & LTV',
        specId: 'SPEC: META-RETENTION',
        title: 'Post-Click Funnel Architecture',
        subtitle: 'Maximizing Average Order Value & LTV',
        desc: 'Connect winning Meta ads to specialized advertorials, interactive quiz funnels, and frictionless mobile checkouts.',
        slides: [
          'Mobile-First Advertorial Presells',
          'Interactive Diagnostic Quizzes',
          'Frictionless 1-Click Checkouts',
          'Post-Purchase Upsell Pathways'
        ],
        points: [
          'Higher Conversion Rates',
          'Elevated Average Order Value',
          'Sub-Second Mobile Load Times',
          'Accelerated Payback Period'
        ],
        tech: ['Next.js Edge', 'Shopify Plus', 'Headless Checkout'],
        accentColor: '#89bc30'
      }
    ],
    offerings: [
      {
        num: '01',
        title: 'Full-Stack Creative Production & Direction',
        subtitle: 'UGC, Motion Design & Cinematic Direct Response',
        desc: 'Conceptualize, script, edit, and optimize thumb-stopping static and video assets engineered specifically to convert on Instagram and Facebook.',
        deliverables: ['Weekly Video & Static Iterations', 'Scriptwriting & Hook Concepts', 'High-Converting Motion Graphics', 'Creative Performance Analytics']
      },
      {
        num: '02',
        title: 'Server-Side Conversions API (CAPI) Deployment',
        subtitle: 'Pristine First-Party Data Ingestion',
        desc: 'Deploy resilient server-side tracking pipelines that guarantee high Event Match Quality (EMQ) and accurate attribution across iOS updates.',
        deliverables: ['Custom CAPI Gateway Setup', 'Event Deduplication Testing', 'Extended Cookie Resilience', 'Offline Purchase Ingestion']
      },
      {
        num: '03',
        title: 'Account Consolidation & Advantage+ Scaling',
        subtitle: 'High-Liquidity Media Buying Architecture',
        desc: 'Streamline cluttered ad accounts into clean, high-liquidity campaigns that maximize algorithmic learning and lower CPMs.',
        deliverables: ['Account Structure Redesign', 'Advantage+ Campaign Scaling', 'Bid Cap & Cost Cap Implementation', 'Budget Allocation Optimization']
      },
      {
        num: '04',
        title: 'Hook & Retention Optimization Sprints',
        subtitle: 'Engineering Ads That Halt the Scroll',
        desc: 'Perform deep-dive analysis on 3-second hook rates and average watch times, systematically fixing drop-off points to drive down acquisition costs.',
        deliverables: ['Frame-by-Frame Drop-Off Analysis', 'Hook A/B Split Testing', 'Thumbnail Variation Testing', 'Iterative Winner Refinement']
      },
      {
        num: '05',
        title: 'Presell Advertorial & Quiz Funnel Design',
        subtitle: 'Priming Cold Traffic Before the Sale',
        desc: 'Build dedicated presell pages, listicles, and interactive assessments that educate cold social traffic and convert them into eager buyers.',
        deliverables: ['High-Converting Advertorials', 'Interactive Product Finders', 'Mobile-First Responsive Layouts', 'Conversion Rate Optimization']
      },
      {
        num: '06',
        title: 'Contribution Margin & Blended MER Analytics',
        subtitle: 'Growth Measured by Real Net Profit',
        desc: 'Look beyond in-platform ROAS to optimize for Marketing Efficiency Ratio (MER), new customer acquisition cost (nCAC), and true bottom-line profitability.',
        deliverables: ['Daily MER & Blended Tracking', 'Triple Whale / Northbeam Setup', 'Cohort Repurchase Modeling', 'Weekly Growth Reviews']
      }
    ]
  },

  'chatgpt-ads': {
    slug: 'chatgpt-ads',
    name: 'ChatGPT Ads',
    titlePart1: 'CHATGPT',
    titlePart2: 'ADS',
    heroTagline: 'Conversational Ad Formats, In-Context Retrieval Ingestion & Generative Search Promotion.',
    heroCoordinate: 'CONVERSATIONAL AD INGESTION & CONTEXT SPONSORSHIP',
    echoText: 'CHATGPT ADS • AI ADS',
    tickerTrack1: ['CHATGPT ADS', 'CONVERSATIONAL IN-CONTEXT SPONSORSHIP', 'OPENAI SEARCHGPT PLACEMENTS', 'CUSTOM ENTERPRISE GPTS', 'PIONEERING BRAND MOATS', 'VEREEN DIGITAL'],
    tickerTrack2: ['DYNAMIC PROMPT INGESTION', 'ZERO-HALLUCINATION DEFENSE', 'INTERACTIVE DISCOVERY FLOWS', 'CONVERSATIONAL ARR PIPELINE', 'MULTI-MODEL RETRIEVAL'],
    thesisEyebrow: '02 — THE CONVERSATIONAL FRONTIER',
    thesisHeadline: 'As billions consult AI chat daily, advertising shifts from banners to context...',
    storyBlocks: [
      {
        num: '01',
        tag: 'CONTEXTUAL NATIVE',
        title: 'In-Context Conversational Relevance.',
        desc: 'ChatGPT and generative dialogue systems create unprecedented moments of focused user intent. We position your brand natively inside contextual recommendation flows.'
      },
      {
        num: '02',
        tag: 'PROMPT ADAPTABILITY',
        title: 'Dynamic Prompt Response Tailoring.',
        desc: 'Unlike static display banners, conversational advertising adapts to the user\'s tone, sophistication level, and precise pain point in real time.'
      },
      {
        num: '03',
        tag: 'PIONEERING EARLY MOVERS',
        title: 'Claiming First-Mover Brand Moats.',
        desc: 'Early advertisers in emerging AI ecosystems establish massive share-of-mind advantages while competitors remain stuck in traditional saturated channels.'
      }
    ],
    solutions: [
      {
        num: '01',
        category: 'CONVERSATIONAL NATIVE',
        specId: 'SPEC: CHAT-NATIVE',
        title: 'Contextual In-Dialogue Sponsorship',
        subtitle: 'Seamless Solutions to Complex User Queries',
        desc: 'Craft conversational ad assets that deliver instant value when users query AI about enterprise software, workflows, and solutions.',
        slides: [
          'Conversational Intent Matching',
          'Helpful Solution Cards',
          'Dynamic Problem-Solving Triggers',
          'Native Interactive Follow-Ups'
        ],
        points: [
          'Zero Disruptive Friction',
          'High Contextual Relevance',
          'Deep Engagement Rates',
          'Natural Dialogue Flow'
        ],
        tech: ['OpenAI Ecosystem', 'Conversational AI APIs', 'Custom GPTs'],
        accentColor: '#89bc30'
      },
      {
        num: '02',
        category: 'SEARCHGPT ADVERTISING',
        specId: 'SPEC: CHAT-SEARCH',
        title: 'SearchGPT Sponsored Retrieval Placements',
        subtitle: 'Targeted Citations in Generative Answers',
        desc: 'Position your enterprise as an authorized sponsor for high-value research queries inside OpenAI\'s SearchGPT engine.',
        slides: [
          'Sponsored Citation Formatting',
          'Verified Corporate Knowledge Cards',
          'Direct Source Verification Badges',
          'Real-Time Web Feed Alignment'
        ],
        points: [
          'Dominant Answer Positioning',
          'Verified Corporate Authority',
          'Click-Through to Native Landing Hubs',
          'Protected Brand Citations'
        ],
        tech: ['SearchGPT', 'OpenAI Search API', 'Vector Feeds'],
        accentColor: '#89bc30'
      },
      {
        num: '03',
        category: 'CUSTOM GPT FUNNELS',
        specId: 'SPEC: CHAT-AGENT',
        title: 'Branded Enterprise GPT Agents',
        subtitle: 'Interactive AI Lead Qualification Machines',
        desc: 'Deploy bespoke GPT agents inside the OpenAI ecosystem that diagnose customer needs and automatically book qualified enterprise sales meetings.',
        slides: [
          'Custom Knowledge Base Integration',
          'Automated Lead Qualification Prompts',
          'Direct Calendar Booking Integration',
          'CRM Lead Hand-Off Telemetry'
        ],
        points: [
          '24/7 Automated Discovery Calls',
          'Zero Hallucination Guardrails',
          'Instant Meeting Scheduling',
          'Deep User Intent Capture'
        ],
        tech: ['OpenAI Assistant API', 'Cal.com / Chili Piper', 'Vector Store'],
        accentColor: '#89bc30'
      },
      {
        num: '04',
        category: 'GENERATIVE ATTRIBUTION',
        specId: 'SPEC: CHAT-ATTRIB',
        title: 'Conversational Dialogue Attribution',
        subtitle: 'Tracking Pipeline Born in Generative Chats',
        desc: 'Proprietary telemetry that connects conversational ad impressions and AI agent interactions directly to closed pipeline.',
        slides: [
          'Generative Lead Fingerprinting',
          'Multi-Touch AI Attribution',
          'Closed-Loop CRM Deal Tracking',
          'Prompt Journey Reconstruction'
        ],
        points: [
          'Audited Pipeline Metrics',
          'Full Journey Visibility',
          'Executive ROI Verification',
          'Customer Sentiment Analysis'
        ],
        tech: ['Attribution APIs', 'Salesforce CRM', 'Segment'],
        accentColor: '#89bc30'
      }
    ],
    offerings: [
      {
        num: '01',
        title: 'SearchGPT & AI Search Sponsorship Setup',
        subtitle: 'Early Access Generative Ad Placements',
        desc: 'Prepare and deploy high-performing commercial assets formatted specifically for OpenAI SearchGPT and emerging conversational ad inventory.',
        deliverables: ['Sponsored Citation Strategy', 'Contextual Knowledge Asset Build', 'Compliance & Policy Verification', 'Placement Bid Calibration']
      },
      {
        num: '02',
        title: 'Custom Enterprise Discovery GPTs',
        subtitle: 'Interactive AI Consultation Engines',
        desc: 'Build and launch branded AI advisors that educate prospects on your industry, solve their immediate calculations, and route them to sales.',
        deliverables: ['Custom Assistant Architecture', 'Proprietary Data Ingestion', 'Lead Capture Mechanics', 'CRM Webhook Integration']
      },
      {
        num: '03',
        title: 'Conversational Prompt Journey Mapping',
        subtitle: 'Targeting Decision Points in AI Dialogues',
        desc: 'Map out the exact sequence of questions buyers ask LLMs during the consideration phase, structuring ad triggers at moments of peak intent.',
        deliverables: ['Buyer Prompt Taxonomy', 'Intent Trigger Blueprints', 'Solution Card Copywriting', 'Conversion Path Optimization']
      },
      {
        num: '04',
        title: 'AI Answer Fact-Checking & Citation Guard',
        subtitle: 'Ensuring Your Brand is Recommended Truth',
        desc: 'Continuously verify that AI-delivered ad snippets and answers maintain strict accuracy regarding your security, compliance, and enterprise SLAs.',
        deliverables: ['Real-Time Verification Sweeps', 'Model Bias Mitigation', 'Brand Safety Guardrails', 'Automated Flagging Protocols']
      },
      {
        num: '05',
        title: 'Interactive Conversational Landing Pages',
        subtitle: 'Seamless AI-to-Web Continuity',
        desc: 'Bridge users from ChatGPT discussions into bespoke interactive web landing experiences that carry over their context with zero disconnect.',
        deliverables: ['Context-Preserving Landing Pages', 'Sub-50ms Loading Architecture', 'Dynamic Content Personalization', 'High-Converting CTAs']
      },
      {
        num: '06',
        title: 'Emerging AI Platform Ad Portfolio Management',
        subtitle: 'Cross-Model Sponsorship Strategies',
        desc: 'Diversify conversational ad campaigns across OpenAI, Claude, Microsoft Copilot, and Perplexity with centralized reporting and optimization.',
        deliverables: ['Cross-Model Budget Allocation', 'Unified Attribution Reporting', 'Early Beta Program Access', 'Strategic Monthly Roadmap']
      }
    ]
  },

  'web-development': {
    slug: 'web-development',
    name: 'Web Development',
    titlePart1: 'WEB',
    titlePart2: 'DEVELOPMENT',
    heroTagline: 'Sub-50ms Edge Infrastructure, Kinetic WebGL Spatial Interfaces & Bespoke Digital Ecosystems.',
    heroCoordinate: 'HIGH-PERFORMANCE EDGE SSR & WEBGL ARCHITECTURE',
    echoText: 'WEB DEV • 120 FPS',
    tickerTrack1: ['WEB DEVELOPMENT', '120 FPS WEBGL SPATIAL ENGINES', 'HEADLESS NEXT.JS 16 EDGE', 'SUB-50MS TIME TO FIRST BYTE', 'LENIS MOMENTUM', 'VEREEN DIGITAL'],
    tickerTrack2: ['ZERO LAYOUT SHIFT (0.00 CLS)', 'HARDWARE-ACCELERATED SHADERS', 'STREAMING SSR ARCHITECTURE', 'SOC2 ENTERPRISE FORTRESS', 'BESPOKE DIGITAL FLAGSHIPS'],
    thesisEyebrow: '02 — SPATIAL ENGINEERING',
    thesisHeadline: 'We build digital flagships that command absolute awe and convert...',
    storyBlocks: [
      {
        num: '01',
        tag: 'KINETIC CRAFT',
        title: 'Fluid 120 FPS WebGL Spatial Engines.',
        desc: 'We engineer living digital ecosystems with hardware-accelerated shaders, Lenis momentum physics, and reactive kinetic typography that leave enterprise visitors stunned.'
      },
      {
        num: '02',
        tag: 'EDGE PERFORMANCE',
        title: 'Sub-50ms Global Edge Infrastructure.',
        desc: 'Deployed on multi-region V8 isolates and streaming server-side rendering, our architectures guarantee sub-30ms Time to First Byte and flawless 100/100 Core Web Vitals.'
      },
      {
        num: '03',
        tag: 'DETERMINISTIC CONVERSION',
        title: 'Architecture Engineered for Enterprise Pipeline.',
        desc: 'Beauty without conversion is an empty trophy. Every transition, micro-interaction, and layout flow is calibrated to guide high-intent enterprise prospects toward closed deals.'
      }
    ],
    solutions: [
      {
        num: '01',
        category: 'SPATIAL WEBGL',
        specId: 'SPEC: DEV-WGL',
        title: 'Custom WebGL & Three.js Shaders',
        subtitle: 'Interactive 3D Visual Masterpieces',
        desc: 'Bespoke GLSL shader pipelines and interactive 3D particle physics engineered to run smoothly at 120 FPS without battery drain.',
        slides: [
          'Hardware-Accelerated GLSL Shaders',
          'Reactive Three.js Scene Graphs',
          'Dynamic Post-Processing Bloom',
          'Zero-Lag Canvas Optimization'
        ],
        points: [
          '120 FPS Render Performance',
          'Custom Shader Effects',
          'Subtle Ambient Lighting',
          'Mobile Fallback Architecture'
        ],
        tech: ['Three.js', 'GLSL Shaders', 'WebGPU / WebGL2'],
        accentColor: '#89bc30'
      },
      {
        num: '02',
        category: 'EDGE RUNTIME',
        specId: 'SPEC: DEV-EDGE',
        title: 'Headless Next.js 16 Edge Architecture',
        subtitle: 'Streaming SSR & Sub-30ms TTFB',
        desc: 'Enterprise Next.js infrastructure deployed globally on V8 isolates with instant partial prerendering and streaming SSR.',
        slides: [
          'Next.js 16 App Router SSR',
          'Multi-Region V8 Edge Routing',
          'Partial Prerendering (PPR)',
          'Sub-30ms Time to First Byte'
        ],
        points: [
          'Instant Page Loads Globally',
          'Zero Hydration Delay',
          '100/100 Core Web Vitals',
          'Enterprise Scalability'
        ],
        tech: ['Next.js 16', 'Vercel / Cloudflare Edge', 'TypeScript'],
        accentColor: '#89bc30'
      },
      {
        num: '03',
        category: 'PHYSICS & MOTION',
        specId: 'SPEC: DEV-LENIS',
        title: 'Lenis Momentum & GSAP Timelines',
        subtitle: 'Silky Smooth Inertial Interactions',
        desc: 'Harmonized scroll velocity, pinned horizontal reveals, and magnetic UI components that make browsing feel like piloting a luxury spacecraft.',
        slides: [
          'Normalized Lenis Scroll Physics',
          'GSAP ScrollTrigger Sequencing',
          'Magnetic Cursor Interactions',
          'Smooth Parallax Micro-Delights'
        ],
        points: [
          'Normalized Scroll Across Devices',
          'Choreographed Layout Reveals',
          'Zero Layout Shift (0.00 CLS)',
          'Tactile Interactive Micro-Feedback'
        ],
        tech: ['Lenis Scroll', 'GSAP 3.12', 'Framer Motion'],
        accentColor: '#89bc30'
      },
      {
        num: '04',
        category: 'SECURITY & SCALE',
        specId: 'SPEC: DEV-SOC2',
        title: 'SOC2-Ready Enterprise Architecture',
        subtitle: 'Fortified Security, CDN & CI/CD Pipelines',
        desc: 'Battle-tested deployment pipelines featuring automated security scans, CSP headers, zero-trust API boundaries, and DDoS shielding.',
        slides: [
          'Zero-Trust Edge Security Middleware',
          'Strict Content Security Policies',
          'Automated CI/CD GitHub Actions',
          'DDoS & Bot Mitigation Shielding'
        ],
        points: [
          'SOC2 Type II Compliance Standards',
          'Zero Vulnerability Dependencies',
          'Automated Edge Failover',
          'Enterprise SLA Guarantees'
        ],
        tech: ['Cloudflare Enterprise', 'Docker', 'GitHub Actions'],
        accentColor: '#89bc30'
      }
    ],
    offerings: [
      {
        num: '01',
        title: 'Custom Headless Enterprise Digital Flagships',
        subtitle: 'Bespoke Next.js & React Architectures',
        desc: 'Design and build world-class digital platforms engineered from scratch to reflect your brand\'s premium market leadership.',
        deliverables: ['Custom Next.js App Router Setup', 'Tailwind & Custom CSS Tokens', 'TypeScript Architecture', 'Full Responsive Design Systems']
      },
      {
        num: '02',
        title: 'WebGL & Interactive 3D Spatial Experiences',
        subtitle: '120 FPS Visual Storytelling That WOWs',
        desc: 'Integrate bespoke 3D models, shader animations, and canvas particle simulations that turn mundane sites into memorable brand universes.',
        deliverables: ['Custom 3D Model Optimization', 'Interactive Canvas Physics', 'Shader Color Grading', 'Performance Capping for Mobile']
      },
      {
        num: '03',
        title: 'Sub-50ms Global Edge Performance Tuning',
        subtitle: '100/100 Core Web Vitals Guarantee',
        desc: 'Optimize image pipelines, bundle sizes, and font rendering to achieve perfect Lighthouse scores and zero cumulative layout shifts.',
        deliverables: ['Sub-30ms TTFB Optimization', 'Zero-CLS Layout Stabilization', 'Adaptive Image Compression', 'Next-Gen Edge CDN Caching']
      },
      {
        num: '04',
        title: 'Choreographed GSAP & Scroll Interactions',
        subtitle: 'Cinematic Motion Design Built for Enterprise',
        desc: 'Implement fluid pinned horizontal decks, stacking card physics, and magnetic hover micro-animations that engage visitors at every scroll.',
        deliverables: ['Custom Lenis Momentum Configuration', 'GSAP ScrollTrigger Sequences', 'Magnetic Button Micro-Interactions', 'Interactive Cursor Physics']
      },
      {
        num: '05',
        title: 'Content Management & Headless API Backends',
        subtitle: 'Sanity, Strapi & High-Performance Headless CMS',
        desc: 'Empower your marketing team with intuitive content workflows while preserving rigid engineering standards and lightning-fast edge delivery.',
        deliverables: ['Headless CMS Schema Design', 'Instant Visual Live Previews', 'Role-Based Access Control', 'Automated Cache Revalidation']
      },
      {
        num: '06',
        title: 'Enterprise Security, Compliance & CI/CD',
        subtitle: 'Zero-Downtime Releases & Bulletproof Defense',
        desc: 'Fortify your web infrastructure with automated staging pipelines, Content Security Policy enforcement, and automated regression testing.',
        deliverables: ['Automated GitHub Actions CI/CD', 'Strict CSP & Header Security', 'Multi-Environment Staging Setups', 'Ongoing Performance Monitoring']
      }
    ]
  }
};
