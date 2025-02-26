import { MdAnnouncement } from "react-icons/md";
import MenuItem from "./MenuItem";
import { CgProfile } from "react-icons/cg";

const UserMenu = () => {
  return (
    <div>
      <div className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600   cursor-pointer">
        <MenuItem
          icon={MdAnnouncement}
          label="Announcements"
          address="announcements"
        />
      </div>
      <div className="flex items-center px-4 py-2  transition-colors duration-300 transform text-gray-600   cursor-pointer">
        <MenuItem icon={CgProfile} label="Profile" address="myProfile" />
      </div>
    </div>
  );
};

export default UserMenu;
