import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { InMenu, MainMenu } from '../common/CommonArray';
import { useToggleSideBar } from '../Store/Selectors/Sidebar/Sidebar_Selectors';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [mainMenu, setMainMenu] = useState(MainMenu);
  const [inMenu, setInMenu] = useState(InMenu);
  // const adminUserDetails = useUserProfile();
  const isOpen = useToggleSideBar();

  // useEffect(() => {
  //   const permission = adminUserDetails?.Data?.roleid?.permissions;
  //   mapMenuByPermission(permission);
  // }, [adminUserDetails]);

  // const mapMenuByPermission = (menuList) => {
  //   if (menuList) {
  //     InMenu?.forEach((item) => {
  //       const permission = menuList?.find(
  //         (i) => i.displayname == item?.displayname && i?.view
  //       );
  //       if (permission) {
  //         item.view = true;
  //       }
  //     });
  //   }

  //   const filteredDisplayInMenu = InMenu?.filter((item) => item?.view);
  //   setInMenu(filteredDisplayInMenu);

  //   MainMenu?.forEach((mainItem) => {
  //     const displayItem = menuList?.find(
  //       (item) => item?.displayname === mainItem?.displayname && item?.view
  //     );
  //     const inMenuMatch = filteredDisplayInMenu.some(
  //       (inMenuItem) => inMenuItem?.mainMenu === mainItem?.displayname
  //     );

  //     if (displayItem || inMenuMatch) {
  //       mainItem.view = true;
  //     }
  //   });

  //   const filteredDisplayMainMenu = MainMenu?.filter((item) => item?.view);
  //   setMainMenu(filteredDisplayMainMenu);
  // };
  return (
    <div className={`flex w-full side_bar  ${isOpen ? '' : 'active'}`} id="open">
      <Sidebar MainMenu={mainMenu} InMenu={inMenu} />
      <div className="w-full lg:w-[calc(100%-256px)] xl:w-[calc(100%-280px)] h-screen overflow-y-auto main anim">
        <Header />
        <div className="py-5 px-6">
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Layout