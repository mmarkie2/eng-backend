'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


const apiName="team-tournament"
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {
  async create(ctx) {

    // if required fields empty return error code
console.log(ctx.request.body.tournament)
    console.log(ctx.request.body.tournament===undefined )
    if (ctx.request.body.tournament===undefined || ctx.request.body.team===undefined
      || ctx.request.body.tournament.id==='' || ctx.request.body.team.id==='') {

      ctx.send({
        message: 'required violation'
      }, 400);
      return;
    }
// if relationship exists  return error code

    console.log(ctx.request.body.tournament)
    console.log(ctx.request.body.team)

    let foundEntities= await strapi.services[apiName].find({"tournament":ctx.request.body.tournament.id,
      "team":ctx.request.body.team.id});

    console.log(foundEntities)
    if (foundEntities.length>0)
    {
      ctx.send({
        message: 'unique violation'
      }, 422);
      return;
    }

    let entity;

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[apiName].create(data, { files });
    } else {
      entity = await   strapi.services[apiName].create({"team": ctx.request.body.team,
        tournament:ctx.request.body.tournament,
        "inviteDate" : new Date().getTime()

      })
    }


    return sanitizeEntity(entity, { model: strapi.models[apiName] });
  },

};
