import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {checkIsAuth, loginUser} from '../../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

export default function LoginPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {status} = useSelector((state) => state.auth)
  const isAuth   = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')
}, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({username, password}))
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <form
      onSubmit={(e) => e.preventDefault()}>
      <h1>
        Авторизация
      </h1>
      <label >
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password' 
        />
      </label>
      <div >
        <button
          type='submit'
          onClick={handleSubmit}>
          Войти
        </button>
        <Link
          to='/register'>
          Нет аккаунта?
        </Link>
      </div>
    </form>
  )
  
}