import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem';


const UserMenu = () => {
    return (
        <div>



<div
 
  className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600   cursor-pointer'
>
 

  <MenuItem icon={BsFingerprint} label='Announcements' address='announcements' />
</div>


            
        </div>
    );
};

export default UserMenu;