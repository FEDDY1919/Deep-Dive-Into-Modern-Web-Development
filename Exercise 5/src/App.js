import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      
    
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async(event) =>{
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const Notification = ({message}) => {
    return <div>{message}</div>
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = (e) =>{

    e.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog)).catch(e=>console.log(e))
      }).catch(e=>console.log(e))
      setMessage(
        blogObject.title + ' was added to the phonebook!'
      )
      setTimeout(() => {
        setMessage('')
      }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    }

  const blogForm = () => (
    <form onSubmit = {addBlog}>
                <div>
                title: <input value = {title} onChange={({ target }) => setTitle(target.value)}/>
                </div>
                <div>
                author: <input value = {author} onChange={({ target }) => setAuthor(target.value)}/>
                </div>
                <div>
                url: <input  value = {url} onChange={({ target }) => setUrl(target.value)}/>
                </div>
                <div>
                <button type="submit">create</button>
                </div>
    </form>  
  )
  const notification = () => {
    if (message === '')
    {
        return <div></div>
    }
    
    else return(
        <div className = "notif">
            {message}
        </div>
    )
}

  return (
    <div>
      <h2>blogs</h2>

      {notification}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in
            <button onClick = {handleLogout}>Logout</button>
          </p>
          {blogForm()}
        </div>
      }

    </div>
    
  )
}

export default App
