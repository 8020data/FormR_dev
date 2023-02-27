
Steps to setup a new FormR application folder.  Updated by  RAM 11/11/2020 2:07pm
-----------------------------------------------------------------------------------------------------------------

1) Create this folder structure

    FormR
        master
            client
                app1c
            server
                app1s

2) Copy package.json from your working "client" app and 
   paste it to FormR/client/dev01
3) Copy package.json from your working "server" app and 
   paste it to FormR/server
4) Open Visual Studio Code, File, Open Folder and 
   select FormR, then File, Save Workspace As,  
   to create FormR.code-workspace


Install Node Modules:
-----------------------------------------------------------------------------------------------------------------

1) In VS Code navigate to FormR/client, rt click, 
   Open in Integrated Terminal, and run NPM Install.
2) In VS Code navigate to FormR/server, rt click, 
   Open in Integrated Terminal, and run NPM Install.



Bruce's Steps for new table (incomplete)  e.g. xxxx  <-- formr*.*
-----------------------------------------------------------------------------------------------------------------
Note: in templates all table/fieldnames are lower case. But classes and Components start with a capital.

I. Copy and paste steps.
   1. In templates directory copy and paste all .js files. This renamed copies files to new table name. i.e. xxxx
   2. Determine <<SEARCHCOL>> field as searchfield
   3. modify xxxx.routes.js
      a. Match Case => Search + Replace Formr = > Xxxx
      b. Match Case => Search + Replace formr = > xxxx
   4. modify xxxx.model.js
      a. Match Case => Search + Replace Formr = > Xxxx
      b. Match Case => Search + Replace formr = > xxxx
      c. Run in SSMS script - formr.model.sql and paste 1 result set into xxxx.model.js 
      -- In script Search + Replace Formr = > Xxxx
      -- Do not copy id, createdAt or updatedAt fields. -- Use existing id code and rename to xxxx id name.
   5. modify xxxx.component.js
      a. Match Case => Search + Replace Formr = > Xxxx
      b. Match Case => Search + Replace formr = > xxxx  
      c. Run in SSMS script - formr.component.sql and paste 4 result sets into xxxx.component.js 
      -- In script Search + Replace Formr = > Xxxx
      -- Do not copy createdAt or updatedAt fields. 
   6. modify xxxx-add.component.js
      a. Match Case => Search + Replace Formr = > Xxxx
      b. Match Case => Search + Replace formr = > xxxx  
      c. Run in SSMS script - formr-add.component.sql and paste 6 result sets into xxxx-add.component.js 
      -- In script Search + Replace Formr = > Xxxx
      -- Do not copy createdAt or updatedAt fields. 
   7. modify xxxx.service.js
      a. Match Case => Search + Replace Formr = > Xxxx
      b. Match Case => Search + Replace formr = > xxxx
      c. Match Case => Search + Replace <<SEARCHCOL>> = > searchfield
   8. modify xxxx.controller.js
      a. Match Case => Search + Replace Formr = > Xxxx
      b. Match Case => Search + Replace formr = > xxxx  
      c. Match Case => Search + Replace <<SEARCHCOL>> = > searchfield
      d. Run in SSMS script - formr.controller.sql and paste 1 result set into xxxx.controller.js 
      -- In script Search + Replace Formr = > Xxxx
      -- Do not copy createdAt or updatedAt fields. 
   9. modify xxxx-list.component.js
      a. Match Case => Search + Replace Formr = > Xxxx
      b. Match Case => Search + Replace formr = > xxxx  
      c. Match Case => Search + Replace <<SEARCHCOL>> = > searchfield
      d. Run in SSMS script - formr-list.component.sql and paste 1 result sets into xxxx-list.component.js 
      -- In script Search + Replace Formr = > Xxxx
      -- Do not copy createdAt or updatedAt fields. 
   

II. Copy modified files into their code locations. NOTE: Used singular xxxx, no 's'
    1. Copy  server\app1s\api\models\xxxx.model.js  
    2. Copy server\app1s\api\controller\xxxx.controller.js
    3. Copy server\app1s\api\routes\xxxx.routes.js
    4. Copy client\app1c\src\components\xxxx.component.js
    5. Copy client\app1c\src\components\xxxx-add.component.js 
    6. Copy client\app1c\src\components\xxxx-list.component.js
    7. Copy client\app1c\src\services\xxxx.service.js

III. Other modifications
    1. Modify client\app1c\src\components\content.js

       import Role          from './role.component';
       import RoleAdd       from './role-add.component';
       import RoleList      from './role-list.component';

      <Route       path="/roles/:id"        component={Role}       />
      <Route exact path="/addrole"          component={RoleAdd}    />
      <Route exact path={["/", "/roles"]}   component={RoleList}   />

    2. Modify server\app1s\server.js

       require(   './api/routes/xxxx.routes'     )( app );

    3. Modify server\app1s\api\models\index.js
       NOTE: there is mixed plurals here:
       db.user           = require( "../models/user.model.js"     )( sequelize, Sequelize );
       db.role           = require( "../models/role.model.js"     )( sequelize, Sequelize );
       db.configurations = require( "../models/configuration.model.js"     )( sequelize, Sequelize );
       db.tutorials      = require( "../models/tutorial.model.js" )( sequelize, Sequelize );
       db.members        = require( "../models/member.model.js"   )( sequelize, Sequelize );   // .(01028.03.1 RAM Added)
       db.tables         = require( "../models/table.model.js"    )( sequelize, Sequelize );   // .(01115.01.2)

    4. Modify client\app4c\src\components\navbar-admin-tables.js  for admin tables

IV. Table DB, File, Object and Variable names: Singular  vs. Plural, Capitalization

	   // .(01123.05.1 BTR db.Lowercase-Plural-Tablename =  require(  '../models/Lowercase-Single-Tablename' ) )
	   // .(01123.05.2 BTR    Lowercase-Single-Tablename =  squelize.define( 'db.Lowercase-Single-Tablename' ) )
	   // .(01123.05.3 BTR    Lowercase-Single-Tablename =                    db.Lowercase-Plural-Tablename  )

	   In '../models/index.js':                db.formrs =  require( '../models/formr.model.js' )( sequelize, Sequelize );
	   In '../models/formr.model.js'        const formr  =  sequelize.define( 'formr', {
	   In '../models/formr.controller.js'   const formr  =  db.formrs;


	   // .(01123.05.1 RAM db.Lowercase-Plural-Tablename =  require(  '../models/Lowercase-Single-Tablename' ) )
	   // .(01123.05.2 RAM    Lowercase-Single-Tablename =  squelize.define( 'db.Lowercase-Single-Tablename' ) )
	   // .(01123.05.3 RAM    Lowercase-Single-Tablename =                    db.Lowercase-Plural-Tablename  )

	   In '../models/index.js':                db.formrs =  require( '../models/formr.model.js' )( sequelize, Sequelize );
	   In '../models/formr.model.js'        const formr  =  sequelize.define( 'formr', {
	   In '../models/formr.controller.js'   const formr  =  db.formrs;


Create .gitignore in \client:
-----------------------------------------------------------------------------------------------------------------
  # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*


Create .gitignore in \server:
-----------------------------------------------------------------------------------------------------------------

node_modules
package-lock.json
dist/
plugins/
plugins-unused/
_*/




Set credentials for accessing GitHub repository
----------------------------------------------------------------

puttygen
-----------------------
1. c:> puttygen
2. generate 
3. save public file ie. bt-2020-11-04.ppub   desktop
4. save private key ie. bt-2020-11-04.ppk    desktop

5. open ppub in notepad
6. remove header and footer
7. add -> ssh-rsa and a space in front of the public key string

8. Sign in to github
9. https://github.com/settings/keys 
10. New SSH key
11. name = BT-2020-11-04
12. key = paste from 7. above

Added for VSCode OpenSSH - Note can't use puttygen for VScode.
1. Install git for windows
2. From the working folder right click and git bash (wwwroot\FormR)
3. type ssh-keygen, no passphrase
4. Go to the current users folder .ssh and copy the id-rsa.pub key
5. Go to git for formr and for user ie brucetroutman-gmail, 
go to setting ssh keys and add a new ssh key and paste fro the id-rsa.pub file.
6. The VScode sync should work.

git commands to add user.name etc
---------------------------------------
git config --global user.name "Bruce Troutman"
git config --global user.email "bruce.troutman@gmail.com"
git config --global user.password "!PassWord6"


Upload to a repository for the first time
-----------------------------------------------------------------------------------------------------------------
-- sign in first
 $ git remote add origin git@github.com:brucetroutman-gmail/formr.git
 $ git branch -M main
 $ git push -u origin main


Clone a repository using Tortoise, or git or VSCode
----------------------------------------------------------------------
      cd WEBs/Projects-folder
      git clone https://github.com/brucetroutman-gmail/formr.git FormR
      cd FormR 


Pull a repository  
----------------------------------------------------------------------
 1. Create a "remote" name: origin using Tortoise (which runs git commands)

    - this is an alias for a URL to the repository.  It can either be 
       git@github.com:brucetroutman-gmail/formr.git   for SSH certificate keys, or
       https://github.com/brucetroutman-gmail/formr.git   for Username and Password credentials

    - It runs this command
       git remote add origin git@github.com:brucetroutman-gmail/formr.git

    - as well as these commands to set the path to the putty private key
       git config remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
       git config remote.origin.puttykeyfile C:\Users\robin\.ssh\id_rsa_Bruce-FormR_robinmattern@github.com_v01103.ppk

2. Pull the remote named "origin" and the branch "master" 

    - using git
       git pull origin master 

    - using Tortoise  
       Remote Name:   origin
       Remote Branch: master

    - using vscode
       Open SOURCE CONTROL REPOSITORIES
         Folder/workspace name
       Pull
         Uses selected branch: master

 3. Push a new branch up to the repository
    - using vscode
       Click on selected branch: master 
       Select action: Create new branch
         Enter name: Dev02
       Click on Sync button 

 4. Upload changes
    - using vscode 
        stage and commit changes
        Click on Sync button             
         
      
-----------------------------------------------------------------
You can create a new Branch easily in VSCode
Then you can "Publish Changes" it to the repository"

Tools ----------------------------------------------------------------
1. Install AdminLTE in client public  dist+plugins
4. In VSCode install Extension Git Lens.






       
