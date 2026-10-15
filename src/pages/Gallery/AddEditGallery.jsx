import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import { IMAGE_VALIDATION } from '../../common/ErrorMessageCommon'
import { saveGallery } from '../../Store/Action/Gallery/Gallery_Action'
import { uploadImage } from '../../Store/Action/Uploads/Uploads_Action'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const AddEditGallery = ({ Data, onClose }) => {
    const dispatch = useDispatch()
    const initialValues = {
        gallery_id: Data?._id || "",
        image: Data?.image || "",
        caption: Data?.caption || "",
        type: "image",
    }

    const HandleValidation = Yup.object().shape({
        image: Yup.mixed().required(IMAGE_VALIDATION),
    })

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
                gallery_id: values.gallery_id,
                image: imageUrl,
                caption: values.caption,
                type: values.type,
                sortOrder: values.sortOrder
            }

            const response = await dispatch(saveGallery(finalValues))
            if (response?.IsSuccess) {
                toast.success(response.Message)
                onClose(true)
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while saving")
        }
        setSubmitting(false)
    }

    return (
        <div className="fixed inset-0 w-full h-screen bg-g1/30 backdrop-blur-sm z-50 flex overflow-y-auto" onClick={() => onClose(false)}>
            <div className="w-full h-fit py-12 px-5 flex">
                <div className="w-full max-w-[530px] bg-white p-5 lg:p-6 2xl:p-7 rounded-xl lg:rounded-2xl 2xl:rounded-3xl space-y-3.5 lg:space-y-5 2xl:space-y-7 m-auto relative" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-22 2xl:text-24 text-secondary font-bold mb-2.5 sm:mb-0">{Data?._id ? "Edit" : "Add"} Gallery</h2>
                        <span className='icon-close text-[20px] cursor-pointer text-g7 hover:text-red transition-all' onClick={() => onClose(false)}></span>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={HandleValidation} onSubmit={handleSubmit} enableReinitialize>
                        {({ values, setFieldValue, isSubmitting }) =>
                            <Form className='space-y-5'>
                                <div className="w-full relative">
                                    <label className="label">Image <span className='text-red '>*</span></label>
                                    <div className="input relative border border-dashed flex items-center justify-between">
                                        <div className="text-center flex items-center justify-center space-x-2 w-full h-[150px]">
                                            {values?.image ? (
                                                <img
                                                    src={values?.image instanceof File ? URL.createObjectURL(values?.image) : (import.meta.env.VITE_API_URL + values?.image)}
                                                    alt="preview"
                                                    className='w-full h-full object-contain'
                                                />
                                            ) : (
                                                <>
                                                    <span className='text-[20px] 2xl:text-[24px] font-medium text-g1 icon-export'></span>
                                                    <span className="text-12 md:text-14 2xl:text-16 text-g7">Upload Photo</span>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            name="image"
                                            accept="'image/jpg, image/png, image/webp, image/gif'"
                                            onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
                                        />
                                    </div>
                                    <ErrorMessage name="image" component="span" className="error -bottom-2" />
                                </div>

                                <div className="w-full relative">
                                    <label className="label">Caption</label>
                                    <Field type="text" name="caption" className="input" placeholder="Enter caption" />
                                    <ErrorMessage name="caption" component="span" className="error -bottom-2" />
                                </div>

                                <div className='flex items-center justify-center space-x-3 pt-4'>
                                    <button type='submit' className='btn_primary w-auto py-2' disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </Form>
                        }
                    </Formik>
                </div>
            </div>
        </div>

    )
}

export default AddEditGallery