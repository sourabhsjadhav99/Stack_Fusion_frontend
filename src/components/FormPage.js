import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import RedError from "./RedError";
import axios from 'axios';
import "./formPage.css"
function FormPage() {
  const [formData, setFormData] = useState();
  let navigate = useNavigate()
  const NewValidations = Yup.object({
    name: Yup.string()
      .min(3, "minimum 3 characters")
      .max(30, "at most 30 characters")
      .required(),
    email: Yup.string().email().required(),
    DOB: Yup.date().required(),
    mobile: Yup.string()
      .matches(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Enter valid mobile number(10 characters)')
      .required()
  })
  return (
    <div id='main-container'>
      <Formik
        validationSchema={NewValidations}
        initialValues={{ name: "", email: "", DOB: "", mobile: "" }}
        onSubmit={(values) => {
          let birthYear = values.DOB.split("-")[0]
          let todaysDate = new Date()
          let todaysYear = todaysDate.getFullYear()
          if (todaysYear - birthYear >= 18) {
            axios.post('https://stack-fusion-backend-22w7.onrender.com/user', values)
              .then(function (response) {
                alert("User added")
                navigate("/DisplayPage")
              })
              .catch(function (error) {
                console.log(error);
              })
          } else {
            alert("age must not be less than 18 years")
          }




        }}
      >

        <Form id='form'>
          <h1>Stack Fusion</h1>
          <div className='input-field'>
            <div><label htmlFor="">Enter Name: </label></div>
            <Field type="text" name="name" />
            <RedError name="name" />
          </div>
          <div className='input-field'>
            <div><label htmlFor="">Enter Email: </label></div>
            <Field type="text" name="email" />
            <RedError name="email" />
          </div>
          <div className='input-field'>
            <div><label htmlFor="">Enter DOB: </label></div>
            <Field type="date" name="DOB" />
            <RedError name="DOB" />
          </div>
          <div className='input-field'>
            <div><label htmlFor="">Mobile: </label></div>
            <Field type="text" name="mobile" />
            <RedError name="mobile" />
          </div>
          <button type='submit'>Submit</button>
        </Form>
      </Formik>

    </div>
  )
}

export default FormPage