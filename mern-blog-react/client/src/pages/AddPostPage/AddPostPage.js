import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createPost} from '../../redux/features/post/postSlice'

export default function AddPostPage() {

  const [title, setTitle] = useState('')
  const [text, setText]   = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setText('')
    setTitle('')
  }

  return (
    <form 
      onSubmit={(e) => e.preventDefault()}>
      <label>
        Прикрепить изорбажение:
        <input 
          type='file'
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div>
        {image && (
          <img 
            src={URL.createObjectURL(image)} 
            alt={image.name} />
        )}
      </div>
      <label >
        Заголовок поста:
        <input 
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          value={title}
          placeholder='Заголовок'
        />
      </label>
      <label >
        Текст поста:
        <textarea 
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder='Текст поста'
      />
      </label>
      <div >
        <button 
          onClick={submitHandler}>
          Добавить
        </button>
        <button 
          onClick={clearFormHandler}>
          Отменить
        </button>
      </div>
    </form>
  )
}