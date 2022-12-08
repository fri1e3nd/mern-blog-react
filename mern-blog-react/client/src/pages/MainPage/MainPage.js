import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {PopularPosts} from '../../components/PopularPosts/PopularPosts'
import {PostItem} from '../../components/PostItem/PostItem'
import {getAllPosts} from '../../redux/features/post/postSlice'

export default function MainPage() {

  const dispatch = useDispatch()
  const {posts, popularPosts} = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <div>
        Постов не существует.
      </div>
    )
  }

  return (
    <div>
      <div>
        <div>
          {posts?.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>
        <div>
          <div>
            Популярное:
          </div>
            {popularPosts?.map((post, idx) => (
              <PopularPosts 
                key={idx}
                post={post}
              />
          ))}
        </div>
      </div>
    </div>
  )

}