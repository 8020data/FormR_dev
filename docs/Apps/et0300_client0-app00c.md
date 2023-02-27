# Client0 App00c    (300)
## Create-React-App MT

<img src="Apps/images/et0300_client0-app00c.md_screen1.png"><br>

## Notes:
   To create a React App with only the absolutely essential files, do the following

   - With NodeJS v15, you gotta do
     ```
      mkdir client0
      cd  client0
      npm init  # creates package.json for CRA, not you app
      npm install create-react-app # can't be global anymore
      npx create-react-app app00c  # install another set of node_modules in app folder
      cd  app00c
     ```
   - Remove the following
     - files in `.src`
       ```
        rm ./src/App.test.js
        rm ./src/index.css
        rm ./src/reportWebVitals.js
        rm ./src/setupTests.js
        rm ./src/logo.svg

       ```
     - files in `.public`
       ```
        rm ./public/favicon.ico
        rm ./public/logo192.png
        rm ./public/logo512.png
        rm ./public/manifest.json
        rm ./public/robots.txt
       ```

     - in `./public/index.html`

       ```
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description"  content="Web site created using create-react-app" />
            <title>React App</title>
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
          </body>
        </html>

       ```

     - in `./src/index.js`
       ```
           import React    from 'react';
           import ReactDOM from 'react-dom';
        // import './index.css';
           import App from     './App';
        // import reportWebVitals from './reportWebVitals';

        ReactDOM.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
          document.getElementById('root')
        );

        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

        //  reportWebVitals();
       ```

     - in `./src/App.css`
       ```
        .App {
            border  :   1px solid;
            margin  :  15px 20px;           /* top/bottom right/left */
            padding :   5px 10px 15px;      /* top right/left bottom */
            width   : 250px;
            }
       ```
     - in `./src/App.js`
       ```
           import React from 'react';
           import          './App.css';

        function App() {
          return (

            <div className="App">

              My App

            </div>
          );
       }

       export default App;
       ```

</br>

## Files:

|    Size     | Date Time       |./P08/Master/client0/app00c/  *
| ----------  |---------------  |--------------------------------------------------------------------------
|           0 |2021-02-25 09:03 |./!_Create-React-App, MT
|         809 |2021-02-25 08:40 |./package.json
|        3369 |1985-10-26 04:15 |./README.md
|             |                 |
|           0 |2021-02-25 08:44 |./public
|        1721 |1985-10-26 04:15 |./public/index.html
|        3870 |1985-10-26 04:15 |./public/favicon.ico
|             |                 |
|           0 |2021-02-25 08:44 |./src
|         188 |2021-02-25 09:00 |./src/App.css
|         160 |2021-02-25 08:55 |./src/App.js
|         500 |1985-10-26 04:15 |./src/index.js
|             |                 |

