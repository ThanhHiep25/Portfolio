export interface Profile {
  profile_id: number;
  profile_des: string;
  profile_img: string;
}

export interface Experience {
  experience_id: number;
  experience_name: string;
  experience_des?: string;
  experience_year: string;
  experience_location: string;
  experience_position?: string;
  experience_img?: string;
  experience_step1?: string;
  experience_step2?: string;
  experience_step3?: string;
  experience_step4?: string;
  experience_step5?: string;
}

export interface TechType {
  type_id: number;
  type_name: string;
}

export interface Project {
  project_id: number;
  project_name: string;
  project_des: string;
  project_img: string;
  project_link: string;
  project_demo?: string;
  category?: string;
  project_year: string;
  project_type: TechType[];
  type?: TechType[];
  status?: string;
}

export interface Skill {
  skill_id: number;
  skill_name: string;
  skill_level: string;
  skill_img?: string;
}

export interface Language {
  language_id: number;
  language_name: string;
  language_level: string;
}

export interface Education {
  education_id: number;
  education_name: string;
  education_year: string;
  education_img: string;
  education_des: string;
}

export interface Certificate {
  certificate_id: number;
  certificate_name: string;
  certificate_year: string;
  certificate_img: string;
  certificate_des: string;
  certificate_link: string;
}

export interface UserAbout {
  user_id: number;
  name: string;
  age: string;
  job: string;
  address: string;
  phone: string;
  email: string;
  birthday: string;
  linkedIn: string;
  github: string;
  facebook: string;
  googleDeveloper: string;
  profile: Profile[];
  experience: Experience[];
  project_experience: Project[];
  skill: Skill[];
  language: Language[];
  education: Education[];
  certificate: Certificate[];
  create_at?: string;
  update_at?: string;
}

export type UsersAboutData = UserAbout[];
