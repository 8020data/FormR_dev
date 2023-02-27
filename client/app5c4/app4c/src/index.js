   import   React            from 'react';
   import   ReactDOM         from 'react-dom';
   import { BrowserRouter }  from 'react-router-dom';

   import  '@fortawesome/fontawesome-free/css/all.min.css';
   import  'bootstrap-css-only/css/bootstrap.min.css';
   import  'mdbreact/dist/css/mdb.css';
   import  './App.css';                                          // .(01203.03.3 Override MDB.css here?)

   import   App              from './App';
   import * as serviceWorker from './serviceWorker';

// ReactDOM.render( <App />, document.getElementById( 'root' ) );

   ReactDOM.render(

           <BrowserRouter>
             <App />
           </BrowserRouter>

         ,  document.getElementById( 'root' )
            );

   serviceWorker.unregister( );
