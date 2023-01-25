import "./Contact.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle"

//the contact element on the sidebar
export default function Contact({ contact }) {
  //opens chat of that particular contact
  function onClickOnContact(contact) {
    window.location = `/?to=${contact}`;
  }
  return (
    <div onClick={(e) => onClickOnContact(contact)} className="contact">
      <AccountCircleIcon className="icon-clickable profile-picture"/>
      <div className="details">
        <span className="name">{contact}</span>
      </div>
    </div>
  );
}
