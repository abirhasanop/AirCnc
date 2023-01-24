const express = require('express')
const cors = require('cors')
const jwt = require("jsonwebtoken")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// airCnC
// BTKpHscmb8gTcc5n

// Database Connection
const uri = process.env.DB_URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const homesCollection = client.db('airCnC-db').collection('homes')
    const usersCollection = client.db('airCnC-db').collection('users')
    const bookingsCollection = client.db('airCnC-db').collection('bookings')

    // save user and generate jwt
    app.put("/user/:email", async (req, res) => {
      const email = req.params.email
      const user = req.body
      const filter = { email: email }
      const options = { upsert: true }
      const updatedDoc = {
        $set: user
      }
      const result = await usersCollection.updateOne(filter, updatedDoc, options)
      console.log(result);

      const token = jwt.sign(user, process.env.SECRET_TOKEN)
      console.log(token);
      res.send({ result, token })
    })


    // Save bookings to database
    app.post("/bookings", async (req, res) => {
      const bookingData = req.body
      const result = await bookingsCollection.insertOne(bookingData)
      console.log(result);
      res.send(result)


      // Get all bookings from database
      app.get("/bookings", async (req, res) => {
        const email = req.query.email
        let query = {}
        if (email) {
          query = { guestEmail: email }
        }
        const booking = await bookingsCollection.find(query).toArray()
        res.send(booking)
      })
    })

    console.log('Database Connected...')
  } finally {
  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Server is running...')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})
