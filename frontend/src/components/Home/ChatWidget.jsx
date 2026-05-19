// ChatWidget.jsx

import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello 👋 Ask me anything!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);



 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = {
    role: "user",
    text: input,
  };

  setMessages((prev) => [...prev, userMessage]);

  const currentInput = input;

  setInput("");
  setLoading(true);

  try {
    const response = await fetch(
    `${process.env.REACT_APP_API_URL}/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: currentInput,
      }),
    });

    const data = await response.json();
const botReply = data?.generated_text || "No response";

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: botReply,
      },
    ]);
  } catch (error) {
    console.log(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: "Something went wrong!",
      },
    ]);
  }

  setLoading(false);
};

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl z-50"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-5 w-[350px] h-[500px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col z-50 border">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 font-semibold text-lg">
            AI Chat Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-white border px-4 py-2 rounded-2xl text-sm w-fit">
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder="Type message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;