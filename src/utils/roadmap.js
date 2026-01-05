export const getRoadmap = (role) => {
  switch (role) {
    case "Software Developer":
      return [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "System Design Basics",
        "LeetCode + Mock Interviews"
      ];

    case "Web Developer":
      return [
        "HTML, CSS, JavaScript",
        "React + Projects",
        "APIs & Authentication",
        "Portfolio Website"
      ];

    case "Data Analyst":
      return [
        "SQL & Excel",
        "Python + Pandas",
        "Data Visualization",
        "Case Studies"
      ];

    case "Backend Developer":
      return [
        "Node.js / Java / Python",
        "REST APIs",
        "Databases",
        "Authentication & Security"
      ];

    default:
      return ["Choose a role to see roadmap"];
  }
};
