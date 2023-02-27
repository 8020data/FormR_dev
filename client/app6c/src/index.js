   import   React           from 'react';
   import   ReactDOM        from 'react-dom';
   import { BrowserRouter } from 'react-router-dom';

   import                        './index.css';

   import                        '@fortawesome/fontawesome-free/css/all.min.css';
   import                        'bootstrap-css-only/css/bootstrap.min.css';
   import                        'mdbreact/dist/css/mdb.css';

   import                        './App.css';                      // .(01203.03.3 Override MDB.css here?)
   import   App             from './App-FormR.js';

// import   App             from './App-ConfigurationForm.js';     // .(01212.01.2)
// import   App             from './App-EnrollmentForm.js';        // .(01212.01.3)
// import   App             from './App-FormikContainer.js';       // .(01212.01.4)
// import   App             from './App-LoginForm.js';             // .(01212.01.5)
// import   App             from './App-LookupForm.js';            // .(01212.01.6)
// import   App             from './App-MemberForm.js';            // .(01212.01.7)
// import   App             from './App-RegistrationForm.js';      // .(01212.01.8)

   import   reportWebVitals from './reportWebVitals';

ReactDOM.render(

   <React.StrictMode>
      <BrowserRouter>

        <App />

      </BrowserRouter>
   </React.StrictMode>

 , document.getElementById('root')

   );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

   reportWebVitals();
// reportWebVitals(console.log);
