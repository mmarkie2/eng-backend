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
console.log(new Date(entity.start_date))
    console.log(entity.matches.length)
    if(entity.matches.length===0 && (new Date()>new Date(entity.start_date)))

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
    // date validation
    if (!(new Date(ctx.request.body.start_date)>new Date()) ||
      !(new Date(ctx.request.body.end_date)>new Date(ctx.request.body.start_date)) )
    {
      ctx.send({
        message: 'date violation'
      }, 423);

    }
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
