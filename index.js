var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
    useNewURLParser: true,
    useUnifiedTopology:true
})

var db = mongoose.connection;
db.on('error', () => console.log("error in connecting to database"));
db.once('open',()=>console.log("connected to database"))


app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var exam = req.body.exam;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "exam":exam
    }

    // err = new ServerSelectionError();

    db.collection('users').insertOne(data, (err, collection) => {
        // if (err) {
        //     throw err;
        // }
        console.log("record inserted sucessfully")
    });

    return res.redirect('/signup_success.html');
})
app.get("/", (req, res) => {
    res.set({
        "allow-access-Allow-origin": true
    })
    return res.redirect("/login.html");
}).listen(23000);

console.log("listening on port 3000");
