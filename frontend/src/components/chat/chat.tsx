import React, { ReactNode } from "react";

import bot from "../../assets/bot.png";
import human from "../../assets/human.png";

interface ChatProps {
  chat?: Array<{ user: User; text: ReactNode }>;
  onSubmit?: (value: string) => void;
}

export type User = "bot" | "human";

export function Chat({ chat = [], onSubmit }: ChatProps) {
  const [message, setMessage] = React.useState("");

  function handleOnSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onSubmit && onSubmit(message);
    setMessage("");
  }

  return (
    <div className="flex w-screen main-chat lg:h-screen divide-solid">
      <div className="flex flex-col flex-grow lg:max-w-full bg-purple-50">
        <p className="font-black mt-4 mb-4 pl-4 text-2xl">Chat Bot</p>
        <div id="msg" className="pl-4 pr-4 h-5/6 overflow-y-auto">
          <ul className="flex flex-col w-full">
            {chat.map((el, index) => (
              <li
                key={index}
                className={`p-2 break-all bg-white shadow rounded-sm mb-4 max-w-sm text-sm ${
                  el.user === "bot" ? "" : "self-end w-full"
                }`}
              >
                <div className="flex">
                  <img
                    className="h-10 w-10"
                    src={el.user === "bot" ? bot : human}
                    alt=""
                  />
                  <div className="ml-2 w-full self-center">{el.text}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form>
          <div className="w-full flex p-4 lg:p-8 bg-purple-50">
            <div className="flex relative w-full lg:w-5/6">
              <input
                type="text"
                className="rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-2 lg:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <div>
              <button
                className="ml-8 flex-shrink-0 bg-green-400 text-gray-700 text-base font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2"
                onClick={handleOnSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
