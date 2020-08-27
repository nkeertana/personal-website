// const nodemailer = require("nodemailer");
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));

// app.post("/email", function(req, res) {
//     console.log("Data: ", req.body);
// })
// let express = require("express"),

const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const express = require("express")
const app = express();


let server = app.listen(3000, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

const oauth2Client = new OAuth2(
    "596701232681-1fuotqh4bn3tiukq58sb43q07esc7r66.apps.googleusercontent.com", 
    "tOHTDbV8tbO17HtSoWc0dyHA", 
    "https://developers.google.com/oauthplayground" 
);

oauth2Client.setCredentials({
    refresh_token: "1//04sOfdlB0UXhhCgYIARAAGAQSNwF-L9Ir05sAWWn6h5U4t55AJBDUk6a0mAXwZ7rL8E2VKmI_W_5LGJ61qUfnUXe55rDV-0hf86E"
});
const accessToken = oauth2Client.getAccessToken()


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res){
    res.sendFile('public/index.html', { root: __dirname });
});



var email = '';
var name = '';
var message = '';



app.post('/email', function (req, res) {
    const smtpTransport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
             type: "OAuth2",
             user: "keertana.namuduri@gmail.com", 
             clientId: "596701232681-1fuotqh4bn3tiukq58sb43q07esc7r66.apps.googleusercontent.com",
             clientSecret: "tOHTDbV8tbO17HtSoWc0dyHA",
             refreshToken: "1//04sOfdlB0UXhhCgYIARAAGAQSNwF-L9Ir05sAWWn6h5U4t55AJBDUk6a0mAXwZ7rL8E2VKmI_W_5LGJ61qUfnUXe55rDV-0hf86E",
             accessToken: accessToken
        }
    });
    console.log(req.body)
    console.log("Name: " + req.body.name + "    Email: " + req.body.email + "   Message: " + req.body.message);
    name = req.body.name;
    email = req.body.email;
    message = req.body.message;
    

let mailOptions = {
    // should be replaced with real recipient's account
    from: 'keertana.namuduri@gmail.com',
    to: 'keertana.namuduri@gmail.com',
    subject: "you're so popular", //req.body.name,
    text: "Name: " + name + "   Email: " + email + "   Message: " + message
};

  smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
          res.send("<h1>There was an error in sending your message. Please try again.</h1>")
      } else {
          res.send("<h1>Your message was sent! I will get back to you ASAP.</h1>")
      }
    smtpTransport.close();
    });
});



//   transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
//     let accessToken = userTokens[user];
//     if(!accessToken){
//         return callback(new Error('Unknown user'));
//     }else{
//         return callback(null, accessToken);
//     }
// });
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log('Message %s sent: %s', info.messageId, info.response);
//   });
//   res.writeHead(301, { Location: 'index.html' });
//   res.end();
// });











// app.listen(3000, function(){
//     console.log("holaaa");
// });
