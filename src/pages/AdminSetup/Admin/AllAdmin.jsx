import { setPageName } from '../../../Store/Action/Auth/Auth_Action'
import CustomTable from '../../../components/CustomTable'
import { useDispatch } from 'react-redux'
import { Status } from '../../../common/CommonArray'
import { InputSwitch } from 'primereact/inputswitch'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import CustomDropdown from '../../../components/UI/CustomDropdown'
import useDebounce from '../../../Hooks/useDebounce'
import { useEffect, useState } from 'react'

const AllAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("")
    const [pagination, setPagination] = useState({ page: 1, limit: 10 })
    const AdminData = []
    // const AddPermission = useCheckPermissionByPage("Admins", "insert")
    const debouncedSearchText = useDebounce(searchText, 500);

    const handleStatusChange = async (id) => {
        const payload = { adminuserid: id }
        // const response = await dispatch(adminChangeStatus(payload))
        // if (response.IsSuccess) {
        //     toast.success(response.Message)
        //     GetAdminList()
        // }
    }

    const Columns = [
        { key: "name", label: "Name", renderCell: (key, row) => row?.name || "-" },
        { key: "mobile", label: "Mobile No.", renderCell: (key, row) => `${row?.country_code} ${row?.mobile}` },
        { key: "email", label: "Email", renderCell: (key, row) => row?.email },
        { key: "roleName", label: "RoleName", renderCell: (key, row) => row?.roleid?.name },
        { key: "status", label: "On/Off", renderCell: (key, row) => <InputSwitch checked={row?.status} onChange={() => handleStatusChange(row.id)} /> },
        { key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5"><span className="icon-edit font-bold text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => navigate(`./edit/${row.id}`)}></span></div> }
    ]


    const GetAdminList = async (page = 1, limit = 10) => {
        try {
            setPagination({ page, limit })
            const payload = {
                page,
                limit,
                search: debouncedSearchText || "",
                status: selectedStatus == 'true' ? true : selectedStatus == 'false' ? false : ""
            }

            // await dispatch(adminListWithPagination(payload))
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        dispatch(setPageName("Admin Setup"))
        GetAdminList()
    }, [selectedStatus, debouncedSearchText])

    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <div className="flex items-center justify-between">
                    <h6 className="text-20 font-semibold text-primary">All Admins</h6>
                    <Link to="./create" className='btn_primary w-auto '>
                        <span className='icon-add text-[20px] xl:text-[24px]'></span>
                        <span>Add New Admin</span>
                    </Link>
                </div>
                <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
                    <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
                        <div className="input w-full max-w-full flex items-center">
                            <span className='icon-search text-g7 block text-[18px] xl:text-[20px] cursor-pointer'></span>
                            <input type="text" placeholder='Search' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-full xs:w-1/2 md:w-1/3 2xl:w-[224px] p-1.5 lg:p-2 2xl:p-3">
                        <CustomDropdown
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e)}
                            options={Status}
                            placeholder="Select Status"
                            className="input"
                        />
                    </div>
                </div>
                <CustomTable columns={Columns} data={AdminData?.Data?.docs} isPagination={true} totalRecords={AdminData?.Data?.totalDocs} handlePageChange={GetAdminList} pagination={pagination} />
            </div>
        </>
    )
}

export default AllAdmin