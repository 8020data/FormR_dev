## This is in btg/FormR-dev

- FormR is a project that defines all the steps required to develop and test Rapid Application Development (RAD) web database applications. The application takes a database connection and table name and generates CRUD functionality. This is the next generation of FormX that was developed for the Microsoft platform and used for 20 years in more than 25 applications for the US federal government. The sponsor for this project is the Institute of Database Developers (IODD). 

- FormR is an easy to use application that uses a Sequelize, ExpressJS, React-Admin and NodeJS (MERN) stack. The coding philosophy leans more towards DAMP ("Descriptive and Meaningful Phases") and DRY ("Don't Repeat Yourself") than  WET ("Write Every Time").

- A NodeJS ExpressJS server is used to receive API calls that use Sequelize to perform database tasks using any database server.  

- A React-Admin client is used to provide authentication of  users and standard create, retrieve, update and delete (CRUD) functions for any database table. JWT and Axios are used for authentication. AdminLTE is used for the user interface (UI) and Formik and YUP for data entry forms.




The magic occurs by just providing a connection to a remote or local database, and having the
application know how to perform the CRUD operations on the columns for any and all table. 
FormR also can be customized when the default API actions or column schema needs to be customized.

This example connects to an IODD database server that contains a database containing informaton 
related to developers, members of the Institute of Database Developers, who can provide expert 
advise on building business database application.

The documentation herein also provides step by step instruction on how to setup a Virtual Private 
Server that can connect to a database server and publish the FormR application.  

- Server is configured to serve both scripting and database services. Separating them on different servers would increase the documentation effort and doesn't add to a developer's understanding.
- Creation of production platforms are outside for our scope, because their multiple security issues are not developer responsibilities and would distract from our goal. 
- Documentation will include Ubuntu on a local development server (VMFusion), a Vultr server and an AWS server.
- The documentation is writtem in Markdown and uses Docsify.
- The primary development tools are:
    1. VSCode in Windows VM
    2. Mysql Workbench in Windows VM
- The products used are:
    1. Ubuntu 18-04 Server x64
    2. Mysql Community Edition
    3. Create React App
    4. React-Admin
    5. AdminLTE
    6. Formik
    7. GitHub
- The basic setup tasks include:
    1. Setup of a developer's workstation
        1. Setup VSCode
        2. Install Extensions
        3. Install BitVise
        4. GitHub
        5. Create directories  \repos \remotes
    
    2. Setup account in a cloud service
        1. Add additional user

    3. Setup of Ubuntu server
        Install
        Hardening
        Connecting

    4. Setup of Mysql on Ubuntu
        Install
        Hardening
        Connecting

    5. Setup Node, Express etc

    5. Team Communication

- Credit is given to many whose tutorials, videos and blogs have provided inspiration, information and insight into these topics. We especially thank  We especially thank BezKoder.com, Ben Awad, Jared Palmer, Jason Watmore, 
GraspingTech.com , LifeWire.com, SQL-Hub.com, W3Schools.com,
