module.exports = (sequelize, Sequelize) => {

  const member = sequelize.define( "member", {
    MemberID   : { type: Sequelize.INTEGER         /* [int] IDENTITY(1,1) NOT NULL, */
//  ID         : { type: Sequelize.INTEGER         // .(01106.04.RAM Use ID)
                 , primaryKey   : true
                 , autoIncrement: true             // Automatically gets converted to SERIAL for postgres},
                   },
    MemberNo   : { type: Sequelize.INTEGER },
    TitleName  : { type: Sequelize.STRING },
    FirstName  : { type: Sequelize.STRING },
    Middlename : { type: Sequelize.STRING },
    LastName   : { type: Sequelize.STRING },
    PostName   : { type: Sequelize.STRING },
    Company    : { type: Sequelize.STRING },
    Address1   : { type: Sequelize.STRING },
    Address2   : { type: Sequelize.STRING },
    City       : { type: Sequelize.STRING },
    State      : { type: Sequelize.STRING },
    Zip        : { type: Sequelize.STRING },
    Country    : { type: Sequelize.STRING },
    Phone1     : { type: Sequelize.STRING },
    Phone2     : { type: Sequelize.STRING },
    Fax        : { type: Sequelize.STRING },
    WebSite    : { type: Sequelize.STRING },
    Email      : { type: Sequelize.STRING },
//  LastUpdated: { type: Sequelize.DATE   },      //#.(01106.03.1 Was: DATE)
    LastUpdated: { type: Sequelize.STRING },      // .(01106.03.1 Was: DATE [datetime] NULL )
    Skills     : { type: Sequelize.STRING },
    Active     : { type: Sequelize.STRING },
    Bio        : { type: Sequelize.STRING }
    });

  return member;
};
