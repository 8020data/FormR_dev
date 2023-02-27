
import React   from "react";

// ----------------------------------------------------------------------------

export default function NavBar_Messages( ) {  // Name doesn't matter

    var mTables  = [ [ '/users',             "Users"                  ]
                   , [ '/roles',             "Roles"                  ]
                   , [ '/roles_tables',      "Roles Tables"           ]
                   , [ '/user_roles',        "User Roles Table"       ]
                   , [ '/lookups',           "Look Ups Table"         ]
                   , [ '/tables',            "Tables Table"           ]
                   , [ '/configurations',    "Configurations Table"   ]
                   , [ '/configurations2',   "Configurations Table 2" ]    // .(01208.01.1 RAM Add a table)
                   , [ '/user',              "Sample form"            ]
                     ]








         mTables =  mTables.map( fmtTable )

function fmtTable(  mTable ) {
     var aURI    =  mTable[0]
     var aName   =  mTable[1]
     var pJSX    =  (
                      <a  href={aURI} className="nav-link" style={{color:'black'}}>
                        <i className="far fa-circle nav-icon" />
                        &nbsp;{aName}
                      </a>
                     )
  return pJSX
         }

//        console.log( mTables )
  return (

        <li           className="nav-item dropdown">            {/* Messages Dropdown Menu */}

          <a          className="nav-link" data-toggle="dropdown" href="#/">
                      Admin ({mTables.length})
          </a>

          <div        className="dropdown-menu dropdown-menu-lg dropdown-menu-right">

            <a        className="dropdown-item" href="#/" >
              <div    className="media">                        {/* Message Start */}
                    {/*}  <a href="/users">An unformatted item</a> */}
              </div>                                            {/* Message End */}
            </a>

        { mTables.map( function( aTable, index ) { return (    // .(01124.01.1 RAM Add a unique key to "div")

          <div key={ index }>                                 {/* .(01124.01.2 ) */}
            <div      className="dropdown-divider" />

            <div      className="dropdown-item" href="#/" >
              <div    className="media">
                      { aTable }
              </div>
            </div>
          </div>

           ) } ) }

            {/* <a        className="dropdown-item dropdown-footer" href="/tables" >See All Tables</a> */}
          </div>
        </li>                                                   //* Messages Dropdown Menu End *//

      ) }

