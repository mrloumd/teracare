/* eslint-disable no-unused-vars */
import express from 'express';
import validate from 'express-validation'; // why
import wrapAsync from '../../helpers/wrapAsync';
import * as controller from './device.controller';
import validation from './device.validation';
// import validateAccessToken from '../../middleware/validateAccessToken';

const router = express.Router();

// GET;
router.get(
  '/device',
  // validate(validation.getMerchantDetails),
  wrapAsync(controller.getDeviceList),
);

router.post(
  '/device',
  validate(validation.createDevice),
  wrapAsync(controller.createDevice),
);

router.put(
  '/device/:id',
  validate(validation.updateDevice),
  wrapAsync(controller.updateDevice),
);

router.delete('/device/:id', wrapAsync(controller.deleteDevice));

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
