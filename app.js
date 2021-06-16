const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended:true
}))

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);




mongoose.connect('mongodb://localhost:27017/youtubedb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))




// app.get('/', (req, res) => {
//     res.send('we are on home');
// })

app.listen(3000);