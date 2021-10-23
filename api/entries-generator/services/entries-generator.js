'use strict';

/**
 * `entries-generator` service.
 */

module.exports = {
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }

  generateSimpleData: async (modelName, fields) => {

    let entries = await strapi.services[modelName].find({});
    for (let entry of entries) {
      await strapi.services[modelName].delete({id: entry.id});

    }

    for (let i = 0; i < 10; i++) {
      let ctx = {};
      for (let field of fields) {

        ctx[field] = modelName + i

      }
      await strapi.services[modelName].create(
        ctx
      );


    }

  }


};
