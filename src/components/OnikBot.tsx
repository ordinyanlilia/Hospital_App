import React, { useState, useEffect } from 'react';
import './OnikBot.css';

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
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);

  const toggleBot = () => {
    if (opened && !showChat) {
      setOpened(false);
    } else {
      setOpened(true);
      setShowChat(false);
      setSelectedQuestion("");
    }
  };

  const handleQuestionClick = (q: string) => {
    setSelectedQuestion(q);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
    setTimeout(() => setSelectedQuestion(""), 300);
  };

  return (
    <div className="onik-bot-widget">
      <div className={`onik-bot-box ${opened ? 'open' : ''}`}>
        <div className="onik-inner-content">
          {!showChat ? (
            <div className="fade-slide">
              <p className="greeting">
                Ողջույն, ես <span className="highlight">911-ն</span> եմ <br />
                Ինչպե՞ս կարող եմ օգնել 🥰
              </p>
              <ul className="options-list fade-slide">
                {Object.keys(faqResponses).map((q, i) => (
                  <li key={i} onClick={() => handleQuestionClick(q)}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ChatSection
              selectedQuestion={selectedQuestion}
              response={faqResponses[selectedQuestion]}
              onBack={handleBack}
            />
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


interface ChatSectionProps {
  selectedQuestion: string;
  response: string;
  onBack: () => void;
}


function ChatSection({ selectedQuestion, response, onBack }: ChatSectionProps) {
  const [showInner, setShowInner] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowInner(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fade-slide">
      {showInner && (
        <>
          <div className="chat-box">
            <div className="message user-msg">{selectedQuestion}</div>
            <div className="message bot-msg">{response}</div>
          </div>
          <button className="back-button" onClick={onBack}>
            🔙 Վերադառնալ
          </button>
        </>
      )}
    </div>
  );
}
