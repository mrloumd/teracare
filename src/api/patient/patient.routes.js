/* eslint-disable no-unused-vars */
import express from 'express';
import validate from 'express-validation'; // why
import wrapAsync from '../../helpers/wrapAsync';
import * as controller from './patient.controller';
import validation from './patient.validation';
// import validateAccessToken from '../../middleware/validateAccessToken';

const router = express.Router();

// GET;
router.get('/patient', wrapAsync(controller.getPatientList));

router.get('/patient/:id', wrapAsync(controller.getPatientDetails));

router.get('/patient/:id/readings', wrapAsync(controller.getPatientReadings));

router.post(
  '/patient',
  validate(validation.createPatient),
  wrapAsync(controller.createPatient),
);

router.put(
  '/patient/:id',
  validate(validation.updatePatient),
  wrapAsync(controller.updatePatient),
);

router.delete('/patient/:id', wrapAsync(controller.deletePatient));

// router.get(
//   '/device/:id',
//   // validate(validation.getMerchantDetails),
//   wrapAsync(controller.getdeviceDetails),
// );

// router.post(
//   '/device',
//   validate(validation.createdevice),
//   wrapAsync(controller.createdevice),
// );

// router.put(
//   '/device',
//   validate(validation.updatedevice),
//   wrapAsync(controller.updatedevice),
// );

export default router;
