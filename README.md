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





