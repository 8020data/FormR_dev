import React, { Component } from "react";

import BoardService from "../services/board.service";  // .(01119.02.5 RAM Rename UserService to BoardService)

export default class BoardUser extends Component {

  constructor( props ) {

    super( props );

    this.state                   = { content: "" };
    }

  componentDidMount() {

    BoardService.getUserBoard().then(                  // .(01119.02.6)
      response => { 
                    this.setState( { content:      response.data }); },
      error    => { 
                    this.setState( { content: (    error.response 
                                                && error.response.data 
                                                && error.response.data.message 
                                                   )
                                            ||  error.message 
                                            ||  error.toString()
                                      } );
                    }
      );
    }

  render() {
    return (

      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>

    );
  }
}
