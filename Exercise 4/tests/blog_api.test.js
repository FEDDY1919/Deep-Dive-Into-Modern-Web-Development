const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/test_helper')
const Blog = require ('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

})


describe('blog api', ()=>{
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
      test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
      
        expect(response.body).toHaveLength(helper.initialBlogs.length)
      })
      test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
      
        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
          ''
        )
        })
        test('a valid blog can be added', async () => {
            const newBlog = {
                title:'i love this',
                author:'',
                url:'',
                likes:'',
            }
          
            await api
              .post('/api/blogs')
              .send(newBlog)
              .expect(201)
              .expect('Content-Type', /application\/json/)
          
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

            const contents = blogsAtEnd.map(r => r.title)
          
            expect(contents).toContain(
              'i love this'
            )
          })
})

describe('delete', ()=>{
  test("a blog is deleted", async() =>{
   const blogsAtStart = await helper.blogsInDb()
   const blogToDelete = blogsAtStart[0]

   await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

})
})

describe('update', ()=>{
  test("a blog is updated", async() =>{
    
   const blogAtStart = await helper.blogsInDb()
   const blogToUpdate = blogAtStart[0]

   const newBlog = {
    title:'i love this',
    author:'',
    url:'',
    likes:7,
}

   await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(r => r.likes)
    console.log(likes)
    expect(likes).toContain(newBlog.likes)

})
})

afterAll(() => {
  mongoose.connection.close()
})