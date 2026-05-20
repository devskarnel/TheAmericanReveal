import type { Article, Author } from '@/types'

export const authors: Author[] = [
  {
    id: '1',
    name: 'Marcus Reed',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    bio: 'Senior political correspondent with 15 years covering Washington. Former NYT journalist.',
    role: 'Senior Political Correspondent',
    twitter: '@marcusreed',
    articles: 234,
  },
  {
    id: '2',
    name: 'Vivian Chase',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vivian',
    bio: 'Wall Street investigative reporter. Uncovering financial fraud and market manipulation.',
    role: 'Financial Investigator',
    twitter: '@vivianchase',
    articles: 189,
  },
  {
    id: '3',
    name: 'Alex Mercer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    bio: 'Tech and AI journalist. Covering the intersection of emerging tech and society.',
    role: 'Tech & AI Reporter',
    twitter: '@alexmercer',
    articles: 156,
  },
  {
    id: '4',
    name: 'Jordan Blake',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
    bio: 'Viral content analyst and social media trends expert. Breaking stories before they break.',
    role: 'Viral Trends Editor',
    twitter: '@jordanblake',
    articles: 312,
  },
]

export const articles: Article[] = [
  {
    id: '1',
    title: 'BREAKING: Senate Intelligence Committee Exposes Massive Dark Money Network Funding 2024 Elections',
    slug: 'senate-intelligence-dark-money-network-2024',
    excerpt: 'A bombshell Senate report reveals a $2.4 billion dark money operation funneling foreign funds into US political campaigns through shell corporations spanning 14 countries.',
    content: `<h2>The Investigation That Shook Washington</h2>
<p>In what analysts are calling the most significant political finance scandal in American history, the Senate Intelligence Committee released a 847-page report Thursday detailing an unprecedented dark money operation that has systematically corrupted the 2024 election cycle.</p>
<p>The report, compiled over 18 months of covert investigation, traces $2.4 billion in untraceable funds through a labyrinthine network of shell corporations, cryptocurrency wallets, and offshore accounts spanning 14 countries including Russia, China, Saudi Arabia, and the United Arab Emirates.</p>
<blockquote>"What we've uncovered represents an existential threat to American democracy. This isn't just campaign finance fraud — this is the wholesale purchase of the United States government by foreign powers." — Senator Patricia Hawkins, Committee Chair</blockquote>
<h2>How the Network Operated</h2>
<p>According to the report, funds entered the US financial system through a three-tier laundering structure. First, foreign oligarchs and state-linked entities deposited funds into crypto mixers. These were then distributed to 340 registered American nonprofits — most created within the past three years — before being funneled as "issue advocacy" spending to specific campaigns.</p>
<p>The investigation identified six sitting US senators and 23 House members who received significant funding from entities connected to the network. All six senators sit on committees with oversight of foreign policy, defense appropriations, or financial regulation.</p>
<h2>The Cryptocurrency Trail</h2>
<p>Federal prosecutors and blockchain forensics firm Chainalysis traced $340 million in Monero and Zcash transactions that were converted to USD through a network of unlicensed money services businesses operating as convenience stores in swing states.</p>
<p>Perhaps most alarming is evidence that AI-generated deepfake videos — funded by the network — were used to suppress voter turnout in three key battleground states, with targeted distribution via social media platforms.</p>
<h2>Political Fallout</h2>
<p>The White House has demanded immediate DOJ action, while Republican leadership has called the report "a partisan hit job timed for maximum political damage." Three of the six named senators have already announced they will not seek re-election.</p>
<p>Legal experts suggest the evidence, if verified, could result in the largest FECA prosecution in history, with potential sentences of up to 20 years for those at the network's core.</p>`,
    category: 'politics',
    tags: ['Senate', 'Dark Money', 'Election Fraud', 'Campaign Finance', 'Corruption'],
    author: authors[0],
    featuredImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80',
    publishedAt: '2026-05-19T09:00:00Z',
    updatedAt: '2026-05-19T14:30:00Z',
    readingTime: 8,
    views: 284500,
    likes: 12400,
    comments: [
      {
        id: 'c1',
        author: 'DisgustedVoter',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=voter1',
        content: 'This is beyond disgusting. The entire system is rigged. When do we hold these people accountable?',
        createdAt: '2026-05-19T10:15:00Z',
        likes: 847,
      },
      {
        id: 'c2',
        author: 'PoliticalAnalyst99',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=analyst',
        content: 'The cryptocurrency angle is particularly clever — Monero\'s privacy features make tracing nearly impossible without the blockchain forensics capabilities most agencies don\'t have.',
        createdAt: '2026-05-19T11:30:00Z',
        likes: 523,
      },
    ],
    featured: true,
    breaking: true,
    trending: true,
    status: 'published',
  },
  {
    id: '2',
    title: 'Wall Street\'s Biggest Ponzi Scheme Since Madoff: $18B "AI Investment Fund" Collapses',
    slug: 'ai-investment-fund-ponzi-scheme-collapse',
    excerpt: 'NeuralWealth Capital defrauded 140,000 retail investors over three years using AI buzzwords and fabricated returns while executives secretly withdrew $2.1 billion.',
    content: `<h2>The Collapse That Rocked Markets</h2>
<p>NeuralWealth Capital, the self-described "first AI-native hedge fund," filed for Chapter 7 bankruptcy Tuesday after federal regulators revealed the firm's entire operation was an elaborate Ponzi scheme that defrauded approximately 140,000 retail investors of $18 billion over three years.</p>
<p>The SEC complaint, filed simultaneously with the bankruptcy filing, alleges that NeuralWealth's celebrated AI trading algorithm — which the firm claimed generated consistent 40% annual returns — was entirely fictional. The company's actual trading desk lost $340 million, losses that were concealed through falsified account statements.</p>
<h2>How They Sold the Dream</h2>
<p>NeuralWealth leveraged Silicon Valley credibility, employing dozens of former Google, OpenAI, and DeepMind engineers as window dressing. Their fundraising materials featured sophisticated-looking trading dashboards, AI architecture diagrams, and testimonials from investors — many of whom have since been revealed as paid actors.</p>
<blockquote>"They exploited every hot-button tech buzzword. 'Quantum AI.' 'Neural market prediction.' 'Blockchain-verified returns.' It was masterful manipulation of technically-unsophisticated investors who didn't want to feel left behind by the AI revolution." — SEC Commissioner Dr. Lisa Chen</blockquote>
<h2>The Money Trail</h2>
<p>While investors believed their funds were being actively traded, $2.1 billion was secretly funneled to offshore accounts in Cayman Islands, Seychelles, and Liechtenstein through a network of 89 shell companies. Founder Marcus Webb quietly transferred $340 million to a trust in his wife's name in Q4 2025.</p>
<p>An additional $800 million was used to pay "returns" to early investors — the classic Ponzi structure — creating the illusion of legitimacy that attracted institutional interest.</p>
<h2>Victims and Fallout</h2>
<p>The investor pool skews heavily toward retirement-age Americans, with the average victim having invested $128,000 — often representing a significant portion of their life savings. A victims' advocacy group has already filed class-action suits in three jurisdictions.</p>`,
    category: 'finance',
    tags: ['Ponzi Scheme', 'Wall Street', 'AI Fraud', 'SEC', 'Investors'],
    author: authors[1],
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    publishedAt: '2026-05-18T14:00:00Z',
    updatedAt: '2026-05-18T18:00:00Z',
    readingTime: 7,
    views: 198700,
    likes: 8900,
    comments: [
      {
        id: 'c3',
        author: 'RetiredTeacher_PA',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher',
        content: 'I lost $85,000. My entire retirement savings. I am 67 years old. These people destroyed my life.',
        createdAt: '2026-05-18T15:00:00Z',
        likes: 2341,
      },
    ],
    featured: true,
    breaking: false,
    trending: true,
    status: 'published',
  },
  {
    id: '3',
    title: 'The $400M Medicare Billing Scam: How a Florida Network Stole From Seniors for a Decade',
    slug: 'florida-medicare-billing-scam-400-million',
    excerpt: 'A network of 67 fraudulent medical clinics across Florida systematically billed Medicare for services never rendered, using stolen patient identities and phantom doctors.',
    content: `<h2>Operation Silver Ghost Unveiled</h2>
<p>Federal agents arrested 43 individuals Tuesday in a coordinated sweep across South Florida, dismantling what prosecutors describe as the most sophisticated Medicare fraud operation ever prosecuted, totaling $400 million in fraudulent claims over a decade.</p>
<p>The network, dubbed "Operation Silver Ghost" by investigators, operated 67 fraudulent medical clinics — many in strip malls that appeared to be legitimate practices — while billing Medicare for expensive medical equipment, home health services, and cancer treatments that were never provided.</p>
<h2>The Mechanics of the Fraud</h2>
<p>Investigators say the operation purchased stolen Medicare beneficiary data from dark web marketplaces, paying between $15 and $40 per complete beneficiary profile. Using this data, the network created fictitious patient records for everything from motorized wheelchairs to chemotherapy sessions.</p>
<blockquote>"These criminals didn't just steal money — they stole the medical identities of vulnerable seniors, in many cases corrupting their actual medical records and creating life-threatening complications when real doctors encountered falsified histories." — U.S. Attorney Rodriguez</blockquote>
<h2>The Corruption Angle</h2>
<p>Perhaps most alarming are allegations that the network operated with the protection of two Medicare administrative contractors and three state health officials who received bribes totaling $8 million in exchange for fast-tracking claims and suppressing fraud flags.</p>`,
    category: 'scams',
    tags: ['Medicare Fraud', 'Healthcare Scam', 'FBI', 'Florida', 'Senior Fraud'],
    author: authors[1],
    featuredImage: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1200&q=80',
    publishedAt: '2026-05-17T10:30:00Z',
    updatedAt: '2026-05-17T16:00:00Z',
    readingTime: 6,
    views: 145200,
    likes: 6700,
    comments: [],
    featured: false,
    breaking: false,
    trending: true,
    status: 'published',
  },
  {
    id: '4',
    title: 'OpenAI\'s Leaked Internal Memo Reveals Plans for AGI Deployment Without Government Oversight',
    slug: 'openai-leaked-memo-agi-deployment-no-oversight',
    excerpt: 'A bombshell leaked document from OpenAI\'s board meeting reveals the company believes it has achieved a significant AGI milestone and plans unilateral deployment despite safety concerns.',
    content: `<h2>The Document That Changes Everything</h2>
<p>A leaked internal memorandum from OpenAI's board of directors, authenticated by four former employees who spoke on condition of anonymity, reveals the company believes it has achieved a significant breakthrough toward Artificial General Intelligence and is planning deployment on a timeline that deliberately circumvents emerging AI safety regulations.</p>
<p>The 34-page document, dated April 2026, describes a system internally codenamed "Nexus" that "consistently demonstrates cross-domain reasoning, autonomous goal-setting, and recursive self-improvement capabilities that meet or exceed our internal AGI benchmarks in 7 of 9 critical domains."</p>
<h2>The Safety Debate Inside OpenAI</h2>
<p>Perhaps more alarming than the capability claims is the memo's treatment of internal opposition. According to the document, a "Safety Review Committee" raised 23 specific concerns about deployment readiness, each of which was individually "risk-accepted" by executive leadership without external review.</p>
<blockquote>"The memo explicitly states that seeking government oversight would 'create competitive risk' and that the company's own safety frameworks are 'sufficient and preferable to regulatory interference.' This is exactly the scenario AI safety researchers have warned about for years." — Dr. Sarah Woodson, Center for AI Safety</blockquote>
<h2>Congressional Response</h2>
<p>The House Committee on Science and Technology has already issued emergency subpoenas for OpenAI executives, while a bipartisan coalition of senators introduced emergency legislation Thursday that would mandate a 90-day independent safety review for any AI system meeting certain capability thresholds before deployment.</p>`,
    category: 'ai-tech',
    tags: ['OpenAI', 'AGI', 'AI Safety', 'Tech Scandal', 'Regulation'],
    author: authors[2],
    featuredImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    publishedAt: '2026-05-19T07:00:00Z',
    updatedAt: '2026-05-19T12:00:00Z',
    readingTime: 9,
    views: 423800,
    likes: 21200,
    comments: [
      {
        id: 'c4',
        author: 'AIResearcher_MIT',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mit',
        content: 'If these capability claims are even partially accurate, this is the most significant development in human history. The fact that it\'s being handled like a product launch is deeply concerning.',
        createdAt: '2026-05-19T09:00:00Z',
        likes: 3421,
      },
    ],
    featured: true,
    breaking: true,
    trending: true,
    status: 'published',
  },
  {
    id: '5',
    title: 'Viral: The "Quantum Crypto" Scam That Robbed 2 Million Americans of $6.7 Billion',
    slug: 'quantum-crypto-scam-2-million-americans',
    excerpt: 'A coordinated network of fake crypto exchanges using AI-generated influencers and deepfake celebrity endorsements executed the largest retail crypto fraud in history.',
    content: `<h2>The Anatomy of a Perfect Scam</h2>
<p>Federal prosecutors unsealed a 200-count indictment Thursday against the architects of what they're calling "the most sophisticated retail fraud operation in American history" — a crypto scam that used AI-generated influencers, deepfake celebrity endorsements, and fake regulatory approvals to steal $6.7 billion from approximately 2 million Americans.</p>
<p>The operation, which ran from early 2024 through March 2026, created 14 fake cryptocurrency exchanges operating under names like "QuantumChain," "NovaCoin," and "CryptoFed" — each featuring fabricated regulatory seals, AI-synthesized trading data, and professional customer service operations staffed by unknowing overseas contractors.</p>
<h2>AI-Generated Deception at Scale</h2>
<p>What distinguished this operation from traditional crypto fraud was its unprecedented use of generative AI. The network created and maintained approximately 12,000 fake social media influencer profiles — complete with years of fabricated posting history, follower networks, and engagement — to build organic-seeming credibility for their platforms.</p>
<blockquote>"They created entire fake people. Financial advisors with LinkedIn profiles, ten years of posts, a network of colleagues and clients — all fake, all AI-generated. When victims Googled the person who 'recommended' the platform, they found a completely convincing digital identity." — FBI Cyber Division Chief Agent Torres</blockquote>`,
    category: 'viral',
    tags: ['Crypto Scam', 'AI Fraud', 'Deepfake', 'Financial Crime', 'Bitcoin'],
    author: authors[3],
    featuredImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80',
    publishedAt: '2026-05-18T08:00:00Z',
    updatedAt: '2026-05-18T14:00:00Z',
    readingTime: 7,
    views: 567300,
    likes: 28900,
    comments: [],
    featured: false,
    breaking: false,
    trending: true,
    status: 'published',
  },
  {
    id: '6',
    title: 'GOP Governor Under FBI Investigation for Funneling State Contracts to Campaign Donors',
    slug: 'gop-governor-fbi-investigation-state-contracts',
    excerpt: 'Governor Michael Crane of Ohio faces federal corruption charges after an 18-month investigation revealed $340 million in state infrastructure contracts were steered to companies owned by major campaign contributors.',
    content: `<h2>The Contract-for-Cash Scheme</h2>
<p>Governor Michael Crane, who won Ohio's gubernatorial race in 2022 on an "anti-corruption" platform, is facing federal bribery and corruption charges after FBI investigators revealed an 18-month investigation showing $340 million in state contracts were systematically awarded to companies owned by his top 12 campaign donors.</p>
<p>The indictment, which names the governor, his chief of staff, and seven state procurement officials, describes a "pay-to-play" operation where bid specifications for state infrastructure projects were crafted in advance to ensure specific companies would win, regardless of price or qualifications.</p>
<blockquote>"Governor Crane ran on cleaning up Columbus. He was actually running the dirtiest administration in Ohio history." — U.S. Attorney James Park</blockquote>
<h2>The Evidence Trail</h2>
<p>Investigators obtained 14,000 text messages and emails between the governor's office and donor representatives discussing contract terms before formal bid processes had opened. In one message, the governor's chief of staff writes explicitly: "Make sure the specs mention the proprietary drainage system — that way only [donor company] can win."</p>`,
    category: 'politics',
    tags: ['Corruption', 'FBI', 'Governor', 'Bribery', 'Ohio'],
    author: authors[0],
    featuredImage: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1200&q=80',
    publishedAt: '2026-05-16T11:00:00Z',
    updatedAt: '2026-05-16T15:00:00Z',
    readingTime: 6,
    views: 167800,
    likes: 9200,
    comments: [],
    featured: false,
    breaking: false,
    trending: false,
    status: 'published',
  },
  {
    id: '7',
    title: 'Inside the "Miracle Cure" Supplement Empire That Made $900M Selling Worthless Pills to Cancer Patients',
    slug: 'miracle-cure-supplement-empire-cancer-patients',
    excerpt: 'A Utah-based supplement company built a $900 million empire selling "quantum-enhanced cellular regeneration" supplements to terminally ill patients, backed by fabricated clinical trials.',
    content: `<h2>Preying on the Desperate</h2>
<p>The FTC and DOJ announced Tuesday they have shut down LifeForce Quantum Health, a Utah-based supplement company that generated $900 million in revenue by marketing worthless supplements to cancer patients, Alzheimer's patients, and other terminally or seriously ill individuals using completely fabricated clinical trial data.</p>
<p>LifeForce's flagship product, "QuantumCell Pro," sold for $349 per month and was marketed as able to "reprogram cellular DNA at the quantum level" to reverse cancer, Alzheimer's, and autoimmune diseases — claims that have no scientific basis and that the company knew were false.</p>
<blockquote>"These are among the most morally reprehensible crimes we prosecute. They targeted people in their most vulnerable moments, in the last months of their lives, offering false hope and taking their savings." — FTC Chair Commissioner Nguyen</blockquote>`,
    category: 'scams',
    tags: ['Health Scam', 'Cancer Fraud', 'FTC', 'Supplements', 'Consumer Protection'],
    author: authors[1],
    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    publishedAt: '2026-05-15T09:00:00Z',
    updatedAt: '2026-05-15T14:00:00Z',
    readingTime: 8,
    views: 234100,
    likes: 14500,
    comments: [],
    featured: false,
    breaking: false,
    trending: false,
    status: 'published',
  },
  {
    id: '8',
    title: 'Tesla\'s Secret "Full Self-Driving" Data: 847 Unreported Fatal Accidents Revealed',
    slug: 'tesla-fsd-unreported-fatal-accidents',
    excerpt: 'A federal investigation reveals Tesla concealed 847 fatal accidents linked to its Full Self-Driving software from regulators, while continuing to expand deployment.',
    content: `<h2>The Hidden Death Toll</h2>
<p>A congressional investigation has revealed Tesla concealed 847 fatal accidents from NHTSA investigators in which Full Self-Driving software was active at the time of crash, while simultaneously lobbying regulators to expand FSD approval and collecting $20,000 per vehicle for the feature.</p>
<p>Internal Tesla documents subpoenaed by the House Commerce Committee show a systematic practice of reclassifying FSD-active crashes as "driver error" or "environmental factors" before mandatory reporting deadlines, effectively hiding the accidents from federal safety statistics.</p>`,
    category: 'ai-tech',
    tags: ['Tesla', 'Self-Driving', 'Safety Scandal', 'NHTSA', 'Elon Musk'],
    author: authors[2],
    featuredImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80',
    publishedAt: '2026-05-14T13:00:00Z',
    updatedAt: '2026-05-15T09:00:00Z',
    readingTime: 7,
    views: 389200,
    likes: 18700,
    comments: [],
    featured: false,
    breaking: false,
    trending: false,
    status: 'published',
  },
  {
    id: '9',
    title: 'The Stock Market Manipulation Ring Using AI Bots to Move $50B in Trades',
    slug: 'stock-market-manipulation-ai-bots-50-billion',
    excerpt: 'SEC investigators have identified a 23-person network using coordinated AI-powered trading bots to manipulate stock prices of small-cap companies, generating $2.3 billion in illegal profits.',
    content: `<h2>Wall Street's AI Crime Wave</h2>
<p>The Securities and Exchange Commission filed charges Thursday against a 23-person network — spanning hedge funds in Connecticut, London, and Singapore — that used sophisticated AI-powered trading algorithms to execute coordinated pump-and-dump schemes across 340 small-cap stocks, generating $2.3 billion in illegal profits over two years.</p>
<p>The operation combined AI-generated social media posts, coordinated options activity, and synchronized bot trading to create artificial momentum in target stocks before executing mass sell orders at the peak, leaving retail investors holding catastrophic losses.</p>`,
    category: 'finance',
    tags: ['Stock Manipulation', 'SEC', 'AI Trading', 'Market Fraud', 'Wall Street'],
    author: authors[1],
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    publishedAt: '2026-05-13T10:00:00Z',
    updatedAt: '2026-05-13T16:00:00Z',
    readingTime: 6,
    views: 201400,
    likes: 11300,
    comments: [],
    featured: false,
    breaking: false,
    trending: false,
    status: 'published',
  },
  {
    id: '10',
    title: 'Deepfake President: How AI-Generated Biden Video Nearly Triggered Nuclear Response Protocol',
    slug: 'deepfake-president-ai-video-nuclear-response',
    excerpt: 'A classified near-miss incident from 2025 is revealed: an AI-generated deepfake of the President ordering a nuclear alert was distributed through official-looking channels, triggering a 4-hour emergency protocol.',
    content: `<h2>The Most Dangerous Deepfake in History</h2>
<p>A classified incident from November 2025 — just declassified under pressure from a bipartisan Senate investigation — reveals that an AI-generated deepfake video of the President ordering DEFCON 3 status was injected into a restricted military communication channel, triggering a four-hour emergency response protocol before being identified as fraudulent.</p>
<p>The incident, which senior defense officials say came "closer to catastrophic misinterpretation than any incident since the Cold War," has reignited urgent calls for AI authentication standards in government communications.</p>`,
    category: 'viral',
    tags: ['Deepfake', 'National Security', 'AI', 'Nuclear', 'Military'],
    author: authors[3],
    featuredImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&q=80',
    publishedAt: '2026-05-12T08:00:00Z',
    updatedAt: '2026-05-12T14:00:00Z',
    readingTime: 9,
    views: 892400,
    likes: 45600,
    comments: [],
    featured: false,
    breaking: false,
    trending: false,
    status: 'published',
  },
  {
    id: '11',
    title: 'Exposed: The Congressional Insider Trading Network That Made 40 Lawmakers Millionaires',
    slug: 'congressional-insider-trading-network-lawmakers',
    excerpt: 'A data analysis of congressional stock trades reveals 40 members of Congress executed perfectly-timed trades on companies with pending legislation, generating an average 340% return.',
    content: `<h2>Trading on America's Secrets</h2>
<p>A joint investigation by the Senate Ethics Committee and the SEC has identified 40 sitting members of Congress who executed suspiciously well-timed stock trades in companies directly affected by legislation they were working on, generating profits that outpaced market indices by an average of 340%.</p>
<p>The most egregious cases involve purchases of pharmaceutical stocks days before the relevant committee voted on drug pricing legislation, and sales of defense contractor stocks weeks before major contract cancellations were announced in classified briefings.</p>`,
    category: 'politics',
    tags: ['Insider Trading', 'Congress', 'Stock Market', 'Corruption', 'SEC'],
    author: authors[0],
    featuredImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80',
    publishedAt: '2026-05-11T09:00:00Z',
    updatedAt: '2026-05-11T15:00:00Z',
    readingTime: 7,
    views: 312600,
    likes: 16800,
    comments: [],
    featured: false,
    breaking: false,
    trending: false,
    status: 'published',
  },
  {
    id: '12',
    title: 'The $12B "Green Energy" Fund That Was Secretly Funding Fossil Fuel Lobbying',
    slug: 'green-energy-fund-fossil-fuel-lobbying',
    excerpt: 'Billions raised from ESG-conscious investors under the banner of green energy transition were secretly redirected to fund fossil fuel industry lobbying campaigns and political action committees.',
    content: `<h2>The Ultimate ESG Betrayal</h2>
<p>A sweeping SEC investigation has revealed that GreenFuture Capital Partners, one of America's largest self-described "sustainable investment" funds with $12 billion under management, was secretly using a portion of investor funds to finance fossil fuel lobbying operations — the very industry it claimed to be replacing.</p>
<p>Internal documents reveal the fund's management maintained a secret "influence portfolio" that directed $840 million in fees and undisclosed revenue to 14 lobbying firms working on behalf of oil, gas, and coal industry clients.</p>`,
    category: 'finance',
    tags: ['ESG Fraud', 'Green Energy', 'Fossil Fuels', 'SEC', 'Investment Fraud'],
    author: authors[1],
    featuredImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
    publishedAt: '2026-05-10T11:00:00Z',
    updatedAt: '2026-05-10T17:00:00Z',
    readingTime: 6,
    views: 178900,
    likes: 9400,
    comments: [],
    featured: false,
    breaking: false,
    trending: false,
    status: 'published',
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category && a.status === 'published')
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured && a.status === 'published')
}

export function getTrendingArticles(): Article[] {
  return articles
    .filter((a) => a.trending && a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 6)
}

export function getBreakingNews(): Article[] {
  return articles.filter((a) => a.breaking && a.status === 'published')
}

export function getRelatedArticles(article: Article): Article[] {
  return articles
    .filter((a) => a.id !== article.id && a.category === article.category && a.status === 'published')
    .slice(0, 3)
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase()
  return articles.filter(
    (a) =>
      a.status === 'published' &&
      (a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)))
  )
}

export const CATEGORIES = [
  { id: 'politics', name: 'Politics', icon: '🏛️', count: articles.filter((a) => a.category === 'politics').length },
  { id: 'finance', name: 'Finance', icon: '💰', count: articles.filter((a) => a.category === 'finance').length },
  { id: 'scams', name: 'Scams', icon: '⚠️', count: articles.filter((a) => a.category === 'scams').length },
  { id: 'viral', name: 'Viral News', icon: '🔥', count: articles.filter((a) => a.category === 'viral').length },
  { id: 'ai-tech', name: 'AI & Tech', icon: '🤖', count: articles.filter((a) => a.category === 'ai-tech').length },
] as const

export const TICKER_ITEMS = [
  '🔴 BREAKING: Senate Exposes $2.4B Dark Money Network',
  '⚠️ AI Investment Fund Collapse: 140,000 Victims',
  '🚨 Florida Medicare Fraud Ring Busted: $400M Scheme',
  '🤖 OpenAI Leak: AGI Plans Without Government Oversight',
  '💸 Crypto Scam Steals $6.7B From 2M Americans',
  '🏛️ Ohio Governor Faces FBI Corruption Charges',
  '⚡ Tesla Hid 847 Fatal FSD Accidents From Regulators',
  '🔥 Congressional Insider Trading Network Exposed',
]
