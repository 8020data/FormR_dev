  import   React                                                              from "react";
  import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

  const  DropDown1 = ( aItems ) => {

         aItems     = typeof( aItems ) == 'string' ? aItems : ''  
         aItems     =  aItems || 'a,b,c,d'  

    var  mItems = [ [ "View"    , '/configurations/1',   'a' ] 
                  , [ "Edit"    , '/configurations/1',   'b' ] 
                  , [ "Approve" , '/configurations/1',   'c' ] 
                  , [ "Delete"  , '#',                   'd' ] 
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
           if (aAction == 'Delete' ) { alert( "How do we execute deleteConfiguration is configuration-list.component.js?") }
           if (aAction == 'View'   ) { alert( "How do we view the right Configuration.id?") }
           if (aAction == 'Edit'   ) { alert( "How do we view the right Configuration.id?") }
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
  }

export default [ DropDown1, DropDown2 ]


