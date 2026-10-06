export interface ResumeExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  techStack: string[];
  visible: boolean;
}

export interface ResumeProject {
  id: string;
  name: string;
  context: string; // e.g., STATATHON 2025-26 Grand Finale
  description: string[];
  techStack: string[];
  visible: boolean;
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string[]; // CGPA, Percentage
  visible: boolean;
}

export interface ResumeSkillCategory {
  id: string;
  category: string; // e.g., 'Programming Languages', 'Frontend Development'
  skills: string[];
}

export interface ResumeAchievement {
  id: string;
  title: string;
  description: string;
  visible: boolean;
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  visible: boolean;
}

export interface ResumeLeadership {
  id: string;
  role: string;
  responsibilities: string[];
  visible: boolean;
}

export interface ResumeHackathon {
  id: string;
  name: string; // e.g., GHCI 2025 Hackathon
  roleAndProject: string; // e.g., Team Leader | Community Guardian
  status: string; // e.g., Selected for Round 2
  visible: boolean;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  areasOfInterest: string[];
  languages: string[];
}

export interface MasterProfileData {
  personalInfo: PersonalInfo;
  experiences: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  skills: ResumeSkillCategory[];
  achievements: ResumeAchievement[];
  certifications: ResumeCertification[];
  leadership: ResumeLeadership[];
  hackathons: ResumeHackathon[];
}

export const initialMasterProfileData: MasterProfileData = {
  personalInfo: {
    fullName: "Kabhilan V. S",
    title: "Student / Aspiring Software Engineer",
    email: "kabhilan2905@gmail.com",
    phone: "+91-8760-351-341",
    location: "Erode, TamilNadu",
    linkedin: "linkedin.com/in/kabhilan-vs",
    github: "github.com/Kabhilan-VS-05",
    portfolio: "kabhilan-vs-05.github.io/Portfolio/",
    summary: "Aspiring Software Engineer pursuing an Integrated M.Sc. in Software Systems with hands-on experience in full-stack web and mobile application development, AI-powered solutions, and real-world software projects. Passionate about learning emerging technologies and building scalable, user-centric applications that solve practical problems.",
    areasOfInterest: [
      "Software Engineering",
      "Full-Stack Development",
      "Artificial Intelligence & Machine Learning",
      "AI Agent Development",
      "Backend Systems & REST APIs",
      "Mobile Application Development",
      "Semantic Search & Information Retrieval",
      "Computer Vision",
      "Cloud Technologies",
      "Scalable Software Architecture"
    ],
    languages: ["Tamil – Native Proficiency", "English – Professional Working Proficiency"]
  },
  experiences: [],
  projects: [],
  education: [
    {
      id: "edu1",
      institution: "Kongu Engineering College (Autonomous), Perundurai",
      degree: "Integrated Master of Science (M.Sc.) – Software Systems",
      startDate: "2023",
      endDate: "Present",
      details: ["Current CGPA: 7.80 / 10.0"],
      visible: true
    },
    {
      id: "edu2",
      institution: "Bharathi Vidya Bhavan Matriculation Higher Secondary School, Thindal",
      degree: "Higher Secondary Certificate (HSC) – Mathematics & Computer Science",
      startDate: "2022",
      endDate: "2023",
      details: ["Percentage: 65.16%"],
      visible: true
    },
    {
      id: "edu3",
      institution: "Green Garden Matriculation Higher Secondary School, Perundurai RS",
      degree: "Secondary School Leaving Certificate (SSLC)",
      startDate: "2020",
      endDate: "2021",
      details: [],
      visible: true
    }
  ],
  skills: [
    { id: "s1", category: "Programming Languages", skills: ["Python", "Java", "JavaScript", "SQL", "C", "C++", "PHP (Basic)"] },
    { id: "s2", category: "Frontend Development", skills: ["React", "HTML5", "CSS3", "Bootstrap", "Responsive Web Design"] },
    { id: "s3", category: "Mobile Application Development", skills: ["Flutter", "React Native", "Kivy (Basic)"] },
    { id: "s4", category: "Backend Development", skills: ["Flask", "Node.js", "REST API Development", "API Integration"] },
    { id: "s5", category: "Database Management", skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Database Design"] },
    { id: "s6", category: "Artificial Intelligence & Machine Learning", skills: ["PyTorch", "OpenCV", "Semantic Search", "AI Agent Development", "Prompt Engineering", "Vector Embeddings", "Ollama", "Computer Vision", "Large Language Model (LLM) Integration"] },
    { id: "s7", category: "Cloud & DevOps", skills: ["AWS", "Firebase", "Docker (Basic)"] },
    { id: "s8", category: "Development Tools", skills: ["Git", "GitHub", "Visual Studio Code", "Android Studio", "Postman"] },
    { id: "s9", category: "Software Engineering", skills: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "Software Development Life Cycle (SDLC)", "System Design", "Requirement Analysis", "Debugging & Testing"] }
  ],
  achievements: [],
  certifications: [],
  leadership: [],
  hackathons: []
};
