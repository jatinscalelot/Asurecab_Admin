import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPageName } from '../../Store/Action/Auth/Auth_Action'
import CustomTable from '../../components/CustomTable'
import CommonDialog from '../../common/CommonDialog'
import CustomDropdown from '../../components/UI/CustomDropdown'
import { Status } from '../../common/CommonArray'
import { assets } from '../../assets/Images/assets'
import useDebounce from '../../Hooks/useDebounce'
import { deleteTaxiRoute, listTaxiRoutes } from '../../Store/Action/TaxiRoutes/TaxiRoutes_Action'
import { useListTaxiRoutes } from '../../Store/Selectors/TaxiRoutes/TaxiRoutes_Selectors'
import toast from 'react-hot-toast'
import moment from 'moment'

const AllTaxiRoutes = () => {
    const [searchText, setSearchText] = useState("")
    const [pagination, setPagination] = useState({ page: 1, limit: 10 })
    const [isExporting, setIsExporting] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState("")
    const [commonData, setCommonData] = useState({});
    const [DeletePopup, setDeletePopup] = useState({ isOpen: false, resData: {} })
    const [showAddEdit, setShowAddEdit] = useState({ isOpen: false, resData: {} });
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const debouncedSearchText = useDebounce(searchText, 500);
    const taxiRoutesData = useListTaxiRoutes()

    useEffect(() => {
        dispatch(setPageName("Routes"))
        GetTaxiRoutesData()
    }, [])

    const GetTaxiRoutesData = () => {
        dispatch(listTaxiRoutes({ search: debouncedSearchText }))
    }

    const handleExport = () => {
        setIsExporting(true)
        setTimeout(() => {
            setIsExporting(false)
        }, 1000)
    }

    const DeleteOpenDialog = (rowData) => {
        setCommonData({
            title: "Delete Taxi Route",
            description: "Are You Sure You Want To Delete This Taxi Route? ",
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
                const payload = { route_id: resData?._id || "" };
                const response = await dispatch(deleteTaxiRoute(payload));
                if (response?.IsSuccess) {
                    toast.success(response?.Message);
                    GetTaxiRoutesData();
                }
                setDeletePopup({
                    isOpen: false,
                    resData: {},
                });
            }
        } else {
            setDeletePopup({ isOpen: false, resData: {}, });
        }
    };

    const columns = [
        { key: "registerDate", label: "Date", renderCell: (key, row) => row?.createdAt ? moment.utc(row?.createdAt).format("DD-MM-YYYY") : "-" },
        // { key: "image", label: "Image", renderCell: (key, row) => <img src={import.meta.env.VITE_API_URL + row?.image} className="w-10 h-10 object-cover rounded-lg" alt="route" /> },
        { key: "title", label: "Route Title", renderCell: (key, row) => row?.title || "-" },
        {
            key: "prices",
            label: "Prices",
            renderCell: (key, row) => (
                <div className="flex flex-col space-y-1 text-sm">
                    {row?.carWisePrice?.map((car, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-3 min-w-[180px]"
                        >
                            <span className="font-medium capitalize text-g1">
                                {car?.name}
                            </span>

                            <span className="text-primary font-semibold">
                                {car?.price === "Available"
                                    ? "Available"
                                    : `₹${car?.price}`}
                            </span>
                        </div>
                    ))}
                </div>
            )
        },
        {
            key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5">
                <span className="icon-edit font-bold text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => navigate(`/taxi-routes/edit/${row._id}`, { state: { taxiRouteData: row } })}></span>
                <span className="icon-trash text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer" onClick={() => DeleteOpenDialog(row)}></span>
            </div>
        }
    ]

    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">

                <div className="flex items-center justify-between">
                    <h6 className="text-20 font-semibold text-primary">All Taxi Routes</h6>
                    <button onClick={() => navigate('/taxi-routes/create')} className='btn_primary w-auto '>
                        <span className='icon-add text-[20px] xl:text-[24px]'></span>
                        <span>Add Taxi Route</span>
                    </button>
                </div>
                <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
                    <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
                        <div className="input w-full max-w-full flex items-center">
                            <span className='icon-search text-g7 block text-[18px] xl:text-[20px] cursor-pointer'></span>
                            <input type="text" placeholder='Search by route...' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>
                </div>
                <CustomTable columns={columns} data={taxiRoutesData?.payload?.Data || []} isPagination={false} loading={taxiRoutesData?.loading} />

            </div>
            {showAddEdit.isOpen && <AddEditTaxiRoutes visible={showAddEdit.isOpen} editData={showAddEdit.resData} onClose={() => { setShowAddEdit({ isOpen: false, resData: {} }); GetTaxiRoutesData(); }} />}
            {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
        </>
    )
}

export default AllTaxiRoutes