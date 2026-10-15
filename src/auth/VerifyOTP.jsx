// import React, { useMemo, useRef, useState } from 'react'
// import { Formik, Form, Field } from 'formik'
// import { assets } from '../assets/Images/assets'
// import { useVerifyEmail } from '../Store/Selectors/Auth/Auth_Selectors';
// import { useDispatch } from 'react-redux';
// import { useTimer } from 'react-timer-hook';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import toast from 'react-hot-toast';
// import { forgetPassword, verifyOtp } from '../Store/Action/Auth/Auth_Action';


// const VerifyOTP = () => {
//   const OTP_LENGTH = 6;
//   const [disableSendButton, setDisableSendButton] = useState(false);
//   const verifyEmail = useVerifyEmail()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const otpRefs = useRef([...Array(OTP_LENGTH)].map(() => React.createRef()));
//   const expiryTimestamp = useMemo(() => {
//     const time = new Date();
//     time.setSeconds(time.getSeconds() + 60);
//     return time;
//   }, []);

//   const { seconds, minutes, restart } = useTimer({
//     expiryTimestamp,
//     onExpire: () => {
//       setDisableSendButton(true);
//     },
//   });

//   const startNewTimer = () => {
//     const newExpiryTimestamp = new Date();
//     newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + 60);
//     restart(newExpiryTimestamp);
//     setDisableSendButton(false);
//   };

//   const handleSendAgain = async () => {
//     try {
//       if (disableSendButton) {
//         // const response = await dispatch(forgetPassword({ email: verifyEmail }))
//         // if (response?.IsSuccess) {
//         //   toast.success(response?.Message);
//         startNewTimer();
//         // }
//       }
//     } catch (error) {
//       console.log("error in handleSendAgain :>> ", error);
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && index > 0 && !e.target.value) {
//       otpRefs.current[index - 1].current.focus();
//     }
//   };
//   const handlePaste = (e, setFieldValue) => {
//     const paste = e.clipboardData.getData("text");

//     if (!/^[0-9]+$/.test(paste)) return;

//     const digits = paste.split("").slice(0, OTP_LENGTH);

//     digits.forEach((digit, index) => {
//       setFieldValue(`otp[${index}]`, digit);
//     });

//     // focus last filled field
//     const lastIndex = digits.length - 1;
//     otpRefs.current[lastIndex]?.current?.focus();

//     e.preventDefault();
//   };
//   const handleChange = (e, index, setFieldValue) => {
//     const value = e.target.value;
//     if (/^[0-9]?$/.test(value)) {
//       setFieldValue(`otp[${index}]`, value);
//       if (value && index < OTP_LENGTH - 1) {
//         otpRefs.current[index + 1].current.focus();
//       }
//     }
//   };

//   const handleValidationSchema = Yup.object().shape({
//     otp: Yup.array().required("OTP is required").test("all-digits", "OTP must be 6 digits", (value) => { return Array.isArray(value) && value.every((v) => /^[0-9]$/.test(v)); })
//   })

//   const handleSubmit = async (values) => {
//     try {
//       const otpString = values.otp.join("");
//       const payload = { email: verifyEmail, otp: otpString };
//       // const response = await dispatch(verifyOtp({ ...payload }));
//       // if (response?.IsSuccess) {
//       //   toast.success(response?.Message);
//       navigate("/create-your-password");
//       // }
//     } catch (error) {
//       console.log("error :>> ", error);
//     }
//   }
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

//         <Formik initialValues={{ otp: Array(OTP_LENGTH).fill("") }} validationSchema={handleValidationSchema} onSubmit={handleSubmit}>
//           {({ setFieldValue, values, errors }) => (
//             <Form>
//               <div className="w-full max-w-[360px] md:max-w-96 xl:max-w-[530px] bg-white rounded-xl lg:rounded-2xl 2xl:rounded-[20px] p-3.5 md:p-5 lg:p-7 my-auto">
//                 <div className="space-y-2.5 lg:space-y-3 2xl:space-y-5 my-3 lg:my-5 2xl:my-7">
//                   <div>
//                     <label className="label">Enter OTP <span className="text-[#FE5969]">*</span></label>
//                     <div className="flex items-center space-x-4">
//                       {values.otp.map((_, index) => (
//                         <Field name={`otp[${index}]`} key={index}>
//                           {({ field }) => (
//                             <input {...field} type="text" maxLength="1" className="input text-center" placeholder="0" ref={otpRefs.current[index]} onKeyDown={(e) => handleKeyDown(e, index)} onChange={(e) => handleChange(e, index, setFieldValue)} onPaste={(e) => handlePaste(e, setFieldValue)}
//                             />
//                           )}
//                         </Field>
//                       ))}
//                     </div>

//                     {/* Global error */}
//                     {typeof errors.otp === 'string' && (<div className="text-red text-xs mt-2">{errors.otp}</div>)}
//                     <div className="flex items-center justify-between mt-2.5 xl:mt-4">
//                       <span className="text-12 font-semibold text-primary">{minutes}:{seconds.toString().padStart(2, "0")}</span>
//                       <span className={`font-extrabold text-12 xl:text-14 ${disableSendButton ? "text-primary cursor-pointer" : "text-gray-600 cursor-not-allowed"} `} onClick={() => { handleSendAgain(); }}>Send Again</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <button type='submit' className="btn_primary w-full hover:border-primary">Verify</button>
//                 </div>
//                 <div onClick={() => navigate("/")} className="flex justify-center items-center cursor-pointer mt-3 lg:mt-5 2xl:mt-7">
//                   <span className="font-extrabold text-12 xl:text-14 text-primary ">Back to Login</span>
//                 </div>
//               </div>
//             </Form>)}</Formik>
//       </div>
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <img src={assets.bg} className="w-full h-full object-cover scale-105" alt="login_bg" />
//         <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80 z-[1]"></div>
//       </div>
//     </div>
//   )
// }

// export default VerifyOTP