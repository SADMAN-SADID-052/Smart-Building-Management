import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserCog} label='Manage Coupon' address='manageCoupon' />
      <MenuItem icon={FaUserCog} label=' Agreement Req' address='agreementReq' />
    </>
  )
}

export default AdminMenu;