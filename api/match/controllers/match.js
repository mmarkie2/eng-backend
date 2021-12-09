'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */





const {sanitizeEntity} = require('strapi-utils');
const api="match"
module.exports = {

  async update(ctx) {
    const { id } = ctx.params;
    let match= await strapi.services[api].findOne({id});

    if (ctx.request.body.date)
    {


      if ((new Date(match.tournament.start_date)>new Date(ctx.request.body.date)) ||
        (new Date(match.tournament.end_date)<new Date(ctx.request.body.date))
      ) {

        ctx.send({
          message: 'date violation'
        }, 423);
        return;
      }
    }


    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[api].update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services[api].update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models[api] });
  },



};
