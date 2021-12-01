'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {

  beforeCreate: async (model, attrs, options) => {
    console.log(attrs)
    // Check that slug is unique
    if (attrs.name) {
      const existing = await strapi.services.country.find(attrs);
      if (existing[0] && existing[0].get('id') !== model.get('id')) {
        // Not allowed
        throw new Error(
          `You can't set slug to "${
            attrs.name
          }" because it is already taken by article #${existing.get('id')}`
        );
      }
    }
  }

};
