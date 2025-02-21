import { FaUserCog } from 'react-icons/fa'
import { BiSolidCoupon } from "react-icons/bi";
import { BiAlarmExclamation } from "react-icons/bi";
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Members' address='manageMembers' />
      <MenuItem icon={BiSolidCoupon} label='Manage Coupon' address='manageCoupon' />
      <MenuItem icon={BiAlarmExclamation} label=' Agreement Req' address='agreementReq' />
      <MenuItem icon={BiAlarmExclamation} label=' Make Announcement' address='makeAnnounce' />
    </>
  )
}

export default AdminMenu;