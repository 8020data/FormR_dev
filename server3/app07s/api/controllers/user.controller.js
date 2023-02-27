
   const    aTable         = 'users'
   const    aPrimaryCol    = 'username'

// function getDefaultControllerMethods( aTable, pCols, aPrimaryCol ) { ... }   // .(10110.05.1 RAM Define function?? )

// const    user           =  require( '../models/index.js' ).users             // .(10103.03.2 RAM Model name is plural, but variable instance is singular here)
   const    pModel         =  require( '../models/index.js' )[ aTable ]         // .(10109.03.1 RAM Make Generic)

   const    Op             =  require( 'sequelize' ).Op;                        // .(10103.03.3)

// Create and Save a new user
// -----------------------------------------------------------------------------------------
// exports.create = ( req, res ) => {
  function create   ( req, res )    {                                           // .(10103.02.5)

       if (!req.body[ aPrimaryCol ]) {                                          //  Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
            return;
            }

      const pData          =                                                    //  Create a user

             {
             // <<COLNAME>>:  req.body.<<COLNAME>>,  Delete , on last line + createdAt,updatedAt
                id         :  req.body.id,
                username   :  req.body.username,
                email      :  req.body.email,
                password   :  req.body.password,
                active     :  req.body.active
                };

//            user.create( userData )                                           //#.(10109.03.5 Save user in the database)
            pModel.create( pData )                                              // .(10109.03.5 RAM Was UserData)
                .then(   ppData => {
                                     res.send( pData ); })
                .catch(  pErr  => {
                         res.status(500).send( { message: pErr.message || "Some error occurred while creating the user." });
     });
   };

 exports.create = create                                                                                        // .(10103.02.6)

// Retrieve all users from the database.
// -----------------------------------------------------------------------------------------
//exports.findAll = ( req, res ) => {                                                                           //#.(10103.02.6)
 function findAll   ( req, res )    {                                                                           // .(10103.02.5)

      const pCondition  = { }
//    const username    =  req.query.username;                                                                  //#.(10109.03.4)
      const aPrimaryVal =  req.query[   aPrimaryCol ];                                                          // .(10109.03.4)
//    const pCondition  =  username ? { username: { [Op.like]: `%${username}%` } } : null;                      //#.(01028.05.1)
        if (aPrimaryVal) { pCondition[  aPrimaryCol ]         = { [Op.like]: `%${aPrimaryVal}%` } }


//      var aTable     =  'users'
      const aTable     =   req.originalUrl.replace( /\?.+$/, '').replace( /\/api\//, '')                        // .(10107.01.1 Beg RAM Ass Sort, range and filter)
//      var aFilter    =   req.query.filter
        var mRange     = ( req.query.range || '').replace( /[\[\]]/g,  '' ).split( ',' )
        var mSort      = ( req.query.sort  || '').replace( /[\[\]"]/g, '' ).split( ',' )                        // .(10110.04.1 RAM e.g. '["username","ASC"]')
        var pOrder     = ( req.query.sort ) ? [ mSort ] : [ ]                                                   // .(10119.01.1)
        var pOptions   = { where: pCondition, order: pOrder }                                                   // .(10119.01.2 RAM Was: [ mSort ])
        var nOffset    = ( mRange[0] ||  0 ) * 1                                                                // .(10111.01.1 RAM Support Pagination)
        var nLimit     = ( mRange[1] || 99 ) * 1; nLimit = (nLimit - nOffset) + 1                               // .(10111.01.2)

//user.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
//user.findAll( pOptions )                                                                                      //#.(01028.05.2).(10111.01.2)
  pModel.findAndCountAll( { offset: nOffset, limit: nLimit, ...pOptions } )                                     // .(10111.01.2)

      .then( pData => {
//                var nBeg  =  mRange[0] || 0, nEnd = mRange[1] || data.length, nCnt = data.length              // .(10103.01.3 RAM Get range counts)
                  var nBeg  =  mRange[0] || 0, nEnd = mRange[1] || pData.rows.length, nCnt = pData.count        // .(10103.01.3 RAM Get range counts)
                      res.setHeader('Access-Control-Expose-Headers', 'Content-Range'   );                       // .(10103.05.1 RAM Allow use of 'Content-Range' Header)
                      res.setHeader('Accept-Ranges', `${aTable}`                         );                     // .(10103.01.4 RAM Both are require for browser, ie. Chrome)
                      res.setHeader('Content-Range', `${aTable} ${nBeg}-${nEnd}/${nCnt}` );                     // .(10103.01.5 RAM Send Header)
//                    res.header(   'Content-Range', `users ${nBeg}-${nEnd}/${nCnt}`     );                     //#.(10103.01.4 RAM Send Header)
//                    res.set(    { 'content-range': `users ${nBeg}-${nEnd}/${nCnt}` }   );                     //#.(10103.01.4 RAM Send Header)
//                    res.set(    { 'cache-control': 'no-cache' } )                                             //#.(10103.01.4 RAM Send Header)
//                    res.headers [ 'X-Total-Count' ] = nCnt                                                    //#.(10103.01.4 RAM undefined)
//                    res._headers[ 'X-Total-Count' ] = nCnt                                                    //#.(10103.01.4 RAM deportecated)
//                    res.set(    { 'X-Total-Count':    nCnt } )                                                //#.(10103.01.4 RAM und                               res.send( data );
//                    res.header(   'Content-Range', `users ${nBeg}-${nEnd}/${nCnt}`     );                     // [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                                      res.send( pData.rows )                                                    // .(10111.01.3 RAM added data.rows)
                      } )
      .catch( pErr => {
                          res.status(500).send( { message: pErr.message || "Some error occurred while retrieving users." } ); } );
         };  // eof findAll

  exports.findAll = findAll                                                                                     // .(10103.02.6)

// Find a single user with an id
// -----------------------------------------------------------------------------------------
exports.findOne = ( req, res ) => {

      const id       =  req.params.id;

 pModel.findByPk( id )
       .then( pData  => {
                                      res.send( pData ); } )
       .catch( pErr  => {
                          res.status(500).send( { message: `Error retrieving id: ${id}` } ); } );
  };

// Update a user by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = ( req, res ) => {

      const id       =  req.params.id;

 pModel.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
       .then(  nNum  => { if (num == 1) {
                                      res.send( { message: "user was updated successfully." } );
                         } else {
                                      res.send( { message: `Cannot update id: ${id}. Maybe user was not found or req.body is empty!` } ); } } )
       .catch( pErr  => {
                          res.status(500).send( { message: `Error updating id: ${id}.` } ); } );
  };

// Delete a user with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = ( req, res ) => {

      const id       =  req.params.id;

 pModel.destroy( { where: { id: id } } )                 // .(01106.06.2)
       .then(  nNum  => { if (num == 1) {
                                      res.send( { message: "user was deleted successfully!" } );
                         } else {
                                      res.send( { message: `Cannot delete id = ${id}. Maybe user was not found!` } ); } } )
       .catch( pErr  => {
                          res.status(500).send( { message: `Could not delete id: ${id}` } ); } );
  };

// Delete all users from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll    = ( req, res ) => {

 pModel.destroy({ where: {}, truncate: false } )
       .then(  nNums => {
                                     res.send( { message: `${nNums} users were deleted successfully!` }); } )
       .catch( pErr  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all users." } ); } );
  };

// find all published user
// -----------------------------------------------------------------------------------------
exports.findAllPublished = (req, res) => {

 pModel.findAll({ where: { published: true } })
        .then(  pData => {
                                     res.send( data ); })
        .catch( pErr  => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving users." } ); } );
  };
// ------------------------------------------------------------------------------------------------------------

// } .(10110.05.2)

   function getUnqKeys(  pObjs1,    pObjs2 ) {
        var pObjs = { ...pObjs1, ...pObjs2 }
     return Object.keys( pObjs ).sort().reduce( function( pObj, aKey ) {
//          mRoutes   =  Object.keys( pObjs ).sort().reduce( ( pObj, aKey ) => {
                              pObj[ ( aKey + '                   ').substr( 0, 25 ) ] = pObjs[ aKey ];
                               return pObj;
            }, { } );
            }
