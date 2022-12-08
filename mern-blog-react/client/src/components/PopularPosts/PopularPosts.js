import {Link} from 'react-router-dom'

export default function PopularPosts({post}) {

  return (
    <div >
      <Link
        to={`${post._id}`}>
        {post.title}
      </Link>
    </div>
  )

}