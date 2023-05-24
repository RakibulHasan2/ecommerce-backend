const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = 5000;
const app = express()
//middle ware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xgyce0q.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const usersCollection = client.db('Ecommerce').collection('users')

         // -----------user data -----------------
         app.get('/users', async (req, res) => {
            const email = req.query.email
            const query = { email: email };
            const queryAll = {}
            // console.log(query)
            // console.log(req.headers.authorization)
            const result = await usersCollection.find(queryAll).toArray()

            // console.log(result)
            res.send(result)
        })
        
        app.post('/users', async (req, res) => {
           try{
            const user = req.body;
            // console.log("backend user",user)
            const result = await usersCollection.insertOne(user)
            res.send(result);
           }
           catch(err){
            // console.log("comming from post",err)
            res.send(err)
           }
        })

        
    } finally {
        
    }
}
run().catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('Ecommerce Website running')
})

app.listen(port, () => {
    console.log(`Ecommerce Website is running on ${port}`)
})
