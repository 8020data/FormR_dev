import React from 'react';
import './components.css';

const Result = ({ children }) => {
  return (
    <div className='result-demo'>
{/*   <div>{ children.map( pChild => { return ( pChild + <br></br> ) } ) }</div> */}{/*#.(01206.02.1 RAM Displays [object Object][object Object]) */}
      <div>{ children                                                    }</div>    {/* .(01206.02.1) */}
    </div>
  );
};

export default Result;
