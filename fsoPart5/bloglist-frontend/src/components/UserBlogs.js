import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import userService from '../services/users'

const UserBlogs = () => {
  const id = useParams().id
  console.log('id---', id)
  const result3 = useQuery('userBlogs', () => userService.get(id), {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result3.isLoading) {
    return <div>loading data...</div>
  }
  if (result3.isError) {
    return <span>users service is not available due to problems in server</span>
  }

  const userBlogs = result3.data.blogs
  console.log('userBlogs are....', userBlogs)
  return (
    <div>
      <h4>added blogs</h4>
      <ul>
        {userBlogs.map((userBlogs) => (
          <li key={userBlogs.id}>{userBlogs.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
