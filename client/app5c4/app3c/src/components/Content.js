    import React from 'react'
     import { Switch, Route } from 'react-router-dom';
//  import 'bootstrap/dist/css/bootstrap.min.css';
//  import './App.css';

    import AddTutorial             from './add-tutorial.component';
    import Tutorial                from './tutorial.component';
    import TutorialsList           from './tutorials-list.component';

    export default function Content() {
      return (
        <div className="content-wrapper">

           <div className="container mt-3">
             <Switch>
               <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
               <Route exact path="/add"                component={AddTutorial} />
               <Route       path="/tutorials/:id"      component={Tutorial} />
             </Switch>
           </div>

        </div>
      )
    }

