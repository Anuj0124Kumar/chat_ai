import "./normal.css";
import "./App.css";
import { useState } from "react";


function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can I help you today?",
    },
    {
      user: "me",
      message: "I want to use ChatGPT.",
    },
  ]);

   //clear chats
   function clearChats(){
        setChatLog([]);
   }

  const handleSubmit = async(e) => {
    e.preventDefault();
   let  ChatLogNew = [...chatLog,{ user : "me" , message: `${input}`}]
   await setInput("");
   setChatLog(ChatLogNew);

   const messages = ChatLogNew.map((message)=> message.message).join("\n")
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message:messages
      })
    });
    
    const data = await response.json();
    setChatLog([
      ...ChatLogNew,
      {
        user: "gpt",
        message: `${data.message}`,
      },
    ]);
    console.log(data.message);
    
  };

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChats}>
          <span>+</span>
          New chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <ChatGPT />
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
              placeholder="Type your message here..."
            />
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  const isGptMessage = message.user === "gpt";

  return (
    <div
      className={`chat-message ${isGptMessage ? "chatgpt" : ""}`}
    >
      <div className="chat-message-center">
        <div className={`avatar ${isGptMessage ? "chatgpt" : ""}`}>
          {isGptMessage && (
            <img
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8IFb3g3SySI_6pm84y51nwGDDuhA4CGCwLm8nQhLYkMzLho8ctRd8WUUTE-UTh2OJYI&usqp=CAU"
              alt="Not found"
            />
          )}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

const ChatGPT = () => {
  return (
    <div className="chat-message chatgpt">
      <div className="chat-message-center">
        <div className="avatar chatgpt">
          <img
            style={{ height: "40px", width: "40px", borderRadius: "50%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8IFb3g3SySI_6pm84y51nwGDDuhA4CGCwLm8nQhLYkMzLho8ctRd8WUUTE-UTh2OJYI&usqp=CAU"
            alt="Not found"
          />
        </div>
        <div className="message">I am an AI.</div>
      </div>
    </div>
  );
};

export default App;




// import "./normal.css";
// import "./App.css";
// import { useState, useEffect } from "react";

// function App() {
//   const [input, setInput] = useState("");
//   const [chatLog, setChatLog] = useState([{
//     user:"gpt",
//     message:"How can i help You today"
//   },{
//     user:"me",
//     message:"i want to use chat gpt "
//   }

//   ]);

//   const handelSubmit = async (e) => {
//     e.preventDefault();

//     setChatLog([...chatLog, { user: "me", message: `${input}` }]);
//     setInput("");
//   };
//   return (
//     <div className="App">
//       <aside className="sidemenu">
//         <div className="side-menu-button">
//           <span>+</span>
//           New chat
//         </div>
//       </aside>
//       <section className="chatbox">
//         <div className="chat-log">
//           {
//             chatLog.map((message,index)=>{
//               <ChatMessage key={index} message={message} />
//             })
//           }
//           <div className="chat-message chatgpt">
//             <div className="chat-message-center">
//               <div className="avatar chatgpt">
//                 <img
//                   style={{ height: "40px", width: "40px", borderRadius: "50%" }}
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8IFb3g3SySI_6pm84y51nwGDDuhA4CGCwLm8nQhLYkMzLho8ctRd8WUUTE-UTh2OJYI&usqp=CAU"
//                   alt="not_found"
//                 />
//               </div>
//               <div className="message">I am AI</div>
//             </div>
//           </div>
//         </div>
//         <div className="chat-input-holder">
//           <form onSubmit={handelSubmit}>
//             <input
//               row="1"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="chat-input-textarea"
//               placeholder="type your message here......"
//             ></input>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

// const ChatMessage = (message) => {
//   return (
//     <div className={`chat-message ${message.user === "gpt"  && "chatgpt"}` }>
//       <div className="chat-message-center">
//         <div className={`avatar ${message.user === "gpt"  && "chatgpt"}` }>
//           {message.user === 'gpt' && <img
//                   style={{ height: "40px", width: "40px", borderRadius: "50%" }}
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8IFb3g3SySI_6pm84y51nwGDDuhA4CGCwLm8nQhLYkMzLho8ctRd8WUUTE-UTh2OJYI&usqp=CAU"
//                   alt="not_found"
//                 />}
//         </div>
//         <div className="message">{message.message}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
