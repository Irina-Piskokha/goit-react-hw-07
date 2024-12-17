import s from "./ContactForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "@reduxjs/toolkit";

const ContactForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, options) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
    options.resetForm();
  };

  const initialValues = {
    name: "",
    number: "",
  };

  const nameFieldId = useId();
  const numberUseId = useId();

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required!"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required!"),
  });

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={FeedbackSchema}
    >
      <Form className={s.form}>
        <label className={s.label} htmlFor={nameFieldId}>
          Name
        </label>
        <Field
          type="text"
          name="name"
          id={nameFieldId}
          className={s.input}
          placeholder="...enter name"
        />
        <ErrorMessage name="name" component="span" className={s.validator} />

        <label className={s.label} htmlFor={numberUseId}>
          Number
        </label>
        <Field
          type="text"
          name="number"
          id={numberUseId}
          className={s.input}
          placeholder="...enter number"
        />
        <ErrorMessage
          name="number"
          component="span"
          className={s.validatorNumber}
        />

        <button className={s.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
