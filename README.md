https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

# What is a REST API?

Is an acronym for Representational State Transfer. It's a web standard architecture and HTTP Protocol. The REST architectural style describes six constrains that were originally communicated by Roy Fielding in his doctoral dissertation and defines the basis of RESTFULL style as:

1. Uniform Interface
2. Stateless
3. Cacheable
4. Client-Server
5. Layered System
6. Code on Demand (optional)

RESTful applications use HTTP requests to perform four operations termed as CRUD (C: create, R: read, U: update, and D: delete).

**TOOLS**
Node.js
MongoDB
Text editor (Visual Studio Code, Atom, Sublime, etc)
Postman or Insomnia

**Getting started**
To get start you must have the node.js and mongodb installed on your machine. if not you can go to the following links and install it:

https://nodejs.org/en/

https://www.mongodb.com/try/download/community

After installing the software you can go to your prompt and check if they show the version by writing the following commands:

```bash
    npm -v
    mongo --version
```

**Setup**

In this example I will create an API to handle with users.

1. Create a folder named UsersManagement or go to your termianl and use the following command:

```bash
    mkdir UserManagement
```

2. Navigate to the root of your newly created folder, or use the terminal:

```bash
    cd UserManagement
```

3. Create a package.json file. Package.json is a file that gives the necessary information to npm wich allows it to identify the project as well as handle the project's dependecies.

```bash
    npm init
```

We must install the dotenv package to get our variables from the .env file

```Bash
    npm i dotenv
```

In the file you will see something like this:

```bash
    {
        "name": "usermanager",
        "version": "1.0.0",
        "description": "RESTful usermanagerAPI",
        "main": "index.js",
        "script": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "repository": {
            "type": "git",
            "url": "git+https://github.com/danielalbino/usermanagerAPI.git"
        },
        "keywords": [
            "RESTful",
            "API"
        ],
        "author": "Daniel Albino",
        "license": "MIT"
    }
```

4. Create a new file called server.js, in terminal:

```bash
    touch server.js
```

In this file, we are going to write all the protocols to create our server.

5. Create a folder callet API.

```bash
    mkdir api
```

Inside this folder create three separate folders called models, routes and controllers.

```bash
    mkdir api/controllers api/models api/routes
```

6. Cerate a UserController.js in the api/controller folder, userRoutes.js in the routes folder, and a userModel.js in the model folder.

```bash
    touch api/controllers/userRoute.js api/models/userModel.js api/routes/userRoutes.js
```

**Server setup**

Now we are going to install express and nodemon. express will be used to create the server while nodemon will help us to keep track of changes to our application by whatching changed files and automatically restart the server.

```bash
    npm install --save-dev nodemon
    npm install express --save
```

After the installation, your package.json file will be modified th have the two newly installed packages.

Now you can go to the packages.json file and add this new task to the script

```bash
    "start": "nodemon server.js"
```

Open server.js file and type/copy the code bellow:

```bash
    const express = require("express"),
         app = express(),
         port = process.env.PORT || 3000;

    app.listen(port);
    console.log("User Management RESTfill API server started on port " + port);
```

Now in the terminal run the following code to start the server, if it is everything ok you will see the message "User Management RESTfill API server started on port 3000".

```bash
    npm run start
```

**Setup MongoDB Connection**

Before starting to configure the connection to the mongodb we must install the package first:

```bash
    npm install mongoose --save
```

After installation, opend the userModel.js file and type the following code into the file:

```bash
   'use strict'
    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        name:{
            type: String,
            required: true
        },
        Create_date: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model("Users", userSchema);
```

The above code is to create our model of how our collection should look like. As tou can see, it the task collection (table) will contain a name: a string, and the date it was created.

**Routes setup**

Routing refers to determining how an applocation responds to a client reques for a specifit endpoint, which is a URI (or patch) and a specific http request method (GET, POST, etc.).
Each of our routes has diferent route handler functions, which are executed whe the route is matched.

Now we are going to define those routes. We are going to create to basic routes, "/users" and "/users/userId" with diferente methods. For "/user" has two methods "GET" and "POST", while "/users/userId" has "GET","PUT" and "DELETE".
We required the controller so each of the routes methods can call it's respective handler function.

So to do this we are going to the userRoutes.js file and add the following code.

```bash
    'use strict';
    module.exports = function(app) {
    var todoList = require('../controllers/userController');

    // todoList Routes
    app.route('/users')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);


    app.route('/users/:userId')
        .get(users.read_a_user)
        .put(users.update_a_user)
        .delete(users.delete_a_user);
    };
```

**Controller setup**
Now we are goin to the usersController.js file to create 5 diferente functions, list_all_users, create_a_user, read_a_user, update_a_user and delete_a_user.
We will export each of the functions for us to use in our routes.
Each of these functions uses diferent mongoose methods such as find, findById, findOneAndUpdate, save and remove.

```bash
    'use strict';

    var mongoose = require('mongoose'),
    User = mongoose.model('Users');

    exports.list_all_users = function(req, res) {
        User.find({}, function(err, user) {
            if (err)
            res.send(err);
            res.json(user);
        });
    };


    exports.create_a_user = function(req, res) {
        var new_user = new User(req.body);
        new_user.save(function(err, user) {
            if (err)
            res.send(err);
            res.json(user);
        });
    };


    exports.read_a_user = function(req, res) {
        User.findById(req.params.userId, function(err, user) {
            if (err)
            res.send(err);
            res.json(user);
        });
    };


    exports.update_a_user = function(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
            if (err)
            res.send(err);
            res.json(user);
        });
    };


    exports.delete_a_user = function(req, res) {
        User.remove({
            _id: req.params.userId
        }, function(err, user) {
            if (err)
            res.send(err);
            res.json({ message: 'User successfully deleted' });
        });
    };
```

**Server.js**
Now that we alreadyconfigured all the files, it is time to go back to our server.js to add a litle more code. What we are going to do now, is to create our connection to the database, load our models and we are going to install bodyParser.

BodyParser:
We use bodyParser Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
It exposes various factories to create middlewares. All middlewares will populate the req.bodyproperty with the parsed body, or an empty object ({}) if there was no body to parse (or an error was returned).

```bash
    var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/userModel'), //created model loading here
    bodyParser = require('body-parser');

    // mongoose instance connection url connection
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/Usersdb');


    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    var routes = require('./api/routes/usersRoutes'); //importing route
    routes(app); //register the route


    app.listen(port);


    console.log('Users RESTful API server started on: ' + port);
```

Now we are going to add our middleware in the file

```bash
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
```
