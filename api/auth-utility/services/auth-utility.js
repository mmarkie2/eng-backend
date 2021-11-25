'use strict';

/**
 * `auth-utility` service.
 */

module.exports = {
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }

unauthorizedCheck: async (serviceName,ctx )=>
{

  const [result] = await strapi.services[serviceName].find({
    id: ctx.params.id,
    'owner.id': ctx.state.user.id,
  })

  if (!result) {
    return ctx.unauthorized(`You can't update this entry`);
  }
else
  {
    return null;
  }
}



}
