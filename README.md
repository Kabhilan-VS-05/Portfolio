# Resume OS — Interactive Developer Portfolio & Live Resume Builder

**Resume OS** is a Next.js-powered interactive resume operating system and developer portfolio. Designed with modular section editors, live preview capabilities, and offline browser persistence, it enables software engineers to effortlessly curate and showcase their professional experience, hackathon victories, projects, skills, and certifications.

---

## 🚀 Key Features

- **Live In-Browser Editors**:
  - **Personal Info**: Contact channels, social profiles, and bio.
  - **Experience & Leadership**: Work roles, organizational leadership, and impact statements.
  - **Projects & Hackathons**: Technical stack tags, live repository links, and award badges.
  - **Skills & Certifications**: Categorized technical skills and credential verifications.
  - **Education & Achievements**: Academic history and extracurricular recognitions.
- **Offline Persistence**: Powered by `useLocalStorage` and React Context for automatic draft saving without requiring external login.
- **Real-Time Preview**: Instant bidirectional sync between the structured editor forms and formatted resume layout.
- **Modern Responsive UI**: Built with Next.js App Router, Tailwind CSS, and accessible input components.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **State Management**: React Context (`ProfileContext.tsx`) + Custom LocalStorage Sync Hook
- **Styling**: Modern CSS3 / Tailwind CSS
- **Typing**: Strict TypeScript (`types/resume.ts`)

---

## 📁 Project Architecture

```
Resume_develop/
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Global layout and font definitions
│   │   └── page.tsx                     # Main Resume OS editor & preview canvas
│   ├── components/editor/
│   │   ├── PersonalInfoEditor.tsx       # Bio & contacts
│   │   ├── ExperienceEditor.tsx         # Employment history
│   │   ├── ProjectsEditor.tsx           # Technical project catalog
│   │   ├── HackathonsEditor.tsx         # Hackathons & awards
│   │   ├── SkillsEditor.tsx             # Competencies & tools
│   │   └── AchievementsEditor.tsx       # Honors & milestones
│   ├── context/
│   │   └── ProfileContext.tsx           # Global resume data provider
│   ├── hooks/
│   │   └── useLocalStorage.ts           # Automatic state persistence
│   └── types/
│       └── resume.ts                    # Strongly typed resume schema
```

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to start building and customizing your resume.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📄 License
Created by [Kabhilan VS](https://github.com/Kabhilan-VS-05). All rights reserved.
