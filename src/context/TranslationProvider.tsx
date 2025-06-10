import React, { createContext, useState, useContext } from "react";

const LANGUAGES = {
  arm: {
    hi: "բարև",
    home: "Գլխավոր էջ",
    about: "Մեր Մասին",
    findDoctor: "Գտնել Բժշկի",
    contactUs: "Կապ մեզ հետ",
    profile: "Իմ Էջը",
    findUsHere: "Գտեք մեզ այստեղ",
    phone: "Հեռախոս",
    email: "Էլ. հասցե",
    location: "Հասցե",
    place: "Երևան, Հրաչյա Քոչար փ., 2Ա",
    lookingFor: "Փնտրում եք վստահելի բժշկական օգնությո՞ւն",
    dontHesitate: "Կապ հաստատեք մեզ հետ",
    makeAppointment: "ԱՄՐԱԳՐԵԼ ՀԱՆԴԻՊՈՒՄԸ",
  },
  rus: {
    hi: "привет",
    home: "Главная",
    about: "О нас",
    findDoctor: "Найти врача",
    contactUs: "Связаться с нами",
    profile: "Профиль",
    findUsHere: "Найдите нас здесь",
    phone: "Телефон",
    email: "Эл. адрес",
    location: "Расположение",
    place: "Ереван, улица Грачья Кочара, 2А",
    lookingFor: "Ищете профессиональную и надёжную медицинскую помощь?",
    dontHesitate: "Не стесняйтесь обращаться к нам",
    makeAppointment: "ЗАПИСАТЬСЯ НА ПРИЁМ",
  },
  eng: {
    hi: "hi",
    home: "Home Page",
    about: "About",
    findDoctor: "Find Doctor",
    contactUs: "Contact Us",
    profile: "Your Profile",
    findUsHere: "Find Us Here",
    phone: "Phone",
    email: "Email",
    location: "Location",
    place: "Yerevan, Hrachya Kochar Street, 2A",
    lookingFor: "Looking for professional and trusted medical healthcare?",
    dontHesitate: "Don't hesitate to contact us",
    makeAppointment: "MAKE AN APPOINTMENT",
  },
} as const;


type LanguageKey = keyof typeof LANGUAGES;
type TokenKey = keyof typeof LANGUAGES.eng;

interface ITranslationContext {
  language: LanguageKey;
  changeLanguage: (lang: LanguageKey) => void;
  translate: (token: TokenKey) => string;
}

export const TranslationsContext = createContext<ITranslationContext>(
  {} as ITranslationContext
);

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageKey>("eng");

  const changeLanguage = (lang: LanguageKey) => {
    setLanguage(lang);
  };

  const translate = (token: TokenKey) => {
    return LANGUAGES[language][token];
  };

  return (
    <TranslationsContext.Provider value={{ language, changeLanguage, translate }}>
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslate = () => {
  return useContext(TranslationsContext);
};
