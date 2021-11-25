'use strict';
const util = require('util')

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
    async function getGroupedUsers() {
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
        let buf = value.map((user) => {
          let list = []

          for (const sportsFacility of user.sports_facilities) {
            let userCopy = JSON.parse(JSON.stringify(user))
            delete userCopy.sports_facilities
            userCopy['sports_facility'] = sportsFacility
            list.push(userCopy)
          }
          // console.log("list")
          // console.log(list)
          return list
        })

        sportTypeIdToUsersSingleFacility[key] = buf.reduce((rv, x) => {
          return rv.concat(x)
        }, [])
      }

      console.log(util.inspect(sportTypeIdToUsersSingleFacility, {showHidden: false, depth: null, colors: true}))

      let facilityIdToSportTypeIdToUsersSingleFacility = {}
      for (const [key, value] of Object.entries(sportTypeIdToUsersSingleFacility)) {
        let bufGroupsByFacility = groupBy(value, ['sports_facility', 'id']);
        facilityIdToSportTypeIdToUsersSingleFacility[key] = bufGroupsByFacility
      }

      console.log(facilityIdToSportTypeIdToUsersSingleFacility);
      console.log(util.inspect(facilityIdToSportTypeIdToUsersSingleFacility, {
        showHidden: false,
        depth: null,
        colors: true
      }))

      return facilityIdToSportTypeIdToUsersSingleFacility;
    }


    async function generatePickUpGamesForMostPopulated(groupedUsers) {

      console.log(groupedUsers)
      for (const [sportTypeId, groupsByFacility] of Object.entries(groupedUsers)) {
        let groupsByFacilitySorted = [...Object.entries(groupsByFacility)].sort((a, b) => {
            return b[1].length - a[1].length;
          }
        )


        // console.log("groupsByFacilitySorted")
        // console.log(groupsByFacilitySorted)

        //most populated group
        const users = groupsByFacilitySorted[0][1]

        //checks if on most popular facility there are at lest 2 users
        if (users.length > 1) {

          await generatePickUpGame(users)
          await deleteUserSearchingForGames(users)
        }

      }
    }

    await generatePickUpGamesForMostPopulated(await getGroupedUsers())


    async function generatePickUpGame(users) {
      let name = new Date().toString().substr(0,18);

      let entity = await strapi.services['pick-up-game'].create({
        "name": name,
        "sports_facility": users[0].sports_facility,
        "sport_type": users[0].sport_type,
        "owner": users[0]

      });
      for (let user of users) {
        let userPickUpGame = await strapi.services['user-pick-up-game'].create({
          "m_user": user,
          "pick_up_game":entity,
          "inviteDate": new Date().getTime(),
          "participates": false,
        });
      }


    }
    async function deleteUserSearchingForGames(users) {

      for (let user of users) {


        const { id } = user;

        const entity = await strapi.services['user-searching-for-game'].delete({ id });

      }


    }

    let entities;
    if (ctx.query._q) {

      entities = await strapi.services['pick-up-game'].search(ctx.query);
    } else {
      entities = await strapi.services['pick-up-game'].find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, {model: strapi.models['pick-up-game']}));
  },


  async create(ctx) {

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["pick-up-game"].create(data, { files });
    } else {
      let requestBody=ctx.request.body;
      requestBody.owner={"id":ctx.state.user.id};
      entity = await strapi.services["pick-up-game"].create(requestBody);
    }
    return sanitizeEntity(entity, { model: strapi.models["pick-up-game"] });
  },
  async update(ctx) {

    const [result] = await strapi.services["pick-up-game"].find({
      id: ctx.params.id,
      'owner.id': ctx.state.user.id,
    })

    if (!result) {
      return ctx.unauthorized(`You can't update this entry`);
    }


    const { id } = ctx.params;

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["pick-up-game"].update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services["pick-up-game"].update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models["pick-up-game"] });
  },
  async delete(ctx) {

    const unauthorizedCheck = strapi.services['auth-utility'].unauthorizedCheck("pick-up-game",ctx);
    if(unauthorizedCheck )
    {
      return  unauthorizedCheck;
    }
    const [result] = await strapi.services["pick-up-game"].find({
      id: ctx.params.id,
      'owner.id': ctx.state.user.id,
    })

    if (!result) {
      return ctx.unauthorized(`You can't update this entry`);
    }


    const { id } = ctx.params;

    const entity = await strapi.services["pick-up-game"].delete({ id });
    return sanitizeEntity(entity, { model: strapi.models["pick-up-game"] });
  },

};
