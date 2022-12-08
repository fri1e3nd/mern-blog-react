import {useEffect, useState, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {updatePost} from '../../redux/features/post/postSlice'
import axios from '../../utils/axios'

export default function EditPostPage() {

  const [title, setTitle]       = useState('')
  const [text, setText]         = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params   = useParams()

  const fetchPost = useCallback(async () => {
    const {data} = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

    return (
      <form 
        onSubmit={(e) => e.preventDefault()}>
        <label>
          Прикрепить изорбажение:
          <input
            type='file'
            className='hidden'
            onChange={(e) => {
              setNewImage(e.target.files[0])
              setOldImage('')
            }}
          />
        </label>
        <div >
          {oldImage && 
          (
            <img 
              src={`http://localhost:3002/${oldImage}`} 
              alt={oldImage.name} 
            />
          )}
          {newImage && 
          (
            <img
              src={URL.createObjectURL(newImage)}
              alt={newImage.name}
            />
          )}
        </div>
        <label >
          Заголовок поста:
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Заголовок'
          />
        </label>
        <label>
          Текст поста:
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder='Текст поста'
          />
        </label>
        <div>
          <button
            onClick={submitHandler}>
            Обновить
          </button>
          <button
            onClick={clearFormHandler}>
            Отменить
          </button>
        </div>
      </form>
    )

}