import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../Store/Action/Auth/Auth_Action'
import { Link } from 'react-router-dom'
import CustomTable from '../../components/CustomTable'
import { listInquiries } from '../../Store/Action/Inquiries/Inquiries_Action'
import { listServices } from '../../Store/Action/Services/Services_Action'
import { listTaxiRoutes } from '../../Store/Action/TaxiRoutes/TaxiRoutes_Action'
import { listTestimonials } from '../../Store/Action/Testimonials/Testimonials_Action'
import { useListInquiries } from '../../Store/Selectors/Inquiries/Inquiries_Selectors'
import { useListServices } from '../../Store/Selectors/Services/Services_Selectors'
import { useListTaxiRoutes } from '../../Store/Selectors/TaxiRoutes/TaxiRoutes_Selectors'
import { useListTestimonials } from '../../Store/Selectors/Testimonials/Testimonials_Selectors'
import moment from 'moment'

const Dashboard = () => {
    const dispatch = useDispatch()
    const rawInquiries = useListInquiries()
    const rawServices = useListServices()
    const rawRoutes = useListTaxiRoutes()
    const rawTestimonials = useListTestimonials()

    useEffect(() => {
        dispatch(setPageName("Dashboard"))
        dispatch(listInquiries({}))
        dispatch(listServices({}))
        dispatch(listTaxiRoutes({}))
        dispatch(listTestimonials({}))
    }, [dispatch])

    const inquiries = Array.isArray(rawInquiries) ? rawInquiries : (rawInquiries?.docs || [])
    const services = Array.isArray(rawServices) ? rawServices : (rawServices?.docs || [])
    const taxiRoutes = Array.isArray(rawRoutes) ? rawRoutes : (rawRoutes?.docs || [])
    const testimonials = Array.isArray(rawTestimonials) ? rawTestimonials : (rawTestimonials?.docs || [])

    const stats = [
        { title: "Total Inquiries", value: String(inquiries.length), icon: "icon-inquiry", color: "text-purple-600", bg: "bg-purple-50", gradient: "from-purple-500 to-indigo-400", route: "/inquiry" },
        { title: "Our Services", value: String(services.length), icon: "icon-packages", color: "text-orange-600", bg: "bg-orange-50", gradient: "from-orange-500 to-amber-400", route: "/our-services" },
        { title: "Taxi Routes", value: String(taxiRoutes.length), icon: "icon-services", color: "text-blue-600", bg: "bg-blue-50", gradient: "from-blue-500 to-cyan-400", route: "/taxi-routes" },
        { title: "Testimonials", value: String(testimonials.length), icon: "icon-star-fill", color: "text-green-600", bg: "bg-green-50", gradient: "from-emerald-500 to-teal-400", route: "/testimonials" },
    ]

    const columns = [
        { key: "name", label: "User Name", renderCell: (key, row) => row?.name || '-' },
        { key: "mobile", label: "Mobile", renderCell: (key, row) => row?.mobile || '-' },
        { key: "email", label: "Email", renderCell: (key, row) => row?.email || '-' },
        { key: "date", label: "Date", renderCell: (key, row) => row?.createdAt ? moment(row.createdAt).format('DD/MM/YYYY') : '-' },
        {
            key: "status", label: "Status", renderCell: (key, row) => {
                const status = row?.status || 'pending';
                return (
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        status === 'done' || status === 'replied' ? 'bg-green-100 text-green-600' :
                        status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                    }`}>
                        {status}
                    </span>
                )
            }
        },
    ]

    const recentInquiries = inquiries.slice(0, 5)

    return (
        <div className="space-y-6 lg:space-y-8 pb-10">
            {/* Stats Cards */}
            <div className="flex flex-wrap items-center -mx-2">
                {stats.map((stat, index) => (
                    <div className="w-full sm:w-1/2 lg:w-1/4 p-2" key={index} >
                        <Link to={stat.route} className="bg-white rounded-2xl p-5 lg:p-6 main_shadow hover:translate-y-[-4px] transition-all duration-300 group flex flex-col justify-between border border-transparent hover:border-primary/10">
                            <div className="flex items-start justify-between">
                                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl text-white shadow-lg shadow-${stat.color}/20 group-hover:scale-110 transition-transform`}>
                                    <span className={stat.icon}></span>
                                </div>
                            </div>
                            <div className="mt-4 lg:mt-6">
                                <span className="text-g7 font-medium text-xs lg:text-sm uppercase tracking-wider">{stat.title}</span>
                                <div className="text-2xl lg:text-3xl font-bold text-g1 mt-1">{stat.value}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap -mx-3 lg:-mx-4">
                {/* Main Content - Recent Inquiries */}
                <div className="w-full xl:w-2/3 px-3 lg:px-4 space-y-6 lg:space-y-8">
                    <div className="bg-white rounded-2xl main_shadow overflow-hidden border border-l2/50">
                        <div className="flex items-center justify-between p-5 lg:p-6 border-b border-l2/50 bg-l4/30">
                            <div>
                                <h2 className="text-lg lg:text-xl font-bold text-g1">Recent Fleet Inquiries</h2>
                                <p className="text-xs text-g7 mt-0.5 font-medium">Tracking the latest ride requests from users.</p>
                            </div>
                            <Link to="/inquiry" className="bg-white text-primary text-[10px] lg:text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-lg border border-primary/20 hover:bg-primary/5 transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-2 lg:p-4">
                            {recentInquiries.length > 0 ? (
                                <CustomTable columns={columns} data={recentInquiries} isPagination={false} />
                            ) : (
                                <div className="text-center py-8 text-g7 text-sm">
                                    <p>No inquiries received yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Services List */}
                    <div className="flex flex-wrap -m-3 lg:-m-4">
                        <div className="w-full p-3 lg:p-4">
                            <div className="bg-white rounded-2xl main_shadow p-6 border border-l2/50">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base lg:text-lg font-bold text-g1 flex items-center">
                                        <span className="w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
                                        Available Services
                                    </h3>
                                    <Link to="/our-services" className="text-primary text-xs font-semibold hover:underline">
                                        View All
                                    </Link>
                                </div>
                                {services.length > 0 ? (
                                    <div className="space-y-3">
                                        {services.slice(0, 4).map((service, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-l2/50 hover:bg-l4/30 transition-all">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-g1 text-sm">{service.title}</h4>
                                                        <p className="text-xs text-g7 line-clamp-1">{service.desc || 'Active service'}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${service.status ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {service.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-g7 text-sm">
                                        <p>No services added yet.</p>
                                        <Link to="/our-services/create" className="text-primary font-medium text-xs mt-2 inline-block hover:underline">
                                            + Add your first service
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="w-full xl:w-1/3 px-3 lg:px-4 space-y-6 lg:space-y-8 mt-6 xl:mt-0">
                    <div className="bg-white rounded-2xl main_shadow p-6 lg:p-7 border border-l2/50">
                        <h2 className="text-lg lg:text-xl font-bold text-g1 mb-6 flex items-center">
                            <span className="w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
                            Quick Management
                        </h2>
                        <div className="flex flex-wrap -m-2">
                            <div className="w-full p-2">
                                <Link to="/our-services/create" className="flex items-center p-4 rounded-xl border border-l2 hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-primary group-hover:text-white transition-all mr-4">
                                        <span className="icon-add text-xl"></span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-g1 text-sm group-hover:text-primary transition-colors">Add New Service</span>
                                        <span className="text-[10px] text-g7 font-medium">Create a new ride offering</span>
                                    </div>
                                    <i className="icon-right absolute right-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all text-primary"></i>
                                </Link>
                            </div>

                            <div className="w-full p-2">
                                <Link to="/packages/create" className="flex items-center p-4 rounded-xl border border-l2 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group relative overflow-hidden">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all mr-4">
                                        <span className="icon-add text-xl"></span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-g1 text-sm group-hover:text-emerald-600 transition-colors">Create Package</span>
                                        <span className="text-[10px] text-g7 font-medium">Bundled trip packages</span>
                                    </div>
                                    <i className="icon-right absolute right-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all text-emerald-500"></i>
                                </Link>
                            </div>

                            <div className="w-full p-2">
                                <Link to="/gallery" className="flex items-center p-4 rounded-xl border border-l2 hover:border-purple-500 hover:bg-purple-50/30 transition-all group relative overflow-hidden">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all mr-4">
                                        <span className="icon-gallery text-xl"></span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-g1 text-sm group-hover:text-purple-600 transition-colors">Manage Gallery</span>
                                        <span className="text-[10px] text-g7 font-medium">Update fleet photos</span>
                                    </div>
                                    <i className="icon-right absolute right-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all text-purple-500"></i>
                                </Link>
                            </div>

                            <div className="w-full p-2">
                                <Link to="/reviews" className="flex items-center p-4 rounded-xl border border-l2 hover:border-amber-500 hover:bg-amber-50/30 transition-all group relative overflow-hidden">
                                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all mr-4">
                                        <span className="icon-star-fill text-xl"></span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-g1 text-sm group-hover:text-amber-600 transition-colors">Moderate Reviews</span>
                                        <span className="text-[10px] text-g7 font-medium">Public feedback status</span>
                                    </div>
                                    <i className="icon-right absolute right-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all text-amber-500"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard