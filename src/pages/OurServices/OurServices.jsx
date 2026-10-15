import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/CustomTable'
import { Calendar } from 'primereact/calendar'
import { setPageName } from '../../Store/Action/Auth/Auth_Action'
import useDebounce from '../../Hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { assets } from '../../assets/Images/assets'
import { Link } from 'react-router-dom'
import CommonDialog from '../../common/CommonDialog'
import CustomDropdown from '../../components/UI/CustomDropdown'
import { Status } from '../../common/CommonArray'
import { deleteService, listServices } from '../../Store/Action/Services/Services_Action'
import { useListServices } from '../../Store/Selectors/Services/Services_Selectors'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const OurServices = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState("")
  const [commonData, setCommonData] = useState({});
  const [DeletePopup, setDeletePopup] = useState({ isOpen: false, resData: {}, });
  const debouncedSearchText = useDebounce(searchText, 500);
  const servicesData = useListServices()
  const columns = [
    {
      key: "image", label: "Image", renderCell: (key, row) => (
        <img src={import.meta.env.VITE_API_URL + row?.image} alt="image" className='w-[50px] h-[50px] object-cover rounded-lg' />
      )
    },
    { key: "title", label: "Title", renderCell: (key, row) => row?.title || "-" },
    { key: "desc", label: "Description", renderCell: (key, row) => <div className="max-w-xs truncate">{row?.desc?.replace(/<[^>]*>?/gm, '') || "-"}</div> },
    {
      key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5">
        <span className="icon-edit font-bold text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => navigate(`./edit/${row._id}`, { state: { serviceData: row } })}></span>
        <span className="icon-trash text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer" onClick={() => DeleteOpenDialog(row)}></span>
      </div>
    }
  ]

  useEffect(() => {
    dispatch(setPageName("Our Services"))
  }, [])


  const GetServicesData = async () => {
    try {
      const payload = {
        search: debouncedSearchText || "",
      }

      await dispatch(listServices(payload))
    } catch (error) {
      console.log('error', error)
    }
  }

  const DeleteOpenDialog = (rowData) => {
    setCommonData({
      title: "Delete Service",
      description: "Are You Sure You Want To Delete This Service? ",
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
        const payload = { service_id: resData?._id || "", };
        const response = await dispatch(deleteService(payload));
        if (response?.IsSuccess) {
          toast.success(response?.Message);
          GetServicesData();
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


  useEffect(() => {
    GetServicesData()
  }, [debouncedSearchText])

  return (
    <>
      <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">

        <div className="flex items-center justify-between">
          <h6 className="text-20 font-semibold text-primary">Our Services</h6>
          <Link to="./create" className='btn_primary w-auto '>
            <span className='icon-add text-[20px] xl:text-[24px]'></span>
            <span>Add New Service</span>
          </Link>
        </div>
        <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
          <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
            <div className="input w-full max-w-full flex items-center">
              <span className='icon-search text-g7 block text-[18px] xl:text-[20px] cursor-pointer'></span>
              <input type="text" placeholder='Search' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
          </div>
        </div>
        <CustomTable columns={columns} data={servicesData?.payload?.Data || []} isPagination={false} loading={servicesData?.loading} />
      </div>
      {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
    </>
  )
}

export default OurServices