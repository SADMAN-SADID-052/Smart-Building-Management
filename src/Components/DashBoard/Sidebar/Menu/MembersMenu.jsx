import { MdPayments } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdAnnouncement } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import MenuItem from './MenuItem';

const MembersMenu = () => {
    return (
        <div>

           <MenuItem icon={MdAnnouncement} label='Announcements' address='announcements' />
        <MenuItem
        icon={MdPayments}
        label='Make Payment'
        address='makePay'
      />
      <MenuItem icon={ MdWorkHistory} label='Payment History' address='payHistory' />
       <MenuItem icon={ CgProfile} label="Profile" address="memberProfile" />


    
            
        </div>
    );
};

export default MembersMenu;