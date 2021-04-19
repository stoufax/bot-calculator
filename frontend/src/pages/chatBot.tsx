import React, { ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Chat, User } from "components";
import { socketIOClient } from "services";

export function ChatBot() {
  const [chat, setChat] = React.useState<
    Array<{ user: User; text: ReactNode }>
  >([{ user: "bot", text: "Hi I am calculator bot!" }]);

  React.useEffect(() => {
    socketIOClient.on("operation-result", (msg) => {
      setChat([...chat, { user: "bot", text: msg }]);
    });

    socketIOClient.on("history-result", (msg: Array<number>) => {
      if (msg.length === 0) {
        setChat([...chat, { user: "bot", text: "No history found" }]);
        return;
      }
      setChat([
        ...chat,
        { user: "bot", text: ["The Last 10 Results Are:", renderTextBot(msg)] },
      ]);
    });

    socketIOClient.on("connect_error", (err) => {
      toast.error("An error has occured");
    });

    srollToBottom();
    return () => {
      socketIOClient.off();
    };
  }, [chat]);

  const handleOnSubmit = (value: string) => {
    if (value === "") {
      toast("Enter a command.", { icon: "⚠️" });
      return;
    }

    if (value.startsWith("/operation")) {
      const mathExpressionToBeCalculated = value.replace("/operation", "");
      if (mathExpressionToBeCalculated.trim() === "") {
        toast("Add an math expression.", { icon: "⚠️" });
        return;
      }

      setChat([
        ...chat,
        {
          user: "human",
          text: value,
        },
      ]);
      socketIOClient.emit("operation", mathExpressionToBeCalculated);
      return;
    }

    if (value === "/history") {
      setChat([
        ...chat,
        {
          user: "human",
          text: value,
        },
      ]);
      socketIOClient.emit("history");
      return;
    }

    setChat([
      ...chat,
      { user: "human", text: value },
      { user: "bot", text: "Command not found" },
    ]);
  };
  return (
    <>
      <Toaster />
      <Chat chat={chat} onSubmit={handleOnSubmit} />
    </>
  );
}

function srollToBottom() {
  let objDiv = document.getElementById("msg");
  if (objDiv) {
    objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
  }
}

function renderTextBot(messages: Array<number>): ReactNode {
  return messages.map((m, index) => (
    <div key={index}>
      <b>- {m}</b>
    </div>
  ));
}
