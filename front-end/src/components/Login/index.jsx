import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../api/userApi';
import { useJwt } from '../UserProvider';
import { useNavigate } from 'react-router-dom';
import { showSuccessMsg, showErrorMsg } from '../../util/tools';

const Login = () => {
  const { setJwtToken } = useJwt();
  let navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);
        if (response.status === 200) {
          let authToken = response.headers['authorization'] || response.data.token;
          authToken = authToken.replace(/"/g, '');
          setJwtToken(authToken);
          showSuccessMsg("Logged in successfully!")
          setTimeout(() => {
            navigate("/dashboard");
          }, 300);
          // window.location.reload();
        } else {
          alert(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        showErrorMsg(`Error : Incorrect Username or Password`)
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <form onSubmit={formik.handleSubmit} className="bg-white p-10 rounded shadow-md w-96 h-96 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">Please Login!</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-semibold mb-2">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            {...formik.getFieldProps('username')}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
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
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
