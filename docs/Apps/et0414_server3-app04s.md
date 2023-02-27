# Server3 App03s  (415)
## NodeJS+Express+Sequelize+JWT API for React+Formik Login2

<img src="Apps/images/et0411_server2-app01s_screen1.png" ><br>

## Notes:
This streamlined server takes the four major functions of a server API app
- Connecting to a database using `dbConnect()` and `db.config.json`
- Defining the models using `savModelScripts` and
- Defining the controller functions using `savControllerScripts()`
- Setting up routes and controller functions using `setTableRoutes()`and `getControllers()`
- Executing the controller functions
- Rendering the views in the client-side apps

The following routes are defined before the `setTableRoutes` script consolidates them and their controller functions.

</br>

## Code:
```
 GET    /                                   anonymous (0)
 POST   /api/auth/signup                    checkDuplicateUsernameOrEmail (0)
 POST   /api/auth/signup                    checkRolesExisted (1)
 POST   /api/auth/signup                    anonymous (2)
 POST   /api/auth/signin                    anonymous (0)
 GET    /api/test/all                       anonymous (0)
 GET    /api/test/user                      verifyToken (0)
 GET    /api/test/user                      anonymous (1)
 GET    /api/test/mod                       verifyToken (0)
 GET    /api/test/mod                       isModerator (1)
 GET    /api/test/mod                       doModerator (2)
 GET    /api/test/admin                     verifyToken (0)
 GET    /api/test/admin                     isAdmin (1)
 GET    /api/test/admin                     anonymous (2)
 POST   /api/tutorials                      anonymous (0)
 GET    /api/tutorials                      anonymous (1)
 DELETE /api/tutorials                      anonymous (2)
 GET    /api/tutorials/published            anonymous (0)
 GET    /api/tutorials/:id                  anonymous (0)
 PUT    /api/tutorials/:id                  anonymous (1)
 DELETE /api/tutorials/:id                  anonymous (2)
```
</br></br></br></br>

## Note the following
- My `getControllers()` will redfine all controller function names to `{model}.controller.action`
- We're going to change `signup` to `register` and `signin` to `login`
- Change the `test/role` routes to be `auth/role` with one controller function `checkRole()`
- Get rid of the tutorials table, instead showing how to display and edit the users table
- I think we should build the server-side and client-side lessons according to --
  1. app01c4 --> app01s4: Only uses `login` and `register` with all users being saved into the database
     with the role of `user`.  No middleware authentication using JWT.
  2. app01c5 --> app01s5: Allow any logged in user to displays the users table and assign roles
  3. app01c6 --> app01s6: Implement the role based authentification using JWT middleware on the server.
     The client app will now show different pages depending on the suer's role.
- This means bumping app01c5 to app01c6.  You might object to doing the table example first, but it is
   much simpler on the server side than the authentication stuff, and it follows that we have be able to see
   the users that have registered and we have to have a way to assign them roles before we can create
   role bases sessions.
- How much should I try to keep the original BezKoder structure?
- We need to find a place to keep test scripts and scripts to build the model and controller modules.

</br></br>

## ToDo
  1. Make sure all the controller functions have a meaningful `action` name
  2. Get rid of the `index.js` scripts in the folders, `middleware` and `models`
  3. Rename `signup` to `register` and `signin` to `login`
  4. Change the route name, `test`, to `checkRole`
  5. Create a new test script, `testAuth.js` to go with `testRegister.js` and `testLogin.js`
  6. Rewrite the routes and controller models
  7. Implement checking roles in the middleware modules, or not.


</br></br>

## Files:
```
|    Size     | Date Time       |./P08/Master/server2/app01s/  *
| ----------  |---------------  |--------------------------------------------------------------------------
|           0 |2021-02-24 20:09 |./!_NodeJS+Express+Sequelize+JWT API for React+Formik Login
|             |                 |
|         540 |2021-02-24 19:57 |./package.json
|        1024 |2021-02-19 12:09 |./README.md
|          80 |2021-02-23 18:45 |./.env
|             |                 |
|        4203 |2021-02-24 20:07 |./server.js
|             |                 |
|        1366 |2021-02-23 19:09 |./signin-test.js
|        1469 |2021-02-23 19:09 |./signup-test.js
|             |                 |
|           0 |2021-02-09 10:18 |./api
|           0 |2021-02-23 10:14 |./api/config
|          57 |2020-10-08 13:53 |./api/config/auth.config.js
|        1109 |2021-02-20 14:46 |./api/config/db.config.json
|        7713 |2021-02-23 18:36 |./api/config/db.connect.js

|           0 |2021-02-19 12:09 |./api/controllers
|        2382 |2020-12-13 23:01 |./api/controllers/auth.controller.js
|        4644 |2021-02-19 12:09 |./api/controllers/tutorial.controller.js
|         541 |2021-02-19 12:09 |./api/controllers/user.controller.js

|           0 |2021-02-09 10:18 |./api/middleware
|        2867 |2020-12-13 23:01 |./api/middleware/authJwt.js
|         142 |2020-10-08 13:53 |./api/middleware/index.js
|        1200 |2020-10-08 13:53 |./api/middleware/verifySignUp.js

|           0 |2021-02-23 10:26 |./api/models
|        1151 |2021-02-23 18:24 |./api/models/index.js
|         279 |2021-02-23 10:26 |./api/models/makModels.njs
|         453 |2021-02-20 21:01 |./api/models/role.model.js
|         585 |2021-02-20 21:02 |./api/models/tutorial.model.js
|         495 |2021-02-20 21:04 |./api/models/user.model.js

|           0 |2021-02-19 12:09 |./api/routes
|         653 |2021-02-19 12:09 |./api/routes/auth.routes.js
|        1333 |2021-02-19 12:09 |./api/routes/turorial.routes.js
|         769 |2021-02-19 12:09 |./api/routes/user.routes.js
```

