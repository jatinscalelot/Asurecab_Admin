import React, { useEffect, useState } from 'react'
import { EMAIL_REGEX, EMAIL_VALIDATION, INVALID_EMAIL_VALIDATION, INVALID_MOBILE_VALIDATION, MOBILE_REGEX, MOBILE_VALIDATION, NAME_VALIDATION } from '../../../common/ErrorMessageCommon'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import PhoneInput_ from 'react-phone-input-2'
const PhoneInput = PhoneInput_?.default || PhoneInput_
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../../Store/Action/Auth/Auth_Action'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { downloadImage, handleDeleteImage } from '../../../common/GlobalFunction'

import CustomDropdown from '../../../components/UI/CustomDropdown'

const AddEditAdmin = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [showPass, setShowPass] = useState(false);
  const roleList = []
  const admin = []
  const navigate = useNavigate()
  const adminData = id ? admin?.Data : ""
  // const EditPermission = useCheckPermissionByPage("Admins", "update")
  // const AddPermission = useCheckPermissionByPage("Admins", "insert")

  const initialValues = {
    profile: adminData?.profile || "",
    adminuserid: adminData?._id || "",
    roleid: adminData?.roleid?._id || "",
    name: adminData?.name || "",
    email: adminData?.email || "",
    country_code: adminData?.country_code || "",
    mobile: adminData?.mobile || "",
    country_wise_contact: adminData?.country_wise_contact || "",
    login_username: adminData?.login_username || "",
    login_password: adminData?.login_password || "",
  }

  const HandleValidation = Yup.object().shape({
    name: Yup.string().required(NAME_VALIDATION),
    email: Yup.string().matches(EMAIL_REGEX, INVALID_EMAIL_VALIDATION).required(EMAIL_VALIDATION),
    mobile: Yup.string().required(MOBILE_VALIDATION),
    login_username: Yup.string().required('Login Username Required'),
    login_password: Yup.string().required('Login Password Required'),
    roleid: Yup.string().required("Select Role Name")
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    try {
      const formData = new FormData();
      formData.append("adminuserid", values?.adminuserid || "");
      formData.append("roleid", values?.roleid);
      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("country_code", values?.country_code);
      formData.append("mobile", values?.mobile);
      formData.append("country_wise_contact", JSON.stringify(values?.country_wise_contact));
      formData.append("login_username", values?.login_username);
      formData.append("login_password", values?.login_password)

      formData.append("profile", values?.profile);

      // const response = await dispatch(adminSave(formData))
      // if (response.IsSuccess) {
      //   toast.success(response.Message)
      //   navigate("../admin")
      // }

    } catch (error) {
      console.log(error)
    }
    setSubmitting(false)
  }

  const GetRoleList = async () => {
    const payload = { search: "" }
    // await dispatch(roleListWithoutPagination(payload))
  }

  const GetAdminData = async () => {
    try {
      if (id) {
        const payload = { adminuserid: id || "" }
        // await dispatch(adminGetOne(payload))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    dispatch(setPageName("Admin Setup"))
    GetRoleList()
  }, [])
  useEffect(() => { GetAdminData() }, [])

  return (
    <>
      <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
        <Formik initialValues={initialValues} validationSchema={HandleValidation} onSubmit={handleSubmit}>
          {({ values, setFieldValue, isSubmitting }) =>
            <Form>
              <div className="flex items-center justify-between">
                <h6 className="text-20 font-semibold text-g1">{id ? "Edit" : "Add"} Admin</h6>
                <div className='flex items-center space-x-3'>
                  <Link to="../admin" className='btn_secondary w-auto '>Back</Link>
                  <button type='submit' className='btn_primary w-auto ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                </div>
              </div>

              <div className="flex flex-wrap items-start -mx-1.5 xl:-mx-2.5 2xl:-mx-3.5">
                <div className="w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Profile</label>
                  <div className="input relative border border-dashed flex items-center justify-between">
                    <div className="text-center flex items-center justify-center space-x-2 w-full">
                      <span className='text-[20px] 2xl:text-[24px] font-medium text-g1 icon-export'></span>
                      <span className="text-12 md:text-14 2xl:text-16 text-g7">Upload Photo</span>
                    </div>
                    <Field type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" name="profile" placeholder="Enter Name" />
                  </div>
                </div>
                <div className="w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Name <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="name" placeholder="Enter Name" />
                  <ErrorMessage name="name" component="span" className="error" />
                </div>
                <div className="w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Mobile <span className='text-red '>*</span></label>
                  <div className="input phone-input">
                    <PhoneInput name="mobile" value={values.country_code + values.mobile} onChange={(phone, countryData) => {
                      setFieldValue("mobile", phone.slice(countryData.dialCode.length));
                      setFieldValue("country_code", `+${countryData.dialCode}`);
                      setFieldValue("country_wise_contact", { ...countryData, localFormate: phone, withoutDialCode: phone.slice(countryData.dialCode.length), });
                    }} country={"in"} inputProps={{ name: "mobile", required: true, }} />
                  </div>                <ErrorMessage name="mobile" component="span" className="error" />
                </div>
                <div className="w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Email <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="email" placeholder="Enter Email" />
                  <ErrorMessage name="email" component="span" className="error" />
                </div>
                <div className="w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Role Name <span className='text-red '>*</span></label>
                  <CustomDropdown name="roleid" options={roleList} value={values.roleid} onChange={(e) => setFieldValue("roleid", e.value)} placeholder="Select Role Name" className='input' />
                  <ErrorMessage name="roleid" component="span" className="error" />
                </div>
                <div className="w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Login Username <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="login_username" placeholder="Enter Login Username" />
                  <ErrorMessage name="login_username" component="span" className="error" />
                </div>
                <div className="w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Login Password <span className='text-red '>*</span></label>
                  <div className="relative">
                    <Field type={showPass ? "text" : "password"} className="input" name="login_password" placeholder="Enter Login Password" />
                    <span className="icon-eye text-[20px] text-g7 absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer" onClick={() => setShowPass(!showPass)}></span>

                  </div>
                  <ErrorMessage name="login_password" component="span" className="error" />
                </div>
              </div>
            </Form>}
        </Formik>
      </div>
    </>
  )
}

export default AddEditAdmin