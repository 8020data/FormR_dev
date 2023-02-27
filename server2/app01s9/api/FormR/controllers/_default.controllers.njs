//FileName: ./ServerN/appNNsN/api/controllers/_default.controllers                                          // .(10331.05.1 RAM Won't ever be used, but must be present)
// --------------------------------------------------------------------------------------------------------
        var aDefault        =  '_default'                                                                   // .(10329.04.3 RAM Make it a variable. S.B. 'database')
//      var aTable          =   aDefault
//      var aModel          =   aDefault
//      var aDefault        =   aDefault + `.controller`  // aka FName                                      // .(10329.04.4 RAM This was only used in a comment)  
//      var pDB             =   require( '../models/index.js' )                                             //#.(10328.01.4 Beg RAM All this not needed when building routes, but later when executing the controllers) 
//      var pModel          =   require( '../models/user.model.js' )( pDB, 'user' )                         //#.(10328.01.5) 
//      var pOps            =   require('sequelize').Op;                                                    //#.(10328.01.6 RAM Was pDB.Sequelize.Op) 
//      var aPrimaryCol     =   pModel.Primary                                                              //#.(10326.06.1 RAM Need this).(10328.01.7 RAM But not here)

//      var aModel          =   pModel.ModelName                                                            //#.(10328.01.8 End)   
//      --------------------------------------------------------------------------------------------------

        var pRoutes         =
//                     Method   Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.post    /api/${aTable}/createOne/       ' : [ 'A O - -', 'createOne           ' ]    // Create a new table record
               , 'http.get     /api/${aTable}/                 ' : [ 'A O U E', 'findAll             ' ]    // Retrieve all table records
               , 'http.get     /api/${aTable}/:id              ' : [ 'A O U -', 'getOne              ' ]    // Retrieve one table record with id
//             , 'http.get     /api/${aTable}/findMany/:ids    ' : [ 'A O U -', 'findMany            ' ]    // Retrieve many table records with filter
               , 'http.put     /api/${aTable}/:id              ' : [ 'A O U -', 'updateOne           ' ]    // Update a table record with id
//             , 'http.put     /api/${aTable}/updateMany/:ids  ' : [ 'A O - -', 'updateMany          ' ]    // Update many table records with ids
               , 'http.delete  /api/${aTable}/:id              ' : [ 'A O U -', 'deleteOne           ' ]    // Delete all table records
//             , 'http.delete  /api/${aTable}/deleteMany/:ids  ' : [ 'A O - -', 'deleteMany          ' ]    // Delete all table records with id = ids
//             , 'http.delete  /api/${aTable}/deleteAll/       ' : [ 'A - - -', 'deleteAll           ' ]    // Retrieve all published table records
                  }
//      --------------------------------------------------------------------------------------------------

//      var pControllers    =
        var pControllers    =  function( aModel, aDBSN ) {                                                  // .(10328.01.8 RAM Major change. Was: pControllers =)

        var pDB             =   require( '../models/index.js' )                                             // .(10328.01.4 Beg RAM Needed now) 
//      var pDB             =   require(  `${FORMRs_4}/db.connect3-0.js` ).dbconnect( '' );                 // .(10328.02.1 RAM Same as above) 
//      var pDB             =   require(  `${FORMRs_4}/db.connect3-0.js` ).dbconnect( aDBSN );              // .(10328.02.2 RAM If you want a different DB) 
//      var pModel          =   require( '../models/${aModel}.model.js' )( pDB, aModel )                    // .(10328.02.3 RAM aModel not necessary as arg) 
//      var pModel          =   require( '../models/${aModel}.model.js' )( pDB )                            // .(10328.02.4 RAM if you want to change the database) 
//      var pModel          =   require( '../models/index.js' )[ aModel ]                                   // .(10328.02.5 RAM Also not necessary) 
        var pModel          =   pDB[ aModel ]                                                               // .(10328.02.6 RAM Each model is defined in ).(10328.01.5) 

        var Op              =   require( 'sequelize' ).Op;                                                    // .(10328.01.6) 
        var aPrimaryCol     =   pModel && pModel.Primary                                                    // .(10328.01.7 End).(10328.03.2 RAM In case aModel is undefined)

//          return {                                                                                        // .(10328.01.9) 
        var pControllers_   = {                                                                             // .(10328.01.9).(10328.04.1) 
            
            controller1     : { Table: aDefault, Model: aModel }                                            // .(10328.02.3 RAM Added Table and Model. Cute)

//          ----------------------------------------------------------------------------------

          , createOne       :  function createOne (  req, res ) { trace( `${aModel}.createOne` )        // Create and Save a new record

              if (!req.body[   aPrimaryCol ] ) {                                                        // Validate request
                               res.status( 400 ).send( { message: `Primary column ${aPrimaryCol} can not be empty for table ${aModel}.!` } );
                   return;
                   }
             const pData    =  Object.keys( req.body ).map( aCol => {                                   // Create record from request
                   return req.body[ aCol ]
                   } )
                   pModel.create( pData )                                                               // Create record in databse
                         .then(   pBody => {
                                             res.send( pBody ); } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: pErr.message || ` ** Some error occurred while creating a record for table ${aModel}..` } );
                               } );
            } // eof createOne
//          ----------------------------------------------------------------------------------

          , getOne          :  function getOne(      req, res ) { trace( `${aModel}.getOne`)

//           const id       =  req.params[ aPrimaryCol ];                                                  //#.(10326.06.1 RAM Need this).(10331.02.1 
             const id       =  req.params[ 'id' ];                                                         // .(10331.02.1 RAM Express or Sequelize's id from route /:id)

                   pModel.findByPk( id )
                         .then(   pBody => {
                                             res.send( pBody ); } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: `Error retrieving id = '${id}' for table ${aModel}.` } );
                               } );
            } // eof getOne
//          ----------------------------------------------------------------------------------

          , findAll         :  function findAll(     req, res ) { trace( `${aModel}.findAll`)

             const pCondition   = { }
             const aPrimaryVal  =  req.query[ aPrimaryCol ];                                                          // .(10109.03.4)
               if (aPrimaryVal) { 
                   pCondition[ aPrimaryCol ]  = { [Op.like]: `%${aPrimaryVal}%` } }
/* 
               var pOptions   = { where: pCondition, order: [] }                                                      // .(10119.01.2 RAM Was: [ mSort ])

                   pModel.findAll( pOptions )
                         .then(   pBody => {
                                             res.send( pBody ); } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: ` ** Error retrieving all records for table ${aModel}.` } );
                               } );
*/
              var aTable    =    req.originalUrl.replace( /\?.+$/, '').replace( /\/api\//, '')                        // .(10107.01.1 Beg RAM Ass Sort, range and filter)
//            var aTable    =    aModel                                                                               // .(10330.03.1 RAM Use the React-Admin table name. First letter is capitalized)

              var aFilter   =    req.query.filter                                                                     // .(10330.02.1 RAM Not sure why React-Admin is using filter)

              var mRange    =  ( req.query.range || '').replace( /[\[\]]/g,  '' ).split( ',' )
              var mSort     =  ( req.query.sort  || '').replace( /[\[\]"]/g, '' ).split( ',' )                        // .(10110.04.1 RAM e.g. '["username","ASC"]')
              var mOrder    =  ( req.query.sort ) ? [ mSort ] : [ ]                                                   // .(10119.01.1)
              if (mOrder) {
                  mOrder[0][0] =    mOrder[0][0].replace( /^id$/i, 'ID' )                                             // .(10331.03.1 RAM Sort ID field is not capitalized correctly) 
                  mOrder[0][0] =    mOrder[0][0].substr(0,1).toUpperCase() + mOrder[0][0].substr(1) }                 // .(10331.03.1 RAM Sort field is not capitalized correctly) 

              var pOptions  =  { where: pCondition, order: mOrder }                                                   // .(10119.01.2 RAM Was: [ mSort ])
              var nOffset   =  ( mRange[0] ||  0 ) * 1                                                                // .(10111.01.1 RAM Support Pagination)
              var nLimit    =  ( mRange[1] || 99 ) * 1; nLimit = (nLimit - nOffset) + 1                               // .(10111.01.2)

                   pModel.findAndCountAll( { offset: nOffset, limit: nLimit, ...pOptions } )                          // .(10111.01.2)

                         .then(  pBody => {

                            var  pBodyRows =  pBody.rows.map( pRow => { var pNewRow = {} //{ ... pRow }; 
//                               pNewRow.id           = `${pRow.ID}`; 
                                 pNewRow.id           =    pRow.ID; 
                                 pNewRow.Name         =    pRow.Name; 
                                 pNewRow.CountryCode  =    pRow.CountryCode; 
                                 pNewRow.District     =    pRow.District; 
                                 pNewRow.Population   =    pRow.Population; 
                                 return pNewRow 
                                 } )  
                            var  nBeg  =  mRange[0] || 0, nEnd = mRange[1] || pBody.rows.length, nCnt = pBody.count   // .(10103.01.3 RAM Get range counts)
                                 res.setHeader( 'Access-Control-Expose-Headers', 'Content-Range'     );               // .(10103.05.1 RAM Allow use of 'Content-Range' Header)
                                 res.setHeader( 'Accept-Ranges', `${aTable}`                         );               // .(10103.01.4 RAM Both are require for browser, ie. Chrome)
                                 res.setHeader( 'Content-Range', `${aTable} ${nBeg}-${nEnd}/${nCnt}` );               // .(10103.01.5 RAM Send Header)
//                               res.send(       pBody.rows     )                                                     // .(10111.01.3 RAM added data.rows)
                                 res.send(       pBodyRows      )                                                     // .(10111.01.3 RAM added data.rows)
//                               res.send( { data: pBody.rows } )                                                     // .(10331.01.1 RAM Will this work?)
                                 } )
                         .catch( pErr => {
//                             res.status( 500) .send( { message: pErr.message || `Some error occurred while retrieving all records for table ${aModel}.` } );  
                               res.status( 500 ).send( { message: ` ** Error retrieving all records for table ${aModel}.`, error: fmtObj(pErr).replace( /[\n]/g, '\n  ---' ) } );
                               } );
            } // eof findAll
//          ----------------------------------------------------------------------------------

          , findMany        :  function findMany(    req, res ) { trace( `${aModel}.findMany`)

             const aFilter  =  req.query.filter;
             const mFilter  =  aFilter ? aFilter.split( /=/ ) : null; aField = mFilter ? mFilter[0] : null
               var aClause  =  aField  ? { aField: { [ Op.like ]: `%${ mFilter[1] }%` } } : null;

                   pModel.findAll( { where: aClause } )
                         .then(   pBody => {
                                             res.send( pBody ); } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: ` ** Error retrieving filter = '${aFilter}' for table ${aModel}.` } );
                               } );
            } // eof findMany
//          ----------------------------------------------------------------------------------

          , updateOne       :  function updateOne(   req, res ) { trace( `${aModel}.updateOne`)

             const id       =  req.params.id;

                   pModel.update( req.body, { where: { id: id } } )
                         .then(   nNum  => { if (nNum == 1) {
                                             res.send( { message: "Tutorial was updated successfully." } );
                                         } else {
                                             res.send( { message: `Cannot update record with id=${id} for table ${aModel}.`} ); } } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: `Error updating record with id=${id} for table ${aModel}.` } );
                               } );
            } // eof updateOne
//          ----------------------------------------------------------------------------------
/*
          , updateMany      :  function updateMany(  req, res ) { trace( `${aModel}.updateMany`)

                controller(  req, res, 'updateMany(' + req.params.ids + ')' )

            } // eof updateMany */
//          ----------------------------------------------------------------------------------

          , deleteOne       :  function deleteOne(    req, res ) { trace( `${aModel}.deleteOne`)

          const id          =  req.params.id;

                   pModel.destroy( {  where: { id: id } } )

                         .then(   nNum  => { if (nNum == 1) {
                                             res.send( { message: `Record was deleted successfully for table ${aModel}!` } );
                                         } else {
                                             res.send( { message: `Cannot delete record with id=${id} for table ${aModel}.` } ); } } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: `Could not delete record with id=${id} for table ${aModel}.` } );
                              } );
            } // eof deleteOne
//          ----------------------------------------------------------------------------------
/*
          , deleteMany      :  function deleteMany(   req, res ) { trace( `${aModel}.deleteMany`)

                controller( req, res, 'deleteMany(' + req.params.ids + ')' )

            } // eof deleteMany */
//          ----------------------------------------------------------------------------------

          , deleteAll       :  function deleteAll(    req, res ) { trace( `${aModel}.deleteAll`)

                                             res.send( { message: `Alll records for table ${aModel} would be deleted successfully!` });
                                         process.exit()

                   pModel.destroy( { where: { }, truncate: false } )
                         .then(   nNum  => {
                                             res.send( { message: `${nums} records for table ${aModel} were deleted successfully!` } ); } )
                         .catch(  pErr  => {
                               res.status( 500 ).send( { message: err.message || `Some error occurred while removing all records for table ${aModel}.`  } );
                               } );
                } // eof deleteAll
//              ------------------------------------------------------------------------------
//           } // eor return( ... )                                                                         // .(10328.01.10 RAM Was // eoo pControllers)
//          ----------------------------------------------------------------------------------
          } // eoo pControllers_                                                                            // .(10328.04.2 Beg)

            var renControllerFns =  require( `${FORMRs_4}/controller.fns.njs` ).fns.renControllerFns        // .(10328.04.2 RAM Will fail if run standalone)                        
                pControllers_    =  renControllerFns(  aDefault, pControllers_ )                            // .(10328.04.2 RAM Need to rename _default controllers now, because when assigned to routes, it uses these function names, not the renamed ones in getControllerRoutes)
         return pControllers_                                                                               // .(10328.04.2 End)

//      ---------------------------------------------------------------------------------------------
        } // eof pControllers                                                                               // .(10328.01.11) 
//      --------------------------------------------------------------------------------------------------

                pConfig     = { ControllersFilename: __filename }                   // .(10301.03.5 RAM Let's try saving the file name)
                pConfig.Cmd =   ''                                                  // .(10301.03.6)

            module.exports  =
             {  Routes      :   pRoutes
             ,  Controllers :   pControllers                                        // .(10328.01.12 RAM It's now a function 
             ,  Options     :   pConfig                                             // .(10301.03.3)
                }
//      --------------------------------------------------------------------------------------------------

                trace(  "\nmodule.exports" )

//      --------------------------------------------------------------------------------------------------
