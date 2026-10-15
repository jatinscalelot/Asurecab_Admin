import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPageName } from '../../Store/Action/Auth/Auth_Action'
import CustomTable from '../../components/CustomTable'

const AllSupportTickets = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")
    const [pagination, setPagination] = useState({ page: 1, limit: 10 })
    const supportTicketData = []
    const columns = [
        { key: "ticketId", label: "Ticket ID" },
        { key: "subject", label: "Subject" },
        { key: "status", label: "Status" },
        { key: "priority", label: "Priority" },
        { key: "date", label: "Date" },

    ]

    const GetSupportTicketData = async (page = 1, limit = 10) => {
        try {
            setPagination({ page, limit })
            const payload = {
                page: page,
                limit: limit,
                search: searchText,
            }
            // const response = await dispatch(GetAllSupportTickets(payload))
            // if (response.IsSuccess) {
            //     setSupportTicketData(response.Data)
            // }
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        dispatch(setPageName("Support Ticket"))
    }, [])

    return (
        <>
            <div className="bg-white rounded-xl lg:rounded-2xl main_shadow p-3 lg:p-4 xl:p-5 space-y-4 lg:space-y-6 xl:space-y-8">
                <div className="flex items-center justify-between">
                    <h6 className="text-20 font-semibold text-primary">All Support Tickets</h6>
                </div>
                <div className='flex flex-wrap items-center -mx-1.5 lg:-mx-2 2xl:-mx-3'>
                    <div className='w-full xs:w-1/2 md:w-1/3 2xl:w-[358px] p-1.5 lg:p-2 2xl:p-3'>
                        <div className="input w-full max-w-full flex items-center">
                            <span className='icon-search text-g7 block text-[18px] xl:text-[20px] cursor-pointer'></span>
                            <input type="text" placeholder='Search' className='w-full outline-none bg-transparent text-d3 pl-2.5 text-g1' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>
                </div>
                <CustomTable columns={columns} data={supportTicketData?.Data?.docs} isPagination={true} totalRecords={supportTicketData?.Data?.totalDocs} handlePageChange={GetSupportTicketData} pagination={pagination} />

            </div>
        </>
    )
}

export default AllSupportTickets
