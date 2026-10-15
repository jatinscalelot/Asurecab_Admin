import { ErrorMessage, Field, Form, Formik, FieldArray } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as Yup from "yup"
import { NAME_VALIDATION } from '../../common/ErrorMessageCommon'
import { saveTaxiRoute, listTaxiRoutes } from '../../Store/Action/TaxiRoutes/TaxiRoutes_Action'
import { uploadImage } from '../../Store/Action/Uploads/Uploads_Action'
import { useListTaxiRoutes } from '../../Store/Selectors/TaxiRoutes/TaxiRoutes_Selectors'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const AddEditTaxiRoutes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const fileInputRef = React.useRef(null)
  const location = useLocation()
  const { taxiRouteData } = location.state || {}
  const initialValues = {
    route_id: taxiRouteData?._id || "",
    title: taxiRouteData?.title || "",
    image: taxiRouteData?.image || "",
    carWisePrice:
      taxiRouteData?.carWisePrice?.length > 0
        ? taxiRouteData?.carWisePrice
        : [
          {
            name: "",
            price: "",
          },
        ],
  };


  useEffect(() => {
    if (id) {
      dispatch(listTaxiRoutes())
    }
  }, [id])

  const HandleValidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    // image: Yup.string().required("Image is required"),
    carWisePrice: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Car name is required"),
        price: Yup.string().required("Price is required"),
      })
    ),
  })

  // const handleImageUpload = (e, setFieldValue) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     setFieldValue("image", file)
  //   }
  // }

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
      const response = await dispatch(saveTaxiRoute(finalValues))
      if (response?.IsSuccess) {
        toast.success(response.Message)
        navigate("../taxi-routes")
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
                <h6 className="text-20 font-semibold text-g1">{id ? "Edit" : "Add"} Taxi Route</h6>
                <div className='flex items-center space-x-3'>
                  <Link to="../taxi-routes" className='btn_secondary w-auto '>Back</Link>
                  <button type='submit' className='btn_primary w-auto ' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
                </div>
              </div>

              <div className="flex flex-wrap items-start -mx-1.5 xl:-mx-2.5 2xl:-mx-3.5">
                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
                  <label className="label">Route Title <span className='text-red '>*</span></label>
                  <Field type="text" className="input" name="title" placeholder="Enter Route Title (e.g. Ahmedabad to Vadodara)" />
                  <ErrorMessage name="title" component="span" className="error" />
                </div>

                {/* <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5 relative">
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
                </div> */}

                {/* Car Wise Price */}
                <div className="w-full p-1.5 xl:p-2.5 2xl:p-3.5">
                  <div className="flex items-center justify-between mb-4">
                    <label className="label mb-0">
                      Car Wise Price
                    </label>

                    <button
                      type="button"
                      className="btn_primary w-auto"
                      onClick={() =>
                        setFieldValue("carWisePrice", [
                          ...values.carWisePrice,
                          {
                            name: "",
                            price: "",
                          },
                        ])
                      }
                    >
                      Add More
                    </button>
                  </div>

                  <FieldArray name="carWisePrice">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.carWisePrice?.map((item, index) => (
                          <div
                            key={index}
                            className="border border-l2 rounded-xl p-4"
                          >
                            <div className="flex flex-wrap items-end -mx-2">
                              {/* Car Name */}
                              <div className="w-full md:w-5/12 px-2">
                                <label className="label">
                                  Car Name
                                </label>

                                <Field
                                  type="text"
                                  name={`carWisePrice.${index}.name`}
                                  className="input"
                                  placeholder="Enter Car Name"
                                />

                                <ErrorMessage
                                  name={`carWisePrice.${index}.name`}
                                  component="span"
                                  className="error"
                                />
                              </div>

                              {/* Price */}
                              <div className="w-full md:w-5/12 px-2">
                                <label className="label">
                                  Price / Available
                                </label>

                                <Field
                                  type="text"
                                  name={`carWisePrice.${index}.price`}
                                  className="input"
                                  placeholder="Enter Price or Available"
                                />

                                <ErrorMessage
                                  name={`carWisePrice.${index}.price`}
                                  component="span"
                                  className="error"
                                />
                              </div>

                              {/* Remove Button */}
                              <div className="w-full md:w-2/12 px-2">
                                <button
                                  type="button"
                                  className="btn_secondary w-full"
                                  onClick={() => remove(index)}
                                  disabled={
                                    values.carWisePrice.length === 1
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>

              </div>
            </Form>
          }
        </Formik>
      </div>
    </>
  )
}

export default AddEditTaxiRoutes