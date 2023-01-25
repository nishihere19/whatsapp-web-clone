import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./Chatbox.css";
import Details from "../details/Details";
import Navigation from "../navigation/Navigation";
import Archive from "../archive/Archive";
import List from "../list/List";
import Chat from "../chat/Chat";
import getUserByToken from "../../Library/getUserByToken";
import Axios from "axios";
import {getAllUser,getAllArchives} from "../../Library/getAllUser";
import queryString from "query-string";
import io from "socket.io-client";
import getUserById from "../../Library/getUserById";
import crypto from "crypto-js";
import SendMessageIcon from "@material-ui/icons/Message";
import {useDispatch} from "react-redux";
import {userActions} from "../../Library/userSlice"

let socket;
const URL = process.env.REACT_APP_BACKEND_URL;

const Chatbox = ({ location={},archiveOpen }) => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState("");
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [target, setTarget] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  function onClickOnContact(contact) {
    setSelectedContact(contact);
  }


  useEffect(() => {
    if (window.location.search && userInfo._id) {
      const { to } = queryString.parse(window.location.search);
      socket = io(URL);
      if (to) {
        setTarget(to);
        setSelectedContact(to);
        const token = new Cookies().get("token");
        socket.emit("startMessage", {
          sender: userInfo._id,
          recipient: to,
          token,
          senderEmail: userInfo.email,
        });

        Axios.post(`${URL}/messages/get_messages`, {
          user: userInfo._id,
          token: userInfo.token,
          target: to,
        })
          .then((res) => {
            res.data.forEach((message) => {
              setMessages((_messages) => [..._messages, message]);
            });
          })
          .catch(() => (window.location = "/"));
      }
      socket.on("message", (message) => {

        if (
          (message.recipient.email === to &&
            message.sender.id === userInfo._id) ||
          (message.recipient.id === userInfo._id && message.sender.email === to)
        )
          setMessages((_messages) => [..._messages, message]);
        else {
          getUserById(message.sender.id).then((result) => {
            // setFriends((ex) => ({ ...ex, [message.sender.id]: result }));
          });
        }
      });
    }
  }, [location.search, userInfo]);

  useEffect(() => {
    const token = new Cookies().get("token");
    getUserByToken(token).then((res) => {
      if (res) {
        if (res.status) window.location = "/login";
        else {
          // dispatch(userActions.setUser({
          //   id:res._id,
          //   email:res.email,
          //   name:res.name
          // }))
          // console.log(userInfo)
          setUserInfo(res)
          const cookie = new Cookies();
          cookie.set("token", res.token, { path: "/", maxAge: 604800 });
        }
      } else window.location = "/login";
    });
  }, []);


  useEffect(() => {
    const token = new Cookies().get("token");
    getAllUser(token).then((result) => {
      getAllArchives().then((archives)=>{
          if(archiveOpen==true){
            let users=[];
            archives.forEach(item=>{
              if(item.me===userInfo.email) users.push(item.them);
            })
            setUsers(users.filter((res) => (res !== userInfo.email)));
          }
          else{
            let archived=[]
            archives.forEach(item=>{
              if(item.me===userInfo.email) archived.push(item.them);
            })
            result = result.filter( function( el ) {
              return archived.indexOf( el ) < 0;
            } );
            setUsers(result.filter((res) => (res !== userInfo.email)));
          }
        });
    });
  }, [userInfo.email,archiveOpen]);

  const sendMessage = (e) => {
    e.preventDefault();
    const token = new Cookies().get("token");
    if (target && inputMessage.length>0) {
      socket.emit("sendMessage", {
        token,
        sender: userInfo._id,
        recipient: target,
        message: inputMessage,
      });
    }
    setInputMessage("");
  };

  useEffect(() => {
    var checkExist = setInterval(function () {
      if (document.querySelector("#messages")) {
        document.querySelector("#messages").scrollTop =
          document.querySelector("#messages").scrollHeight;
        clearInterval(checkExist);
      }
    }, 100);
  });


  return (
    <div className="app">
    <div className={`chatbox ${(navigationOpen) ? 'chatbox-navigation-open' : 'chatbox-navigation-closed'}`}>
      <Navigation/>
      <Archive archiveOpen={archiveOpen}/>
      <List onClick={onClickOnContact} contacts={users}/>
      <Details userInfo={userInfo} contact={selectedContact} archiveOpen={archiveOpen}/>
      <Chat messages={messages} userInfo={userInfo}/>
      <form className="message-section" onSubmit={sendMessage}>
        <input className="message-input" placeholder="Type a message" value={inputMessage} onChange={({ target: { value } }) => setInputMessage(value)}/>
        <button className='Sbutton'>
        <SendMessageIcon className="icon-clickable sendbutton" type='submit'/>
        </button>
      </form>
    </div>
    </div>
  );
}

export default Chatbox;
