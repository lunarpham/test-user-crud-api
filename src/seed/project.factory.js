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

const generateRandomProject = (index) => {
  const title = projectTitles[index % projectTitles.length];
  const description = projectDescriptions[index % projectDescriptions.length];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    title,
    description,
    status,
    // Remove userId array - relationships will be handled separately
  };
};

export const generateProjects = (count = 10) => {
  const projects = [];
  for (let i = 0; i < count; i++) {
    const project = generateRandomProject(i);
    projects.push(project);
  }
  return projects;
};
