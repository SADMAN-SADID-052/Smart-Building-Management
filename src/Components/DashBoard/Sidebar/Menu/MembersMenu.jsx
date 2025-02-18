import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem';

const MembersMenu = () => {
    return (
        <div>
            <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Plant'
        address='add-plant'
      />
      <MenuItem icon={MdHomeWork} label='Make Payment' address='makePay' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
            
        </div>
    );
};

export default MembersMenu;