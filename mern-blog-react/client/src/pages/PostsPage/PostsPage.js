import {useState, useEffect} from 'react'
import {PostItem} from '../../components/PostItem/PostItem'
import axios from '../../utils/axios'

export default function PostsPage() {

  const [posts, setPosts] = useState([])

  const fetchMyPosts = async () => {
    try {
      const {data} = await axios.get('/posts/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

useEffect(() => {
  fetchMyPosts()
}, [])

  return (
    <div >
      {posts?.map((post, idx) => (
        <PostItem post={post} key={idx} 
        />
      ))}
    </div>
  )
  
}