// Domain Entity: SwamiJi
export interface SwamiJi {
  id: string;
  name: {
    en: string;
    hi: string;
  };
  title: {
    en: string;
    hi: string;
  };
  bio: {
    en: string;
    hi: string;
  };
  teachings: Teaching[];
  quotes: Quote[];
  imageUrl: string;
  birthDate?: string;
  achievements: Achievement[];
}

export interface Teaching {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  content: {
    en: string;
    hi: string;
  };
  category: string;
  date: string;
}

export interface Quote {
  id: string;
  text: {
    en: string;
    hi: string;
  };
  context?: {
    en: string;
    hi: string;
  };
}

export interface Achievement {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  year: string;
  imageUrl?: string;
}

export interface Event {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  date: string;
  location: {
    en: string;
    hi: string;
  };
  imageUrl?: string;
}
