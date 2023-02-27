  import   React                                                              from "react";
  import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

// ------------------------------------------------------------------------------------

  const  DropDown1 = ( aValidActions ) => {

     var mRoleActions = // Table URL Link    ID   Role      Actions          Codes
//                         ---------------   --   -----     ----------       -------
                      [ [ '/configurations',  0, 'admin' , 'all,delete'   , 'v,e,a,d' ]
                      , [ '/configurations',  0, 'all'   , 'view'         , 'v'       ]
                      , [ '/configurations',  0, 'mod'   , 'edit'         ,   'e'     ]

//                    , [ '/configurations',  3, 'all'   , 'view'         , 'v'       ]
                      , [ '/configurations',  3, 'user'  , 'view,edit'    , 'v,e'     ]
                      , [ '/configurations',  3, 'mod'   , 'edit,apprv'   ,   'e,d'   ]
                      , [ '/configurations',  3, 'apprv' , 'apprv,delete' ,   'e,a'   ]
//                    , [ '/configurations',  3, 'admin' , 'all,delete'   , 'v,e,a,d' ]

                      , [ '/configurations', 14, 'admin' , 'all'          , 'v,e,a,d' ]
                        ]

     var mActions     = // Table URL Link     Action     Code1    Code
//                         ---------------    -------    -----    ----
                      [ [ '/configurations', 'View'   , 'view'   , 'v' ]
                      , [ '/configurations', 'Edit'   , 'edit'   , 'e' ]
                      , [ '/configurations', 'Approve', 'apprv'  , 'a' ]
                      , [ '/configurations', 'Delete' , 'delete' , 'd' ]
                        ]

    var  mActionDropDown =  mActions.map( ( mAction ) => (
          {  label :  mAction[1], link : mAction[0],  enabled : aValidActions.match( mAction[3] ) ? true : false }
             ) )

     function onActionDropDown( e ) {
//     var aAction = String(e.target).replace( /^.+>/, "" ).replace( /<\/a>/, "" )
       var aAction = e.target.innerHTML
//         alert( "You selected the action: " + e.target.id + ", now is: " + e.target.value )
           alert( "You selected the action: " + aAction )
           if (aAction === 'Delete' ) { alert( "How do we execute deleteConfiguration is configuration-list.component.js?") }
           if (aAction === 'View'   ) { alert( "How do we view the right Configuration.id?") }
           if (aAction === 'Edit'   ) { alert( "How do we view the right Configuration.id?") }
              console.log( "action", e.target )
           }

    var  pActionDropDown = mActionDropDown.map( ( pAction, index ) =>                                                   //* .(01202.01.1 RAM Added index)       *//



          ( <MDBDropdownItem href    = { pAction.link }
                             key     = { index } disabled={ pAction.enabled === false }              // .(01202.01.1 RAM Added key={index}) */}
                             style  = {{ lineHeight: '15px', padding: '3px' }}                                                      // .(01202.03.1 RAM Added style)
                             onClick = { onActionDropDown }                                                      // .(01202.03.1 RAM Added style)
             >
             { pAction.label }
            </MDBDropdownItem> )
            )

  return (

    <MDBDropdown size="sm">             {/* [ dropleft | dropright ] size=[ "lg" | "sm" ] */}

      <MDBDropdownToggle  caret color="white"
                          style={{ lineHeight: '20px', padding: '0px 8px 0px 5px', marginTop: "0px", width: '150px'                                          // .(01202.03.1 RAM Added style)
                                 , textTransform: 'capitalize', fontSize: '14.4px' }}
//                        onChange={ onDropDownItem }                                                                         // .(01202.03.1 RAM Added size)
          > Pick an action
      </MDBDropdownToggle>

      <MDBDropdownMenu    basic    // [ left | right ]
//                        onChange={ onDropDownItem }                                                                         // .(01202.03.1 RAM Added size)
                          >
        { pActionDropDown }
{/*     <MDBDropdownItem href="#"         > Enabled link  </MDBDropdownItem>
        <MDBDropdownItem disabled href="#"> Disabled link </MDBDropdownItem>
        <MDBDropdownItem divider                           />
        <MDBDropdownItem href="#"         > Another link  </MDBDropdownItem>
  */}
      </MDBDropdownMenu>

    </MDBDropdown>
    );
  }
// ------------------------------------------------------------------------------------

 const  DropDown2 = ( aItems ) => {

         aItems     = typeof( aItems ) == 'string' ? aItems : ''
         aItems     =  aItems || 'a,b,c,d'

    var  mItems = [ [ "Add New"          , '/addconfiguration', 'a' ]
                  , [ "Approve Selected" , '/configurations/1', 'c' ]
                  , [ "Delete Selected"  , '/configurations/1', 'd' ]
                    ]

    var  mDropDowns = mItems.map( ( mItem ) => (
            { label  : mItem[0], link : mItem[1],  enabled : aItems.match( mItem[2] ) ? true : false }
             ) )

/*       [ { label  : "Members",   link : '/members',   enabled : aItems.match( /a/ ) ? true : false }
         , { label  : "Tutorials", link : '/tutorials', enabled : aItems.match( /b/ ) ? true : false }
         , { label  : "Projects",  link : '/projects',  enabled : aItems.match( /c/ ) ? true : false }
         , { label  : "Roles",     link : '/roles',     enabled : aItems.match( /d/ ) ? true : false }
             ]
*/
     function onDropDownItem( e ) {

//     var aAction = String(e.target).replace( /^.+>/, "" ).replace( /<\/a>/, "" )
       var aAction = e.target.innerHTML
//         alert( "You selected the action: " + e.target.id + ", now is: " + e.target.value )
           alert( "You selected the action: " + aAction )
              console.log( "action", e.target )
      }



    var  pDropDownItems = mDropDowns.map( ( pItem, index ) =>                                                   //* .(01202.01.1 RAM Added index)       *//

//        ( <MDBDropdownItem href={ pItem.link }  key={ index } disabled={ pItem.enabled  ? '' : 'disabled' } > {/*#.(01202.01.1 RAM Added key={index}) */}
//        ( <MDBDropdownItem href={ pItem.link }  key={ index } disabled={ pItem.enabled == false }              // .(01202.01.1 RAM Added key={index}) */}
          ( <MDBDropdownItem href={ pItem.link }
                             key={ index } disabled={ pItem.enabled === false }              // .(01202.01.1 RAM Added key={index}) */}
                             style={{ lineHeight: '15px', padding: '3px' }}                                                      // .(01202.03.1 RAM Added style)
                             onClick={ onDropDownItem }                                                      // .(01202.03.1 RAM Added style)
             >
             { pItem.label }
            </MDBDropdownItem> )
            )

  return (

    <MDBDropdown size="sm">             {/* [ dropleft | dropright ] size=[ "lg" | "sm" ] */}

      <MDBDropdownToggle  caret color="white"
                          style={{ lineHeight: '20px', padding: '0px 8px 0px 5px', marginTop: "0px", width: '150px'                                          // .(01202.03.1 RAM Added style)
                                 , textTransform: 'capitalize', fontSize: '14.4px' }}
//                        onChange={ onDropDownItem }                                                                         // .(01202.03.1 RAM Added size)
          > Pick an action
      </MDBDropdownToggle>

      <MDBDropdownMenu    basic    // [ left | right ]
//                        onChange={ onDropDownItem }                                                                         // .(01202.03.1 RAM Added size)
                          >
        { pDropDownItems }
{/*     <MDBDropdownItem href="#"         > Enabled link  </MDBDropdownItem>
        <MDBDropdownItem disabled href="#"> Disabled link </MDBDropdownItem>
        <MDBDropdownItem divider                           />
        <MDBDropdownItem href="#"         > Another link  </MDBDropdownItem>
  */}
      </MDBDropdownMenu>

    </MDBDropdown>
    );
  } // DropDown2
// ------------------------------------------------------------------------------------

//const  DropDown3 = ( aItems         ) => {                              //#.(01208.02.1)
  const  DropDown3 = ( mItems, aItems ) => {                              // .(01208.02.1 RAM Added)

         aItems    =   typeof( aItems ) == 'string' ? aItems : ''
         aItems    =   aItems || 'a,b,c,d'

/*  if (!mItems) {
    var  mItems = [ [ "View"    , '/configurations/1',   'a' ]
                  , [ "Edit"    , '/configurations/1',   'b' ]
                  , [ "Approve" , '/configurations/1',   'c' ]
                  , [ "Delete"  , '#',                   'd' ]
                    ]
         }
*/
    var  mDropDowns =  mItems.map( ( mItem ) => (
            { label  : mItem[0], link : mItem[1],  enabled : aItems.match( mItem[2] ) ? true : false }
             ) )

//       --------------------------------------------------------------

    var  onDropDownItem3 = function( e ) {                  // .(01208.03.5)

     var aAction = e.target.innerHTML
         alert( "onDropDownItem3[1] You selected the action: " + aAction )
         console.log( "action", e.target )
      }
//       --------------------------------------------------------------

    var  pDropDownItems3 = mDropDowns.map( ( pItem, index ) =>                                                 //* .(01202.01.1 RAM Added index).(01208.03.6 RAM this too)  *//

          ( <MDBDropdownItem href    = { pItem.link }
                             key     = { index } disabled={ pItem.enabled === false }                          // .(01202.01.1 RAM Added key={index}) */}
                             style   ={{ lineHeight: '15px', padding: '3px' }}                                 // .(01202.03.1 RAM Added style)
                             onClick = { onDropDownItem3 }                                                     // .(01208.03.7)
                             >
             { pItem.label }
            </MDBDropdownItem> )
            )
//       --------------------------------------------------------------

  return (

    <MDBDropdown size="sm">             {/* [ dropleft | dropright ] size=[ "lg" | "sm" ] */}

      <MDBDropdownToggle  caret color="white"
                          style={{ lineHeight: '20px', padding: '0px 8px 0px 5px', marginTop: "0px", width: '150px'                                          // .(01202.03.1 RAM Added style)
                                 , textTransform: 'capitalize', fontSize: '14.4px' }}
          > Pick an action
      </MDBDropdownToggle>

      <MDBDropdownMenu    basic    // [ left | right ]
                          >
        { pDropDownItems3 }                                                                                   {/* .(01208.03.8) */}

      </MDBDropdownMenu>

    </MDBDropdown>
    );
  }  // DropDown3
// ------------------------------------------------------------------------------------

  const  DropDown4 = ( mItems, aItems ) => {                              // .(01208.02.1 RAM Added)

         aItems    =   typeof( aItems ) == 'string' ? aItems : ''
         aItems    =   aItems || 'a,b,c,d'

/*  if (!mItems) {
    var  mItems = [ [ "View"    , '/configurations/1',   'a' ]
                  , [ "Edit"    , '/configurations/1',   'b' ]
                  , [ "Approve" , '/configurations/1',   'c' ]
                  , [ "Delete"  , '#',                   'd' ]
                    ]
         }
*/
//       --------------------------------------------------------------

    var  onDropDownItem = function( e ) {                  // .(01208.03.5)

           var aAction = e.target.innerHTML
           if (e.target.attributes.href) {                 // .(01210.08.1 RAM href is not an valid attribute if mItems[nAction] is a function)
           var aURL    = e.target.attributes.href.value    // .replace( /\/[0-9]+/, '' )
               alert( "onDropDownItem4[1] You selected the action: " + aAction + "\n    which goes to URL: " + aURL )
           } else {
               alert( "onDropDownItem4[2] You selected the action: " + aAction + "\n    which wnat to exucute a function" )
               }
               console.log( "action", e.target )
      }
//       --------------------------------------------------------------

    var  mDropDowns   =  mItems.map( ( mItem ) => {    // => ( ... ) )
    var  pDropDown = (
//          { label   :  mItem[0], link : mItem[1],  enabled : aItems.match( mItem[2] ) ? true : false }  //#.(01208.03.2)
            { label   :  mItem[0]
            , link    :  mItem[1]
            , enabled :  aItems.match( mItem[2] ) ? false : true                                          // .(01208.03.2 RAM Refactor)
            , display : (typeof( mItem[3] ) == 'boolean' ) ? ( mItem[3] ? 'block' : 'none' ) : 'block'    // .(01208.03.3 RAM mItem.display)
            , onClick :
//                      (typeof( mItem[4] ) == 'function') ?             mItem[4]                            :  onDropDownItem //#.(01208.03.4).(01211.03.4)
//                      (typeof( mItem[4] ) == 'function') ?   function( mItem[4] ) { mItem[4]( props    ) } :  onDropDownItem //#.(01211.03.4)
                        (typeof( mItem[4] ) == 'function') ?   function( ) { mItem[4]( mItem[1] ) } :  onDropDownItem // .(01211.03.4)
              } )
       return pDropDown
            } ) // eol mItems.map( ( mItem ) => { return ( ) } )
//       --------------------------------------------------------------

    var  pDropDownItems = mDropDowns.map( ( pItem, nDropDownIndex ) =>                                    //* .(01202.01.1 RAM Added index).(01208.03.6 RAM this too)  *//

          ( <MDBDropdownItem href    = { pItem.link      }
                             key     = { nDropDownIndex  }                                                // .(01202.01.1 RAM Added key={index}) */}
                             disabled= { pItem.disabled  }
//                           display = { pItem.display   }                                                // .(01208.04.1)
//                           style   ={{ lineHeight: '15px', padding: '3px' }}                            // .(01202.03.1 RAM Added style)
                             style   ={{ display: pItem.display, lineHeight: '15px', padding: '3px' }}    // .(01211.01.1 RAM This is how to do it)
//                           onClick = { onDropDownItem3 }                                                //#.(01208.03.7).(01208.04.2)
                             onClick = { pItem.onClick   }                                                // .(01208.04.2)
                             >
             { pItem.label }
            </MDBDropdownItem> )
            )
//       --------------------------------------------------------------

  return (

    <MDBDropdown size="sm">             {/* [ dropleft | dropright ] size=[ "lg" | "sm" ] */}

      <MDBDropdownToggle  caret color="white"
                          style={{ lineHeight: '20px', padding: '0px 8px 0px 5px', marginTop: "0px", width: '150px'                                          // .(01202.03.1 RAM Added style)
                                 , textTransform: 'capitalize', fontSize: '14.4px' }}
          > Pick an action
      </MDBDropdownToggle>

      <MDBDropdownMenu    basic    // [ left | right ]
                          >
        { pDropDownItems }                                                                                    {/* .(01208.03.8) */}

      </MDBDropdownMenu>

    </MDBDropdown>
    );
  }  // DropDown4
// ------------------------------------------------------------------------------------

export default [ DropDown1, DropDown2, DropDown3, DropDown4 ]


