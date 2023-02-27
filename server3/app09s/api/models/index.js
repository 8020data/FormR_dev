    var db                  =  require( '../config/db.connect.js' )

//      db.user             =  require( '../models/user.model.js')(sequelize, Sequelize);  // .(10103.03.2 RAM Model name was singular)
//      db.users            =  require( './user.model.js'              )( db ) // .(10110.01.3 RAM Pass db.sequelize instead of sequelize and Sequelize)
        db.users            =  require( '../models/user.model.js'            ) // .(10110.03.4 RAM No, don't pass db, but include fill path)
        db.roles            =  require( '../models/role.model.js'            ) // .(10109.01.1 BTR Add Table)
/*      db.configurations   =  require( '../models/configuration.model.js'   )
        db.lookups          =  require( '../models/lookup.model.js'          )
        db.tables           =  require( '../models/table.model.js'           )
        db.tutorials        =  require( '../models/tutorial.model.js'        )
        db.members          =  require( '../models/member.model.js'          ) // .(01028.03.1 RAM Added)
        db.projects         =  require( '../models/project.model.js'         )
        db.roles_tables     =  require( '../models/roles_tables.model.js'    ) // .(01115.01.2)
        db.user_roles       =  require( '../models/user_roles.model.js'      ) // .(01115.01.2)
        db.members_projects =  require( '../models/members_project.model.js' ) // .(01028.03.1 RAM Added)
*/
module.exports = db;
