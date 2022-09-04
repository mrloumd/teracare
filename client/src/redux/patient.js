/**
 * This is where you define your patient side logic for your Redux store.
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'utils/ApiService';

const websocketUrl = process.env.REACT_APP_ENV === 'development' ? '192.168.5.165:8080' : '192.168.5.171:8080';
const ws = new WebSocket(`ws://${websocketUrl}`);
export const patientApi = createApi({
  reducerPath: 'patientApi',
  tagTypes: ['Patient'], // use to invalidate current cache when tag is updated
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      getAllPatients: build.query({
        query: (payload) => ({ url: '/patient', method: 'get', data: payload }),
        transformResponse(response) {
          return {
            ...response,
            count: response.data.count,
            rows: response.data.rows,
          };
        },
        providesTags: ['Patient'],
      }),
      createPatient: build.mutation({
        query: (payload) => ({ url: '/patient', method: 'post', data: payload }),
        invalidatesTags: (result, error, arg) => ['Patient'],
      }),
      updatePatient: build.mutation({
        query: (payload) => ({ url: `/patient/${payload.id}`, method: 'put', data: payload }),
        invalidatesTags: (result, error, arg) => ['Patient'],
      }),
      deletePatient: build.mutation({
        query: (payload) => ({ url: `/patient/${payload.id}`, method: 'delete' }),
        invalidatesTags: (result, error, arg) => ['Patient'],
      }),
      getAllPatientWithDevice: build.query({
        query: (payload) => ({ url: '/patient/', method: 'get', data: payload }),
        transformResponse(response) {
          const { rows } = response.data;
          const data = {};
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].device_id) {
              data[rows[i].device_id] = rows[i];
            } else {
              data[`${i}`] = rows[i];
            }
          }
          return data;
        },
        async onCacheEntryAdded(
          arg,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
        ) {
          try {
            await cacheDataLoaded;
            const listener = (event) => {
              const data = JSON.parse(event.data);
              console.log(data);
              if (data.heart_rate && data.oxygen_level) {
                updateCachedData((draft) => {
                  if (draft[data.device_id]) {
                    // eslint-disable-next-line no-param-reassign
                    draft[data.device_id] = { ...draft[data.device_id], ...data };
                  }
                });
              }
            };

            ws.addEventListener('message', listener);
          } catch {
            // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
            // in which case `cacheDataLoaded` will throw
          }
          await cacheEntryRemoved;
          ws.close();
        },
      }),
      getPatientDetails: build.query({
        query: (payload) => ({ url: `/patient/${payload.id}`, method: 'get' }),
        async onCacheEntryAdded(
          arg,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
        ) {
          try {
            await cacheDataLoaded;
            const listener = (event) => {
              const data = JSON.parse(event.data);
              console.log(data);
              if (data.heart_rate && data.oxygen_level) {
                updateCachedData((draft) => {
                  if (draft.data.device_id === data.device_id) {
                    // eslint-disable-next-line no-param-reassign
                    draft.data = { ...draft.data, ...data };
                  }
                });
              }
            };

            ws.addEventListener('message', listener);
          } catch {
            // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
            // in which case `cacheDataLoaded` will throw
          }
          await cacheEntryRemoved;
          ws.close();
        },
      }),
      getAllPatientReadings: build.query({
        query: (payload) => ({ url: `/patient/${payload.id}/readings`, method: 'get' }),
        transformResponse(response) {
          return {
            ...response,
            count: response.data.count,
            rows: response.data.rows,
          };
        },
      }),
    };
  },

});

export const {
  useGetAllPatientsQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
  useGetAllPatientWithDeviceQuery,
  useGetPatientDetailsQuery,
  useGetAllPatientReadingsQuery,
} = patientApi;
