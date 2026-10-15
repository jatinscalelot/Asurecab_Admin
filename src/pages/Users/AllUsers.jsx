import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomDropdown from '../../components/UI/CustomDropdown'
import { Status } from '../../common/CommonArray'
import CustomTable from '../../components/CustomTable'
import { useDispatch } from 'react-redux'
import useDebounce from '../../Hooks/useDebounce'
import { setPageName } from '../../Store/Action/Auth/Auth_Action'
import { assets } from '../../assets/Images/assets'

const AllUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isUserOpen, setIsUserOpen] = useState({ isOpen: false, Data: null })
  const [searchText, setSearchText] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [pagination, setPagination] = useState({ page: 1, limit: 10 })
  const [isExporting, setIsExporting] = useState(false)
  const debouncedSearchText = useDebounce(searchText, 500);
  const handleInputSwitch = async (id) => {
    const payload = {
      userId: id
    }
    const response = await dispatch(userChangeStatus(payload))
    if (response?.IsSuccess) {
      toast.success(response?.Message)
      GetUserData()
      GetUserCount()
    }
  }

  const UserData = []

  const columns = [
    { key: "registerDate", label: "Register Date", renderCell: (key, row) => row?.createdAt ? moment.utc(row?.createdAt).format("DD-MM-YYYY") : "-" },
    {
      key: "username", label: "User Name", renderCell: (key, row) => (<div className="flex items-center space-x-2.5">
        <div className="w-5 h-5 rounded-full overflow-hidden">
          <img src={row?.profile_image || assets.userDefaultImg} className="w-full h-full object-cover" alt="profile" />
        </div>
        <span>{row?.full_name}</span>
      </div>)
    },
    { key: "mobile", label: "Mobile No.", renderCell: (key, row) => row?.phone_no || "-" },
    { key: "email", label: "Email", renderCell: (key, row) => row?.email || "-" },
    { key: "location", label: "Location", renderCell: (key, row) => (row?.city && row?.state) ? row?.city + ", " + row?.state : "-" },
    { key: "onoff", label: "On/Off", renderCell: (key, row) => <InputSwitch checked={row.status} onChange={() => handleInputSwitch(row._id)} disabled={!(EditPermission || AddPermission)} /> },
    { key: "status", label: "Status", renderCell: (key, row) => <span className={row.status == true ? "active_btn" : "inactive"}>{row.status == true ? "Active" : "Inactive"}</span> },
    {
      key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5">
        <span className="icon-eye text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => navigate(`./details/${row.id}`)}></span>
        <span className="icon-edit font-bold text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => setIsUserOpen({ isOpen: true, Data: row })}></span>
      </div>
    }
  ]

  const handleCloseUser = () => {
    setIsUserOpen({ isOpen: false, Data: null })
    GetUserData()
  }

  const GetUserData = async (page = 1, limit = 10) => {
    try {
      setPagination({ page, limit });
      const payload = {
        page,
        limit,
        search: debouncedSearchText || "",
        status: selectedStatus || "",
        start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
        end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : ""
      }

      // await dispatch(userListWithPagination(payload))
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleExport = async () => {
    try {
      setIsExporting(true)
      const payload = {
        search: searchText || "",
        status: selectedStatus || "",
        start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
        end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : ""
      };

      const blob = await dispatch(userExport(payload));

      if (blob && blob instanceof Blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `users_${Date.now()}.xlsx`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Export successful");
      } else {
        toast.error("Export failed");
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Export failed");
    } finally {
      setIsExporting(false)
    }
  }

  const GetUserCount = async () => {
    try {
      // await dispatch(userCount())
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    dispatch(setPageName("Users"))
    GetUserCount()
  }, [])
  useEffect(() => { GetUserData() }, [debouncedSearchText, selectedStatus, startDate, endDate])

  return (
    <>
      <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
        <div className="flex items-center justify-between">
          <h6 className="text-20 font-semibold text-primary">All Users</h6>
          {/* <Link to="./create" className='btn_primary w-auto '>
            <span className='icon-add text-[20px] xl:text-[24px]'></span>
            <span>Add New User</span>
          </Link> */}
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
          <div className="w-1/2 xs:w-auto p-1.5 lg:p-2 2xl:p-3 xl:ml-auto">
            <button className="excel_btn flex items-center justify-center md:justify-normal space-x-1" onClick={handleExport} disabled={isExporting}>
              <img src={assets.excel_icon} className='w-[18px] lg:w-[20px] xl:w-[24px] h-[18px] lg:h-[20px] xl:h-[24px]' alt="excel" />
              <span>{isExporting ? "Exporting..." : "Export"}</span>
            </button>
          </div>
        </div>
        <CustomTable columns={columns} data={UserData?.Data?.docs} isPagination={true} totalRecords={UserData?.Data?.totalDocs} handlePageChange={GetUserData} pagination={pagination} />
      </div>
    </>
  )
}

export default AllUsers