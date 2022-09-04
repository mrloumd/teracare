/**
 * This is where you define your device side logic for your Redux store.
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'utils/ApiService';

export const deviceApi = createApi({
  reducerPath: 'deviceApi',
  tagTypes: ['Device'], // use to invalidate current cache when tag is updated
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      getAllDevice: build.query({
        query: (payload) => ({ url: '/device', method: 'get', data: payload }),
        transformResponse(response) {
          return {
            ...response,
            count: response.data.count,
            rows: response.data.rows,
          };
        },
        providesTags: ['Device'],
      }),
      createDevice: build.mutation({
        query: (payload) => ({ url: '/device', method: 'post', data: payload }),
        invalidatesTags: (result, error, arg) => ['Device'],
      }),
      updateDevice: build.mutation({
        query: (payload) => ({ url: `/device/${payload.id}`, method: 'put', data: payload }),
        invalidatesTags: (result, error, arg) => ['Device'],
      }),
      deleteDevice: build.mutation({
        query: (payload) => ({ url: `/device/${payload.id}`, method: 'delete' }),
        invalidatesTags: (result, error, arg) => ['Device'],
      }),
    };
  },

});

export const {
  useGetAllDeviceQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
} = deviceApi;
