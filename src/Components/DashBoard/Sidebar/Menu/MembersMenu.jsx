import { BsFillHouseAddFill } from 'react-icons/bs'

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
    
            
        </div>
    );
};

export default MembersMenu;