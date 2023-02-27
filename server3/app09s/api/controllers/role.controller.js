// const    db       =  require( '../models' );
// const    role     =  db.role;                               // .(01028.02.1 RAM Should it be  db.role)
// const  { role }   =  require( '../models' )                 //#.(10103.03.2)
   const    role     =  require( '../models/index.js' ).roles  // .(10109.01.4 BTR Add Controller)

// const    Op       =  db.Sequelize.Op;                       //#.(10103.03.3)
   const    Op       =  require( 'sequelize' ).Op;             

// Create and Save a new role
// -----------------------------------------------------------------------------------------
// exports.create = ( req, res ) => {
  function create   ( req, res )    {                                                                           // .(10103.02.5)

       if (!req.body.rolename) {  // Validate request
                         res.status(400).send( { message: "Content can not be empty!" } );
            return;
            }

      const roleData =            // Create a role
             {  
           
             // <<COLNAME>>: req.body.<<COLNAME>>,  Delete , on last line + createdAt,updatedAt
                id         : req.body.id,
                rolename   : req.body.name,
                }; 

            role.create( roleData )    // Save role in the database
                .then(   data => {
                                     res.send( data ); })
                .catch(  err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while creating the role." });
     });
   };

 exports.create = create                                                                                         // .(10103.02.6)

// Retrieve all roles from the database.
// -----------------------------------------------------------------------------------------
//exports.findAll = ( req, res ) => {                                                                           //#.(10103.02.6)
 function findAll   ( req, res )    {                                                                           // .(10103.02.5)

   const rolename  =  req.query.rolename;
     var condition =  rolename ? { rolename: { [Op.like]: `%${rolename}%` } } : null;                            //#.(01028.05.1)
     
     var aTable    = 'roles'
     var aTable    =  req.originalUrl.replace( /\?.+$/, '').replace( /\/api\//, '')                             // .(10107.01.1 Beg RAM Ass Sort, range and filter) 
     var aFilter   =  req.query.filter 
     var arange    =  req.query.range 
     var aSort     =  req.query.sort 

//role.findAll( )                                                                                               //#.(01028.05.2 RAM Was: { where: condition } )
  role.findAll( { where: condition } )                                                                          // .(01028.05.2)
      .then( data => {
                  var nBeg  =  0, nEnd = data.length, nCnt = data.length                                              // .(10103.01.3 RAM Get range counts)
                      res.setHeader('Access-Control-Expose-Headers', 'Content-Range'   );      // .(10103.05.1 RAM Allow use of 'Content-Range' Header)
                      res.setHeader('Accept-Ranges', `${aTable}`                         );      // .(10103.01.4 RAM Both are require for browser, ie. Chrome)
                      res.setHeader('Content-Range', `${aTable} ${nBeg}-${nEnd}/${nCnt}` );      // .(10103.01.5 RAM Send Header)
//                    res.header(   'Content-Range', `roles ${nBeg}-${nEnd}/${nCnt}`     );      //#.(10103.01.4 RAM Send Header)
//                    res.set(    { 'content-range': `roles ${nBeg}-${nEnd}/${nCnt}` }   );      //#.(10103.01.4 RAM Send Header)
//                    res.set(    { 'cache-control': 'no-cache' } )                              //#.(10103.01.4 RAM Send Header)
//                    res.headers [ 'X-Total-Count' ] = nCnt                                     //#.(10103.01.4 RAM undefined)
//                    res._headers[ 'X-Total-Count' ] = nCnt                                     //#.(10103.01.4 RAM deportecated)
//                    res.set(    { 'X-Total-Count':    nCnt } )                                 //#.(10103.01.4 RAM und                               res.send( data );  
//                    res.header(   'Content-Range', `roles ${nBeg}-${nEnd}/${nCnt}`     );      // [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                      res.send( data )
                      } )
      .catch( err => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving roles." } ); } );
         };  // eof findAll
 
  exports.findAll = findAll                                                                                     // .(10103.02.6)

// Find a single role with an id
// -----------------------------------------------------------------------------------------
exports.findOne = (req, res) => {
  const id = req.params.id;

   role.findByPk( id )
        .then( data => {
                                     res.send( data ); } )
        .catch( err => {
                         res.status(500).send( { message: "Error retrieving id = " + id } ); } );
  };

// Update a role by the id in the request
// -----------------------------------------------------------------------------------------
exports.update = (req, res) => {
  const id = req.params.id;

//role.update( req.body, { where: { id:       id } } )        //#.(01106.06.1)
  role.update( req.body, { where: { id: id } } )        // .(01106.06.1 RAM Found it)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "role was updated successfully." } );
                         } else {
                                     res.send( { message: `Cannot update id = ${id}. Maybe role was not found or req.body is empty!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Error updating id = " + id } ); } );
  };

// Delete a role with the specified id in the request
// -----------------------------------------------------------------------------------------
exports.delete = (req, res) => {
  const id = req.params.id;

//role.destroy( { where: { id:       id } } )                 //#.(01106.06.2)
  role.destroy( { where: { id: id } } )                 // .(01106.06.2)
        .then(  num => { if (num == 1) {
                                     res.send( { message: "role was deleted successfully!" } );
                         } else {
                                     res.send( { message: `Cannot delete id = ${id}. Maybe role was not found!` } ); } } )
        .catch( err => {
                         res.status(500).send( { message: "Could not delete id = " + id } ); } );
  };

// Delete all roles from the database.
// -----------------------------------------------------------------------------------------
exports.deleteAll = (req, res) => {

  role.destroy({ where: {}, truncate: false } )
        .then(  nums => {
                                     res.send( { message: `${nums} roles were deleted successfully!` }); } )
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while removing all roles." } ); } );
  };

// find all published role
// -----------------------------------------------------------------------------------------
exports.findAllPublished = (req, res) => {

  role.findAll({ where: { published: true } })
        .then(  data => {
                                     res.send( data ); })
        .catch( err  => {
                         res.status(500).send( { message: err.message || "Some error occurred while retrieving roles." } ); } );
  };
