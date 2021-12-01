'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const apiName="team"
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {
  async create(ctx) {
    let entity;

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[apiName].create(data, { files });
    } else {
      entity = await   strapi.services[apiName].create(ctx.request.body)
    }
if(entity)
{
  strapi.services["user-team"].create({"team":entity,
    mUser:{"id":ctx.state.user.id},
    "inviteDate" : new Date().getTime(),
    "startDate" : new Date().getTime(),
  })
}

    return sanitizeEntity(entity, { model: strapi.models[apiName] });
  },



};
