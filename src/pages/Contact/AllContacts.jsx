import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../Store/Action/Auth/Auth_Action'
import CustomTable from '../../components/CustomTable'
import { useListInquiries } from '../../Store/Selectors/Inquiries/Inquiries_Selectors'
import useDebounce from '../../hooks/useDebounce'
import { listInquiries, deleteInquiry } from '../../Store/Action/Inquiries/Inquiries_Action'
import CommonDialog from '../../common/CommonDialog';
import toast from 'react-hot-toast';

const AllContacts = () => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("")
    const debouncedSearch = useDebounce(searchText, 500)
    const [DeletePopup, setDeletePopup] = useState({ isOpen: false, resData: {} })
    const [commonData, setCommonData] = useState({});
    const contactData = useListInquiries()
    const columns = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "mobile", label: "Mobile" },
        { key: "message", label: "Message" },
        {
            key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5">
                <span className="icon-trash text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer" onClick={() => DeleteOpenDialog(row)}></span>
            </div>
        }
    ]


    const GetInquiryData = async () => {
        try {
            await dispatch(listInquiries({ type: "contact", search: debouncedSearch }))
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        GetInquiryData()
    }, [])

    useEffect(() => {
        dispatch(setPageName("Contact Inquiry"))
    }, [])


    const DeleteOpenDialog = (rowData) => {
        setCommonData({
            title: "Delete Contact",
            description: "Are You Sure You Want To Delete This Contact ? ",
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
                const payload = { inquiry_id: resData?._id || "", };
                const response = await dispatch(deleteInquiry(payload));
                if (response?.IsSuccess) {
                    toast.success(response?.Message);
                    GetInquiryData();
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


    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <div className="flex items-center justify-between">
                    <h6 className="text-20 font-semibold text-primary">All Contacts</h6>
                </div>
                <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
                    <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
                        <div className="input w-full max-w-full flex items-center">
                            <span className='icon-search text-g7 block text-[18px] xl:text-[20px] cursor-pointer'></span>
                            <input type="text" placeholder='Search' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>
                </div>
                <CustomTable columns={columns} data={contactData} isPagination={false} />
            </div>
            {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
        </>
    )
}

export default AllContacts
