import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useToggleSideBar, useToggleSideBarMobile } from '../Store/Selectors/Sidebar/Sidebar_Selectors';
import { usePageName, useProfile } from '../Store/Selectors/Auth/Auth_Selectors';
import { setSidebarOpen, setSidebarOpenMobile } from '../Store/Action/Sidebar/Sidebar_Action';
import { getProfile } from '../Store/Action/Auth/Auth_Action';
import Logout from '../auth/Logout';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useToggleSideBar();
  const isOpenMobile = useToggleSideBarMobile();
  const title = usePageName();
  const profile = useProfile();
  const [isLogout, setIsLogout] = useState(false)
  const [isProfile, setIsProfile] = useState(false)

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const user = profile?.payload?.Data || {};

  const HandleOpenProfile = () => {
    setIsProfile(true)
  }

  return (
    <>
      <header
        className={`h-[70px] bg-white z-40 flex items-center justify-between px-4 md:px-8 transition-all duration-300 ease-in-out ${isOpenMobile
          ? 'w-full left-0'
          : isOpen ? 'left-[260px]' : 'left-[80px]'
          }`}
      >
        {/* Left Side - Toggle Button & Title */}
        <div className="flex items-center space-x-3 md:space-x-4 flex-1">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                dispatch(setSidebarOpenMobile(true));
              } else {
                dispatch(setSidebarOpen(!isOpen));
              }
            }}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/80 transition-all shadow-sm shrink-0 active:scale-95"
          >
            <span className="lg:hidden flex items-center justify-center">
              <span className="icon-mobile-menu text-[20px] leading-none"></span>
            </span>
            <span className="hidden lg:flex items-center justify-center overflow-hidden">
              {isOpen ? (
                <span className="icon-left text-[20px] leading-none flex items-center justify-center"></span>
              ) : (
                <span className="icon-right text-[20px] leading-none flex items-center justify-center"></span>
              )}
            </span>
          </button>

          {/* Centered Title */}
          <div className="flex-1 flex mr-0 md:mr-12">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">{title}</h2>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Notification */}
          <div className="relative group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4423] absolute right-1 top-0"></span>
            <div className="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-full bg-white border border-l2 flex items-center justify-center cursor-pointer">
              <span className="icon-notification text-[18px] lg:text-[20px] xl:text-[24px] text-g7"></span>
            </div>
            <div className="w-full min-w-80 sm:min-w-96 lg:min-w-[440px] h-auto bg-white rounded-xl overflow-y-auto absolute top-16 -right-10 md:right-0 anim translate-y-8 z-10 group-hover:-translate-y-0 invisible group-hover:visible">
              <h4 className="text20 text-g1 font-semibold bg-white p-4 border-b border-l2">Notification</h4>
              <div className="h-[440px] overflow-y-scroll">
                <div className="p-10 text-center text-g6">No Notifications</div>
              </div>

              <div className="flex justify-end p-4">
                <Link to={'../notification'} className="text-primary">View All</Link>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="relative group" >
            <div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:bg-primary/80 transition-colors text-sm md:text-base overflow-hidden"
            >
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user?.name ? user.name.charAt(0).toUpperCase() : 'A'
              )}
            </div>
            <div className="absolute top-14 right-0 w-40 anim bg-white border border-l2 rounded-xl py-3 px-2 z-20 translate-y-8 group-hover:-translate-y-0 invisible group-hover:visible">
              <ul>
                <li>
                  <Link className="flex items-center space-x-2 p-1 cursor-pointer" onClick={() => HandleOpenProfile()}>
                    <span className="icon-edit text-[18px] text-g1"></span>
                    <span className="inline-block text-12 md:text-14 font-medium text-g1 text-nowrap">Edit Profile</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center space-x-2 p-1 cursor-pointer" onClick={() => setIsLogout(true)}>
                    <span className="icon-logout text-[18px] text-[#DC2626]"></span>
                    <span className="inline-block text-12 md:text-14 font-medium text-[#DC2626] text-nowrap">Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {isLogout && <Logout onClose={() => setIsLogout(false)} />}
    </>
  )
}

export default Header