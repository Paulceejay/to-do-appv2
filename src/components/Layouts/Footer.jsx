import { NavLink, useParams } from 'react-router-dom'
import DashboardIcon from '../../assets/icons/DashboardIcon'
import HomeIcon from '../../assets/icons/HomeIcon'
import PlusIcon from '../../assets/icons/PlusIcon'
import UserIcon from '../../assets/icons/UserIcon'
import SettingsIcon from '../../assets/icons/SettingsIcon'

const Footer = (props) => {
   const params = useParams();
    return (
      <footer className="fixed bottom-0 left-0 right-0 z-30 flex justify-between rounded-t-xl max-w-screen-md mx-auto bg-white dark:bg-darkerGrayTheme">
        <NavLink
          to="/index"
          className="p-3 pb-0 active:border-b-2 active:border-b-primaryIndigo"
        >
          <HomeIcon />
          <small className="text-xs sm:pl-1 dark:text-white">Home</small>
        </NavLink>

        <NavLink
          to="index/dashboard"
          className="p-3 pb-0 active:border-b-2 active:border-b-primaryIndigo"
        >
          <DashboardIcon />
          <small className="text-xs dark:text-white">Boards</small>
        </NavLink>

        <NavLink
          to="index/add"
          className="p-3 mb4 bg-secondaryIndigo rounded-2xl active:border-b-2 active:border-b-primaryIndigo"
        >
          <PlusIcon />
        </NavLink>

        <NavLink
          to="index/users"
          className="p-3 pb-0 active:border-b-2 active:border-b-primaryIndigo"
        >
          <UserIcon />
          <small className="text-xs dark:text-white">Members</small>
        </NavLink>

        <NavLink
          to="index/settings"
          className="p-3 pb-0 active:border-b-2 active:border-b-primaryIndigo"
        >
          <SettingsIcon />
          <small className="text-xs dark:text-white">Settings</small>
        </NavLink>
      </footer>
    );
}

export default Footer