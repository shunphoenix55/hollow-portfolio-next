import type { ArchiveEntry, ArchiveLabels, ArchiveLink } from './archive';

export type GuildGroup = { label: string; entries: ArchiveEntry[] };

const video = (url: string, label: string): ArchiveLink => ({ kind: 'video', label, url });
const site = (url: string, label: string): ArchiveLink => ({ kind: 'page', label, url });

export const guildPage = {
  title: 'Organizations and Workshops',
  intro: 'Communities I helped build, events I ran and sessions I taught.',
};

export const guildLabels: ArchiveLabels = {
  wheel: 'Organizations and workshops',
  features: 'Highlights',
  stack: 'Tools',
  details: 'Details',
  links: 'Links',
};

const organizations: ArchiveEntry[] = [
  {
    slug: 'codechef-vit',
    title: 'CodeChef VIT',
    subtitle: 'XR Lead · 2022 – 2024',
    summary:
      'Worked on AR/VR initiatives, event organization, and mentorship within one of VIT’s leading technical clubs.',
    overview: [
      'Contributed as an XR Developer at CodeChef-VIT, one of VIT’s premier technical clubs, focusing on augmented reality and immersive technology initiatives.',
      'Actively supported large-scale technical events, mentorship programs, and community learning through workshops and hackathons.',
    ],
    features: [
      {
        title: 'Event Coordination',
        description:
          'Organized and conducted Cook Off, India’s largest student-run competitive coding event, and coordinated efforts for DEVSOC hackathon.',
      },
      {
        title: 'XR Development',
        description:
          'Developed AR filters and 3D assets, and built augmented reality experiences using Unity and SparkAR for marketing and engagement.',
      },
      {
        title: 'Community & Mentorship',
        description:
          'Led technical sessions on AR/VR, mentored participants in XR and Game Development, and reviewed projects during DEVSOC.',
      },
      {
        title: 'Speaker Outreach',
        description:
          'Managed speaker outreach for Tech Talks, a flagship event focused on emerging technologies.',
      },
    ],
    techStack: ['Unity', 'SparkAR'],
    details: [
      { label: 'Duration', value: 'March 2022 - January 2024' },
      { label: 'Role', value: 'XR Developer' },
      { label: 'Location', value: 'Vellore, Tamil Nadu' },
    ],
    images: [],
    links: [site('https://www.codechefvit.com/events', 'Organization Page')],
  },
  {
    slug: 'tag-club-vit',
    title: 'TAG Club VIT',
    subtitle: 'Projects Lead · 2022 – 2024',
    summary:
      'Led game development initiatives, organized flagship events, and mentored students in game creation and design.',
    overview: [
      'Served as Projects Lead at TAG Club, VIT’s official Game Development and Gaming Club, focusing on fostering a strong game development community.',
      'Played a key role in organizing major game development and eSports events while mentoring students and conducting technical sessions.',
    ],
    features: [
      {
        title: 'Event Leadership',
        description:
          'Coordinated Studio 2 Stage, the club’s flagship game jam, and managed operations for Gameathon, a large-scale eSports event.',
      },
      {
        title: 'Technical Workshops',
        description:
          'Conducted sessions on Unity and Blender, helping students build foundational and advanced game development skills.',
      },
      {
        title: 'Mentorship',
        description:
          'Guided junior members in game development, providing hands-on support throughout their project lifecycles.',
      },
    ],
    techStack: ['Unity', 'Blender'],
    details: [
      { label: 'Duration', value: 'March 2022 - January 2024' },
      { label: 'Role', value: 'Projects Lead' },
      { label: 'Location', value: 'Vellore, Tamil Nadu' },
    ],
    images: [],
    links: [site('https://www.instagram.com/tagclub.vit/', 'Club Page')],
  },
];

const workshops: ArchiveEntry[] = [
  {
    slug: 'devsoc-23',
    title: 'DEVSOC ’23',
    subtitle: 'Coordinator · May 2023',
    summary:
      'Reviewed and mentored XR and Game Development projects at South Asia’s largest student-run hackathon with 1300+ participants.',
    overview: [
      'Served as a coordinator for DEVSOC ’23, CodeChef-VIT’s flagship hackathon and one of the largest student-run hackathons in South Asia.',
      'Contributed to the evaluation and mentorship of projects in the XR and Game Development tracks, supporting participants in building and refining their solutions.',
    ],
    features: [
      {
        title: 'Project Review & Mentorship',
        description:
          'Evaluated XR and Game Development submissions, providing technical guidance and feedback to participants.',
      },
      {
        title: 'Large-Scale Event Execution',
        description:
          'Helped manage and support a hackathon with 1300+ participants across multiple domains and a prize pool of ₹3 lakhs.',
      },
      {
        title: 'Multi-Domain Exposure',
        description:
          'Engaged with projects across diverse tracks including AR/VR, Blockchain, Social Good, Automation, Health, and 5G.',
      },
    ],
    techStack: [],
    details: [
      { label: 'Date', value: 'May 2023' },
      { label: 'Role', value: 'Coordinator' },
      { label: 'Location', value: 'Vellore, Tamil Nadu' },
      { label: 'Participants', value: '1300+' },
    ],
    images: [],
    links: [site('https://www.devsoc.codechefvit.com', 'Event Page')],
  },
  {
    slug: 'beyond-reality-xr',
    title: 'Beyond Reality: Exploring the World of XR',
    subtitle: 'Speaker · May 2023',
    summary:
      'Delivered a webinar introducing AR, VR, and MR concepts, covering fundamentals and real-world applications of immersive technologies.',
    overview: [
      'Conducted an introductory webinar focused on Extended Reality (XR), covering the fundamentals of Augmented Reality (AR), Virtual Reality (VR), and Mixed Reality (MR).',
      'Designed for beginners, the session provided clear conceptual explanations and explored how immersive technologies are applied across industries.',
    ],
    features: [
      {
        title: 'XR Fundamentals',
        description:
          'Explained the core differences and characteristics of AR, VR, and MR in a structured and accessible format.',
      },
      {
        title: 'Industry Applications',
        description:
          'Showcased real-world use cases of XR across domains such as gaming, healthcare, education, and simulation.',
      },
      {
        title: 'Beginner-Friendly Delivery',
        description:
          'Simplified complex concepts to make immersive technologies approachable for newcomers.',
      },
    ],
    techStack: [],
    details: [
      { label: 'Date', value: 'May 2023' },
      { label: 'Format', value: 'Webinar' },
      { label: 'Platform', value: 'YouTube' },
      { label: 'Role', value: 'Speaker' },
    ],
    images: [],
    links: [video('https://www.youtube.com/watch?v=66vHCPDkxh0', 'Watch Recording')],
  },
  {
    slug: 'blender-intro-workshop',
    title: 'Introduction to 3D Modelling using Blender',
    subtitle: 'Instructor · December 2022',
    summary:
      'Created and delivered a beginner-friendly workshop series teaching 3D asset creation and environment design in Blender.',
    overview: [
      'Designed and delivered a structured video workshop series introducing beginners to 3D modelling for games using Blender.',
      'Focused on practical, hands-on learning by guiding participants through the complete creation of a game-ready indoor environment.',
    ],
    features: [
      {
        title: 'End-to-End Asset Creation',
        description:
          'Demonstrated how to model, arrange, and decorate a complete 3D game environment from scratch.',
      },
      {
        title: 'Game-Oriented Workflow',
        description:
          'Focused on creating assets and scenes suitable for integration into game engines.',
      },
      {
        title: 'Beginner-Friendly Approach',
        description:
          'Structured content to help newcomers build confidence and foundational skills in 3D modelling.',
      },
    ],
    techStack: ['Blender'],
    details: [
      { label: 'Date', value: 'December 2022' },
      { label: 'Format', value: 'Workshop Series' },
      { label: 'Platform', value: 'YouTube' },
      { label: 'Role', value: 'Instructor' },
    ],
    images: [],
    links: [video('https://www.youtube.com/live/ECxKsiI0mWc', 'Watch Video')],
  },
  {
    slug: 'fruit-ninja-unity-workshop',
    title: 'Going Mobile: Creating Fruit Ninja in Unity',
    subtitle: 'Instructor · May 2023',
    summary:
      'Conducted a hands-on workshop teaching mobile game development in Unity by recreating Fruit Ninja and deploying it to devices.',
    overview: [
      'Delivered a hands-on workshop focused on mobile game development using Unity, centered around recreating the core mechanics of a Fruit Ninja-style game.',
      'Guided participants through the full development pipeline, from project setup to implementing gameplay systems and deploying to mobile devices.',
    ],
    features: [
      {
        title: 'Core Gameplay Systems',
        description:
          'Implemented slicing mechanics, touch input handling, collision detection, and scoring systems.',
      },
      {
        title: 'Mobile Development Workflow',
        description:
          'Covered Unity’s mobile toolchain, optimization basics, and deployment to Android/iOS devices.',
      },
      {
        title: 'End-to-End Learning',
        description:
          'Enabled participants to build, test, and ship a complete mobile game prototype.',
      },
    ],
    techStack: ['Unity'],
    details: [
      { label: 'Date', value: 'May 2023' },
      { label: 'Format', value: 'Workshop' },
      { label: 'Platform', value: 'YouTube' },
      { label: 'Role', value: 'Instructor' },
    ],
    images: [],
    links: [video('https://www.youtube.com/live/Ad7H5l7yu38', 'Watch Workshop')],
  },
];

export const guildGroups: GuildGroup[] = [
  { label: 'Organizations', entries: organizations },
  { label: 'Workshops and talks', entries: workshops },
];
