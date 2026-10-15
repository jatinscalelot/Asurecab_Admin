import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { saveTestimonial, listTestimonials } from '../../Store/Action/Testimonials/Testimonials_Action'
import { uploadImage } from '../../Store/Action/Uploads/Uploads_Action'
import { useSaveTestimonial, useListTestimonials } from '../../Store/Selectors/Testimonials/Testimonials_Selectors'
import toast from 'react-hot-toast'

const AddEditTestimonials = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { testimonial } = location.state || {}
  console.log('testimonial', testimonial)
  const fileInputRef = React.useRef(null)
  const { id } = useParams()
  const [initialValues, setInitialValues] = useState({
    testimonial_id: testimonial?._id || "",
    name: testimonial?.name || "",
    title: testimonial?.title || "",
    quote: testimonial?.quote || "",
    image: testimonial?.image || ""
  })
  const HandleValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    title: Yup.string().required("Title is required"),
    quote: Yup.string().required("Quote is required"),
    image: Yup.string().required("Image is required")
  })

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0]
    if (file) {
      setFieldValue("image", file)
    }
  }

  const handleDeleteImage = (setFieldValue) => {
    setFieldValue("image", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    try {
      let imageUrl = values.image

      // If image is a File object, upload it first
      if (values.image instanceof File) {
        const formData = new FormData()
        formData.append("image", values.image)
        const uploadResponse = await dispatch(uploadImage(formData))
        if (uploadResponse?.IsSuccess) {
          imageUrl = uploadResponse.Data.imageUrl || uploadResponse.Data.image || uploadResponse.Data
        } else {
          toast.error("Image upload failed")
          setSubmitting(false)
          return
        }
      }

      const finalValues = { ...values, image: imageUrl }
      const response = await dispatch(saveTestimonial(finalValues))
      if (response?.IsSuccess) {
        navigate("../testimonials")
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred while saving")
    }
    setSubmitting(false)
  }

  return (
    <>
      <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
        <Formik initialValues={initialValues} validationSchema={HandleValidation} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ values, setFieldValue, isSubmitting }) =>
            <Form>
              <div className="flex items-center justify-between">
                <h6 className="text-20 font-semibold text-g1">{id ? "Edit" : "Add"} Testimonial</h6>
                <div className='flex items-center space-x-3'>
                  <Link to="../testimonials" className='btn_secondary w-auto '>Back</Link>
                  <button type='submit' className='btn_primary w-auto ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                </div>
              </div>

              <div className="flex flex-wrap items-start -mx-1.5 xl:-mx-2.5 2xl:-mx-3.5">
                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Name <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="name" placeholder="Enter Customer Name" />
                  <ErrorMessage name="name" component="span" className="error" />
                </div>

                <div className="w-full md:w-1/2 p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Title <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="title" placeholder="Enter Customer Title (e.g., Customer, Business Owner)" />
                  <ErrorMessage name="title" component="span" className="error" />
                </div>

                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Quote <span className='text-red '>*</span></label>
                  <Field as="textarea" className="input h-32 resize-none" name="quote" placeholder="Enter Customer Quote/Review" />
                  <ErrorMessage name="quote" component="span" className="error" />
                </div>

                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Image <span className='text-red '>*</span></label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, .png, .jpg, .jpeg, .webp, .gif"
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />
                  <div
                    className="input relative border border-dashed flex items-center justify-between cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {!values.image ? (
                      <div className="text-center flex items-center justify-center space-x-2 w-full">
                        <span className="text-[20px] 2xl:text-[24px] font-medium text-g1 icon-export"></span>
                        <span className="text-12 md:text-14 2xl:text-16 text-g7">Upload Photo</span>
                      </div>
                    ) : (
                      <>
                        <span className='text-12 md:text-14 2xl:text-16 text-g1 truncate text-ellipsis overflow-hidden'>
                          {values.image instanceof File ? values.image.name : values.image.split("/").pop()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span
                            className="icon-eye text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              const url = values.image instanceof File ? URL.createObjectURL(values.image) : import.meta.env.VITE_API_URL + values.image;
                              window.open(url, '_blank');
                            }}
                          ></span>
                          <span
                            className="icon-trash text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(setFieldValue);
                            }}
                          ></span>
                        </div>
                      </>
                    )}
                  </div>
                  <ErrorMessage name="image" component="span" className="error" />

                  {values.image && (
                    <div className="mt-4">
                      <p className="text-12 text-g7 mb-2">Preview:</p>
                      <img
                        src={values.image instanceof File ? URL.createObjectURL(values.image) : import.meta.env.VITE_API_URL + values.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-l2 shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Form>
          }
        </Formik>
      </div>
    </>
  )
}

export default AddEditTestimonials