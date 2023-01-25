import { useEffect, useState } from "react";
import "./Chat.css";
import Message from "../message/Message";
import crypto from "crypto-js";
import { useSelector } from "react-redux";

//The chat area component
export default function Chat({ messages, userInfo }) {
  const searchValue = useSelector((state) => state.search.value);
  const [finalMessages, setFinalMessages] = useState([]);
  useEffect(() => {
    if (!searchValue) { 
      setFinalMessages(messages);
    }
    else { //if the user is trying to search, filtering msgs which include that string
      let msgs = [];
      setFinalMessages([]);
      msgs = messages.filter(
        (m) =>
          decryptMessage(m.key, m.message, m.iv).includes(searchValue) === true
      );
      setFinalMessages(msgs);
    }
  }, [searchValue]);
  const decryptMessage = (key, message, iv) => {
    let _key = crypto.enc.Hex.parse(key);
    const result = crypto.AES.decrypt(message, _key, {
      iv: crypto.enc.Hex.parse(iv),
      mode: crypto.mode.CBC,
      format: crypto.format.Hex,
    }).toString(crypto.enc.Utf8);

    return result;
  };

  return (
    <div className='chat-section'>
      {finalMessages.map((m) => {
        return (
          <Message
            key={finalMessages.indexOf(m)}
            message={decryptMessage(m.key, m.message, m.iv)}
            timestamp={m.timestamp}
            theirs={m.sender.email !== userInfo.email}
          />
        );
      })}
    </div>
  );
}
