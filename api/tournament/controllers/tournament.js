'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const {sanitizeEntity} = require('strapi-utils');
const api="tournament"
module.exports = {


  async findOne(ctx) {
    const { id } = ctx.params;

    const result = await strapi.services["team-tournament"].find({
      "tournament.id": id

    })
    let entity = await strapi.services[api].findOne({ id });
console.log(entity.start_date)

    if(entity.matches.length>0 && new Date().getTime()>entity.start_date)

    {
      for (let i=0;i<result.length;i++)
      {
        for (let j=i+1;j<result.length;j++)
        {

          await strapi.services["match"].create({
            "date":  new Date( new Date().getTime() + 60*60000).getTime(),

            "teamTournament1": result[i],
            "teamTournament2": result[j],
"tournament":{ "id":id }
          });


        }

      }
    }
    entity = await strapi.services[api].findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models[api] });
  },

  async create(ctx) {
    console.log( ctx.state.user.id)
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["tournament"].create(data, { files });
    } else {
      let requestBody=ctx.request.body;
      requestBody.owner={"id":ctx.state.user.id};
      entity = await strapi.services["tournament"].create(requestBody);
    }
    return sanitizeEntity(entity, { model: strapi.models["tournament"] });
  },
  async update(ctx) {

    const [result] = await strapi.services["tournament"].find({
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
      entity = await strapi.services["tournament"].update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services["tournament"].update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models["tournament"] });
  },
  async delete(ctx) {


    const [result] = await strapi.services["tournament"].find({
      id: ctx.params.id,
      'owner.id': ctx.state.user.id,
    })

    if (!result) {
      return ctx.unauthorized(`You can't update this entry`);
    }


    const { id } = ctx.params;

    const entity = await strapi.services["tournament"].delete({ id });
    return sanitizeEntity(entity, { model: strapi.models["tournament"] });
  },

  };
