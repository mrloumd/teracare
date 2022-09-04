/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
/* eslint-disable import/prefer-default-export */
// import { Op } from 'sequelize';
import expressValidation from 'express-validation';
import { UniqueConstraintError } from 'sequelize';
import { APISuccess, APIClientError } from '../../helpers/APIResponse';
import models from '../../database/models';
import { getSequelizeOptions } from '../../helpers/getSequelizeOptions';
import { clone } from '../../helpers/utils';

const { sequelize } = models;
const Patient = models.patient;
const Reading = models.reading;
const Device = models.device;

export const getPatientList = async (req, res, next) => {
  try {
    const sequelizeOptions = getSequelizeOptions(req.query);

    const patientList = clone(
      await Patient.findAndCountAll({
        ...sequelizeOptions.findOptions,
      }),
    );

    // match patientlist with device list and get device_id
    const patientListWithDevice = await Promise.all(
      patientList.rows.map(async (patient) => {
        const device = clone(
          await models.device.findOne({
            where: {
              patient_id: patient.id,
            },
          }),
        );

        const readings = clone(
          await Reading.findAll({
            where: {
              patient_id: patient.id,
            },
            attributes: ['oxygen_level', 'heart_rate', 'created_at'],
            limit: 10,
          }),
        );

        const newPatient = {
          ...patient,
          device_id: device ? device.id : null,
          readings,
        };

        return newPatient;
      }),
    );

    const response = new APISuccess(
      {
        data: { ...patientList, rows: patientListWithDevice },
      },
      'Patient list fetched successfully',
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

export const createPatient = async (req, res, next) => {
  try {
    const result = await Patient.create(req.body);
    if (!result) {
      throw new APIClientError({
        message: `Patient not created`,
      });
    }
    const response = new APISuccess({
      data: result,
      message: 'Patient created successfully',
    });
    res.json(response.jsonify());
  } catch (error) {
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
        message: 'Patient already exists',
      });
    }
    throw error;
  }
};

export const updatePatient = async (req, res, next) => {
  try {
    const result = await Patient.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      throw new APIClientError({
        message: `Patient not updated`,
      });
    }

    const response = new APISuccess({
      data: result,
      message: 'Patient updated successfully',
    });
    res.json(response.jsonify());
  } catch (error) {
    if (
      !(
        error instanceof APIClientError ||
        error instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(error);
    } else if (error instanceof UniqueConstraintError) {
      throw new APIClientError({
        message: 'Patient already exists',
      });
    }
    throw error;
  }
};

export const deletePatient = async (req, res, next) => {
  try {
    const find = await Patient.findByPk(req.params.id);
    if (!find) {
      throw new APIClientError({
        message: `Patient not found`,
      });
    }

    const result = await Patient.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!result) {
      throw new APIClientError({
        message: `Patient not deleted`,
      });
    }

    const response = new APISuccess({
      data: result,
      message: 'Patient deleted successfully',
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
        message: 'Patient already exists',
      });
    }
    throw error;
  }
};

export const getPatientDetails = async (req, res, next) => {
  try {
    const find = clone(await Patient.findByPk(req.params.id));
    if (!find) {
      throw new APIClientError({
        message: `Patient not found`,
      });
    }

    const device = clone(
      await Device.findOne({
        where: {
          patient_id: req.params.id,
        },
      }),
    );

    // const readings = clone(
    //   await Reading.findAll({
    //     where: {
    //       patient_id: req.params.id,
    //     },
    //     attributes: [
    //       'oxygen_level',
    //       'heart_rate',
    //       [
    //         sequelize.fn(
    //           'DATE_FORMAT',
    //           sequelize.col('created_at'),
    //           '%Y-%m-%d %H:%i:%s',
    //         ),
    //         'created_at',
    //       ],
    //       // [
    //       //   sequelize.fn(
    //       //     'DATE_FORMAT',
    //       //     sequelize.col('created_at'),
    //       //     '%H:%i:%s',
    //       //   ),
    //       //   'time',
    //       // ],
    //     ],

    //     // limit: 10,
    //   }),
    // );

    const newPatient = {
      ...find,
      device_id: device ? device.id : null,
      // readings,
    };

    const response = new APISuccess({
      data: newPatient,
      message: 'Patient fetched successfully',
    });

    res.json(response.jsonify());
  } catch (error) {
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
        message: 'Patient already exists',
      });
    }
    throw error;
  }
};

export const getPatientReadings = async (req, res, next) => {
  try {
    const find = clone(await Patient.findByPk(req.params.id));
    const sequelizeOptions = getSequelizeOptions(req.query);
    if (!find) {
      throw new APIClientError({
        message: `Patient not found`,
      });
    }

    const readings = clone(
      await Reading.findAndCountAll({
        ...sequelizeOptions.findOptions,
        attributes: [
          'oxygen_level',
          'heart_rate',
          [
            sequelize.fn(
              'DATE_FORMAT',
              sequelize.col('created_at'),
              '%Y-%m-%d %H:%i:%s',
            ),
            'created_at',
          ],
          // [
          //   sequelize.fn(
          //     'DATE_FORMAT',
          //     sequelize.col('created_at'),
          //     '%H:%i:%s',
          //   ),
          //   'time',
          // ],
        ],
      }),
    );

    const response = new APISuccess({
      data: readings,
      message: 'Patient readings fetched successfully',
    });

    res.json(response.jsonify());
  } catch (error) {
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
        message: 'Patient already exists',
      });
    }
    throw error;
  }
};

// export const getPatientDetails = async (req, res, next) => {
//   try {
//     const result = await Patient.findByPk(req.params.id);
//     if (!result) {
//       throw new APIClientError({
//         message: `Patient not found ${req.params.id}`,
//       });
//     }
//     const response = new APISuccess({
//       data: result,
//       message: 'Patient details fetched successfully',
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

// export const createPatient = async (req, res, next) => {
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
//       await Patient.findOne({
//         where: {
//           name,
//         },
//       }),
//     );

//     if (branchExist) {
//       throw new APIClientError({
//         message: 'Patient already exist',
//       });
//     }

//     const result = await Patient.create({
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

//     if (!result) {
//       throw new APIClientError('Patient not created', 404);
//     }

//     const response = new APISuccess(
//       { data: result },
//       'Successfully created Patient',
//     );

//     res.json(response.jsonify());
//   } catch (error) {
//     if (error instanceof UniqueConstraintError) {
//       throw new APIClientError({
//         message: 'Patient already exist',
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

// export const updatePatient = async (req, res, next) => {
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
//     //   await Patient.findOne({
//     //     where: {
//     //       name,
//     //     },
//     //   }),
//     // );

//     // if (branchExist) {
//     //   throw new APIClientError({
//     //     message: 'Patient already exist',
//     //   });
//     // }

//     const branchExists = clone(
//       await Patient.findOne({
//         where: {
//           id,
//         },
//       }),
//     );

//     if (!branchExists) {
//       throw new APIClientError({
//         message: 'Patient not found',
//       });
//     }

//     const result = await Patient.update(
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

//     if (!result) {
//       throw new APIClientError('Patient not updated', 404);
//     }

//     const response = new APISuccess(
//       { data: result },
//       'Successfully updated Patient',
//     );

//     res.json(response.jsonify());
//   } catch (error) {
//     if (error instanceof UniqueConstraintError) {
//       throw new APIClientError({
//         message: 'Patient already exist',
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
