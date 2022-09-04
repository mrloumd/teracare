import Joi from 'joi';

export default {
  getBranchDetails: {
    query: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  },
  createPatient: {
    body: {
      name: Joi.string().required(),
    },
  },
  updatePatient: {
    params: {
      id: Joi.string().required(),
    },
    body: {
      name: Joi.string().required(),
    },
  },
};
