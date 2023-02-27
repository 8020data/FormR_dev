# React-admin tutorial

This is the application built while following the [tutorial](https://marmelab.com/react-admin/Tutorial.html).

## How to run

After having cloned the react-admin repository, run the following commands:

```sh
make install

make run-tutorial
```
<hr>

## Better Setup Instructions (Robin 3/20/21)

1. Create a Working Project folder, open VSCode and save the folder as a workspace
2. Check your NodeJS enironment
   - Use Node version v12 or v14, but not v15
     - You can use `nvm use 14` if you have `nvm` installed 
   - Make sure Create-React-App is not globally installed.  If it is run   
     - `npm uninstall -g Create-React-App` 
   - Make sure you have `npx` installed 
3. Open the Integrated Terminal at the root of the project and run Create-React-App into a new "Client" folder.  Then go into the new "Client" folder. 
   - `npx create-react-app ClientX` 
   - `cd ClientX`     
   - This installs all the React v17.0.+ dependencies into the node_modules folder inside the new "Client" folder.  We'll be deleting all the other React startup files.
4. Clone the entire React-Admin Repository located here  
   - `git clone https://github.com/marmelab/react-admin.git React-Admin`
   - This installs all the React-Admin files, FOR DEVELOPERS. We are only interested in the Tutorial example.
5. In the File Navigation panel, move the examples/tutorial folder into the new "Client" folder and rename it to `app10c0`.  I recommend creating a sub-folder with a decriptive name for app.  Finally copy the `package.json` from the new "App" folder, `app10c0` into the new "Client" folder. This can all be done in the terminal as follows: 
   - `cp -pr React-Admin/examples/tutorial app10c0`
   - `mkdir app10c0/\!_React-Admin Tutorial Example`  
   - `cp -p app10c0/package.json` 
6. Edit the `package.json` file in the new "App" folder, to remove all the dependencies and modify the start script as show below
   ``` 
    "dependencies": { },
    "scripts": {
        "start" : "..\\node_modules\\.bin\\react-scripts  start",
        ... 
    }, 
   ```
   This allows you to run `npm start` from within the "App" folder and prevents  future installation of node_modules into the "App" folders.  This setup up allows one copy of the node_modules in the "Client" folder to be used for multiple "App" folders. 
7. The delete everything except the new "App" and the `node_modules` folder as well as the `package.json` file from the "Client" folder
8. Again open the Integrated Terminal in the "Client" folder, and install the `React-Adnmin` files and any files needed by the "App". 
   - ` npm install`
9. Finally go into the "App" folder and start the React Admin Tutorial App
   - `cd app10c0`
   - `npm start`
10. This "App" folder can be copied into any "Client" folder that has the appropriate versions of `React` and `React-Admin` installed.    

