'use strict';



/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
  async  function createPickUpGame()
    {
     let  userSearchingForGames= await strapi.services['user-searching-for-game'].find();
     console.log(userSearchingForGames)

      let groupBy = function(xs, keyArr) {
        return xs.reduce(function(rv, x) {

          if(rv.has(x[keyArr[0]][keyArr[1]]))
          {

          }
          else
          {
            rv[x[keyArr[0]][keyArr[1]]]=[]
          }
          rv[x[keyArr[0]][keyArr[1]]].push(x);

          return rv;
        }, {});
      };

      console.log("groupBy(userSearchingForGames, 'sport_type.id')");
      console.log(groupBy(userSearchingForGames, ['sport_type','id']));
    }
   await createPickUpGame();
    let entities;
    if (ctx.query._q) {

      entities = await strapi.services['pick-up-game'].search(ctx.query);
    } else {
      entities = await strapi.services['pick-up-game'].find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['pick-up-game'] }));
  },
};
