const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  getByUser: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      user_id: Joi.string().required(),
    }),
    [Segments.QUERY]: Joi.object().keys({
      categoryName: Joi.string().optional(),
    }),
  }),
  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      note_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object()
      .keys({
        note_id: Joi.string().optional(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
      })
      .min(1),
  }),
  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      note_id: Joi.string().required(),
    }),
  }),
};
