/**
 * alumniData.js
 * Centralized data for the CodeBase IIIT Kota Alumni page.
 *
 * Each alumnus object:
 *  - id          : unique string identifier
 *  - name        : full name
 *  - batch       : graduation year (number)
 *  - photo       : path or URL to profile photo
 *  - currentRole : current job title
 *  - currentCompany : current employer
 *  - location    : city, country
 *  - tags        : array of domain tags
 *  - linkedin    : LinkedIn profile URL
 *  - github      : GitHub profile URL
 *  - twitter     : Twitter/X profile URL (optional)
 *  - bio         : short biography string
 *  - journey     : array of { year, title, description } milestones
 *  - techStack   : array of technology/tool names
 *  - companies   : array of { name, logo? } past employers
 *  - posts       : array of { id, title, excerpt, date, tags, content }
 */

export const DOMAIN_TAGS = [
  'Web Dev',
  'AI/ML',
  'App Dev',
  'Cloud',
  'Web3',
  'DevOps',
  'UI/UX',
  'Open Source',
];

export const alumniData = [
  // ─── Batch 2022 ──────────────────────────────────────────────────────────
  {
    id: 'arjun-sharma-2022',
    name: 'Arjun Sharma',
    batch: 2022,
    photo: `https://ui-avatars.com/api/?name=Arjun+Sharma&background=1099B7&color=fff&size=400`,
    currentRole: 'Senior Software Engineer',
    currentCompany: 'Google',
    location: 'Bangalore, India',
    tags: ['Web Dev', 'Cloud', 'Open Source'],
    linkedin: 'https://linkedin.com/in/arjun-sharma',
    github: 'https://github.com/arjun-sharma',
    twitter: 'https://twitter.com/arjun_codes',
    bio: 'Arjun is a full-stack engineer passionate about scalable systems and open-source contributions. He was the founding coordinator of CodeBase at IIIT Kota and helped shape the club into what it is today.',
    journey: [
      { year: 2018, title: 'Joined IIIT Kota', description: 'Started B.Tech in Computer Science. Fell in love with coding during the first week.' },
      { year: 2019, title: 'Co-founded CodeBase', description: 'Helped establish the development club, organizing the first hackathon with 80+ participants.' },
      { year: 2021, title: 'SWE Intern at Microsoft', description: 'Worked on Azure DevOps tooling. Shipped features used by thousands of developers worldwide.' },
      { year: 2022, title: 'Graduated & Joined Google', description: 'Joined Google\'s Cloud Platform team as a full-time Software Engineer.' },
      { year: 2024, title: 'Promoted to Senior SWE', description: 'Leading a team of 5 engineers on Google Cloud Storage reliability.' },
    ],
    techStack: ['React', 'Node.js', 'Go', 'Kubernetes', 'GCP', 'PostgreSQL', 'TypeScript', 'gRPC'],
    companies: [
      { name: 'Google' },
      { name: 'Microsoft' },
      { name: 'Razorpay' },
    ],
    posts: [
      {
        id: 'arjun-post-1',
        title: 'How I Cracked Google\'s System Design Round',
        excerpt: 'A practical guide to approaching large-scale system design problems — from load balancing to eventual consistency.',
        date: '2024-03-15',
        tags: ['Career', 'System Design', 'Cloud'],
        content: 'After interviewing at Google three times before finally succeeding, I learned that system design is as much about communication as it is about technical knowledge. In this post, I share the mental models and frameworks that helped me ace the final round...',
      },
      {
        id: 'arjun-post-2',
        title: 'From CodeBase to Google: My Journey',
        excerpt: 'How a college club project became the launchpad for my career at one of the world\'s biggest tech companies.',
        date: '2023-08-20',
        tags: ['Journey', 'Career', 'CodeBase'],
        content: 'It all started with a 24-hour hackathon organized by CodeBase. Building a real-time collaborative editor in a day taught me more than any classroom ever could...',
      },
    ],
  },

  // ─── Batch 2022 ──────────────────────────────────────────────────────────
  {
    id: 'priya-mehta-2022',
    name: 'Priya Mehta',
    batch: 2022,
    photo: `https://ui-avatars.com/api/?name=Priya+Mehta&background=ff6b9d&color=fff&size=400`,
    currentRole: 'ML Engineer',
    currentCompany: 'OpenAI',
    location: 'San Francisco, USA',
    tags: ['AI/ML', 'Open Source'],
    linkedin: 'https://linkedin.com/in/priya-mehta',
    github: 'https://github.com/priya-mehta-ml',
    twitter: '',
    bio: 'Priya is an ML researcher and engineer specializing in large language models and responsible AI. She was CodeBase\'s first AI/ML lead and mentored dozens of juniors in machine learning.',
    journey: [
      { year: 2018, title: 'IIIT Kota — CS Start', description: 'Discovered ML through Andrew Ng\'s Coursera course in the first semester.' },
      { year: 2020, title: 'AI/ML Lead at CodeBase', description: 'Started CodeBase\'s AI/ML vertical, ran workshops reaching 200+ students.' },
      { year: 2021, title: 'Research Intern at IISc', description: 'Worked on neural machine translation under Prof. Ambati.' },
      { year: 2022, title: 'Joined Microsoft Research', description: 'Contributed to the Turing-NLG project and published two papers at ACL.' },
      { year: 2023, title: 'Moved to OpenAI', description: 'Joined the alignment team working on safety evaluation frameworks.' },
    ],
    techStack: ['Python', 'PyTorch', 'HuggingFace', 'CUDA', 'JAX', 'Pandas', 'FastAPI', 'Docker'],
    companies: [
      { name: 'OpenAI' },
      { name: 'Microsoft Research' },
      { name: 'IISc' },
    ],
    posts: [
      {
        id: 'priya-post-1',
        title: 'Getting Started with LLMs: A Practical Guide for Students',
        excerpt: 'Everything I wish I knew before diving into large language models — resources, pitfalls, and the right mindset.',
        date: '2024-05-10',
        tags: ['AI/ML', 'LLMs', 'Students'],
        content: 'Large language models are the hottest topic in tech right now, and for good reason. But the gap between theory and practice is huge. Here\'s how I\'d approach learning LLMs if I were starting today...',
      },
    ],
  },

  // ─── Batch 2023 ──────────────────────────────────────────────────────────
  {
    id: 'rohit-verma-2023',
    name: 'Rohit Verma',
    batch: 2023,
    photo: `https://ui-avatars.com/api/?name=Rohit+Verma&background=ccff00&color=000&size=400`,
    currentRole: 'Frontend Engineer',
    currentCompany: 'Razorpay',
    location: 'Bangalore, India',
    tags: ['Web Dev', 'UI/UX'],
    linkedin: 'https://linkedin.com/in/rohit-verma-dev',
    github: 'https://github.com/rohit-verma',
    twitter: 'https://twitter.com/rohit_builds',
    bio: 'Rohit is a UI-obsessed frontend engineer who believes great products live or die by their design. He led CodeBase\'s web development wing and shipped 5 club projects during his tenure.',
    journey: [
      { year: 2019, title: 'First Line of Code', description: 'Wrote "Hello World" in C. Immediately googled how to make websites.' },
      { year: 2020, title: 'Web Dev Lead at CodeBase', description: 'Rebuilt the CodeBase website from scratch, increasing traffic by 300%.' },
      { year: 2022, title: 'Frontend Intern at Zomato', description: 'Worked on the merchant dashboard, improving page load time by 40%.' },
      { year: 2023, title: 'Joined Razorpay', description: 'Part of the checkout experience team, serving 100M+ transactions.' },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Figma', 'GraphQL', 'Tailwind CSS', 'Storybook', 'Playwright'],
    companies: [
      { name: 'Razorpay' },
      { name: 'Zomato' },
    ],
    posts: [
      {
        id: 'rohit-post-1',
        title: 'The Art of Micro-Interactions: Why Details Make Products Feel Alive',
        excerpt: 'A deep dive into animation principles, React Spring, and Motion that will make your UI feel premium.',
        date: '2024-01-22',
        tags: ['Web Dev', 'UI/UX', 'Animation'],
        content: 'I once spent 3 days perfecting a button animation. My PM thought I was crazy. Then user testing showed it increased click-through by 12%. Details matter...',
      },
    ],
  },

  // ─── Batch 2023 ──────────────────────────────────────────────────────────
  {
    id: 'sneha-gupta-2023',
    name: 'Sneha Gupta',
    batch: 2023,
    photo: `https://ui-avatars.com/api/?name=Sneha+Gupta&background=a855f7&color=fff&size=400`,
    currentRole: 'Android Engineer',
    currentCompany: 'Flipkart',
    location: 'Bangalore, India',
    tags: ['App Dev', 'UI/UX'],
    linkedin: 'https://linkedin.com/in/sneha-gupta-android',
    github: 'https://github.com/sneha-gupta',
    twitter: '',
    bio: 'Sneha built her first Android app at 19 and hasn\'t stopped since. She leads Flipkart\'s native Android team working on their superapp strategy. She mentored CodeBase\'s App Development vertical for two years.',
    journey: [
      { year: 2019, title: 'Built First Android App', description: 'A simple to-do app that taught her the value of clean architecture.' },
      { year: 2021, title: 'App Dev Lead at CodeBase', description: 'Organized Flutter workshops attended by 150+ students across IIIT Kota.' },
      { year: 2022, title: 'Intern at Meesho', description: 'Worked on the seller app, improving cold-start time by 60%.' },
      { year: 2023, title: 'Joined Flipkart', description: 'Part of the superapp platform team building unified navigation.' },
    ],
    techStack: ['Kotlin', 'Jetpack Compose', 'Flutter', 'Android SDK', 'Firebase', 'Room', 'Coroutines', 'Gradle'],
    companies: [
      { name: 'Flipkart' },
      { name: 'Meesho' },
    ],
    posts: [
      {
        id: 'sneha-post-1',
        title: 'Jetpack Compose vs Flutter in 2024: An Honest Comparison',
        excerpt: 'After shipping production apps in both, here\'s what I actually think about each framework.',
        date: '2024-02-18',
        tags: ['App Dev', 'Flutter', 'Android'],
        content: 'I\'ve heard the debate a thousand times. "Just use Flutter!" or "Native is always better." The truth, as always, is more nuanced...',
      },
    ],
  },

  // ─── Batch 2024 ──────────────────────────────────────────────────────────
  {
    id: 'karan-joshi-2024',
    name: 'Karan Joshi',
    batch: 2024,
    photo: `https://ui-avatars.com/api/?name=Karan+Joshi&background=f97316&color=fff&size=400`,
    currentRole: 'DevOps Engineer',
    currentCompany: 'Atlassian',
    location: 'Sydney, Australia',
    tags: ['Cloud', 'DevOps', 'Open Source'],
    linkedin: 'https://linkedin.com/in/karan-joshi-devops',
    github: 'https://github.com/karan-joshi',
    twitter: 'https://twitter.com/karan_infra',
    bio: 'Karan is passionate about infrastructure automation and developer experience. He has contributed to several major open-source projects including Kubernetes and Helm. He was the Cloud lead at CodeBase.',
    journey: [
      { year: 2020, title: 'Discovered Linux', description: 'Dual-booted Arch Linux and never looked back. The terminal became home.' },
      { year: 2021, title: 'Cloud Lead at CodeBase', description: 'Set up CI/CD pipelines for 10+ club projects and ran a DevOps bootcamp.' },
      { year: 2023, title: 'Intern at Atlassian', description: 'Worked on Bitbucket Pipelines infrastructure serving 10M+ builds/month.' },
      { year: 2024, title: 'Full-time at Atlassian', description: 'Joined the Developer Experience team in Sydney.' },
    ],
    techStack: ['Kubernetes', 'Terraform', 'AWS', 'GCP', 'Docker', 'Helm', 'ArgoCD', 'Python', 'Go', 'Prometheus'],
    companies: [
      { name: 'Atlassian' },
      { name: 'HasuraDB' },
    ],
    posts: [
      {
        id: 'karan-post-1',
        title: 'Zero to Kubernetes: A College Student\'s Guide',
        excerpt: 'You don\'t need a $10,000 server farm. Here\'s how to learn K8s for free using Minikube and Kind.',
        date: '2024-04-05',
        tags: ['Cloud', 'DevOps', 'Kubernetes'],
        content: 'Kubernetes has a reputation for being intimidating, and honestly, it deserves it. But the fundamentals are learnable in a weekend. Let me show you how I approached it...',
      },
    ],
  },

  // ─── Batch 2024 ──────────────────────────────────────────────────────────
  {
    id: 'ananya-singh-2024',
    name: 'Ananya Singh',
    batch: 2024,
    photo: `https://ui-avatars.com/api/?name=Ananya+Singh&background=14b8a6&color=fff&size=400`,
    currentRole: 'Blockchain Developer',
    currentCompany: 'Polygon',
    location: 'Remote (India)',
    tags: ['Web3', 'Open Source'],
    linkedin: 'https://linkedin.com/in/ananya-singh-web3',
    github: 'https://github.com/ananya-web3',
    twitter: 'https://twitter.com/ananya_onchain',
    bio: 'Ananya is a Web3 developer building the decentralized internet one smart contract at a time. She led the Web3 vertical at CodeBase and organized IIIT Kota\'s first blockchain hackathon.',
    journey: [
      { year: 2020, title: 'Down the Crypto Rabbit Hole', description: 'Read the Bitcoin whitepaper and couldn\'t sleep for three days.' },
      { year: 2021, title: 'Web3 Lead at CodeBase', description: 'Organized "DeFi Day" — IIIT Kota\'s first blockchain-focused event.' },
      { year: 2023, title: 'Won ETHIndia', description: 'Won the best DeFi hack at ETHIndia 2023 with a cross-chain lending protocol.' },
      { year: 2024, title: 'Joined Polygon', description: 'Working on zkEVM tooling and developer experience for Layer 2 scaling.' },
    ],
    techStack: ['Solidity', 'Hardhat', 'Foundry', 'React', 'ethers.js', 'The Graph', 'IPFS', 'Rust'],
    companies: [
      { name: 'Polygon' },
      { name: 'Superteam' },
    ],
    posts: [
      {
        id: 'ananya-post-1',
        title: 'Smart Contracts Are Not Scary: A Beginner\'s Guide to Solidity',
        excerpt: 'I went from zero to deploying on mainnet in 30 days. Here\'s the exact path I followed.',
        date: '2024-06-01',
        tags: ['Web3', 'Solidity', 'Blockchain'],
        content: 'Everyone told me Web3 was too complex to get into without a CS background. I had a CS background and still found it intimidating at first. But after 30 days of consistent practice...',
      },
    ],
  },

  // ─── Batch 2021 ──────────────────────────────────────────────────────────
  {
    id: 'vikram-patel-2021',
    name: 'Vikram Patel',
    batch: 2021,
    photo: `https://ui-avatars.com/api/?name=Vikram+Patel&background=ec4899&color=fff&size=400`,
    currentRole: 'Staff Engineer',
    currentCompany: 'Stripe',
    location: 'Dublin, Ireland',
    tags: ['Web Dev', 'Cloud', 'DevOps'],
    linkedin: 'https://linkedin.com/in/vikram-patel-stripe',
    github: 'https://github.com/vikram-patel',
    twitter: 'https://twitter.com/vikram_codes',
    bio: 'Vikram has 5+ years of experience building high-throughput payment infrastructure. As a Staff Engineer at Stripe, he leads technical direction for the Payments Platform team. He was CodeBase\'s founding member.',
    journey: [
      { year: 2017, title: 'IIIT Kota — Batch 1', description: 'Part of the inaugural batch that helped shape the institute\'s culture.' },
      { year: 2019, title: 'Founded CodeBase', description: 'Co-founded the club with 12 members. Wrote the first line of code for the club website.' },
      { year: 2020, title: 'Intern at Stripe', description: 'Worked on the Radar fraud detection system.' },
      { year: 2021, title: 'Full-time at Stripe', description: 'Joined as a Software Engineer. Promoted to Staff in 3 years.' },
    ],
    techStack: ['Ruby', 'Go', 'React', 'PostgreSQL', 'Redis', 'Kafka', 'AWS', 'Terraform', 'gRPC'],
    companies: [
      { name: 'Stripe' },
      { name: 'Razorpay' },
    ],
    posts: [
      {
        id: 'vikram-post-1',
        title: 'What 5 Years at Stripe Taught Me About Distributed Systems',
        excerpt: 'Idempotency, circuit breakers, and the hardest problem in computer science: eventual consistency at 1M TPS.',
        date: '2024-07-08',
        tags: ['System Design', 'Backend', 'Career'],
        content: 'Processing millions of financial transactions per second is a unique engineering challenge. Every millisecond of downtime costs real money for real businesses. Here\'s what I\'ve learned...',
      },
      {
        id: 'vikram-post-2',
        title: 'How to Become a Staff Engineer Before 30',
        excerpt: 'Technical excellence is necessary but not sufficient. Here\'s the leadership and communication work that actually matters.',
        date: '2023-11-15',
        tags: ['Career', 'Leadership'],
        content: 'I became a Staff Engineer at 26. Not because I was the smartest person in the room, but because I learned how to make everyone around me better...',
      },
    ],
  },
];

/**
 * All posts from all alumni, flattened and sorted by date (newest first).
 */
export const allPosts = alumniData
  .flatMap((alum) =>
    (alum.posts || []).map((post) => ({
      ...post,
      authorId: alum.id,
      authorName: alum.name,
      authorPhoto: alum.photo,
      authorBatch: alum.batch,
    }))
  )
  .sort((a, b) => new Date(b.date) - new Date(a.date));

/**
 * Get unique batch years, sorted descending.
 */
export const batchYears = [...new Set(alumniData.map((a) => a.batch))].sort((a, b) => b - a);
