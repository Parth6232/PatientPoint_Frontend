import { createApi } from '@reduxjs/toolkit/query/react';
import { apiServiceSlice } from '../apiServiceSlice';
import apiUrlConstants from '@helpers/constants/apiUrlConstants';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiServiceSlice.baseQueryWithInterceptor,
  tagTypes: ['USER'],
  endpoints: (qb) => ({
    login: qb.mutation({
      query: ({ email, password }) => ({
        url: apiUrlConstants.login,
        method: 'POST',
        body: { email, password },
        invalidatesTags: ['USER'],
      }),
    }),
    register: qb.mutation({
      query: (data) => ({
        url: apiUrlConstants.register,
        method: 'POST',
        body: data,
      }),
    }),
    authRegister: qb.mutation({
      query: (data) => ({
        url: apiUrlConstants.authRegister,
        method: 'POST',
        body: data,
      }),
    }),
    addAppointment: qb.mutation({
      query: (data) => ({
        url: apiUrlConstants.addAppointment,
        method: 'POST',
        body: data,
      }),
    }),

    getPatientList: qb.query({
      query: () => ({
        url: apiUrlConstants.getPatientList,
        method: 'GET',
      }),
    }),

    getDoctortList: qb.query({
      query: () => ({
        url: apiUrlConstants.getDoctortList,
        method: 'GET',
      }),
    }),

    dashboardCount: qb.query({
      query: () => ({
        url: apiUrlConstants.dashboardCount,
        method: 'GET',
      }),
    }),
    recentAppointments: qb.query({
      query: () => ({
        url: apiUrlConstants.recentAppointments,
        method: 'GET',
      }),
    }),
    getAppointmentList: qb.query({
      query: () => ({
        url: apiUrlConstants.getAppointmentList,
        method: 'GET',
      }),
    }),
     getProfile: qb.query({
      query: () => ({
        url: apiUrlConstants.getProfile,
        method: 'GET',
      }),
    }),

    deleteUser: qb.mutation({
      query: (id) => ({
        url: `${apiUrlConstants.deleteUser}/${id}`,
        method: 'DELETE',
      }),
    }),
    approveDoctor: qb.mutation({
      query: (id) => ({
        url: `${apiUrlConstants.approveDoctor}/${id}`,
        method: 'PUT',
      }),
    }),
    rejectDoctor: qb.mutation({
      query: (id) => ({
        url: `${apiUrlConstants.rejectDoctor}/${id}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const authApiReducer = authApi.reducer;

export const authApiAction = {
  middleware: authApi.middleware,
  reducerPath: authApi.reducerPath,
  login: authApi.useLoginMutation,
  addAppointment: authApi.useAddAppointmentMutation,
  getPatientList: authApi.useGetPatientListQuery,
  getDoctortList: authApi.useGetDoctortListQuery,
  deleteUser: authApi.useDeleteUserMutation,
  getAppointmentList: authApi.useGetAppointmentListQuery,
  register: authApi.useRegisterMutation,
  authRegister: authApi.useAuthRegisterMutation,
  dashboardCount: authApi.useDashboardCountQuery,
  recentAppointments: authApi.useRecentAppointmentsQuery,
  getProfile: authApi.useGetProfileQuery,
  approveDoctor: authApi.useApproveDoctorMutation,
  rejectDoctor: authApi.useRejectDoctorMutation,
};
