import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useNotificationDispatch } from './NotificationContext'
import loginService from './services/login'
import { useUserDispatch, useUserValue } from './UserContext'
import OneBlog from './components/OneBlog'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

const App = () => {
  // console.log('APP LOGGED---', loggedUserJSON)
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const blogFormRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useUserValue()
  const setUser = useUserDispatch()

  useEffect(() => {
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser({ type: 'LOGIN', user })
      blogService.setToken(user.token)
    }
  }, [])

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      console.log('newBlogMut', newBlog)
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      dispatch('ADD', newBlog.title)
      setTimeout(() => {
        dispatch('CLEAR', newBlog.title)
      }, 5000)
    },
    onError: (error) => {
      console.log(error)
      dispatch('ERROR', error)
    },
  })

  const addBlog = (blogObject) => {
    console.log('blog objects', blogObject)
    console.log('blog objects2', blogObject)
    const title = blogObject.title
    const author = blogObject.author
    const url = blogObject.url
    console.log('titel', title)
    console.log('author', author)

    newBlogMutation.mutate({ title, author, url, likes: 0 })
  }

  const result = useQuery('blogs', blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return (
      <span>anecdote service is not available due to problems in server</span>
    )
  }

  const blogs = result.data
  console.log('blogs are....', blogs)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser({ type: 'LOGOUT' })
    dispatch('LOGOUT', user.name)
    setTimeout(() => {
      dispatch('CLEAR')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setUser({ type: 'LOGIN', user })

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser({ type: 'LOGIN', user })
      dispatch('LOGIN', user.name)
      setTimeout(() => {
        dispatch('CLEAR')
      }, 5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      // setMessageType('error')
      // setMessage('Wrong username or password')
      // setTimeout(() => {
      //   setMessage(null)
      // }, 5000) // reset message after 5 seconds
    }
  }

  if (user === null) {
    return (
      <div className="bg-orange-300 flex flex-col align-center justify-center p-10 text-4xl">
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              id="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-primary text-orange-300">
      <h2>blogs</h2>
      <Notification />
      <Router>
        <div className="links">
          <Link to="/blogs">blogs</Link>
          <Link to="/users">users</Link>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserBlogs />} />
          <Route path="/blogs/:id" element={<OneBlog />} />
          <Route
            path="/blogs"
            element={
              <div className="">
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>
                {blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <Blogs key={blog.id} blog={blog} blogs={blogs} />
                  ))}
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
