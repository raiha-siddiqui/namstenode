# DevTinder 
# Steps to create a project
# initialize the prject


- npm init
- create src folder src->app.js
- install express => npm i express
- install nodemon => npm install --save-dev nodemon (it automatically refresh the server)
- initialise git repository =>git init
- never push node modules to github bzc it can regenerate and its not the core code
- craete gitignore file to ignore unnecssary filespush to github
- git add . (dot add all the files)
- git commit -m "message"
- initialize postman to test api's
# connecting to db
- npm i mongoose 
- create a config folder in src and then database .js file (src=>config=>database.js)
- create a model folder models=>user.js
- require mongoose in User model and create schema 
- create an instance of user model by using an async function in app.js for signup api and add hardcoded data over there
- validate function in user scema at the gender field will not run when you update the user it will only run when you create a new user if you want to enable it for updating user you have to explicitly allow to run a function by using =>runValidator: true by default it is off for updating the user
- add api level validation in patch request 

#
- install validator to validates schema or data
- password should not be stored as a string in db they stored in hashed format or encrypted password
# signup api validation
- validation of data 
       - create util folder and => validation.js file
- encrypt password
       - install bcrypt library  npm i bcrypt
- store in db
# signin api
- extract email and pass from req body
- find user from User model by emailId
- if there is no user throw error
- if user is present then compare password by bcrypt
- if password comparison is correct then send response else throw error

# Authentication in login api
- in TCP/IP protocol you make the connection get the data and connection closed
- after comparing the password by bcrypt it time to create JWT token 
- then add token to cookie and send back response to user
- for reading cookie we need a middleware which is cookie parser for example i login and the server generate a token and stored in a cookie whenever i do another request the cookie or token must go with that request for that we need moddleware to read the cookie first parse and then read
- install cookie-parser => npm i cookie-parser
- for creating token install jsonwebtoken pkg => npm i jsonwebtoken
# Creating auth middleware which authenticate user
- Read the token from cookie
- validate the token
- Find user from db
- we can also expires our cookies other than jwt token by send in response as a parameter expires:newDate(Date.now)+8*3600000   // meaning for 8 hours






