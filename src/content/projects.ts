import { portfolioProjects } from './portfolio-projects';

const FEATURED = 4;

export const projectsHeading = {
  title: 'Projects, Hackathons and Game Jams',
  count: portfolioProjects.length,
  masks: 5,
  viewAllHref: '/projects',
};

export const featuredProjects = portfolioProjects.slice(0, FEATURED);
