const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const connectDB = require('./config/db');

const User = require('./models/User');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Industry = require('./models/Industry');
const Technology = require('./models/Technology');
const Testimonial = require('./models/Testimonial');
const Statistic = require('./models/Statistic');

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('[Seed] Clearing existing collection data...');

    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Project.deleteMany({}),
      Industry.deleteMany({}),
      Technology.deleteMany({}),
      Testimonial.deleteMany({}),
      Statistic.deleteMany({})
    ]);

    // 1. Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@syspoly.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2026!';
    const adminName = process.env.ADMIN_NAME || 'Syspoly Admin';

    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });
    console.log(`[Seed] Admin User Created: ${adminEmail}`);

    // 2. Services (13 services)
    const services = [
      {
        title: 'Website Development',
        slug: 'website-development',
        shortDescription: 'High-performance bespoke web applications & corporate portals built with React, Node.js & modern full-stack architectures.',
        description: 'System Polygon delivers end-to-end custom web engineering. From lightning-fast corporate websites to complex enterprise web portals, SaaS products, and progressive web apps (PWAs), our solutions are engineered for security, high traffic scalability, and maximum conversion rates.',
        icon: 'Globe',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        features: ['React & Next.js Architecture', 'Custom Headless CMS', 'High Traffic Scalability', 'Enterprise Security & SSL', 'Core Web Vitals 90+ Score'],
        order: 1
      },
      {
        title: 'Android App Development',
        slug: 'android-app-development',
        shortDescription: 'Native Kotlin & Flutter Android apps with sleek UI, offline syncing, and seamless device API integrations.',
        description: 'We craft intuitive, battle-tested Android applications tailored for smartphones, tablets, and Android Wear. Our development workflow ensures low battery consumption, sub-second screen transitions, and Google Play Store compliance.',
        icon: 'Smartphone',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
        features: ['Native Kotlin & Flutter', 'Background Push Notifications', 'Biometric Authentication', 'Offline Data Storage', 'Play Store Optimization'],
        order: 2
      },
      {
        title: 'iOS App Development',
        slug: 'ios-app-development',
        shortDescription: 'Premium Swift & iOS applications engineered for Apple ecosystem elegance, safety, and high user retention.',
        description: 'Deliver stunning iOS apps designed specifically for iPhone, iPad, and Apple Watch. We leverage Swift, SwiftUI, and iOS native SDKs to create seamless touch interfaces with strict adherence to Apple Human Interface Guidelines.',
        icon: 'Apple',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
        features: ['Swift & SwiftUI Native', 'CoreData & Realm DB', 'Apple Pay Integration', 'TestFlight & App Store Publishing', 'Ultra-fluid 120Hz Animations'],
        order: 3
      },
      {
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        shortDescription: 'Data-driven omnichannel marketing campaigns engineered to increase targeted customer acquisition and ROI.',
        description: 'Accelerate brand growth through hyper-targeted PPC campaigns, lead generation funnels, conversion rate optimization (CRO), and strategic multi-channel customer lifecycle management.',
        icon: 'TrendingUp',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop',
        features: ['Google Ads & Meta Ads', 'Conversion Funnel Strategy', 'ROI Attribution Tracking', 'Audience Segmentation', 'Landing Page Optimization'],
        order: 4
      },
      {
        title: 'SEO & Content',
        slug: 'seo-content',
        shortDescription: 'Technical search engine optimization and authority content strategies that dominate Google organic rankings.',
        description: 'Dominate search results with our holistic SEO methodology covering technical audit fixes, schema markup, semantic keyword clustering, high-grade link acquisition, and content marketing.',
        icon: 'Search',
        image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=800&auto=format&fit=crop',
        features: ['Technical SEO Audits', 'Keyword Intent Research', 'Authority Backlink Outreach', 'Schema & Structured Data', 'Organic Traffic Growth Reports'],
        order: 5
      },
      {
        title: 'AI Development',
        slug: 'ai-development',
        shortDescription: 'Custom Large Language Model (LLM) integrations, intelligent conversational agents, and predictive AI pipelines.',
        description: 'Transform business workflows by incorporating Generative AI, custom RAG pipelines, fine-tuned domain models, and intelligent automated decision engines into existing enterprise infrastructure.',
        icon: 'Cpu',
        image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
        features: ['LLM & RAG Systems', 'Custom Chatbot Agents', 'Predictive Modeling', 'NLP & Speech Recognition', 'OpenAI & Claude API Integration'],
        order: 6
      },
      {
        title: 'Data Analytics',
        slug: 'data-analytics',
        shortDescription: 'Interactive BI dashboards, real-time telemetry streams, and enterprise data warehousing.',
        description: 'Convert fragmented operational data into actionable intelligence. We build custom executive analytics dashboards, ETL pipelines, and predictive analytics platforms.',
        icon: 'BarChart3',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        features: ['PowerBI & Tableau Integration', 'Real-time ETL Pipelines', 'Customer Analytics', 'Data Lake Warehousing', 'Automated Executive Reports'],
        order: 7
      },
      {
        title: 'Business Automation',
        slug: 'business-automation',
        shortDescription: 'Streamline repetitive operational tasks with custom workflows, RPA bots, and API middleware.',
        description: 'Eliminate manual data entry and bottleneck delays. Our custom automation software links legacy systems with modern cloud APIs, reducing operational costs by up to 60%.',
        icon: 'Zap',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
        features: ['Custom Workflow Automation', 'RPA Process Automation', 'API Gateway Middleware', 'CRM & ERP Integrations', 'Automated Email & WhatsApp Bots'],
        order: 8
      },
      {
        title: 'IoT Solutions',
        slug: 'iot-solutions',
        shortDescription: 'Smart hardware integration, telemetry monitoring dashboards, and industrial IoT (IIoT) platforms.',
        description: 'Bridge hardware and software seamlessly. We build robust IoT cloud platforms for real-time sensor monitoring, fleet management, and smart factory telemetry.',
        icon: 'Wifi',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
        features: ['MQTT & CoAP Protocols', 'Sensor Telemetry Dashboards', 'Edge Computing Modules', 'Remote Firmware Updates', 'Fleet Tracking Systems'],
        order: 9
      },
      {
        title: 'Cloud Applications',
        slug: 'cloud-applications',
        shortDescription: 'Cloud-native multi-tenant SaaS architectures deployed on AWS, Google Cloud, and Azure.',
        description: 'Architect, deploy, and scale containerized applications on modern cloud platforms with zero downtime deployments, automatic auto-scaling, and microservices.',
        icon: 'Cloud',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        features: ['AWS / GCP Infrastructure', 'Docker & Kubernetes Orchestration', 'Microservices Architecture', 'CI/CD Pipelines', '99.99% Uptime Guarantee'],
        order: 10
      },
      {
        title: 'Marketplace Development',
        slug: 'marketplace-development',
        shortDescription: 'Multi-vendor B2B and B2C marketplace platforms with split payments and escrow capabilities.',
        description: 'Launch scalable online marketplaces featuring vendor dashboards, automated payout split logic, inventory synchronization, review moderation, and multi-currency checkouts.',
        icon: 'ShoppingBag',
        image: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?q=80&w=800&auto=format&fit=crop',
        features: ['Multi-vendor Management', 'Stripe Connect Payouts', 'Commission & Escrow Logic', 'Custom Vendor Analytics', 'Global Tax & Currency Support'],
        order: 11
      },
      {
        title: 'Social Media Marketing',
        slug: 'social-media-marketing',
        shortDescription: 'Creative brand storytelling, viral short-form video content, and active community growth.',
        description: 'Build an engaged organic community across Instagram, LinkedIn, YouTube, and X. We handle creative production, content calendars, and targeted influencer partnerships.',
        icon: 'Share2',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
        features: ['Content Production & Reels', 'Community Moderation', 'Influencer Outreach', 'Brand Identity Assets', 'Social Analytics Tracking'],
        order: 12
      },
      {
        title: 'Server Management',
        slug: 'server-management',
        shortDescription: '24/7 server monitoring, DevOps security hardening, database clustering, and disaster recovery.',
        description: 'Ensure mission-critical uptime with continuous 24/7 server monitoring, vulnerability patching, firewall configuration, automated database backups, and emergency recovery response.',
        icon: 'Server',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
        features: ['24/7 Incident Response', 'Linux / Windows Hardening', 'Database Backup Automation', 'DDoS Protection & WAF', 'Cost Optimization'],
        order: 13
      }
    ];

    await Service.insertMany(services);
    console.log(`[Seed] Inserted ${services.length} Services.`);

    // 3. Industries (10 industries)
    const industries = [
      {
        title: 'Healthcare & HealthTech',
        slug: 'healthcare',
        description: 'HIPAA-compliant telemedicine platforms, EHR integrations, patient portals, and AI diagnostics.',
        icon: 'Activity',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      },
      {
        title: 'Finance & FinTech',
        slug: 'finance',
        description: 'Secure digital banking gateways, algorithmic trading dashboards, and fraud prevention engines.',
        icon: 'DollarSign',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      },
      {
        title: 'Real Estate & PropTech',
        slug: 'real-estate',
        description: 'Virtual property tours, tenant CRM suites, automated lease management, and valuation portals.',
        icon: 'Home',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      },
      {
        title: 'E-commerce & Retail',
        slug: 'e-commerce',
        description: 'Headless storefronts, personalized AI recommendation engines, and omnichannel inventory syncing.',
        icon: 'ShoppingCart',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      },
      {
        title: 'Education & EdTech',
        slug: 'education',
        description: 'Interactive virtual classrooms, LMS courseware engines, adaptive testing, and gamified learning.',
        icon: 'GraduationCap',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      },
      {
        title: 'Travel & Tourism',
        slug: 'travel-tourism',
        description: 'Flight/hotel booking aggregators, dynamic itinerary planners, and localized audio tour guides.',
        icon: 'Compass',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      },
      {
        title: 'Manufacturing & Smart Factory',
        slug: 'manufacturing',
        description: 'Industry 4.0 IoT telemetry, supply chain tracking, predictive machine maintenance, and ERP.',
        icon: 'Factory',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      },
      {
        title: 'Logistics & Supply Chain',
        slug: 'logistics',
        description: 'Real-time GPS fleet tracking, dispatch route optimization, and automated warehouse inventory.',
        icon: 'Truck',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      },
      {
        title: 'Hospitality & Leisure',
        slug: 'hospitality',
        description: 'Contactless room key check-in, point-of-sale systems, and guest loyalty program engines.',
        icon: 'Coffee',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        isFeatured: false
      },
      {
        title: 'High-Growth Startups',
        slug: 'startups',
        description: 'Rapid MVP engineering, scalable multi-tenant SaaS foundation, and investor pitch prototyping.',
        icon: 'Rocket',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
        isFeatured: true
      }
    ];

    await Industry.insertMany(industries);
    console.log(`[Seed] Inserted ${industries.length} Industries.`);

    // 4. Technologies (12 items)
    const technologies = [
      { name: 'React.js', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', websiteUrl: 'https://react.dev', order: 1, isActive: true },
      { name: 'Node.js', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', websiteUrl: 'https://nodejs.org', order: 2, isActive: true },
      { name: 'Express.js', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', websiteUrl: 'https://expressjs.com', order: 3, isActive: true },
      { name: 'MongoDB', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', websiteUrl: 'https://mongodb.com', order: 4, isActive: true },
      { name: 'TypeScript', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', websiteUrl: 'https://typescriptlang.org', order: 5, isActive: true },
      { name: 'Tailwind CSS', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', websiteUrl: 'https://tailwindcss.com', order: 6, isActive: true },
      { name: 'Python', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', websiteUrl: 'https://python.org', order: 7, isActive: true },
      { name: 'PostgreSQL', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', websiteUrl: 'https://postgresql.org', order: 8, isActive: true },
      { name: 'WordPress', category: 'CMS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', websiteUrl: 'https://wordpress.org', order: 9, isActive: true },
      { name: 'Android / Kotlin', category: 'Mobile', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', websiteUrl: 'https://developer.android.com', order: 10, isActive: true },
      { name: 'iOS / Swift', category: 'Mobile', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', websiteUrl: 'https://developer.apple.com/swift/', order: 11, isActive: true },
      { name: 'AWS Cloud', category: 'Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', websiteUrl: 'https://aws.amazon.com', order: 12, isActive: true }
    ];

    await Technology.insertMany(technologies);
    console.log(`[Seed] Inserted ${technologies.length} Technologies.`);

    // 5. Projects (6 projects)
    const projects = [
      {
        title: 'Property Management SaaS Platform',
        slug: 'property-management',
        category: 'SaaS',
        client: 'Apex Housing Solutions',
        industry: 'Real Estate',
        description: 'An all-in-one multi-tenant SaaS application managing tenant onboarding, rent collection, auto-maintenance requests, and financial reporting.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Stripe'],
        challenge: 'Legacy manual ledger entry was creating payment tracking errors, high tenant friction, and delayed maintenance responses.',
        solution: 'Developed a unified web and mobile cloud application with automated payment reminders, digital lease signatures, and vendor task routing.',
        results: '300% increase in timely rent payments, 45% reduction in administrative overhead, and seamless management across 12,000+ rental units.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop'
        ],
        projectUrl: 'https://syspoly.in/demo/property-management',
        isFeatured: true,
        isPublished: true
      },
      {
        title: 'Fintech Wealth & Advisory Engine',
        slug: 'finance-services',
        category: 'Web',
        client: 'Vanguard Capital Partners',
        industry: 'Finance',
        description: 'High-security financial advisor hub offering automated portfolio rebalancing, risk scoring, and real-time market data streaming.',
        technologies: ['React', 'Express.js', 'PostgreSQL', 'Chart.js', 'WebSockets'],
        challenge: 'Institutional clients required sub-second portfolio analytics with ultra-low latency data feeds and strict compliance auditing.',
        solution: 'Engineered an asynchronous microservices engine with encrypted WebSocket streams and multi-factor hardware security authentication.',
        results: 'Handled over $450M in daily transaction volume with sub-100ms API response latency and zero security incidents.',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop'
        ],
        projectUrl: 'https://syspoly.in/demo/finance',
        isFeatured: true,
        isPublished: true
      },
      {
        title: 'Global Travel & Tourism Platform',
        slug: 'travel-tourism-platform',
        category: 'Mobile',
        client: 'Wanderlust Adventures',
        industry: 'Travel & Tourism',
        description: 'Cross-platform mobile application giving travelers offline GPS maps, dynamic itinerary generation, and instant hotel/flight bookings.',
        technologies: ['Flutter', 'Node.js', 'MongoDB', 'Mapbox SDK', 'GraphQL'],
        challenge: 'Travelers frequently lost cellular connectivity in remote destinations, making online-only travel apps useless.',
        solution: 'Implemented intelligent local SQLite database caching with automatic background synchronization whenever Wi-Fi or cellular connectivity reconnects.',
        results: 'Over 250,000 active mobile app downloads with a 4.9-star average rating on iOS App Store and Play Store.',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop'
        ],
        projectUrl: 'https://syspoly.in/demo/travel',
        isFeatured: true,
        isPublished: true
      },
      {
        title: 'Next-Gen E-commerce Storefront',
        slug: 'ecommerce-platform',
        category: 'E-commerce',
        client: 'LuxeLiving Direct',
        industry: 'E-commerce',
        description: 'Headless e-commerce storefront with sub-second page loads, 3D product customizer, and localized global checkout.',
        technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind'],
        challenge: 'Monolithic legacy store suffered from 6-second page load times and high shopping cart abandonment on mobile devices.',
        solution: 'Built a decoupled headless storefront using SSR React rendering, serverless image caching, and 1-click Apple/Google Pay checkouts.',
        results: 'Reduced page load time from 6.2s to 0.8s, resulting in a 42% boost in checkout conversions and 2.5x higher mobile sales.',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1556742049-0a67daf4005a?q=80&w=800&auto=format&fit=crop'
        ],
        projectUrl: 'https://syspoly.in/demo/ecommerce',
        isFeatured: true,
        isPublished: true
      },
      {
        title: 'Industrial Business Automation System',
        slug: 'business-automation-system',
        category: 'SaaS',
        client: 'Precision Tech Manufacturing',
        industry: 'Manufacturing',
        description: 'Enterprise ERP and automated floor production dashboard linking IoT assembly sensors directly to inventory billing.',
        technologies: ['React', 'Python', 'PostgreSQL', 'Docker', 'MQTT'],
        challenge: 'Factory floor operational data was delayed by 24 hours due to manual paper shift reports and disconnected systems.',
        solution: 'Deployed edge IoT data collectors that stream real-time machine uptime, yield diagnostics, and component usage to a central React dashboard.',
        results: 'Eliminated manual shift logs, reduced equipment breakdown downtime by 35%, and saved $180,000 annually in preventative maintenance.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'
        ],
        projectUrl: 'https://syspoly.in/demo/automation',
        isFeatured: false,
        isPublished: true
      },
      {
        title: 'Wix Studio Enterprise Customization Suite',
        slug: 'wix-studio',
        category: 'UI/UX',
        client: 'Digital Horizons Agency',
        industry: 'Digital Marketing',
        description: 'Custom full-stack web extensions and fluid UI design system for enterprise agency scale.',
        technologies: ['React', 'JavaScript', 'CSS3', 'REST API', 'Figma'],
        challenge: 'Agency needed ultra-responsive custom web modules and dynamic data feeds for enterprise client deployments.',
        solution: 'Crafted modular React widgets and integrated headless backends with high-throughput CDN endpoints.',
        results: 'Allowed rapid design-to-code turnarounds and accelerated project delivery speeds by 3x.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
        gallery: [],
        projectUrl: 'https://syspoly.in/demo/wix-studio',
        isFeatured: false,
        isPublished: true
      }
    ];

    await Project.insertMany(projects);
    console.log(`[Seed] Inserted ${projects.length} Projects.`);

    // 6. Testimonials (5 items)
    const testimonials = [
      {
        clientName: 'Rajesh Sharma',
        company: 'Vanguard Capital Partners',
        designation: 'Managing Director',
        message: 'System Polygon transformed our digital infrastructure completely. Their engineering team built our FinTech advisory engine with incredible precision, scalability, and security.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        isPublished: true
      },
      {
        clientName: 'Sarah Jenkins',
        company: 'Apex Housing Solutions',
        designation: 'Chief Technology Officer',
        message: 'The property management SaaS platform delivered by Syspoly exceeded all expectations. Our tenant engagement went up immediately and operational expenses plummeted.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
        isPublished: true
      },
      {
        clientName: 'Vikram Mehta',
        company: 'LuxeLiving Direct',
        designation: 'Founder & CEO',
        message: 'Working with Syspoly felt like having an elite in-house development team. Their mastery of React, Node.js, and e-commerce conversion optimization is second to none.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        isPublished: true
      },
      {
        clientName: 'Elena Rostova',
        company: 'Wanderlust Adventures',
        designation: 'Head of Product',
        message: 'Our travel app offline capabilities engineered by Syspoly received rave reviews from thousands of globetrotters. They are true technical partners for any high-growth product.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
        isPublished: true
      },
      {
        clientName: 'Amitabh Choudhury',
        company: 'Precision Tech Manufacturing',
        designation: 'VP of Operations',
        message: 'The IoT telemetry automation system Syspoly developed gave our plant leadership real-time visibility for the first time in 15 years. Extraordinary ROI!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        isPublished: true
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log(`[Seed] Inserted ${testimonials.length} Testimonials.`);

    // 7. Statistics (4 items)
    const statistics = [
      { title: 'Projects Delivered', value: '600', suffix: '+', icon: 'CheckCircle2', order: 1 },
      { title: 'Years of Experience', value: '17', suffix: '+', icon: 'Calendar', order: 2 },
      { title: 'Technology Experts', value: '26', suffix: '+', icon: 'Users', order: 3 },
      { title: 'Client Reviews', value: '33', suffix: '+', icon: 'Star', order: 4 }
    ];

    await Statistic.insertMany(statistics);
    console.log(`[Seed] Inserted ${statistics.length} Statistics.`);

    console.log('\n[Seed Success] All database seed operations completed successfully!\n');
  } catch (err) {
    console.error('[Seed Error] Database seeding failed:', err);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase().then(() => {
    process.exit(0);
  });
}

module.exports = seedDatabase;
