import PropTypes from 'prop-types'

import { Navigate } from 'react-router-dom'

import Loading from '../Pages/Loading'
import useRole from '../Hooks/useRole'

const MemberRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <Loading></Loading>
  if (role === 'member') return children
  return <Navigate to='/dashboard' replace='true' />
}
MemberRoute.propTypes = {
  children: PropTypes.element,
}

export default MemberRoute;