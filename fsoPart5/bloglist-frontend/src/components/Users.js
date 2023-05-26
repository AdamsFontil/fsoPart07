import { useQuery } from 'react-query'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const result2 = useQuery('users', userService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result2.isLoading) {
    return <div>loading data...</div>
  }
  if (result2.isError) {
    return <span>users service is not available due to problems in server</span>
  }

  const users = result2.data
  console.log('users are....', users)

  return (
    <div>
      <h1>Users</h1>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div>
          <h4>name</h4>
          {users.map((user) => (
            <Link to={`/users/${user.id}`} key={user.id}>
              <p>{user.name}</p>
            </Link>
          ))}
        </div>
        <div>
          <h4>blogs created</h4>
          {users.map((user) => (
            <p key={user.id}>{user.blogs.length}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Users
