import "./Chat.css";
import Message from "../message/Message";
import crypto from "crypto-js";

//The chat area component
export default function Chat({ messages,userInfo }) {

  //decrypting message before displaying
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
    <div className="chat-section">
      {messages.map(m => {
        return <Message message={decryptMessage(m.key,m.message,m.iv)} timestamp={m.timestamp} theirs={m.sender.email !== userInfo.email}/>
      })}
    </div>
  );
}
