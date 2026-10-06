"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { MasterProfileData, initialMasterProfileData, ResumeProject } from "../types/resume";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ProfileContextType {
  profileData: MasterProfileData;
  updatePersonalInfo: (info: Partial<MasterProfileData['personalInfo']>) => void;
  addProject: (proj: Omit<ResumeProject, "id">) => void;
  updateProject: (id: string, proj: Partial<ResumeProject>) => void;
  deleteProject: (id: string) => void;
  updateList: <K extends keyof Omit<MasterProfileData, 'personalInfo'>>(key: K, data: MasterProfileData[K]) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useLocalStorage<MasterProfileData>("resumeos_master_profile", initialMasterProfileData);

  const updatePersonalInfo = (info: Partial<MasterProfileData['personalInfo']>) => {
    setProfileData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
  };

  const addProject = (proj: Omit<ResumeProject, "id">) => {
    setProfileData(prev => ({ ...prev, projects: [...prev.projects, { ...proj, id: uuidv4() }] }));
  };

  const updateProject = (id: string, proj: Partial<ResumeProject>) => {
    setProfileData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, ...proj } : p) }));
  };

  const deleteProject = (id: string) => {
    setProfileData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const updateList = <K extends keyof Omit<MasterProfileData, 'personalInfo'>>(key: K, data: MasterProfileData[K]) => {
    setProfileData(prev => ({ ...prev, [key]: data }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updatePersonalInfo, addProject, updateProject, deleteProject, updateList }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) throw new Error("useProfile must be used within ProfileProvider");
  return context;
};
