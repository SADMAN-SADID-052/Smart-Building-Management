import PropTypes from 'prop-types'


import { Navigate } from 'react-router-dom'
import useRole from '../Hooks/useRole'
import Loading from '../Pages/Loading'

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <Loading></Loading>
  if (role === 'admin') return children
  return <Navigate to='/dashboard' replace='true' />
}

AdminRoute.propTypes = {
  children: PropTypes.element,
}

export default AdminRoute