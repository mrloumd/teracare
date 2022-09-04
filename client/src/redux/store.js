/**
 * this is where you aggregate all of your reducers
*/
import { configureStore } from '@reduxjs/toolkit';
import { patientApi } from './patient';
import { deviceApi } from './device';
import mainReducer from './main';

export default configureStore({
  reducer: {
    // reducers go here
    main: mainReducer,
    [deviceApi.reducerPath]: deviceApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }).concat([
    // middleware go here
    patientApi.middleware,
    deviceApi.middleware,
  ]),

});
