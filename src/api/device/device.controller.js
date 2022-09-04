/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
/* eslint-disable import/prefer-default-export */
// import { Op } from 'sequelize';
import expressValidation from 'express-validation';
import { UniqueConstraintError, Op } from 'sequelize';
import { includes } from 'lodash';
import { APISuccess, APIClientError } from '../../helpers/APIResponse';
import models from '../../database/models';
import { getSequelizeOptions } from '../../helpers/getSequelizeOptions';
import { clone } from '../../helpers/utils';

const Device = models.device;
const Patient = models.patient;
export const getDeviceList = async (req, res, next) => {
  try {
    const sequelizeOptions = getSequelizeOptions(req.query);

    const deviceList = await Device.findAndCountAll({
      ...sequelizeOptions.findOptions,
      include: [
        {
          model: models.patient,
          as: 'patient',
          attributes: ['id', 'name'],
        },
      ],
    });

    const response = new APISuccess(
      {
        data: deviceList,
      },
      'Device list fetched successfullyyy',
    );

    res.json(response.jsonify());
  } catch (error) {
    if (
      !(
        error instanceof APIClientError ||
        error instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(error);
    } else {
      throw error;
    }
  }
};

export const createDevice = async (req, res, next) => {
  try {
    const deviceResult = await Device.create(req.body);
    if (!deviceResult) {
      throw new APIClientError({
        message: `Device not created`,
      });
    }
    const response = new APISuccess({
      data: deviceResult,
    });

    res.json(response.jsonify());
  } catch (error) {
    if (
      !(
        error instanceof APIClientError ||
        error instanceof expressValidation.ValidationError ||
        error instanceof UniqueConstraintError
      )
    ) {
      throw new Error(error);
    } else {
      throw error;
    }
  }
};

export const updateDevice = async (req, res, next) => {
  try {
    // validation
    if (req.body.patient_id) {
      const patientFind = await Patient.findOne({
        where: {
          id: req.body.patient_id,
          is_active: true,
        },
      });
      if (!patientFind) {
        throw new APIClientError({
          message: 'Patient not found or Inactive',
        });
      }
      const deviceFind = await Device.findOne({
        where: {
          patient_id: req.body.patient_id,
        },
      });
      if (deviceFind) {
        throw new APIClientError({
          message: 'Device already has a device',
        });
      }
    }

    const deviceResult = await Device.update(req.body, {
      where: {
        id: req.params.id,
        is_active: true,
      },
    });

    if (!deviceResult) {
      throw new APIClientError({
        message: `Device  not updated`,
      });
    }

    const response = new APISuccess({
      message: 'Device updated successfully',
      data: deviceResult,
    });

    res.json(response.jsonify());
  } catch (error) {
    if (
      !(
        error instanceof APIClientError ||
        error instanceof expressValidation.ValidationError ||
        error instanceof UniqueConstraintError
      )
    ) {
      throw new Error(error);
    } else {
      throw error;
    }
  }
};

export const deleteDevice = async (req, res, next) => {
  try {
    const find = await Device.findByPk(req.params.id);
    if (!find) {
      throw new APIClientError({
        message: `Device not found`,
      });
    }

    const result = await Device.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!result) {
      throw new APIClientError({
        message: `Device not deleted`,
      });
    }

    const response = new APISuccess({
      data: result,
      message: 'Device deleted successfully',
    });

    res.json(response.jsonify());
  } catch (error) {
    console.log(error);
    if (
      !(
        error instanceof APIClientError ||
        error instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(error);
    }
    if (error instanceof UniqueConstraintError) {
      throw new APIClientError({
        message: 'Device already exists',
      });
    }
    throw error;
  }
};

// export const getDeviceDetails = async (req, res, next) => {
//   try {
//     const deviceResult = await Device.findByPk(req.params.id);
//     if (!deviceResult) {
//       throw new APIClientError({
//         message: `Device not found ${req.params.id}`,
//       });
//     }
//     const response = new APISuccess({
//       data: deviceResult,
//       message: 'Device details fetched successfully',
//     });
//     res.json(response.jsonify());
//   } catch (error) {
//     if (
//       !(
//         error instanceof APIClientError ||
//         error instanceof expressValidation.ValidationError
//       )
//     ) {
//       throw new Error(error);
//     } else {
//       throw error;
//     }
//   }
// };

// export const createDevice = async (req, res, next) => {
//   try {
//     const {
//       name,
//       contact_person,
//       contact_number,
//       email,
//       address,
//       barangay,
//       municipality,
//       province,
//       region,
//       zip_code,
//       country,
//       is_active,
//     } = req.body;

//     const branchExist = clone(
//       await Device.findOne({
//         where: {
//           name,
//         },
//       }),
//     );

//     if (branchExist) {
//       throw new APIClientError({
//         message: 'Device already exist',
//       });
//     }

//     const deviceResult = await Device.create({
//       name,
//       contact_person,
//       contact_number,
//       email,
//       address,
//       barangay,
//       municipality,
//       province,
//       region,
//       zip_code,
//       country,
//       is_active,
//     });

//     if (!deviceResult) {
//       throw new APIClientError('Device not created', 404);
//     }

//     const response = new APISuccess(
//       { data: deviceResult },
//       'Successfully created Device',
//     );

//     res.json(response.jsonify());
//   } catch (error) {
//     if (error instanceof UniqueConstraintError) {
//       throw new APIClientError({
//         message: 'Device already exist',
//       });
//     }
//     if (
//       !(
//         error instanceof APIClientError ||
//         error instanceof expressValidation.ValidationError
//       )
//     ) {
//       throw new Error(error);
//     } else {
//       throw error;
//     }
//   }
// };

// export const updateDevice = async (req, res, next) => {
//   try {
//     const {
//       name,
//       contact_person,
//       contact_number,
//       email,
//       address,
//       barangay,
//       municipality,
//       province,
//       region,
//       zip_code,
//       country,
//       is_active,
//       id,
//       remarks,
//     } = req.body;

//     // const branchExist = clone(
//     //   await Device.findOne({
//     //     where: {
//     //       name,
//     //     },
//     //   }),
//     // );

//     // if (branchExist) {
//     //   throw new APIClientError({
//     //     message: 'Device already exist',
//     //   });
//     // }

//     const branchExists = clone(
//       await Device.findOne({
//         where: {
//           id,
//         },
//       }),
//     );

//     if (!branchExists) {
//       throw new APIClientError({
//         message: 'Device not found',
//       });
//     }

//     const deviceResult = await Device.update(
//       {
//         name,
//         contact_person,
//         contact_number,
//         email,
//         address,
//         barangay,
//         municipality,
//         province,
//         region,
//         zip_code,
//         country,
//         is_active,
//         remarks,
//       },
//       {
//         where: {
//           id,
//         },
//       },
//     );

//     if (!deviceResult) {
//       throw new APIClientError('Device not updated', 404);
//     }

//     const response = new APISuccess(
//       { data: deviceResult },
//       'Successfully updated Device',
//     );

//     res.json(response.jsonify());
//   } catch (error) {
//     if (error instanceof UniqueConstraintError) {
//       throw new APIClientError({
//         message: 'Device already exist',
//       });
//     }
//     if (
//       !(
//         error instanceof APIClientError ||
//         error instanceof expressValidation.ValidationError
//       )
//     ) {
//       throw new Error(error);
//     } else {
//       throw error;
//     }
//   }
// };
