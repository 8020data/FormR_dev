import React, { Component } from 'react';
import UserService          from '../services/board.service';

export default class Home extends Component {

// ---------------------------------------------------

  constructor(props) {

    super(props);

    this.state = {
      content: ""
    };
  } // eom constructor{ ... }
// ----------------------------------------------------

  componentDidMount() {

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) || error.message || error.toString()
        });
      }
    );
  } // eom componentDidMount{ ... } 
// ----------------------------------------------------

  render() {
    return (

      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>

    );
  } // eom render( ... ) 
// ----------------------------------------------------  
}
