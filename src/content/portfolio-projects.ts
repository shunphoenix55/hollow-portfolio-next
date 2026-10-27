export type ProjectLinkKind = 'play' | 'code' | 'video' | 'page';

export type ProjectLink = { kind: ProjectLinkKind; label: string; url: string };

export type ProjectImage = { src: string; alt: string };

export type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  overview: string[];
  features: { title: string; description: string }[];
  techStack: string[];
  details: { label: string; value: string }[];
  images: ProjectImage[];
  links: ProjectLink[];
};

const ASSETS = 'https://shunphoenix55.github.io/assets/projects';

const image = (path: string, alt: string): ProjectImage => ({ src: `${ASSETS}/${path}`, alt });

export const projectsPage = {
  title: 'Projects',
  intro: 'A collection of my creative experiments, game prototypes, and technical demos.',
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'metasoccer',
    title: 'MetaSoccer',
    subtitle: 'Interactive AI Soccer Sandbox',
    category: 'Game Design',
    summary:
      "Semi-finalist for San Francisco Museum of Modern Art (SFMOMA)'s ArtCade, MetaSoccer is an interactive soccer simulator where players dynamically alter the rules of the game and watch AI-controlled soccer players adapt their strategies in real time.",
    overview: [
      "MetaSoccer is an experimental interactive soccer simulator created for San Francisco Museum of Modern Art (SFMOMA)'s ArtCade. Designed as a playful exploration of systems, simulation, and player agency, the project allows visitors to directly manipulate the underlying rules of a soccer match in real time.",
      'Using a large interactive touchscreen interface, players can modify gameplay variables such as field size, player count, ground friction, ball size, and even the rules of play themselves. As these parameters shift, AI-controlled soccer players dynamically adapt their behavior to continue competing and trying to win under the new conditions.',
      'The experience is designed less as a traditional sports game and more as a sandbox for experimentation. Players are encouraged to push the simulation to absurd or unstable extremes and discover what happens when the familiar structure of a sport begins to break down.',
    ],
    features: [
      {
        title: 'Dynamic Rule Manipulation',
        description:
          'Players can adjust core soccer mechanics in real time using sliders, toggles, and buttons, transforming the match as it unfolds.',
      },
      {
        title: 'Adaptive AI Behavior',
        description:
          'AI soccer players respond intelligently to rule changes and environmental shifts, adjusting their movement and strategy to pursue victory.',
      },
      {
        title: 'Interactive Museum Experience',
        description:
          'Designed for a public exhibition setting, the game emphasizes accessibility, experimentation, and playful discovery through a tactile large-screen interface.',
      },
    ],
    techStack: [
      'Unity',
      'C#',
      'AI Simulation',
      'Touchscreen Interaction',
      'Interactive Installation',
    ],
    details: [
      { label: 'Recognition', value: 'SFMOMA ArtCade Semi-finalist' },
      { label: 'Platform', value: 'Interactive Installation' },
      { label: 'Genre', value: 'Simulation / Sandbox' },
      { label: 'Role', value: 'Game Designer' },
    ],
    images: [
      image('metasoccer/concept_1.jpg', 'MetaSoccer Concept 1'),
      image('metasoccer/concept_2.jpg', 'MetaSoccer Concept 2'),
      image('metasoccer/Untitled_Artwork_9.JPG', 'MetaSoccer Concept 3'),
    ],
    links: [
      { kind: 'page', label: 'SFMOMA Page', url: 'https://www.sfmoma.org/exhibition/artcade/' },
    ],
  },
  {
    slug: 'bhashaxr',
    title: 'BhashaXR',
    subtitle: 'Immersive VR Language Learning Platform',
    category: 'VR / XR',
    summary:
      'Winner of Best UI/UX and Best in Education at Yantra ’24, BhashaXR is a VR language learning platform designed to make language acquisition more immersive, natural, and personalized—especially for underrepresented Indian languages.',
    overview: [
      'Winner of Best UI/UX and Best in Education at Yantra ’24.',
      'BhashaXR is a VR-based language learning platform built to make language acquisition feel more immersive, contextual, and intuitive than traditional app-based methods. The project focuses especially on Indian languages, which remain heavily underrepresented across mainstream language learning platforms.',
      'Instead of relying solely on flashcards and static exercises, BhashaXR places learners inside interactive virtual environments where they can practice vocabulary, object recognition, and conversational language in a more natural and embodied way.',
      'The platform also integrates AI-powered response analysis to evaluate how users speak and interact, allowing the system to provide tailored feedback and personalized recommendations based on learner performance.',
    ],
    features: [
      {
        title: 'Immersive Language Learning in VR',
        description:
          'Learners practice language inside interactive virtual environments, making vocabulary and communication more contextual and memorable.',
      },
      {
        title: 'Support for Indian Languages',
        description:
          'The project prioritizes regional Indian languages that are often overlooked by mainstream language learning applications.',
      },
      {
        title: 'AI-Powered Personalized Learning',
        description:
          'An AI model analyzes user responses and helps adapt the learning experience to better suit each individual learner.',
      },
      {
        title: 'Object Learning & Conversation Systems',
        description:
          'Users can interact with virtual objects and dialogue systems to reinforce vocabulary, understanding, and real-world communication patterns.',
      },
      {
        title: 'Natural XR Interactions',
        description:
          "Built with Meta's Interaction SDK, the experience includes intuitive VR interactions and hand tracking gestures for a more seamless learning flow.",
      },
    ],
    techStack: [
      'Unity',
      'C#',
      'Meta Quest 3',
      'Meta Interaction SDK',
      'XR Interaction Design',
      'AI Backend Integration',
      'Voice Analysis',
    ],
    details: [
      { label: 'Awards', value: 'Best UI/UX, Best in Education' },
      { label: 'Event', value: 'Yantra ’24' },
      { label: 'Platform', value: 'Meta Quest 3' },
      { label: 'Role', value: 'Unity XR Developer' },
    ],
    images: [image('bhashaxr/bhasha-xr.png', 'BhashaXR')],
    links: [
      { kind: 'video', label: 'Watch Demo', url: 'https://youtube.com/shorts/fSWe7liTKV8' },
      { kind: 'video', label: 'Watch Gameplay', url: 'https://youtube.com/shorts/qO1CZKgwxew' },
    ],
  },
  {
    slug: '3ducation',
    title: 'Drone Assembly - 3Ducation',
    subtitle: 'VR Drone Assembly Learning Platform',
    category: 'VR / XR',
    summary:
      '3rd place winner at Yantra ’23, 3Ducation is a VR learning platform focused on teaching drone assembly through immersive, hands-on interaction in virtual environments.',
    overview: [
      '3Ducation is a virtual reality learning platform specifically designed to teach users how to assemble drones through immersive, hands-on interaction.',
      'Developed during Yantra ’23, where it secured 3rd place, the project focuses on simplifying complex drone assembly processes by breaking them down into interactive, step-by-step tasks within a 3D environment.',
      'By allowing users to physically manipulate drone components such as frames, motors, and propellers in VR, the platform bridges the gap between theoretical understanding and practical hardware skills.',
    ],
    features: [
      {
        title: 'Drone Assembly Simulation',
        description:
          'Users can assemble complete drone systems piece by piece, gaining a clear understanding of how each component fits and functions.',
      },
      {
        title: 'Step-by-Step Guided Workflow',
        description:
          'The experience guides users through structured assembly sequences, ensuring clarity in both process and component relationships.',
      },
      {
        title: 'Hands-On VR Interaction',
        description:
          "Built using Unity's XR Interaction Toolkit, enabling intuitive grabbing, placement, and manipulation of drone parts.",
      },
      {
        title: 'Practical Skill Development',
        description:
          'Focuses on real-world applicable skills by simulating authentic drone construction workflows.',
      },
    ],
    techStack: ['Unity', 'C#', 'Meta Quest 2', 'XR Interaction Toolkit', 'VR Interaction Design'],
    details: [
      { label: 'Award', value: '3rd Place' },
      { label: 'Event', value: 'Yantra ’23' },
      { label: 'Platform', value: 'Meta Quest 2' },
      { label: 'Focus', value: 'Drone Assembly Training' },
      { label: 'Role', value: 'Unity Developer' },
    ],
    images: [
      image('3ducation/tech.png', '3Ducation Tech'),
      image('3ducation/drone.png', '3Ducation Assembly'),
    ],
    links: [{ kind: 'video', label: 'Watch Video', url: 'https://youtu.be/j-I2bN3C9w4' }],
  },
  {
    slug: 'bubbleoidvania',
    title: 'Bubbleoidvania',
    subtitle: '2D Platformer with Dynamic Bubble Mechanics',
    category: 'Game Jam',
    summary:
      'Created for Global Game Jam 2025, Bubbleoidvania is a fast-paced 2D platformer inspired by Mega Man and Celeste, where players use a versatile bubble mechanic to shield, glide, and roll through challenging levels.',
    overview: [
      "Bubbleoidvania is a 2D platformer developed during Global Game Jam 2025 at the Bangalore Keywords Studios site, built around the theme 'Bubble'.",
      'Inspired by classic precision platformers like Mega Man and Celeste, the game introduces a unique central mechanic: a controllable bubble that fundamentally changes how players navigate and survive each level.',
      'Players can dynamically use the bubble in multiple ways—encasing themselves as a shield, holding it above to glide across gaps, or placing it beneath them to roll safely through hazards—creating a versatile and expressive movement system.',
    ],
    features: [
      {
        title: 'Multi-Functional Bubble Mechanic',
        description:
          'A single core system enables three distinct abilities: shielding, gliding, and rolling, each opening different traversal and survival strategies.',
      },
      {
        title: 'Precision Platforming',
        description:
          'Tight controls and carefully designed levels challenge players to master timing, positioning, and ability switching.',
      },
      {
        title: 'Arcade-Inspired Design',
        description:
          'Fast-paced gameplay influenced by retro platformers, combined with modern movement mechanics.',
      },
      {
        title: 'Cross-Platform Availability',
        description:
          'Playable on Web, Windows, Mac, and Linux, making it easily accessible across devices.',
      },
    ],
    techStack: ['Unity', 'C#', '.NET', '2D Game Development'],
    details: [
      { label: 'Event', value: 'Global Game Jam 2025' },
      { label: 'Location', value: 'Bangalore Keywords Studios' },
      { label: 'Team Size', value: '5 Developers' },
      { label: 'Genre', value: '2D Platformer' },
      { label: 'Platform', value: 'Web / PC / Mac / Linux' },
    ],
    images: [image('bubbleoidvania/content.png', 'Bubbleoidvania')],
    links: [
      {
        kind: 'play',
        label: 'Play Online',
        url: 'https://play.unity.com/en/games/ff55b6c0-5ecb-4660-828c-7fc7eee4d6ec/bubbleoidvania',
      },
      { kind: 'code', label: 'GitHub Repository', url: 'https://github.com/devslayer8/GGJ_2025' },
      { kind: 'video', label: 'Watch Video', url: 'https://youtu.be/Xlnstn9KtwA' },
    ],
  },
  {
    slug: 'clink',
    title: 'Clink!',
    subtitle: 'Chain-Based Puzzle Platformer',
    category: 'Game Jam',
    summary:
      'Created for the WTFxIGDC Game Jam, Clink! is a puzzle platformer where you control a snake made of chain links, using unique mechanics like link-sacrificing jumps and dual-ended control to solve intricate puzzles.',
    overview: [
      "Clink! is a puzzle platformer developed for the WTFxIGDC Game Jam under the theme 'Chain Reaction'. The game centers around a unique playable character—a snake composed entirely of chain links.",
      'Players grow their chain by collecting additional links, but must strategically sacrifice them to perform actions like multi-jumping. This creates a constant trade-off between mobility and survival.',
      'With the ability to control both the head and tail independently, players solve environmental puzzles by grabbing objects, navigating hazards, and leveraging special elemental chains to overcome obstacles.',
    ],
    features: [
      {
        title: 'Chain-Based Movement System',
        description:
          'Each jump consumes a chain link, forcing players to balance progression with resource management.',
      },
      {
        title: 'Dual-End Control Mechanic',
        description:
          'Switch control between the snake’s head and tail to approach puzzles from different perspectives and interactions.',
      },
      {
        title: 'Physics-Based Grabbing',
        description:
          'Latch onto hooks, crates, and environmental elements using either end of the chain to navigate levels.',
      },
      {
        title: 'Elemental Chain Abilities',
        description:
          'Special chain types interact with specific obstacles, adding variety and depth to puzzle-solving.',
      },
      {
        title: 'Hazard Interaction',
        description:
          'Environmental dangers like spikes can break your chain, dynamically altering your state and strategy.',
      },
    ],
    techStack: ['Unity', 'C#', '2D Physics', 'Game Design Systems'],
    details: [
      { label: 'Event', value: 'WTFxIGDC Game Jam' },
      { label: 'Theme', value: 'Chain Reaction' },
      { label: 'Genre', value: 'Puzzle Platformer' },
      { label: 'Platform', value: 'Web (WebGL)' },
      { label: 'Team', value: 'Indie Team (Original Art & Music)' },
    ],
    images: [image('clink/cover.png', 'Clink! cover')],
    links: [{ kind: 'play', label: 'Play on Itch.io', url: 'https://dasaniket15.itch.io/clink' }],
  },
  {
    slug: 'spacetime-ar',
    title: 'Spacetime AR',
    subtitle: 'Augmented Reality Relativity Visualizer',
    category: 'AR',
    summary:
      'An AR application built for a school science exhibition that visualizes Einstein’s theory of relativity by allowing users to spawn planets and observe real-time spacetime distortion.',
    overview: [
      'Spacetime AR is an augmented reality application developed for a high school science exhibition, aimed at making abstract physics concepts more intuitive and interactive.',
      'The app allows users to spawn planets in the real world using AR markers (cards) and observe how their mass influences the surrounding spacetime fabric, inspired by Einstein’s theory of relativity.',
      'By visualizing spacetime as a dynamically deforming surface, the project transforms a complex scientific concept into an engaging, real-time interactive experience.',
    ],
    features: [
      {
        title: 'AR Planet Spawning',
        description:
          'Users can place and manipulate planets in the real world using AR cards, creating interactive physics scenarios.',
      },
      {
        title: 'Real-Time Spacetime Visualization',
        description:
          'A dynamic surface represents spacetime, deforming in response to the position and mass of nearby planets.',
      },
      {
        title: 'Custom Shader System',
        description:
          'Built using Unity Shader Graph, the spacetime surface reacts in real time to objects in world space.',
      },
      {
        title: 'Educational XR Experience',
        description:
          'Designed to make complex physics concepts like relativity more accessible through visualization and interaction.',
      },
    ],
    techStack: ['Unity', 'C#', 'AR (Marker-Based)', 'Shader Graph', 'XR Development'],
    details: [
      { label: 'Project Type', value: 'Augmented Reality' },
      { label: 'Date', value: 'November 2019' },
      { label: 'Location', value: 'Dammam, Saudi Arabia' },
      { label: 'Context', value: 'School Science Exhibition' },
      { label: 'Role', value: 'Unity Programmer' },
    ],
    images: [
      image('spacetime-ar/poly%20planets.jpg', 'Low-poly planets'),
      image('spacetime-ar/Ice_Planet_Blue.png', 'Ice planet'),
      image('spacetime-ar/Forest_Planet.png', 'Forest planet'),
    ],
    links: [
      { kind: 'code', label: 'GitHub Repo', url: 'https://github.com/JWizards/Spacetime-AR-EduEx' },
      { kind: 'video', label: 'Watch Demo', url: 'https://youtube.com/shorts/HAnRpqHST18' },
      { kind: 'video', label: 'Watch Planets', url: 'https://youtube.com/shorts/An0n24WuhBE' },
      { kind: 'video', label: 'Watch Spacetime', url: 'https://youtube.com/shorts/ZkAvhjyxFw4' },
    ],
  },
  {
    slug: 'rcade',
    title: 'RCade',
    subtitle: 'Gamified Exercise & Body Tracking Platform',
    category: 'Gamified Health',
    summary:
      '2nd place winner at WomenTechies ’23, RCade is a gamified exercise application that provides personalized recommendations to help users manage common body pains while staying engaged through interactive gameplay systems.',
    overview: [
      'RCade is a gamified exercise platform designed to help users manage common body pains through guided physical activity and interactive feedback systems.',
      'Developed during WomenTechies ’23, where it secured 2nd place, the project focuses on increasing user engagement and consistency by transforming traditional exercise routines into game-like experiences.',
      'By combining body tracking with responsive UI systems and game mechanics, RCade encourages users to stay committed to their routines while ensuring proper form and effectiveness.',
    ],
    features: [
      {
        title: 'Gamified Exercise Experience',
        description:
          'Transforms routine exercises into interactive challenges to improve motivation and user retention.',
      },
      {
        title: 'Body Tracking Integration',
        description:
          'Uses MediaPipe-based tracking to monitor user movements and provide real-time feedback on exercise performance.',
      },
      {
        title: 'Personalized Recommendations',
        description:
          'Suggests exercises targeted at relieving common body pains based on user needs.',
      },
      {
        title: 'Custom UI/UX Systems',
        description:
          'Carefully designed interface and interactions to make the experience intuitive, responsive, and engaging.',
      },
    ],
    techStack: ['Unity', 'C#', 'MediaPipe', 'Computer Vision', 'UI/UX Systems'],
    details: [
      { label: 'Award', value: '2nd Place' },
      { label: 'Event', value: 'WomenTechies ’23' },
      { label: 'Date', value: 'March 2023' },
      { label: 'Location', value: 'Vellore' },
      { label: 'Role', value: 'Unity Developer' },
    ],
    images: [
      image('rcade/rcade-1.png', 'RCade Screenshot 1'),
      image('rcade/rcade-2.png', 'RCade Screenshot 2'),
      image('rcade/rcade-3.png', 'RCade Screenshot 3'),
    ],
    links: [
      { kind: 'code', label: 'GitHub Repo', url: 'https://github.com/souvik150/WomenTechies23' },
    ],
  },
  {
    slug: 'groupiee',
    title: 'Groupiee',
    subtitle: 'Social Travel Matching Platform',
    category: 'Web App',
    summary:
      'Finalist at DevJams ’21, Groupiee is a travel planning platform that matches users with like-minded people nearby and helps them organize trips together.',
    overview: [
      'Groupiee is a web-based platform designed to connect users with similar interests and nearby locations, enabling them to plan trips together.',
      'Developed during DevJams ’21, where it reached the finalist stage, the project focuses on making travel more social, collaborative, and accessible.',
      'By combining user matching with trip planning features, Groupiee helps individuals find compatible travel partners and coordinate their journeys efficiently.',
    ],
    features: [
      {
        title: 'Interest-Based Matching',
        description:
          'Matches users based on shared interests and geographical proximity to find ideal travel companions.',
      },
      {
        title: 'Trip Planning System',
        description:
          'Provides tools to organize and coordinate trips collaboratively among matched users.',
      },
      {
        title: 'Backend API with Flask',
        description:
          'Robust backend system built using Flask to handle user data, matching logic, and application flow.',
      },
      {
        title: 'Database Integration',
        description:
          'MongoDB database used to store user profiles, preferences, and trip data efficiently.',
      },
    ],
    techStack: ['Python', 'Flask', 'MongoDB', 'REST APIs'],
    details: [
      { label: 'Achievement', value: 'Finalist' },
      { label: 'Event', value: 'DevJams ’21' },
      { label: 'Date', value: 'November 2021' },
      { label: 'Mode', value: 'Remote' },
      { label: 'Role', value: 'Backend Developer' },
    ],
    images: [image('groupiee/groupiee.png', 'Groupiee')],
    links: [
      {
        kind: 'code',
        label: 'GitHub Repository',
        url: 'https://github.com/shunphoenix55/Groupiee-DevJams21-GDSC',
      },
    ],
  },
  {
    slug: 'fruit-ninja-clone',
    title: 'Fruit Ninja Clone',
    subtitle: 'Game Systems Recreation in Unity',
    category: 'Game Dev',
    summary:
      'A Unity recreation of Fruit Ninja built as a deep dive into game design and programming patterns, focusing on replicating core gameplay systems efficiently.',
    overview: [
      'This project is a recreation of the popular mobile game Fruit Ninja, built in Unity as a focused exercise in game design analysis and system implementation.',
      'The goal was not just to clone the gameplay, but to deeply understand how the original game’s systems work—from spawning logic and slicing mechanics to scoring and feedback systems.',
      'By studying the original game and reimplementing its mechanics, the project served as a hands-on exploration of efficient game architecture and programming patterns.',
    ],
    features: [
      {
        title: 'Core Gameplay Recreation',
        description:
          'Implements fruit spawning, slicing mechanics, scoring systems, and feedback loops inspired by the original game.',
      },
      {
        title: 'System-Level Analysis',
        description:
          'Breaks down and reconstructs gameplay systems to understand their design and implementation.',
      },
      {
        title: 'Optimized Game Architecture',
        description:
          'Applies best practices and programming patterns to ensure clean, maintainable, and efficient code.',
      },
      {
        title: 'Pattern-Driven Development',
        description:
          'Built while studying and applying concepts from Game Programming Patterns to structure the project effectively.',
      },
    ],
    techStack: ['Unity', 'C#', 'Game Programming Patterns', '2D Physics'],
    details: [
      { label: 'Project Type', value: 'Game Recreation' },
      { label: 'Date', value: 'May 2023' },
      { label: 'Mode', value: 'Remote' },
      { label: 'Engine', value: 'Unity' },
      { label: 'Focus', value: 'Game Systems & Design' },
    ],
    images: [image('fruit-ninja/fruit.png', 'Fruit Ninja Clone')],
    links: [],
  },
];
