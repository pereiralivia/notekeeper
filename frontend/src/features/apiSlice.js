import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  tagTypes: ["Notes", "Note"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/users/login",
        method: "POST",
        body: userCredentials,
      }),
      invalidatesTags: ["Notes"],
    }),
    registerUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/users/register",
        method: "POST",
        body: userCredentials,
      }),
      invalidatesTags: ["Notes"],
    }),
    fetchNotes: builder.query({
      query: () => ({
        url: "api/notes",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Notes"]
    }),
    fetchNote: builder.query({
      query: (id) => ({
        url: `api/notes/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Note"]
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
      invalidatesTags: ["Notes"],
    }),
    updateNote: builder.mutation({
      query: (note) => ({
        url: `/api/notes/${note.id}`,
        method: "PATCH",
        body: note.updatedText,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Notes", "Note"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/api/notes/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useFetchNotesQuery,
  useFetchNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = apiSlice;
