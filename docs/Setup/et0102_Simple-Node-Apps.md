
# Creating Node Applications on the MERN stack development workstation

## Introduction

The following steps create several basic node applications. There is a script, server, client and MySQL testing application. Each has special requirements. We will create a folder structure and install the required packages. Everything will be installed in the repos/myProject folder. All activities will be done in VSCode.

### 1. Test the Node version.

1. In VSCode select the myProject folder and open terminal

![Node-test-terminal](../images/et0102-01_Node-test-terminal.png#img2 "Node-test-terminal")

2. From terminal enter:
```
     node --version
```

![Node-test](../images/et0102-02_Node-test.png#img2 "Node-test")

### 2. Create sub-folders in myProject

1. Click on myProject and create a new folder:

![Node-new-folder](../images/et0102-03_Node-new-folder.png#img2 "Node-new-folder")

2. Create the following myProject sub-folders:
```
     client
     docs
     scripts
     server
     server/app01s
```

![Node-create-folders](../images/et0102-04_Node-create-folders.png#img2 "Node-create-folders")

### 3. Create a new file, batch.js, in the scripts folder and run it with Nodejs.

1. Create an empty file, batch.js

![Node-create-empty-file](../images/et0102-05_Node-create-empty-file.png#img2 "Node-create-empty-file")

2. Add some code to batch.js:
```
console.log("Hello, World!");
```

![Node-add-to-batch](../images/et0102-06_Node-add-to-batch.png#img2 "Node-add-to-batch")

3. Open terminal, change folder to scripts then enter:
```
node batch.js
```

![Node-run-batch](../images/et0102-07_Node-run-batch.png#img2 "Node-run-batch")


### 4. Create a new file, server.js in the server folder and run it with Nodejs.

- In the next steps we will install using npm (node package manager) which will create and populate a new folder node_modules. This folder can be very large in size but does not need to be tracked in GitHub. Files in .gitignore will not be tracked in GitHub. 

1. Create a new file in the myProject folder, .gitignore and add:
```
node_modules
```

![Node-gitignore](../images/et0102-08_Node-gitignore.png#img2 "Node-gitignore")

2. From terminal on the server folder enter:
```
npm install express
```

![Node-install-express](../images/et0102-09_Node-install-express.png#img2 "Node-install-express")

![Node-install-express-finish](../images/et0102-10_Node-install-express-finish.png#img2 "Node-install-express-finish")

3. Create a new file, server.js in the server/app01s folder and add this code:

```
const express = require("express")
const app = new express();
app.use('/',myPage)

function myPage(req, res){
    var url = req.originalUrl;
    //send to browser
    res.send(`Hello, World from ${url} !`)
}

// set port
const PORT       =   process.env.PORT || 8080; 
// listen for requests
app.listen( PORT, () => {
    console.log(   `Server is running on port ${PORT}.` );
    } );

```

![Node-create-server-js](../images/et0102-11_Node-create-server-js.png#img2 "Node-create-server-js")

4. Open terminal, change folder to server/app01c then enter:
```
node server.js
```
- Terminal shows server running on port 8080

![Node-terminal-server-js](../images/et0102-12_Node-terminal-server-js.png#img2 "Node-terminal-server-js")

- Browser responds with Hello World...

![Node-browser-server-js](../images/et0102-13_Node-browser-server-js.png#img2 "Node-browser-server-js")

5. Push your changes to GitHub
     1. Open Souce Control
     2. Add description- Added Node apps
     3. Click the checkmark to Commit
     4. Click the sync icon

![Node-github-server-js](../images/et0102-14_Node-github-server-js.png#img2 "Node-github-server-js")

![Node-github-sync](../images/et0102-15_Node-github-sync.png#img2 "Node-github-sync")


### 5. Create a basic react app in the client folder and run it with Nodejs.

1. Open terminal, change folder to client then enter:
```
npx create-react-app app01c
```

![Node-create-react-app](../images/et0102-16_Node-create-react-app.png#img2 "Node-create-react-app")

![Node-create-react-app-finish](../images/et0102-17_Node-create-react-app-finish.png#img2 "Node-create-react-app-finish")

2. From the terminal, chanage folder to client/app01c then enter:
```
npm start
``` 

![Node-start-app](../images/et0102-18_Node-start-app.png#img2 "Node-start-app")

3. Push your changes to GitHub
     1. Open Souce Control
     2. Add description- Added Node apps
     3. Click the checkmark to Commit
     4. Click the sync icon


### 6. Create a Nodejs routine to access the local MySQL database and return information.

1. Install Sequelize. It will be used to connect to and access information in MySQL. Open terminal, change folder to server then enter:
```
npm install --save sequelize
npm install --save mysql2
```
![Node-install-sequelize](../images/et0102-19_Node-install-sequelize.png#img2 "Node-install-sequelize")

![Node-install-mysql2](../images/et0102-20_Node-install-mysql2.png#img2 "Node-install-mysql2")

2. In the folder server/app01s create a new file, queryDB.js. Enter the following and then changed the password for your MySQL root login.
```
//--------------------------------------------------------
const DB = '' // change to 'practice in Create Table step below.'
const dialect = 'mysql'
//--------------------------------------------------------

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB, "root", "<password>", {
  host: "localhost",
  dialect: dialect, 
});

//------------------------------------------------------------
// The following steps exercise queries on MySQL from nodejs.
//
// Uncomment then run each SQLstr from the terminal > 'node 00-queryDB' ,then
// comment the line and uncomment the next one and run it.
// 
//------------------------------------------------------------

// 1. - DROP then CREATE DATABASE ---> DB should be '' at top of this page
const SQLstr = "DROP DATABASE practice"
//const SQLstr = "CREATE DATABASE practice"
 
// 2. CREATE TABLE --> Change DB to 'practice' at top of this page
//const SQLstr = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))"

// 3. SHOW TABLES 
//const SQLstr = "SHOW TABLES"

// 4. INSERT 1 ROW
//const SQLstr = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"

// 5. UPDATE 1 ROW 
//const SQLstr = "UPDATE customers SET address = 'Highway 40' where id = 1"

// 6. Create a Stored Procedure
//const SQLstr = "CREATE PROCEDURE `sp_getcustomers` () Select id, name,address from customers ;"

// 7. Execute a Stored Procedure
//const SQLstr = "Call sp_getcustomers"

// 8. Clean Up - Optionally DROP DATABASE
//const SQLstr = "DROP DATABASE practice"

//------------------------------------------------------------

runQuery();
async function runQuery() {
  try { 
  const values = await sequelize.query(SQLstr);
  console.log(values);
  } catch (error) {
    console.log(error);  
  }
}
```

![Node-create-queryDB](../images/et0102-21_Node-create-queryDB.png#img2 "Node-create-queryDB")

3. Open terminal, change folder to server/app01s then enter:
```
node queryDB
```

- "DROP DATABASE practice" fails. It hasn't been created. We need to create it in the next script

![Node-drop-database](../images/et0102-22_Node-drop-database.png#img2 "Node-drop-database")

- Run Create Database practice by commenting out "Drop Database" and uncommenting "Create Database", then run node queryDB again

![Node-create-database](../images/et0102-23_Node-create-database.png#img2 "Node-create-database")

- At the top of queryDB.js change DB = '' to DB = 'practice'. 
- Comment out "Create Database" and uncomment "Create Table" then run node queryDB

![Node-create-table](../images/et0102-24_Node-create-table.png#img2 "Node-create-table")

- Comment out "Create Table" and uncomment "Show Tables" then run node queryDB

![Node-show-tables](../images/et0102-25_Node-show-tables.png#img2 "Node-show-tables")

- Comment out "Show Tables" and uncomment "Insert 1 Row" then run node queryDB

![Node-Insert-1-row](../images/et0102-26_Node-Insert-1-row.png#img2 "Node-Insert-1-row")

- Comment out "Insert 1 Row" and uncomment "Update 1 Row" then run node queryDB

![Node-update-1-row](../images/et0102-27_Node-update-1-row.png#img2 "Node-update-1-row")

- Comment out "Update 1 Row" and uncomment "Create Stored Procedure" then run node queryDB

![Node-create-stored-procedure](../images/et0102-28_Node-create-stored-procedure.png#img2 "Node-create-stored-procedure")

- Comment out "Create Stored Procedure" and uncomment "Execute Stored Procedure" then run node queryDB

![Node-execute-stored-procedure](../images/et0102-29_Node-execute-stored-procedure.png#img2 "Node-execute-stored-procedure")

- Comment out "Execute Stored Procedure" and uncomment "Clean Up" then run node queryDB

![Node-clean-up](../images/et0102-30_Node-clean-up.png#img2 "Node-clean-up")


4. Push your changes to GitHub
     1. Open Souce Control
     2. Add description- Added Node apps
     3. Click the checkmark to Commit
     4. Click the sync icon

---  

### Congratulations! You have run Node applications that test your development environment.

---