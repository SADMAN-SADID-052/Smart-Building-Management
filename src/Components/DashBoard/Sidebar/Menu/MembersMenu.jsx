import { BsFillHouseAddFill } from 'react-icons/bs'
import { FcSettings } from "react-icons/fc";
import { MdAnnouncement } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import MenuItem from './MenuItem';

const MembersMenu = () => {
    return (
        <div>

           <MenuItem icon={MdAnnouncement} label='Announcements' address='announcements' />
        <MenuItem
        icon={BsFillHouseAddFill}
        label='Make Payment'
        address='makePay'
      />
      <MenuItem icon={ MdWorkHistory} label='Payment History' address='payHistory' />
       <MenuItem icon={FcSettings} label="Profile" address="memberProfile" />


    
            
        </div>
    );
};

export default MembersMenu;