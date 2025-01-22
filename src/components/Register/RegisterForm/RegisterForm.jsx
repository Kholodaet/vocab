import React, { useState } from "react";
import {
  Desc,
  Form,
  InputBox,
  InputWithIcon,
  LoginLink,
  SubmitBtn,
  Title,
  Wrapper,
} from "./RegisterForm.styled";
import sprite from "../../../images/sprite.svg";
import { NavLink, Navigate } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import { registerSchema } from "../../../schemas/yupSchemas";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk } from "../../../redux/auth/operations";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/dictionary" />;
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (values) => {
    dispatch(signUpThunk(values));
  };
  return (
    <>
      <Wrapper>
        <Title>Register</Title>
        <Desc>
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </Desc>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <InputBox>
                <Field
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
                <ErrorMessage name="name" component="div" className="error" />
                <Field
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <ErrorMessage name="email" component="div" className="error" />
                <InputWithIcon>
                  <Field
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                  <svg onClick={handleTogglePasswordVisibility}>
                    {showPassword ? (
                      <use href={`${sprite}#eye`} />
                    ) : (
                      <use href={`${sprite}#eye-off`} />
                    )}
                  </svg>
                </InputWithIcon>
              </InputBox>
              <SubmitBtn type="submit" disabled={isSubmitting}>
                Register
              </SubmitBtn>
            </Form>
          )}
        </Formik>
        <LoginLink>
          <NavLink to="/login">Login</NavLink>
        </LoginLink>
      </Wrapper>
    </>
  );
};

export default RegisterForm;
