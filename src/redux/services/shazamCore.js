import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        '0f56b2a643msh6a182ff67b192d7p195590jsndf2b62c8a18b'
      )

      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
    getSongDetails: builder.query({
      query: ({ songid }) => `v1/tracks/details?track_id=${songid}`,
    }),
  }),
})

export const { useGetTopChartsQuery, useGetSongDetailsQuery } = shazamCoreApi
