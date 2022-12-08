import {Link, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {checkIsAuth, logout} from '../../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

export default function Navbar() {

  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const activeStyles = {
    color: '',
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
  }

  return (
    <div>
      {isAuth && (
        <ul>
          <li>
            <NavLink
              to={'/'}
              href='/'
              style={({isActive}) => isActive ? activeStyles : undefined}>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/posts'}
              href='/'
              style={({isActive}) => isActive ? activeStyles : undefined}>
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/new'}
              href='/'
              style={({ isActive }) => isActive ? activeStyles : undefined}>
              Добавить пост
            </NavLink>
          </li>
        </ul>
        )}
      <div>
        {isAuth ? (<button onClick={logoutHandler}>Выйти</button>) : (<Link to={'/login'}>Войти</Link>)}
      </div>
    </div>
  )

}