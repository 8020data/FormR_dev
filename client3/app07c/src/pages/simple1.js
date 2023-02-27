// import                                                                  // .(10215.02.1  RAM Impoort of React or ReactDOM is not needed)
//                               Hello                                     // .(10215.02.2  RAM Error: by itself, it's undefined)
 function Page1( ) {

   function Hello1() {                                                    // .(10215.02.3  RAM A function can be defined anywhere in a function)
        var aHello0 = "simple1[ 6] Hello from simple1.Page1"              // .(10215.02.4  RAM A local var inside a function can't be seen elsewhere)
            return    "simple1[ 7] Hello from simple1.Page1"
            }

        var aHello2 = "simple1[18] Hello from simple1.Page1"                 // .(10215.02.4  RAM A variable can be defined anywhere in a function)   
        var aHello3 = "simple1[25] Hello from simple1.Page1"                 // .(10215.02.4  RAM A variable can be defined anywhere in a function)   

     return ( 
                      'simple1[13] Hello from simple1.Page1',                // .(10215.02.5  RAM Not displayed, comma is required?)
         console.log( 'simple1[14] Hello from simple1.Page1' ),              // .(10215.02.6  RAM Is displayed in browser Dev Tools)

            <div>
                               <h3>Hello from simple1.Page1</h3>            {/* .(10215.02.7  RAM This is in JSX land, requiring a different comment) */}
                                {  Hello1()                                  // .(10215.02.8  RAM This is in .JS, calling any defined function or variable)
                     + '\n<br>' + aHello2                                    // .(10215.02.9  RAM HTML is not rendered, \n is just whitespace)
                                  }                                         {/* .(10215.02.10 RAM This is in JSX land again) */}

                            {/* {  Hello1() } <br> { aHello2 } */}          {/*#.(10215.02.11 RAM Error: Untnterminated JSX content)  */}
                     {/*  <div> {  Hello1() } </br> { aHello2 } </div> */}  {/*#.(10215.02.12 RAM Error: Expected corresponding JSC closing tag for <div>)  */}

                          <div> { aHello3   } <br /> </div>                 {/* .(10215.02.13 RAM Make sure of /> for <br> tag) */}
            </div>

                        )
          } // eof Page1 

   export default Page1 
