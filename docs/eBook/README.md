
-------------------------------------------------------------

### <u> 1. Create App Developers Workstation</u>

  - Install Tools (Node, Git, VSCode, BeyondCompare, etc)
  - Create Project Folders
  - Master
  - Dev03
    ```
      _3/JSTools
      client
      docs
      server
    ```
  - Install Server Modules
    ```
      Axios, BCytptJS
      Express, JWT
    ```
  - Install Client Modules
    ```
      Axios, BCytptJS
      React (?? CRA does this)
      React-Admin (??)
      React-Hook-Form
      YUP
    ```
-------------------------------------------------------------

### <u> 2. Create React App</u>

  - Install Facebook's CRA
    ```
    Client
      CRA00c
        public
          index.html
        src
          APP.css
          APP.js
          index.js
        package.json
      node_modules
      package.json
      README.md
    ```
  - Run CRA     
    `$ npm start`

-------------------------------------------------------------

### <u> 3. Create 1st Data Edit App</u>

  - Clone FormR Repository
  - Use FormR to Define Local JSON Data
    ```
    Client
      _4/FORMRc/Tools
      JSON1c/src/
        Views
    Server
      _4/LDATAs/JSON
      _4/FORMRs/Tools
      JSON1s/api
        Controllers
        Models
        Routes
      server.js
    ```
  - Use FormR to Edit Spreadsheet Data     
    `$ npm run both`

-------------------------------------------------------------

### <u> 4. Install Local Database Server</u>

-------------------------------------------------------------

### <u> 5. Create 2nd Data Edit App</u>

  - Use FormR to Extract and Edit World DB Schema
    ```
    Client
      WORLDc/src/
        Views
    Server
      WORLDs/api
        Controllers
        Models
        Routes
    ```
-------------------------------------------------------------

### <u> 6. Add User Authentication</u>

  - Clone FormR Example Repository
    ```
    Client
      _4/FORMRc/Auth
      APP01c1,2,3,4,5,6,7,8,9/src
    Server
      _4/FORMRs/Auth
      WORLDs/api
    ```
  - Create React Form Example
     1. Create React App
     2. Hello World (React+HTML)
     3. Login Form with React+HTML
     4. Login Form using Server JWT Auth API
     5. Login Form adding Style
     6. Login and Register User Validation
     7. Role Based Menus NavBar
     8. React-Admin User Auth DB Maintenance
     9. React-Admin World DB Maintenance

-------------------------------------------------------------

### <u> 7. Restructure for Multi-DB App</u>

  - Move Seperate DB Apps into One App
    ```
    Client
      _4/FORMRc
      MDBAPPc/api
        WORLD
        IODD
    Server
      _4/FORMRs
      MDBAPPs/api
        WORLD
        IODD
    ```
-------------------------------------------------------------

### <u> 8. Review Final Sructure</u>      
     
  - This is what it will look like at the end of the book.
    ```
    Project1
      Master
      Dev03
        _3/JSTools
        Client
          _4/FORMRc/Auth
          _4/FORMRc/Tools
          APP01c1,2,3,4,5,6,7,8,9/src
          CRA01c/src
          JSON1c/src
          WORLDc/src
          MDBAPPs
            public
              index.html
            src
              Components
              WORLD
                Views
              IODD
                Views
              APP.css
              APP.js
              index.js
            .env
            package.json
          node_modules
          package.json
          README.md
        docs
          _sidebar.md
          index.html
          README.md
        Server
          _4/LDATAs/JSON
          _4/FORMRs/Auth
          _4/FORMRs/Tools
          CRA01s/src
          JSON1s/src
          WORLDs/src
          MDBAPPs
            api
              WORLD
                Controllers
                Models
                Routes
              IODD
                Controllers
                Models
                Routes
            server.js
            .env
            package.json
          node_modules
          package.json
          README.md
    ```   
-------------------------------------------------------------

### <u> 9. Setup Cloud Server Provider</u>

-------------------------------------------------------------

### <u>10. Create Database Server</u>

-------------------------------------------------------------

### <u>11. Create Production App Server</u>

-------------------------------------------------------------

### <u>12. Deploy FormR Muti-DB App Server</u>

-------------------------------------------------------------
