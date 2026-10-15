import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import { saveYouTubeVideo } from '../../Store/Action/YouTubeVideos/YouTubeVideos_Action'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const AddEditVideos = ({ onClose, Data }) => {
    const dispatch = useDispatch()
    const initialValues = {
        video_id: Data?._id || "",
        video_link: Data?.video_link || "",
        title: Data?.title || "",
    }

    const HandleValidation = Yup.object().shape({
        // title: Yup.string().required("Video title is required"),
        video_link: Yup.string().url("Invalid URL").required("Video link is required"),
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
            const response = await dispatch(saveYouTubeVideo(values))
            if (response?.IsSuccess) {
                toast.success(response.Message);
                onClose(true)
            }
        } catch (error) {
            console.log(error)
        }
        setSubmitting(false)
    }

    return (
        <div className="fixed inset-0 w-full h-screen bg-g1/30 backdrop-blur-sm z-50 " onClick={() => onClose(false)}>
            <div className="w-full h-full py-12 px-5 overflow-y-auto flex">
                <div className="w-full max-w-[530px] bg-white p-5 lg:p-6 2xl:p-7 rounded-xl lg:rounded-2xl 2xl:rounded-3xl space-y-3.5 lg:space-y-5 2xl:space-y-7 m-auto relative" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-22 2xl:text-24 text-secondary font-bold mb-2.5 sm:mb-0">{Data?._id ? "Edit" : "Add"} Video</h2>
                        <span className='icon-close text-[20px] cursor-pointer text-g7 hover:text-red transition-all' onClick={() => onClose(false)}></span>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={HandleValidation} onSubmit={handleSubmit} enableReinitialize>
                        {({ isSubmitting }) =>
                            <Form className='space-y-5'>
                                <div className="w-full relative">
                                    <label className="label">Video Title</label>
                                    <Field type="text" name="title" className="input" placeholder="Enter Video Title" />
                                </div>
                                <div className="w-full relative">
                                    <label className="label">Video Link <span className='text-red '>*</span></label>
                                    <Field type="text" name="video_link" className="input" placeholder="Enter Youtube Video Link" />
                                    <ErrorMessage name="video_link" component="span" className="error -bottom-2" />
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

export default AddEditVideos
