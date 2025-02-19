import PropTypes from 'prop-types'

import { Navigate } from 'react-router-dom'
import useRole from '../Hooks/useRole'
import Loading from '../Pages/Loading'

const UserRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <Loading></Loading>
  if (role === 'user') return children
  return <Navigate to='/dashboard' replace='true' />
}

UserRoute.propTypes = {
  children: PropTypes.element,
}

export default UserRoute;