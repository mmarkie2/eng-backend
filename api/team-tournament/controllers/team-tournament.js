'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


const apiName="team-tournament"
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {
  async create(ctx) {

    let foundEntities= await strapi.services[apiName].find({"tournament":ctx.request.body.tournament,
      "team":ctx.request.body.team});
    if (foundEntities.length>0)
    {
      return {
        status: '422',
        message: 'unique violation'
      }
    }
    console.log(foundEntities)
    let entity;

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[apiName].create(data, { files });
    } else {
      entity = await   strapi.services[apiName].create(ctx.request.body)
    }


    return sanitizeEntity(entity, { model: strapi.models[apiName] });
  },

};
