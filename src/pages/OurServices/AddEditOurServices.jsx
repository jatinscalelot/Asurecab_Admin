import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { saveService, listServices } from '../../Store/Action/Services/Services_Action'
import { uploadImage } from '../../Store/Action/Uploads/Uploads_Action'
import { useListServices } from '../../Store/Selectors/Services/Services_Selectors'
import toast from 'react-hot-toast'
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from "yup";
import { IMAGE_VALIDATION, DESCRIPTION_VALIDATION, TITLE_VALIDATION } from '../../common/ErrorMessageCommon';
import Editor from 'quill/core/editor'

const AddEditOurServices = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { serviceData } = location.state || {}
  const fileInputRef = React.useRef(null)

  const initialValues = {
    service_id: serviceData?._id || "",
    image: serviceData?.image || "",
    title: serviceData?.title || "",
    description: serviceData?.desc || "",
  }

  const HandleValidation = Yup.object().shape({
    image: Yup.mixed().required(IMAGE_VALIDATION),
    title: Yup.string().required(TITLE_VALIDATION),
    description: Yup.string().required(DESCRIPTION_VALIDATION),
  })

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0]
    if (file) {
      setFieldValue("image", file)
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

      const finalValues = {
        service_id: values.service_id,
        title: values.title,
        desc: values.description,
        image: imageUrl,
        sortOrder: values.sortOrder
      }

      const response = await dispatch(saveService(finalValues))
      if (response?.IsSuccess) {
        toast.success(response.Message)
        navigate("../our-services")
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
        <Formik initialValues={initialValues} validationSchema={HandleValidation} onSubmit={handleSubmit}>
          {({ values, setFieldValue, isSubmitting }) =>
            <Form>
              <div className="flex items-center justify-between">
                <h6 className="text-20 font-semibold text-g1">{id ? "Edit" : "Add"} Service</h6>
                <div className='flex items-center space-x-3'>
                  <Link to="../our-services" className='btn_secondary w-auto '>Back</Link>
                  <button type='submit' className='btn_primary w-auto ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                </div>
              </div>

              <div className="flex flex-wrap items-start -mx-1.5 xl:-mx-2.5 2xl:-mx-3.5">
                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Title <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="title" placeholder="Enter Title" />
                  <ErrorMessage name="title" component="span" className="error" />
                </div>

                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Image <span className='text-red '>*</span></label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="'image/jpg, image/png, image/webp, image/gif'"
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
                              setFieldValue("image", "");
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
                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Description <span className='text-red '>*</span></label>
                  <Field as="textarea" name="description" className="input h-[155px] py-3" placeholder="Enter Description" />
                  <ErrorMessage name="description" component="span" className="error" />
                </div>
              </div>
            </Form>
          }
        </Formik>
      </div>
    </>
  )
}

export default AddEditOurServices