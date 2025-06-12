import { useState } from 'react';
import './OnikBot.css';
import MedicalChat from './MedicalChat';
import { useTranslate } from '../context/TranslationProvider';



export default function OnikBot() {
  
  const { translate } = useTranslate();
  const [opened, setOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [view, setView] = useState<'faq' | 'medicalChat' | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);

  const faqResponses: Record<string, string> = {
  [translate("faqVisitRegister")]:
      translate("faqVisitRegisterAnswer"),
    [translate("faqDocsNeeded")]:
      translate("faqDocsNeededAnswer"),
    [translate("faqWorkingHours")]:
      translate("faqWorkingHoursAnswer"),
    [translate("faqChildCare")]:
      translate("faqChildCareAnswer"),
    [translate("faqLocation")]:
      translate("faqLocationAnswer"),
    [translate("faqDepartments")]:
      translate("faqDepartmentsAnswer")
};


  const toggleBot = (): void => {
    if (opened) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setOpened(false);
        setView(null);
        setMessages([]);
      }, 400); // match CSS transition
    } else {
      setOpened(true);
      setView('faq');
    }
  };

  const handleFaqQuestionClick = (question: string): void => {
    const answer = faqResponses[question];
    setMessages(prev => [
      ...prev,
      { text: question, sender: 'user' },
      { text: answer, sender: 'bot' }
   
    ]);
    setView('medicalChat');
  };

  const handleOtherQuestionClick = (): void => {
    setView('medicalChat');
  };

  const handleBackToFaq = (): void => {
    setView('faq');
  };

  return (
    <div className="onik-bot-widget">
      <div className={`onik-bot-box ${opened ? 'open' : ''} ${isClosing ? 'closed' : ''}`}>
        {opened && !isClosing && (
          <button className="chat-close-button" onClick={toggleBot}>X</button>
        )}
        <div className="onik-inner-content">
          {view === 'faq' && (
            <div className="fade-slide">
              <p className="greeting">
                {translate("hiIam")} <span className="highlight">{translate("botName")}</span> {translate("em")}<br />
                {translate("howcanIHelp")} 🥰
              </p>
              <ul className="options-list fade-slide">
                {Object.keys(faqResponses).map((q, i) => (
                  <li key={i} onClick={() => handleFaqQuestionClick(q)}>
                    {q}
                  </li>
                ))}
                <li onClick={handleOtherQuestionClick} className="medical-chat-option">
                  {translate("otherQuestions")}
                </li>
              </ul>
            </div>
          )}

          {view === 'medicalChat' && (
            <div className="fade-slide chat-box">
              <MedicalChat
                messages={messages}
                setMessages={setMessages}
                onBack={handleBackToFaq}
              />
            </div>
          )}
        </div>
      </div>

      <div className={`onik-toggle ${opened ? 'push-up' : ''}`} onClick={toggleBot}>
        <p>{translate("questions")}</p>
        <img src="/robot.png" alt="ONIK" />
      </div>
    </div>
  );
}
