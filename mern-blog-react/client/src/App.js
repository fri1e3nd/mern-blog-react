import {Layout} from './components/Layout/Layout'
import {Routes, Route} from 'react-router-dom'
import {MainPage} from './pages/MainPage/MainPage'
import {PostsPage} from './pages/PostsPage/PostsPage'
import {PostPage} from './pages/PostPage/PostPage'
import {AddPostPage} from './pages/AddPostPage/AddPostPage'
import {RegisterPage} from './pages/RegisterPage/RegisterPage'
import {LoginPage} from './pages/LoginPage/LoginPage'
import {EditPostPage} from './pages/EditPostPage/EditPostPage'
import {ToastContainer} from 'react-toastify'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {getMe} from './redux/features/auth/authSlice.js'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='posts' element={<PostsPage />} />
        <Route path=':id' element={<PostPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
        <Route path='new' element={<AddPostPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>
      <ToastContainer />
    </Layout>
  )
}