'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const {sanitizeEntity} = require('strapi-utils');

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    async function createPickUpGame() {
      let userSearchingForGames = await strapi.services['user-searching-for-game'].find();
      // console.log(userSearchingForGames)

      let groupBy = function (xs, keyArr) {
        return xs.reduce(function (rv, x) {


          if (x[keyArr[0]][keyArr[1]] in rv) {

          } else {

            rv[x[keyArr[0]][keyArr[1]]] = []
          }

          rv[x[keyArr[0]][keyArr[1]]].push(x);

          return rv;
        }, {});
      };


      let sportTypeIdToUsers = groupBy(userSearchingForGames, ['sport_type', 'id']);

//create separate object for userSearchingForGames every sports facility for further groupBy
      let sportTypeIdToUsersSingleFacility = {};
      for (const [key, value] of Object.entries(sportTypeIdToUsers)) {
      let buf=  value.map((user) => {
          let list = []
          for (const sportsFacility in user.sports_facilities) {
            let userCopy = user
            delete userCopy.sports_facilities
            userCopy['sports_facility'] = sportsFacility
            list.push(user)
          }
          return list
        })

        sportTypeIdToUsersSingleFacility[key]=   buf.reduce((rv,x)=>
        {
return rv.concat(x)
        },[])
      }
      console.log(sportTypeIdToUsersSingleFacility);


      //  let groupsBySportAndFacility={}
      //  for (const [key, value] of Object.entries(groupsBySport)) {
      // let  bufGroupsByFacility= groupBy(userSearchingForGames, ['sports_facility','id']);
      //    groupsBySportAndFacility[key]=bufGroupsByFacility
      //  }
      //
      //  console.log(groupsBySportAndFacility);

    }

    await createPickUpGame();
    let entities;
    if (ctx.query._q) {

      entities = await strapi.services['pick-up-game'].search(ctx.query);
    } else {
      entities = await strapi.services['pick-up-game'].find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, {model: strapi.models['pick-up-game']}));
  },
};
