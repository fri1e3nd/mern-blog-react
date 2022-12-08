import {useState, useEffect} from 'react'
import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {removePost} from '../../redux/features/post/postSlice'
import {createComment, getPostComments} from '../../redux/features/comment/commentSlice'
import {CommentItem} from '../../components/CommentItem/CommentItem'
import Moment from 'react-moment'
import axios from '../../utils/axios'

export default function PostPage() {

  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const {user} = useSelector((state) => state.auth)
  const {comments} = useSelector((state) => state.comment)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      toast('Пост был удален')
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({postId, comment}))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  const fetchPost = useCallback(async () => {
    const {data} = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (!post) {
    return (
      <div>
        Загрузка...
      </div>
    )
  }

  return (
    <div>
      <button>
        <Link  
          to={'/'}>
          Назад
        </Link>
      </button>
      <div>
        <div>
          <div>
            <div
              className={post ?.imgUrl ? '' : ''}>
              {post?.imgUrl && 
              (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt='img'
                />
              )}
            </div>
          </div>
            <div>
              <div>
                {post.username}
              </div>
              <div>
                <Moment 
                  date={post.createdAt} 
                  format='D MMM YYYY' 
                />
              </div>
            </div>
            <div>
              {post.title}
            </div>
            <p>
              {post.text}
            </p>
            <div>
              <div>
                <button>
                  <span>
                    {post.views}
                  </span>
                </button>
                <button >
                  {' '}
                  <span>
                    {post.comments?.length || 0} 
                  </span>
                </button>
              </div>
                {user?._id === post.author && 
                (
                  <div>
                    <button>
                      <Link 
                        to={`/${params.id}/edit`}>      
                      </Link>
                    </button>
                    <button
                      onClick={removePostHandler}>
                    </button>
                  </div>
                )}
            </div>
        </div>
        <div >
          <form
            onSubmit={(e) => e.preventDefault()}>
            <input
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Comment'
            />
            <button
              type='submit'
              onClick={handleSubmit}>
              Отправить
            </button>
          </form>
            {comments?.map((cmt) => (
              <CommentItem key={cmt._id} cmt={cmt}
              />
            ))}
        </div>
      </div>
    </div>
  )
  
}