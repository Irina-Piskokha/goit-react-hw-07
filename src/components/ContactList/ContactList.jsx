import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const filteredData = contacts.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={s.list}>
      {filteredData.map((item) => {
        return (
          <li key={item.id} className={s.item}>
            <Contact name={item.name} number={item.number} id={item.id} />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
