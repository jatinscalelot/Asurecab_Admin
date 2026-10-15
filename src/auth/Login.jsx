import React, { useEffect, useState } from 'react';
import { assets } from '../assets/Images/assets';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, } from '../common/ErrorMessageCommon';
import { useNavigate } from 'react-router-dom';
import { login } from '../Store/Action/Auth/Auth_Action';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: ''
  };

  const handleValidation = Yup.object({
    email: Yup.string().required(EMAIL_VALIDATION),
    password: Yup.string().required(PASSWORD_VALIDATION)
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const response = await dispatch(login(values));
      if (response?.IsSuccess) {
        toast.success(response.Message);
        localStorage.setItem("accessToken", response.Data.token);
        navigate("/dashboard");
        setSubmitting(false);
      }
    } catch (error) {
      console.log("error", error);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex relative py-6 px-5 font-Lexend overflow-y-auto">
      <div className="w-full max-w-[500px] m-auto flex flex-col items-center justify-center relative z-10 py-4">

        {/* Logo and Header Section */}
        <div className="flex flex-col items-center mb-6 text-center animate-fade-in">
          <div className="w-20 h-20 p-2 mb-3 bg-white/95 shadow-xl transition-transform duration-500 hover:scale-105 rounded-2xl overflow-hidden flex items-center justify-center">
            <img src={assets.fav_icon} alt="Asure Cabs Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl md:text-4xl font-Prata text-white leading-tight">
            <span className="text-primary italic">Asure</span> Cabs
          </h1>
          <p className="text-white/70 text-xs md:text-sm mt-1 tracking-[0.2em] font-light uppercase">
            Administration Portal
          </p>
        </div>

        <Formik initialValues={initialValues} validationSchema={handleValidation} onSubmit={handleSubmit}>
          <Form className="w-full bg-white rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <h4 className="text-2xl text-g1 font-semibold text-center mb-6">Admin Login</h4>
            <div className="space-y-6 mb-8 text-left">
              <div className='relative'>
                <label className="label">Email <span className="text-[#FE5969]">*</span></label>
                <Field type="text" name="email" className="input" placeholder="Enter Email" />
                <ErrorMessage name='email' component='span' className='text-red error -bottom-2.5'></ErrorMessage>
              </div>
              <div className='relative'>
                <label className="label">Password <span className="text-[#FE5969]">*</span></label>
                <div className="relative">
                  <Field type={showPassword ? "text" : "password"} name="password" className="input" placeholder="Enter Password" />
                  <span className="icon-eye text-[20px] text-g7 absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}></span>
                </div>
                <ErrorMessage name='password' component='span' className='text-red error -bottom-2.5'></ErrorMessage>
              </div>
              {/* <div className="flex items-center justify-between">
                <div onClick={() => navigate('/forget-password')} className="text-center cursor-pointer">
                  <span className="font-extrabold text-12 xl:text-14 text-primary">Forgot password?</span>
                </div>
              </div> */}
            </div>
            <div><button type='submit' className="btn_primary w-full hover:border-primary">Login</button></div>
          </Form>
        </Formik>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={assets.bg} className="w-full h-full object-cover scale-105" alt="login_bg" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80 z-[1]"></div>
      </div>
    </div>
  );
};

export default Login;