import Joi from 'joi';

export default {
  createDevice: {
    body: {
      name: Joi.string().required(),
    },
  },
  updateDevice: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      name: Joi.string().required(),
      is_active: Joi.boolean().required(),
      patient_id: Joi.string()
        .optional()
        .allow(null)
        .allow('')
        .empty('')
        .default(null),
    },
  },
};
