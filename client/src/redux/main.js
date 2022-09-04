import { createSlice } from '@reduxjs/toolkit';
import { popToast } from 'utils/useToast';

const skipEndpoints = ['clientInitialLogin', 'clientLogout']; // endpoints to skip the toast message
const notifEndpoints = [
  'createPatient',
  'updatePatient',
  'deletePatient',
  'createDevice',
  'updateDevice',
  'deleteDevice',
]; // endpoints with toast message

// function to detect if redux success endpoint is
// in the skipEndpoints array, skip the toast message
const skipToastEndpoints = (action) => {
  if (skipEndpoints.includes(action.meta?.arg.endpointName)) {
    return true;
  }
  return false;
};

const notifToastEndpoints = (action) => {
  if (notifEndpoints.includes(action.meta?.arg.endpointName)) {
    return true;
  }
  return false;
};

export const mainSlice = createSlice({
  name: 'main',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          // if (skipToastEndpoints(action)) {
          //   return;
          // }
          if (notifToastEndpoints(action)) {
            popToast({
              message: action.payload?.message || 'Success',
              type: 'success',
            });
          }

          // popToast({
          //   message: action.payload?.message || 'success',
          //   type: 'success',
          // });
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          if (action.payload) {
            popToast({
              message: action.payload?.message || 'error',
              type: 'error',
            });
          }
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          // state.loading = true;
          // state.errorMessage = null;
          // state.error = false;
        },
      );
  },
});

export default mainSlice.reducer;
