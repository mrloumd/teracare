import HTTPStatus from 'http-status';

import { APIClientError } from './helpers/APIResponse';
import wrapAsync from './helpers/wrapAsync';

// Wave 1 Routes
// import authRoutes from './api/auth/auth.routes';
import deviceRoutes from './api/device/device.routes';
import patientRoutes from './api/patient/patient.routes';

export default (app) => {
  // app.use('/api', authRoutes);
  app.use('/api', deviceRoutes);
  app.use('/api', patientRoutes);

  // Handler for invalid routes
  app.all(
    '*',
    // eslint-disable-next-line
    wrapAsync(async (req, res, next) => {
      throw new APIClientError(
        {
          message: 'Invalid route.',
        },
        HTTPStatus.NOT_FOUND,
      );
    }),
  );
};
