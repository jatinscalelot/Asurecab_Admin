// import React from 'react'
// import { assets } from '../assets/Images/assets'
// import { ErrorMessage, Field, Form, Formik } from 'formik'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { useVerifyEmail } from '../Store/Selectors/Auth/Auth_Selectors'
// import * as Yup from "yup";
// import { useState } from 'react';
// import { setPassword } from '../Store/Action/Auth/Auth_Action'
// import toast from 'react-hot-toast'

// const CreateYourPassword = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const verifyEmail = useVerifyEmail();
//   const [showPass, setShowPass] = useState(false);
//   const [cShowPass, setCShowPass] = useState(false);
//   const initialValues = {
//     password: "",
//     confirmPassword: "",
//   }
//   const handleValidation = Yup.object().shape({
//     password: Yup.string().required("Password is Required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Password not match!")
//       .required("Confirm Password is Required"),
//   });
//   const handleSubmit = async (values) => {
//     try {
//       const payload = { email: verifyEmail, password: values?.password };
//       // const response = await dispatch(setPassword(payload));
//       // if (response?.IsSuccess) {
//       toast.success("Password created successfully");
//       navigate("/");
//       // }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
//   return (
//     <div className="w-full min-h-screen flex relative py-6 lg:py-8 2xl:py-10 px-5 2xl:px-6 font-Lexend">
//       <div className="w-full max-w-[1140px] m-auto h-full flex flex-col items-center justify-center relative z-10">

//         {/* Logo and Header Section */}
//         <div className="flex flex-col items-center mb-10 text-center animate-fade-in">
//           <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-[30px] p-2 shadow-2xl mb-6 border border-white/10 group transition-transform duration-500 hover:scale-105">
//             <img src={assets.logo} alt="Asure Cabs Logo" className="w-full h-full object-contain" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-Prata text-white leading-tight">
//             Easy <span className="text-black italic">Way</span> Cab
//           </h1>
//           <p className="text-white/50 text-sm md:text-base mt-2 tracking-[0.2em] font-light uppercase">
//             Administration Portal
//           </p>
//         </div>

//         <Formik initialValues={initialValues} validationSchema={handleValidation} onSubmit={handleSubmit}>
//           {({ isSubmitting }) =>
//             <Form className="w-full max-w-96 xl:max-w-[530px] bg-white rounded-xl lg:rounded-2xl 2xl:rounded-[20px] p-6 md:p-8 lg:p-10 2xl:p-12 my-auto">
//               <h4 className="text24 text-g1 font-semibold text-center">Create Your Password</h4>
//               <div className="space-y-2.5 lg:space-y-3 2xl:space-y-5 my-3 lg:my-5 2xl:my-7">
//                 <div className='relative'>
//                   <label className="label">Password <span className="text-[#FE5969]">*</span></label>
//                   <div className="relative">
//                     <Field type={showPass ? 'text' : 'password'} name="password" className="input" placeholder="Enter New Password" />
//                     <span className="icon-eye text-[20px] text-g7 absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer" onClick={() => setShowPass(!showPass)}></span>
//                   </div>
//                   <ErrorMessage name='password' component='span' className='text-red error -bottom-2.5'></ErrorMessage>
//                 </div>
//                 <div className='relative'>
//                   <label className="label">Confirm Password <span className="text-[#FE5969]">*</span></label>
//                   <div className="relative">
//                     <Field type={cShowPass ? 'text' : 'password'} name="confirmPassword" className="input" placeholder="Enter Confirm Password" />
//                     <span className="icon-eye text-[20px] text-g7 absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer" onClick={() => setCShowPass(!cShowPass)}></span>
//                   </div>
//                   <ErrorMessage name='confirmPassword' component='span' className='text-red error -bottom-2.5'></ErrorMessage>
//                 </div>
//               </div>
//               <div><button type='submit' className={`btn_primary w-full hover:border-primary`}>Save</button></div>
//               <div onClick={() => navigate("/")} className="flex justify-center items-center cursor-pointer mt-3 lg:mt-5 2xl:mt-7">
//                 <span className="font-extrabold text-12 xl:text-14 text-primary">Back to Login</span>
//               </div>
//             </Form>
//           }
//         </Formik>
//       </div>
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <img src={assets.bg} className="w-full h-full object-cover scale-105" alt="login_bg" />
//         <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80 z-[1]"></div>
//       </div>
//     </div>
//   )
// }

// export default CreateYourPassword