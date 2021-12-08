'use strict';


const apiName = "user-team"
const {parseMultipartData, sanitizeEntity} = require('strapi-utils');
module.exports = {
  async create(ctx) {
    // if required fields empty return error code

    if (ctx.request.body.mUser===undefined || ctx.request.body.team===undefined) {

      ctx.send({
        message: 'required violation'
      }, 400);
      return;
    }
    console.log(ctx.request.body.mUser)
    console.log(ctx.request.body.team)

// if mUser is already in relationship with team return error code
    let foundEntities = await strapi.services[apiName].find({
      "mUser": ctx.request.body.mUser,
      "team": ctx.request.body.team
    });

    if (foundEntities.length > 0) {


      ctx.send({
        message: 'unique violation'
      }, 422);
      return;
    }
    //else create relationship entity and return it
    let entity;
    if (ctx.is('multipart')) {
      const {data, files} = parseMultipartData(ctx);
      entity = await strapi.services[apiName].create(data, {files});
    } else {
      entity = await strapi.services[apiName].create(ctx.request.body)
    }
    return sanitizeEntity(entity, {model: strapi.models[apiName]});
  },
};
