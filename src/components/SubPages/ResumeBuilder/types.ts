export interface Experience {
  id: string;
  title: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  course: string;
  institution: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  photoUrl: string | null;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  languages: string[];
  template: "minimalist" | "modern" | "executive";
}

export const initialResumeData: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  address: "",
  summary: "",
  photoUrl: null,
  experiences: [],
  educations: [],
  skills: [],
  languages: [],
  template: "minimalist",
};
