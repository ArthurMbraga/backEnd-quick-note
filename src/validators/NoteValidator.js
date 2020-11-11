const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string(),
      title: Joi.string(),
      description: Joi.string(),
    }),
  }),

  getById: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      note_id: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      note_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string().optional(),
      title: Joi.string().optional(),
      description: Joi.string().optional(),
    }),    
  }),
  
  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      note_id: Joi.string().required(),
    }),
  }),
};
