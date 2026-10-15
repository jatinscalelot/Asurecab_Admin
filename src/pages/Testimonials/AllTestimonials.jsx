import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setPageName } from '../../Store/Action/Auth/Auth_Action'
import CustomTable from '../../components/CustomTable'
import CommonDialog from '../../common/CommonDialog'
import { assets } from '../../assets/Images/assets'
import { listTestimonials, deleteTestimonial } from '../../Store/Action/Testimonials/Testimonials_Action'
import { useListTestimonials } from '../../Store/Selectors/Testimonials/Testimonials_Selectors'

const AllTestimonials = () => {
    const [searchText, setSearchText] = useState("")
    const [pagination, setPagination] = useState({ page: 1, limit: 10 })
    const [isExporting, setIsExporting] = useState(false)
    const [commonData, setCommonData] = useState({});
    const [DeletePopup, setDeletePopup] = useState({ isOpen: false, resData: {} })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { payload, loading } = useListTestimonials()

    useEffect(() => {
        dispatch(setPageName("Testimonials"))
        GetTestimonialsData()
    }, [])

    // const handleExport = () => {
    //     setIsExporting(true)
    //     setTimeout(() => {
    //         setIsExporting(false)
    //     }, 1000)
    // }

    const DeleteOpenDialog = (rowData) => {
        setCommonData({
            title: "Delete Testimonial",
            description: "Are You Sure You Want To Delete This Testimonial? ",
            buttonNames: { firstBtn: "Cancel", secondBtn: "Delete" },
        });
        setDeletePopup({
            isOpen: true,
            resData: rowData,
        });
    };

    const deleteCloseDialog = async (closeEvent) => {
        if (closeEvent) {
            if (DeletePopup?.resData) {
                let resData = DeletePopup?.resData;
                const payload = { testimonial_id: resData?._id || "" };
                const response = await dispatch(deleteTestimonial(payload));
                if (response?.IsSuccess) {
                    toast.success(response?.Message);
                    GetTestimonialsData();
                }
                setDeletePopup({
                    isOpen: false,
                    resData: {},
                });
            }
        } else {
            setDeletePopup({ isOpen: false, Data: {}, });
        }
    };

    const GetTestimonialsData = () => {
        dispatch(listTestimonials())
    }

    const columns = [
        { key: "name", label: "Name", renderCell: (key, row) => row?.name || "-" },
        { key: "title", label: "Title", renderCell: (key, row) => row?.title || "-" },
        {
            key: "quote",
            label: "Quote",
            renderCell: (key, row) => (
                <div className="text-sm max-w-xs truncate">
                    {row?.quote || "-"}
                </div>
            )
        },
        {
            key: "image",
            label: "Image",
            renderCell: (key, row) => (
                row?.image ? (
                    <img src={import.meta.env.VITE_API_URL + row.image} alt={row.name} className="w-12 h-12 object-cover rounded-lg" />
                ) : "-"
            )
        },
        {
            key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5">
                <span className="icon-edit font-bold text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => navigate(`/testimonials/edit/${row._id}`, { state: { testimonial: row } })}></span>
                <span className="icon-trash text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer" onClick={() => DeleteOpenDialog(row)}></span>
            </div>
        }
    ]

    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">

                <div className="flex items-center justify-between">
                    <h6 className="text-20 font-semibold text-primary">All Testimonials</h6>
                    <button onClick={() => navigate('/testimonials/create')} className='btn_primary w-auto '>
                        <span className='icon-add text-[20px] xl:text-[24px]'></span>
                        <span>Add Testimonial</span>
                    </button>
                </div>
                <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
                    <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
                        <div className="input w-full max-w-full flex items-center">
                            <span className='icon-search text-g7 block text-[18px] xl:text-[20px] cursor-pointer'></span>
                            <input type="text" placeholder='Search by name...' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>
                    {/* <div className="w-1/2 xs:w-auto p-1.5 lg:p-2 2xl:p-3 xl:ml-auto">
                        <button className="excel_btn flex items-center justify-center md:justify-normal space-x-1" onClick={handleExport} disabled={isExporting}>
                            <img src={assets.excel_icon} className='w-[18px] lg:w-[20px] xl:w-[24px] h-[18px] lg:h-[20px] xl:h-[24px]' alt="excel" />
                            <span>{isExporting ? "Exporting..." : "Export"}</span>
                        </button>
                    </div> */}
                </div>
                <CustomTable columns={columns} data={payload?.Data || []} isPagination={false} loading={loading} />

            </div>
            {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
        </>
    )
}

export default AllTestimonials