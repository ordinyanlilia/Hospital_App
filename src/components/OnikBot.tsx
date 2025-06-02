import React, { useState, useEffect } from 'react';
import './OnikBot.css';
import MedicalChat from './MedicalChat';

const faqResponses: Record<string, string> = {
  "Ինչպե՞ս կարող եմ գրանցվել ձեր մոտ այցելության համար":
    "Ձեր մոտ այցելություն գրանցելու համար կարող եք զանգահարել մեր տեղեկատուի համարով 📞 կամ գրել «Առաքման» բաժին։ Մեր օպերատորները կաջակցեն Ձեզ և կնշանակեն հարմար օր և ժամ։",
  "Ի՞նչ փաստաթղթեր են անհրաժեշտ ձեր մոտ այցելու լինելու համար":
    "Ձեր մոտ այցելության համար մեզ պետք է ներկայացնեք ձեր հետ անձնագիր կամ նույնականացման քարտ։ Սոցիալական քարտ (եթե անհրաժեշտ է)։ Վկայականներ, եթե այցելության նպատակը վերաբերուում է բժշկական խորհրդատվության (եթե կա)։",
  "Որո՞նք են աշխատողի աշխատանքային ժամերը":
    "Մեր աշխատանքային ժամերն են՝ երկուշաբթիից ուրբաթ 09:00-ից 18:00։ Շաբաթ և կիրակի չենք աշխատում (եթե հատուկ պայմանավորվածություն չկա)։",
  "Արդյո՞ք դուք երեխայի խնամքով զբաղվում եք ձեր կենտրոնում":
    "Այո՛, մեր կենտրոնում մենք առաջարկում ենք ծառայություններ երեխաների խնամքի համար։",
  "Որտե՞ղ է գտնվում ձեր կենտրոնը և ինչպես կարող եմ հասնել":
    "Մեր հասցեն է՝ 📍 (հասցե)։",
  "Ո՞ր բաժիններում են գործում հիվանդանոցում":
    "---։"
};

export default function OnikBot() {
  const [opened, setOpened] = useState<boolean>(false);
  const [view, setView] = useState<'faq' | 'medicalChat' | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);

  const toggleBot = (): void => {
    if (opened) {
      setOpened(false);
      setTimeout(() => {
        setView(null);
        setMessages([]);
      }, 300);
    } else {
      setOpened(true);
      setView('faq');
    }
  };

  const handleFaqQuestionClick = (question: string): void => {
    const answer = faqResponses[question];
    setMessages([
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
    setMessages([]);
  };

  return (
    <div className="onik-bot-widget">
      <div className={`onik-bot-box ${opened ? 'open' : ''}`}>
        {opened && (
          <button className="chat-close-button" onClick={toggleBot}>×</button>
        )}
        <div className="onik-inner-content">
          {view === 'faq' && (
            <div className="fade-slide">
              <p className="greeting">
                Ողջույն, ես <span className="highlight">911-ն</span> եմ <br />
                Ինչպե՞ս կարող եմ օգնել 🥰
              </p>
              <ul className="options-list fade-slide">
                {Object.keys(faqResponses).map((q, i) => (
                  <li key={i} onClick={() => handleFaqQuestionClick(q)}>
                    {q}
                  </li>
                ))}
                <li onClick={handleOtherQuestionClick} className="medical-chat-option">
                  Այլ հարց
                </li>
              </ul>
            </div>
          )}

          {view === 'medicalChat' && (
            <div className="fade-slide chat-box">
              {messages.length > 0 ? (
                <>
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <button className="back-button" onClick={handleBackToFaq}>
                    🔙 Վերադառնալ
                  </button>
                </>
              ) : (
                <>
                  <MedicalChat messages={messages} setMessages={setMessages} onBack={handleBackToFaq} />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="onik-toggle" onClick={toggleBot}>
        <p>Հարցեր</p>
        <img src="/robot.png" alt="ONIK" />
      </div>
    </div>
  );
}
