import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://user:test123@cluster0.p66syqn.mongodb.net/mern-blog-react?retryWrites=true&w=majority'
    )

    app.listen(3002, () => console.log(`Server started on port ${3002}`))

  } catch (error) {
    console.log(error)
  }
}
start()