import { setPageName } from '../../../Store/Action/Auth/Auth_Action'
import CustomTable from '../../../components/CustomTable'
import { useDispatch } from 'react-redux'
import CommonDialog from '../../../common/CommonDialog'
import toast from 'react-hot-toast'
import { Status } from '../../../common/CommonArray'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import CustomDropdown from '../../../components/UI/CustomDropdown'
import useDebounce from '../../../Hooks/useDebounce'
import { useEffect, useState } from 'react'
import { InputSwitch } from 'primereact/inputswitch'

const RolePermission = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("")
    const [commonData, setCommonData] = useState({});
    const [DeletePopup, setDeletePopup] = useState({ isOpen: false, Data: {}, });
    const [pagination, setPagination] = useState({ page: 1, limit: 10 })
    const roleData = []
    // const AddPermission = useCheckPermissionByPage("Role & Permissions", "insert")
    // const DeletePermission = useCheckPermissionByPage("Role & Permissions", "delete")
    const debouncedSearchText = useDebounce(searchText, 500);

    const handleStatusChange = async (id) => {
        const payload = { rolesid: id }
        // const response = await dispatch(roleChangeStatus(payload))
        // if (response.IsSuccess) {
        //     toast.success(response.Message)
        //     GetRolePermission()
        // }
    }

    const Columns = [
        { key: "roleName", label: "RoleName", renderCell: (key, row) => row?.name },
        { key: "createdAt", label: "Created Date", renderCell: (key, row) => row?.createdAt ? moment(row?.createdAt).format("DD/MM/YYYY") : "-" },
        { key: "status", label: "Status", renderCell: (key, row) => <InputSwitch checked={row?.status} onChange={() => handleStatusChange(row.id)} /> },
        {
            key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5">
                <span className="icon-edit font-bold text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => navigate(`./edit/${row.id}`)}></span>
                <span className="icon-trash text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer" onClick={() => DeleteOpenDialog(row)}></span>
            </div>
        }
    ]

    const DeleteOpenDialog = (rowData) => {
        setCommonData({
            title: "Delete Trip Type",
            description: "Are You Sure You Want To Delete Trip Type? ",
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
                const payload = { rolesid: resData?._id || "", };
                // const response = await dispatch(roleDelete(payload));
                // if (response?.IsSuccess) {
                //     toast.success(response?.Message);
                //     GetRolePermission();
                // }
                setDeletePopup({
                    isOpen: false,
                    resData: {},
                });
            }
        } else {
            GetRolePermission();
            setDeletePopup(false);
        }
        setDeletePopup(false);
    };

    const GetRolePermission = async (page = 1, limit = 10) => {
        try {
            setPagination({ page, limit })
            const payload = {
                page: page,
                limit: limit,
                search: debouncedSearchText || "",
                status: selectedStatus == 'true' ? true : selectedStatus == 'false' ? false : ""
            }
            // await dispatch(roleListWithPagination(payload))
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        dispatch(setPageName("Admin Setup"))
        GetRolePermission()
    }, [debouncedSearchText, selectedStatus])


    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <div className="flex items-center justify-between">
                    <h6 className="text-20 font-semibold text-primary">All Roles</h6>
                    <Link to="./create" className='btn_primary w-auto '>
                        <span className='icon-add text-[20px] xl:text-[24px]'></span>
                        <span>Add New Role</span>
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

                <CustomTable columns={Columns} data={roleData?.Data?.docs} isPagination={true} totalRecords={roleData?.Data?.totalDocs} handlePageChange={GetRolePermission} pagination={pagination} />
            </div>
            {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
        </>
    )
}

export default RolePermission