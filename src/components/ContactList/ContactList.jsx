import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contactsOps";
import { selectLoading } from "../../redux/selectors";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = useSelector(selectFilteredContacts);

  const loading = useSelector(selectLoading);

  return (
    <div>
      {loading && <h2>Loading...</h2>}
      <ul className={s.list}>
        {filteredContacts.map((item) => {
          console.log(item);
          return (
            <li key={item.id} className={s.item}>
              <Contact name={item.name} number={item.number} id={item.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
