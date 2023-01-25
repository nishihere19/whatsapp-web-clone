import "./List.css";
import Contact from "../contact/Contact";

//This generates the list of people and renders them in sidebar
export default function List({ contacts, onClick }) {
  return (
    <div className="list-section">
      {contacts.map((c) => {
        return <Contact onClick={onClick} key={contacts.indexOf(c)} contact={c} />;
      })}
    </div>
  );
}
