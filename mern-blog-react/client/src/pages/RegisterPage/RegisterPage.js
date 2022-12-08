import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {registerUser, checkIsAuth} from '../../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

export default function RegisterPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {status} = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(registerUser({username, password}))
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}>
      <h1>
        Регистрация
      </h1>
      <label>
        Username:
        <input
          type='text'
          value={username}
          placeholder='Username' 
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div>
        <button
          type='submit'
          onClick={handleSubmit}>
          Подтвердить
        </button>
        <Link
          to='/login'>
          Уже зарегистрированы ?
        </Link>
      </div>
    </form>
  )

}