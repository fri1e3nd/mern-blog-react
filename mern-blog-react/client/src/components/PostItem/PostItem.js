import Moment from 'react-moment'
import {Link} from 'react-router-dom'

export default function PostItem({post}) {

  if (!post) {
    return (
      <div>Загрузка...</div>
    )
  }

  return (
    <Link 
      to={`/${post._id}`}>
      <div >
        <div 
          className={post.imgUrl ? '' : ''}>
          {post.imgUrl && (<img src={`http://localhost:3002/${post.imgUrl}`} alt='img'/>)}
        </div>
        <div>
          <div>
            {post.username}
          </div>
          <div>
            <Moment date={post.createdAt} format='D MMM YYYY' />
          </div>
        </div>
        <div>
          {post.title}
        </div>
        <p>
          {post.text}
        </p>
        <div>
          <button>
            <span>
              {post.views}
            </span>
          </button>
          <button>
            <span>
              {post.comments?.length || 0}
            </span>
          </button>
        </div>
      </div>
    </Link>
  )
  
}