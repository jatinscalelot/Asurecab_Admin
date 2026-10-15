import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useToggleSideBar, useToggleSideBarMobile } from '../Store/Selectors/Sidebar/Sidebar_Selectors';
import { assets } from '../assets/Images/assets';
import { setSidebarOpen, setSidebarOpenMobile } from '../Store/Action/Sidebar/Sidebar_Action';

const Sidebar = ({ MainMenu, InMenu }) => {
  const [mainMenus, setMainMenus] = useState([]);
  const isOpen = useToggleSideBar();
  const isOpenMobile = useToggleSideBarMobile();
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleDropdown = (key) => {
    const updatedMenus = mainMenus.map((menu) => {
      if (menu.displayname === key.displayname) {
        return { ...menu, isOpen: !menu.isOpen };
      }
      return { ...menu, isOpen: false }; // Close other menus
    });
    setMainMenus(updatedMenus);
  };

  useEffect(() => {
    const mainMenuData = MainMenu.map((menu) => ({
      ...menu,
      isOpen: false, // Initialize all menus as closed
    }));
    setMainMenus(mainMenuData);
  }, [MainMenu]);

  // Check if any inner menu is active
  const isAnyInnerMenuActive = (mainMenu) => {
    return InMenu.some(
      (innerItem) =>
        innerItem.mainMenu === mainMenu.displayname &&
        window.location.pathname.includes(innerItem.route)
    );
  };

  useEffect(() => {
    const mainMenuData = MainMenu.map((menu) => ({
      ...menu,
      isOpen: isAnyInnerMenuActive(menu),
    }));
    setMainMenus(mainMenuData);
  }, [location.pathname]);

  return (
    <aside id="open_sidebar" className={`w-full bg-g1/30 lg:bg-transparent lg:w-64 xl:w-[280px] h-screen  fixed inset-y-0 left-0 lg:relative anim lg:translate-x-0 z-50 ${isOpenMobile ? "-translate-x-0" : "-translate-x-full"}`}>
      <div className="w-64 lg:w-full h-full bg-g1 overflow-y-auto">
        <div className="w-7 h-7 rounded-full bg-primary flex lg:hidden items-center justify-center absolute left-60 top-20 z-50 cursor-pointer" onClick={() => { dispatch(setSidebarOpenMobile(false)) }}>
          <span className="icon-left text-[16px] lg:text-[18px] 2xl:text-[20px] text-white"></span>
        </div>
        <div className="pt-5 lg:pt-6 2xl:pt-8 px-4 lg:px-5 2xl:px-7">
          <div className="border-b border-white/10 pb-4 lg:pb-6 2xl:pb-8">
            <Link to="/dashboard" className="flex flex-col items-center text-center group">
              {!isOpen ? (
                <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center anim">
                  <img src={assets.fav_icon} className="w-full h-full object-contain" alt="logo" />
                </div>)
                : (<img src={assets.logo} className="h-24 lg:h-28 w-auto max-w-[180px] object-contain mx-auto drop-shadow-md transition-transform group-hover:scale-105 duration-300" alt="logo" />)}
            </Link>
          </div>
        </div>
        <div className="py-3.5 lg:py-5 2xl:py-7 px-3.5">
          <ul className="space-y-1.5">
            <li className="group relative">
              <NavLink to={`/dashboard`} className={({ isActive }) => `nav_link anim group-hover:bg-primary relative ${isActive ? 'active' : ''}`} onClick={() => isOpenMobile && dispatch(setSidebarOpenMobile(false))}>
                <span className={`icon-dashboard text-[18px] lg:text-[20px] xl:text-[24px] text-g7 group-hover:text-white anim`}></span>
                <span className="text16 text-l1 inline-block font-medium group-hover:text-white whitespace-nowrap anim ml-2 2xl:ml-3">Dashboard</span>
              </NavLink>
            </li>
            {
              mainMenus.map((item, index) => {
                const isActive = isAnyInnerMenuActive(item);
                const showInner = item.isOpen || isActive;
                return (
                  <li className="group relative" key={index}>
                    {item?.route == "" ? <div className={`nav_link anim group-hover:bg-primary relative cursor-pointer ${showInner ? "active" : ""}`} onClick={() => { toggleDropdown(item); dispatch(setSidebarOpen(true)) }}>
                      <span className={`${item?.icon} text-[18px] lg:text-[20px] xl:text-[24px] text-g7 group-hover:text-white anim`}></span>
                      <span className={`text16 text-l1 inline-block font-medium group-hover:text-white whitespace-nowrap anim ml-2 2xl:ml-3 ${!isOpen ? "invisible overflow-hidden w-0" : ""}`}>{item.displayname}</span>
                      <span style={{ marginLeft: "auto !important" }} className="block icon-arrow-down text-[16px] lg:text-[18px] xl:text-[20px] text-g7 group-hover:text-white anim ml-auto"></span>
                    </div> :
                      <NavLink to={`/${item?.route}`} className="nav_link anim group-hover:bg-primary relative" onClick={() => { toggleDropdown(item); isOpenMobile && dispatch(setSidebarOpenMobile(false)) }}>
                        <span className={`${item?.icon} text-[18px] lg:text-[20px] xl:text-[24px] text-g7 group-hover:text-white anim`}></span>
                        <span className="text16 text-l1 inline-block font-medium group-hover:text-white whitespace-nowrap anim ml-2 2xl:ml-3">{item.displayname}</span>
                      </NavLink>}
                    {item?.route == "" && isOpen && (
                      <ul className={`inner_menu drop_down ${showInner ? "block" : "hidden"}`} >
                        {InMenu.filter((innerItem) => innerItem.mainMenu === item.displayname).map((inItem, index) => {
                          return (
                            <li key={index}>
                              <NavLink to={`../${inItem.route}`} className="text16 text-g7 block font-medium py-1.5 px-14 hover:text-primary whitespace-nowrap anim" activeclassname="active" onClick={() => isOpenMobile && dispatch(setSidebarOpenMobile(false))}>
                                {inItem.displayname}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar