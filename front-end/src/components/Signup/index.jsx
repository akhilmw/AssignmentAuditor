import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleUserSignUp } from '../../api/userApi';
import { showSuccessMsg, showErrorMsg } from '../../util/tools';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const submitForm = (values) => {

    let authorites = []
    if (values.isReviewer) {
      authorites.push('ROLE_CODE_REVIEWER');
    } else {
      authorites.push('ROLE_STUDENT');
    }

    const data = {
      username : values.email,
      password : values.password,
      authorities : authorites
    }

    const response = handleUserSignUp(data);
    response.then((res) => {
      if(res.status === 200){
        showSuccessMsg("User Registered Successfully!!")
        setLoading(false);
        navigate("/login")
      }
    }).catch((err) => {
      showErrorMsg(`Error : ${err.response.data}`)
      setLoading(false)
    })
  };

  // formik validation schema
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      isReviewer: false,
      isStudent: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email Address').required('Email is Required'),
      password: Yup.string().required('Password is Required'),
      isReviewer: Yup.boolean(),
      isStudent: Yup.boolean().test(
        'isReviewer-or-isStudent',
        'Select either Code Reviewer or Student',
        function (value) {
          const { isReviewer, isStudent } = this.parent;
          return isReviewer !== isStudent;
        }
      ),
    }),
    onSubmit: values => {
      setLoading(true);
      submitForm(values);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-10 rounded shadow-md w-96 h-auto flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">
          Sign Up
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            {...formik.getFieldProps('email')}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...formik.getFieldProps('password')}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Role
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isReviewer"
              name="isReviewer"
              checked={formik.values.isReviewer}
              onChange={() => {
                formik.setFieldValue('isReviewer', !formik.values.isReviewer);
                if (formik.values.isStudent) {
                  formik.setFieldValue('isStudent', false);
                }
              }}
              className="mr-2"
            />
            <label htmlFor="isReviewer" className="mr-4">Code Reviewer</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="isStudent"
              name="isStudent"
              checked={formik.values.isStudent}
              onChange={() => {
                formik.setFieldValue('isStudent', !formik.values.isStudent);
                if (formik.values.isReviewer) {
                  formik.setFieldValue('isReviewer', false);
                }
              }}
              className="mr-2"
            />
            <label htmlFor="isStudent">Student</label>
          </div>
          {formik.touched.isReviewer && formik.errors.isReviewer ? (
            <div className="text-red-500 text-sm">{formik.errors.isReviewer}</div>
          ) : null}
          {formik.touched.isStudent && formik.errors.isStudent ? (
            <div className="text-red-500 text-sm">{formik.errors.isStudent}</div>
          ) : null}
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          Sign Up
        </button>
        {loading && <CircularProgress />}
      </form>
    </div>
  );
};

export default Signup;
