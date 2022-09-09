import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notesapplivia.herokuapp.com/",
  }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/users/login",
        method: "POST",
        body: userCredentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/users/register",
        method: "POST",
        body: userCredentials,
      }),
    }),
    fetchNotes: builder.query({
      query: () => ({
        url: "api/notes",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    createNote: builder.mutation({
      query: (note) => ({
        url: "api/notes",
        method: "POST",
        body: note,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/api/notes/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useFetchNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation
} = apiSlice;
