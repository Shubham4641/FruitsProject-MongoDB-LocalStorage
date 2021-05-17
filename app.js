const express = require("express");


const bodyparser = require("body-parser");

const request = require("request");
// const { json } = require("body-parser");

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended: true}));



app.get("/", function(req, res)
{
    res.sendFile(__dirname +"/index.html")
});

app.post("/", function(req,res)
{
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const eemail = req.body.email;
    // console.log(firstname, lastname, eemail);

    var data = {
        members: [
            {
            email_address: eemail,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME : lastname,
            }
        }
        ]
    };
    var jsondata = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/b955d34997";

    const options = {
        method : "POST",
        auth: "shubham:090c71eb704ddd94df6158c9ddd5b8af-us1"

    };


   const request = https.request(url, options, function(response)
    {
        if(response.statusCode === 200)
        {
            // res.send("Successfully Subscribed");
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendfile(__dirname +"/failure.html");
            // res.send("There was an error with sign up, please try again");
        }
        response.on("data", function(data)
        {
            console.log(JSON.parse(data));
        })
            
    })
    request.write(jsondata);
    request.end();
    
});

app.post("/failure", function(req, res)
{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function()
{
    console.log("server started on port 3000");
});





// API KEY 090c71eb704ddd94df6158c9ddd5b8af-us1

//  LIST ID b955d34997


