const projectTitles = [
  "Website Redesign",
  "Mobile App Development",
  "Database Migration",
  "API Integration",
  "User Authentication System",
  "E-commerce Platform",
  "Content Management System",
  "Data Analytics Dashboard",
  "Cloud Infrastructure Setup",
  "Security Audit",
  "Performance Optimization",
  "User Experience Research",
  "Marketing Campaign",
  "Customer Support Portal",
  "Inventory Management System",
];

const projectDescriptions = [
  "Complete overhaul of the existing website with modern design principles",
  "Development of cross-platform mobile application for iOS and Android",
  "Migration of legacy database to new cloud-based solution",
  "Integration with third-party APIs for enhanced functionality",
  "Implementation of secure user authentication and authorization",
  "Building a comprehensive e-commerce platform with payment processing",
  "Creation of user-friendly content management system",
  "Development of real-time analytics dashboard for business insights",
  "Setup and configuration of scalable cloud infrastructure",
  "Comprehensive security assessment and vulnerability testing",
  "Optimization of application performance and load times",
  "Research and analysis of user experience patterns",
  "Strategic marketing campaign for product launch",
  "Development of customer support and ticketing system",
  "Implementation of automated inventory tracking system",
];

const statuses = ["pending", "in_progress", "completed"];

const generateRandomProject = (index, availableUserIds) => {
  const title = projectTitles[index % projectTitles.length];
  const description = projectDescriptions[index % projectDescriptions.length];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  // Assign 1-4 random users to each project
  const numberOfUsers = Math.floor(Math.random() * 4) + 1;
  const shuffledUserIds = [...availableUserIds].sort(() => 0.5 - Math.random());
  const userId = shuffledUserIds.slice(0, numberOfUsers);

  return {
    title,
    description,
    status,
    userId,
  };
};

export const generateProjects = (count = 10, availableUserIds) => {
  const projects = [];
  for (let i = 0; i < count; i++) {
    const project = generateRandomProject(i, availableUserIds);
    projects.push(project);
  }
  return projects;
};
