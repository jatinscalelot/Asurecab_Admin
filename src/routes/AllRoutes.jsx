import RequireAuth from './RequireAuth'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../auth/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import AllAdmin from '../pages/AdminSetup/Admin/AllAdmin'
import AddEditAdmin from '../pages/AdminSetup/Admin/AddEditAdmin'
import RolePermission from '../pages/AdminSetup/RolePermission/RolePermission'
import AddEditRolePermission from '../pages/AdminSetup/RolePermission/AddEditRolePermission'
import Layout from '../components/Layout'
import OurServices from '../pages/OurServices/OurServices'
import AddEditOurServices from '../pages/OurServices/AddEditOurServices'
import AllTestimonials from '../pages/Testimonials/AllTestimonials'
import AllUsers from '../pages/Users/AllUsers'
import AllInquiry from '../pages/Inquiry/AllInquiry'
import AllGallery from '../pages/Gallery/AllGallery'
import AllVideos from '../pages/Videos/AllVideos'
import AllContacts from '../pages/Contact/AllContacts'
import AllSupportTickets from '../pages/Support/AllSupportTickets'
import AllTaxiRoutes from '../pages/TaxiRoutes/AllTaxiRoutes'
import AddEditTaxiRoutes from '../pages/TaxiRoutes/AddEditTaxiRoutes'
import AddEditTestimonials from '../pages/Testimonials/AddEditTestimonials'

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* <Route path='/forget-password' element={<ForgetPassword />} />
                <Route path='/verify-otp' element={<VerifyOTP />} />
                <Route path="/create-your-password" element={<CreateYourPassword />} /> */}

                <Route element={<RequireAuth />}>
                    <Route element={<Layout />} >
                        <Route path="/" element={<Navigate to="/dashboard" />} />

                        {/* Dashboard */}
                        <Route path="dashboard" index element={<Dashboard />} />

                        {/* Users */}
                        <Route path='users' element={<AllUsers />} />


                        {/* Our Services */}
                        <Route path='our-services' element={<OurServices />} />
                        <Route path='our-services/create' element={<AddEditOurServices />} />
                        <Route path='our-services/edit/:id' element={<AddEditOurServices />} />

                        {/* Reviews */}
                        <Route path='testimonials' element={<AllTestimonials />} />
                        <Route path='testimonials/create' element={<AddEditTestimonials />} />
                        <Route path='testimonials/edit/:id' element={<AddEditTestimonials />} />

                        {/* Inquiries */}
                        <Route path='inquiry' element={<AllInquiry />} />

                        {/* Packages */}
                        <Route path='taxi-routes' element={<AllTaxiRoutes />} />
                        <Route path='taxi-routes/create' element={<AddEditTaxiRoutes />} />
                        <Route path='taxi-routes/edit/:id' element={<AddEditTaxiRoutes />} />

                        {/* Gallery */}
                        <Route path='gallery' element={<AllGallery />} />

                        {/* Youtube Videos */}
                        <Route path='youtube-videos' element={<AllVideos />} />

                        {/* Contact */}
                        <Route path='contact' element={<AllContacts />} />

                        {/* Support Ticket */}
                        <Route path='support-ticket' element={<AllSupportTickets />} />

                        {/* Admin Setup */}
                        {/* Admin */}
                        <Route path='admin' element={<AllAdmin />} />
                        <Route path='admin/create' element={<AddEditAdmin />} />
                        <Route path='admin/edit/:id' element={<AddEditAdmin />} />
                        {/* Role and Permission */}
                        <Route path='role-permission' element={<RolePermission />} />
                        <Route path='role-permission/create' element={<AddEditRolePermission />} />
                        <Route path='role-permission/edit/:id' element={<AddEditRolePermission />} />




                        {/* Catch-all fallback (optional but useful) */}
                        <Route path={`*`} element={<Navigate to="/dashboard" />} />

                    </Route>
                </Route>

            </Routes>
        </>
    )
}

export default AllRoutes