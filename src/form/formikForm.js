import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ErrMessage from "./ErrMessage";
import Swal from "sweetalert2";

const initialValues = {
  name: "",
  lastName: "",
  password: "",
  email: "",
  phone: "",
};

// ===============================check validation===================================

const validationSchema = Yup.object({
  name: Yup.string("Enter Valid Name").required("Required!"),
  lastName: Yup.string("Enter Valid Last Name").required("Required!"),
  email: Yup.string().email("Enter Valid Email").required("Required!"),
  phone: Yup.string()
    .required("Required!")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(10, "To Short!")
    .max(10, "To Long!"),
  password: Yup.string().required("Required!").min(8, "Min 8 Charachter"),
});

// ===============================show/hide password===================================

const FormikForm = () => {
  const [passtype, setPasstype] = useState("password");
  const showpass = () => {
    if (passtype === "password") {
      setPasstype("text");
    } else {
      setPasstype("password");
    }
  };

  // =============================submit button handler================================

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm({ values: "" });
    Swal.fire("Good job!", "Sign Up Successfully!", "success");
  };
  // ====================================================================================
  return (
    <div className="formik-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form-container">
          <div className="form-input">
            <Field
              className="form-input-field"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage name="name" component={ErrMessage} />
          </div>
          <div className="form-input">
            <Field
              className="form-input-field"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
            />
            <ErrorMessage name="lastName" component={ErrMessage} />
          </div>
          <div className="form-input">
            <Field
              className="form-input-field"
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
            />
            <ErrorMessage name="email" component={ErrMessage} />
          </div>

          <div className="form-input">
            <Field
              className="form-input-field"
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
            />
            <ErrorMessage name="phone" component={ErrMessage} />
          </div>
          <div className="form-input">
            <div className="form-input-pass">
              <Field
                className="form-input-field-pass"
                type={passtype}
                id="password"
                name="password"
                placeholder="Password"
              />
              <span onClick={showpass}>show</span>
            </div>
            <ErrorMessage name="password" component={ErrMessage} />
          </div>
          <button onClick={onSubmit} className="form-btn" type="submit">
            submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikForm;
