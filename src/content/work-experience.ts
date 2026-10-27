import type { ArchiveEntry, ArchiveImage, ArchiveLabels, ArchiveLink } from './archive';

const ASSETS = 'https://shunphoenix55.github.io/assets';

const image = (path: string, alt: string): ArchiveImage => ({ src: `${ASSETS}/${path}`, alt });
const video = (url: string, label = 'Watch Video'): ArchiveLink => ({ kind: 'video', label, url });
const site = (url: string, label: string): ArchiveLink => ({ kind: 'page', label, url });

export const experiencePage = {
  title: 'Work Experience',
  intro: 'My professional journey in the XR and Game Development industry.',
};

export const experienceLabels: ArchiveLabels = {
  wheel: 'Work experience ferris wheel',
  features: 'Contributions',
  stack: 'Tech stack',
  details: 'Details',
  links: 'Links',
};

export const workExperience: ArchiveEntry[] = [
  {
    slug: 'anomaly-shooter',
    title: 'Doom Town',
    subtitle: 'Gameplay Programmer - Anomaly Labs',
    summary:
      'Battle it out with your friends in a multiplayer shooter in VR! Set in a futuristic sci-fi world, you gather powerups and use them strategically to gain the upper hand in matches!',
    overview: [
      'Battle it out with your friends in a multiplayer shooter in VR! Set in a futuristic sci-fi world, you gather powerups and use them strategically to gain the upper hand in matches!',
    ],
    features: [
      {
        title: 'Multiplayer Networking Architecture',
        description:
          'Engineered a multiplayer system using Unity NGO that supports both peer-to-peer and server-based connections.',
      },
      {
        title: 'FPS System',
        description: 'Built an FPS system with haptics and VR-specific visuals',
      },
      {
        title: 'Avatar System',
        description:
          'Created an avatar system that allows you to take any rigged humanoid and convert it to a VR Rig that follows your head and hand movements.',
      },
      {
        title: 'Performance Optimization',
        description: 'Optimized the game for the Meta Quest 2 and 3, achieving a stable 72fps.',
      },
      {
        title: 'Graphics & Visuals',
        description: 'Created custom shaders to create visuals that enhance the sci-fi aesthetic',
      },
    ],
    techStack: ['Unity 6.2 LTS', 'C#', 'Unity NGO', 'Meta XR SDK'],
    details: [
      { label: 'Dates', value: 'Feb 2025 – Present' },
      { label: 'Team Size', value: '4' },
      { label: 'Platform', value: 'Meta Quest 2/3' },
      { label: 'Status', value: 'Live' },
    ],
    images: [image('covers/doom-town.png', 'Doom Town')],
    links: [
      site('https://www.anomalysimulationsystems.com', 'Studio Website'),
      video('https://youtu.be/PxBUL5u0uGA'),
      video('https://youtu.be/4Fn5gI0Zmj4', 'Watch Video 2'),
    ],
  },
  {
    slug: 'vr-dnd',
    title: 'Dungeons and Dragons VR',
    subtitle: 'Gameplay Programmer - Anomaly Labs',
    summary:
      'A narrative driven RPG based on Dungeons and Dragons. Experience a unique system of turn-based VR combat. The story changes depending on your choices. Perform various skill checks using VR dice.',
    overview: [
      'A narrative driven RPG based on Dungeons and Dragons. Experience a unique system of turn-based VR combat. The story changes depending on your choices. Perform various skill checks using VR dice.',
    ],
    features: [
      {
        title: 'DnD Character System',
        description:
          'Made a DnD-based character system with characteristics that reflect in both narrative and combat aspects of gameplay',
      },
      {
        title: 'Dialogue System',
        description:
          'Created a dialogue system with editor tools to make it easy for designers to put their script into Unity',
      },
      {
        title: 'Combat System',
        description:
          'Programmed a unique turn-based combat system in VR with unique weapon interactions and combos',
      },
    ],
    techStack: ['Unity', 'C#', 'Meta XR SDK'],
    details: [
      { label: 'Dates', value: 'Feb 2025 – May 2025' },
      { label: 'Team Size', value: '5 Members' },
      { label: 'Platform', value: 'Meta Quest 2/3' },
      { label: 'Status', value: 'Shipped' },
    ],
    images: [image('work/vr-dnd/dnd.png', 'Dungeons and Dragons VR')],
    links: [
      site('https://www.anomalysimulationsystems.com', 'Studio Website'),
      video('https://youtu.be/fYB5CHUX8PE'),
      video('https://youtube.com/shorts/wMq1UDn6oGE', 'Watch Video 2'),
      video('https://youtu.be/9CTF0xSMBLk', 'Watch Video 3'),
      video('https://youtube.com/shorts/_Yhb8w3dBa4', 'Watch Video 4'),
      video('https://youtu.be/4NQ7dGo1asg', 'Watch Video 5'),
      video('https://youtube.com/shorts/0TB35FSHIKw', 'Watch Video 6'),
    ],
  },
  {
    slug: 'white-rabbit',
    title: 'White Rabbit',
    subtitle: 'C++ Programmer - Dissent Studio',
    summary:
      'White Rabbit unfolds within the abandoned remnants of an amusement theme park, concealing a clandestine research facility. This once-thriving park, now overgrown with nature, serves as the backdrop for a narrative of intrigue and exploration.',
    overview: [
      'White Rabbit unfolds within the abandoned remnants of an amusement theme park, concealing a clandestine research facility. This once-thriving park, now overgrown with nature, serves as the backdrop for a narrative of intrigue and exploration.',
    ],
    features: [
      { title: 'FPS Combat System', description: 'Developed a PvE combat system' },
      {
        title: 'Sanity System',
        description: 'Created a unique sanity element that influences the gameplay',
      },
      { title: 'Inventory System', description: 'Programmed the inventory system for the game' },
      { title: 'Quest System', description: 'Made the progression and quest system' },
    ],
    techStack: ['Unreal Engine', 'C++', 'Blueprints'],
    details: [
      { label: 'Dates', value: 'November 2023 – June 2024' },
      { label: 'Duration', value: '1 year' },
      { label: 'Team Size', value: '15' },
    ],
    images: [
      image('work/white-rabbit/white-rabbit.jpg', 'White Rabbit'),
      image('work/white-rabbit/white-rabbit-screenshot-3.png', 'White Rabbit gameplay screenshot'),
      image(
        'work/white-rabbit/white-rabbit-screenshot-2.png',
        'White Rabbit gameplay screenshot 2',
      ),
    ],
    links: [
      site('https://www.dissentstudio.in', 'Studio Website'),
      video('https://youtu.be/VSHobwz8XnI', 'Watch Trailer'),
      video('https://youtu.be/NPAXa3fWdjA', 'Watch Gameplay'),
    ],
  },
  {
    slug: 'iva-plus',
    title: 'Intelligent Vision Analyzer Plus',
    subtitle: 'C# Programmer - Alfaleus Technology',
    summary:
      'iVA+ is a VR application that is used to perform eye testing. It is primarily used to detect glaucoma, beating out the Goldmann machine in terms of accuracy and price.',
    overview: [
      'iVA+ is a VR application that is used to perform eye testing. It is primarily used to detect glaucoma, beating out the Goldmann machine in terms of accuracy and price.',
      'It also features tests for visual acuity, contrast and colorblindness',
    ],
    features: [
      {
        title: 'Eye Tests',
        description:
          'Implemented the Contrast Sensitivity, Visual Acuity and Colorblindness tests from scratch',
      },
      {
        title: 'Interactive Tutorial',
        description:
          'I created an interactive tutorial for the Visual Field test and Contrast Sensitivity test, supporting multiple languages.',
      },
      {
        title: 'Optimization and Performance',
        description:
          'I optimized the application, reducing build time from 10 minutes to 1.5 minutes, 500 MB to 80 MB, loading time from 40 seconds to 5 seconds.',
      },
      {
        title: 'Codebase Refactoring',
        description: 'Rewrote and refactored the codebase to make it more readable and scalable',
      },
      {
        title: 'UI Rework',
        description:
          'Completely overhauled and reworked the UI to make it fluid, added smooth animations.',
      },
    ],
    techStack: ['Unity', 'C#', 'PICO SDK', 'XR Interaction Toolkit'],
    details: [
      { label: 'Dates', value: 'August 2023 – December 2023 (Internship)' },
      { label: 'Duration', value: '4 months' },
      { label: 'Team Size', value: '6' },
    ],
    images: [image('work/iva-plus/iva-plus.png', 'Intelligent Vision Analyzer Plus')],
    links: [
      site('https://alfaleus.in', 'Alfaleus Website'),
      video('https://www.youtube.com/watch?v=MPbURIU4H8k'),
    ],
  },
  {
    slug: 'halara',
    title: 'Halara',
    subtitle: 'Unity Programmer - Halara',
    summary:
      'Halara is a Virtual Reality platform to help train and develop children with Autism through providing immersive environments that simulate daily essential activities and learn while playing games in 3D.',
    overview: [
      'Halara is a Virtual Reality platform to help train and develop children with Autism through providing immersive environments that simulate daily essential activities and learn while playing games in 3D.',
    ],
    features: [
      {
        title: '3D Asset modeling and Animation',
        description:
          "I modeled 3D art assets for 3 modules in the application, and animated them using Unity's animation system.",
      },
      {
        title: 'Therapy Module Development',
        description:
          'Worked on the development of 3 therapy modules: Socialization, Attention and Multitasking. These modules are designed to help children with autism learn essential life skills through interactive VR experiences.',
      },
      {
        title: 'Optimization and Performance',
        description:
          'Optimized the application to run smoothly on the PICO 2 Neo, reducing loading times and improving frame rates.',
      },
    ],
    techStack: ['Unity', 'C#', 'PICO SDK', 'XR Interaction Toolkit'],
    details: [
      { label: 'Dates', value: 'July 2022 – November 2022 (Internship)' },
      { label: 'Duration', value: '4 months' },
      { label: 'Team Size', value: '10' },
    ],
    images: [image('work/halara/halara.png', 'Halara')],
    links: [
      site('https://halaravr.co.in', 'Halara Website'),
      video('https://www.youtube.com/watch?v=oc0IxjpXRCE'),
    ],
  },
  {
    slug: 'virtual-bride',
    title: 'Virtual Bride',
    subtitle: 'Unity Programmer - Sulakshana Monga',
    summary:
      'Virtual Bride is a shopping app which lets you try out Bridal Wear in Augmented Reality. It is designed to help brides-to-be visualize how different outfits will look on them before making a purchase.',
    overview: [
      'Virtual Bride is a shopping app which lets you try out Bridal Wear in Augmented Reality for iOS devices. It is designed to help brides-to-be visualize how different outfits will look on them before making a purchase.',
    ],
    features: [
      {
        title: 'Augmented Reality',
        description:
          'Used Unity MARS to overlay clothing on the user in Augmented Reality, with features such as changing the size of the clothes',
      },
      {
        title: 'Customization System',
        description:
          'Implemented a customization system that allows users to change the color and pattern of the clothes, providing a personalized shopping experience.',
      },
      {
        title: 'UI Programming and Animations',
        description:
          'I made the UI and made sure it scaled properly for all iOS devices. Created smooth animations for the user interface to enhance the overall user experience.',
      },
    ],
    techStack: ['Unity', 'C#', 'AR Foundation', 'AR Kit', 'iOS'],
    details: [
      { label: 'Dates', value: 'April 2023 – June 2023 (Freelance)' },
      { label: 'Duration', value: '4 months' },
      { label: 'Team Size', value: '10' },
    ],
    images: [
      {
        src: 'https://sulakshanamonga.com/cdn/shop/products/2_ce6969ce-cd85-4d51-a7b7-bd9c54e4df88.jpg?v=1663138104&width=1200',
        alt: 'Virtual Bride bridal wear',
      },
    ],
    links: [site('https://sulakshanamonga.com', 'Sulakshana Monga Website')],
  },
  {
    slug: 'ation-studios',
    title: 'Ation Studios',
    subtitle: 'Blender Animator',
    summary:
      'Ation Studios is a creative agency that specializes in 3D modeling and animation. It is designed to help clients visualize their ideas in a dynamic and engaging way.',
    overview: [
      'Ation Studios is a creative agency that specializes in 3D modeling and animation. It is designed to help clients visualize their ideas in a dynamic and engaging way.',
    ],
    features: [
      {
        title: '3D Modeling',
        description: 'Created detailed 3D models for various client projects using Blender.',
      },
      {
        title: '3D Animation',
        description:
          'Developed smooth animations for 3D models, enhancing the visual appeal and storytelling.',
      },
    ],
    techStack: ['Blender', 'Python', 'Substance Painter'],
    details: [
      { label: 'Dates', value: 'February 2022 – May 2022 (Internship)' },
      { label: 'Duration', value: '3 months' },
      { label: 'Team Size', value: '6' },
    ],
    images: [image('work/ation-studios/ation.png', 'Ation Studios')],
    links: [video('https://youtu.be/X-qWpWhGsH8')],
  },
];
