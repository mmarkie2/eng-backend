
'use strict';

module.exports = {
  lifecycles: {
    // Called before an entry is created
    beforeCreate(data) {


    },
    // Called after an entry is created
    afterCreate(user) {


     let entity =  strapi.services['m-user'].create({
        "Name": "name",
        "lastName": "est occaec",



       "usersPermissionsUser":user
      }).then((entity)=>{
       console.log("entity" )
       console.log(entity )
     }).catch((entity)=>{
       console.log("catch" )
       console.log(entity )
     });

    },
  },
};
