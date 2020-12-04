const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string(),
      name: Joi.string(),
    }),
  }),

  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      category_id: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      category_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string().optional(),
      name: Joi.string().optional(),
    }),    
  }),
  
  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      category_id: Joi.string().required(),
    }),
  }),
};
