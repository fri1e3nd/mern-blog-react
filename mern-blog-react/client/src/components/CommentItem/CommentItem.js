export default function CommentItem({cmt}) {

  const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
  
  return (
    <div>
      <div>
        {avatar}
      </div>
      <div>
        {cmt.comment}
      </div>
    </div>
  )

}