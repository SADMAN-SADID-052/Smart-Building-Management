import { Helmet } from 'react-helmet-async'

// import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'

import { Navigate } from 'react-router-dom'
import Loading from '../Loading'

const Statistics = () => {
  const [role, isLoading] = useRole()
  if (isLoading) return <Loading></Loading>
  if (role === 'user') return <Navigate to='/dashboard/announcements' />
  if (role === 'seller') return <Navigate to='/dashboard/my-inventory' />
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {/* {role === 'admin' && <AdminStatistics />} */}
    </div>
  )
}

export default Statistics