import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../Store/Action/Auth/Auth_Action'
import CustomTable from '../../components/CustomTable'
import CommonDialog from '../../common/CommonDialog'
import useDebounce from '../../Hooks/useDebounce'
import moment from 'moment'
import AddEditVideos from './AddEditVideos'
import { deleteYouTubeVideo, listYouTubeVideos } from '../../Store/Action/YouTubeVideos/YouTubeVideos_Action'
import { useListYouTubeVideos } from '../../Store/Selectors/YouTubeVideos/YouTubeVideos_Selectors'
import toast from 'react-hot-toast'



const AllVideos = () => {
    const [searchText, setSearchText] = useState("")
    const [commonData, setCommonData] = useState({});
    const [DeletePopup, setDeletePopup] = useState({ isOpen: false, resData: {} })
    const [showAddEdit, setShowAddEdit] = useState({ isOpen: false, resData: {} });
    const debouncedSearchText = useDebounce(searchText, 500);

    const dispatch = useDispatch()
    const videoData = useListYouTubeVideos()

    const GetVideoData = () => {
        try {
            let payload = { search: debouncedSearchText, }
            dispatch(listYouTubeVideos(payload))
        } catch (error) {
            console.log('Error fetching videos:', error)
        }
    }

    const DeleteOpenDialog = (rowData) => {
        setCommonData({
            title: "Delete Video",
            description: "Are You Sure You Want To Delete Video? ",
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
                const payload = { video_id: resData?._id || "", };
                const response = await dispatch(deleteYouTubeVideo(payload));
                if (response?.IsSuccess) {
                    toast.success(response?.Message);
                    GetVideoData();
                }
                setDeletePopup({
                    isOpen: false,
                    resData: {},
                });
            }
        } else {
            setDeletePopup({ isOpen: false, resData: {}, });
        }
        setDeletePopup({ isOpen: false, resData: {}, });
    };

    const columns = [
        { key: "registerDate", label: "Register Date", renderCell: (key, row) => row?.createdAt ? moment.utc(row?.createdAt).format("DD-MM-YYYY") : "-" },
        { key: "title", label: "Video Title", renderCell: (key, row) => row?.title || "-" },
        { key: "video_link", label: "Video Link", renderCell: (key, row) => <a href={row?.video_link} target="_blank" rel="noreferrer" className="text-primary hover:underline">{row?.video_link || "-"}</a> },
        {
            key: "action", label: "Action", renderCell: (key, row) => <div className="flex items-center space-x-2.5">
                <span className="icon-edit font-bold text-[18px] lg:text-[20px] xl:text-[24px] text-g1 cursor-pointer" onClick={() => setShowAddEdit({ isOpen: true, resData: row })}></span>
                <span className="icon-trash text-[18px] lg:text-[20px] xl:text-[24px] text-red cursor-pointer" onClick={() => DeleteOpenDialog(row)}></span>
            </div>
        }
    ]

    useEffect(() => {
        dispatch(setPageName("Youtube Videos"))
    }, [])

    useEffect(() => {
        GetVideoData()
    }, [debouncedSearchText])

    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <div className="flex items-center justify-between">
                    <h6 className="text-20 font-semibold text-primary">All Youtube Videos</h6>
                    <button onClick={() => setShowAddEdit({ isOpen: true, resData: {} })} className='btn_primary w-auto '>
                        <span className='icon-add text-[20px] xl:text-[24px]'></span>
                        <span>Add New Video</span>
                    </button>
                </div>
                <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
                    <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
                        <div className="input w-full max-w-full flex items-center">
                            <span className='icon-search text-g7 block text-[18px] xl:text-[20px] cursor-pointer'></span>
                            <input type="text" placeholder='Search' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>
                    {/* <div className="w-full xs:w-1/2 md:w-1/3 2xl:w-[224px] p-1.5 lg:p-2 2xl:p-3">
                        <CustomDropdown
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e)}
                            options={Status}
                            placeholder="Select Status"
                            className="input"
                        />
                    </div> */}
                    {/* <div className="w-1/2 xs:w-auto p-1.5 lg:p-2 2xl:p-3 xl:ml-auto">
                        <button className="excel_btn flex items-center justify-center md:justify-normal space-x-1" onClick={handleExport} disabled={isExporting}>
                            <img src={assets.excel_icon} className='w-[18px] lg:w-[20px] xl:w-[24px] h-[18px] lg:h-[20px] xl:h-[24px]' alt="excel" />
                            <span>{isExporting ? "Exporting..." : "Export"}</span>
                        </button>
                    </div> */}
                </div>
                <CustomTable columns={columns} data={videoData || []} isPagination={false} loading={videoData?.loading} />
            </div>
            {DeletePopup.isOpen && <CommonDialog CommonData={commonData} closeCommonDialog={deleteCloseDialog} />}
            {showAddEdit.isOpen && <AddEditVideos Data={showAddEdit.resData} onClose={() => { setShowAddEdit({ isOpen: false, resData: {} }); GetVideoData(); }} />}
        </>
    )
}

export default AllVideos
