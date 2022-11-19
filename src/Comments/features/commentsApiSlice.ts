import {
  createSelector,
  createEntityAdapter,
  EntityId,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { IComment } from "../interfaces/IComment";
import type { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const commentsAdapter = createEntityAdapter<IComment>({});

const initialState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<EntityState<IComment>, "commentList" | EntityId>(
      {
        query: (id: EntityId) => ({
          url: `/comments/${id}`,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        }),
        transformResponse: (responseData: IComment[]) => {
          const loadedComments = responseData.map((comment) => {
            comment.id = comment._id;
            return comment;
          });

          return commentsAdapter.setAll(initialState, loadedComments);
        },
        providesTags: (result, error, tag) => {
          if (result?.ids) {
            return [
              { type: "Comment" as const, id: "LIST" },
              ...result.ids.map((id) => ({ type: "Comment" as const, id })),
            ];
          } else return [{ type: "Comment" as const, id: "LIST" }];
        },
      }
    ),
    addNewComment: builder.mutation({
      query: (initialComment) => ({
        url: "/comments",
        method: "POST",
        body: {
          ...initialComment,
        },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    updateComment: builder.mutation({
      query: (initialComment) => ({
        url: "/comments",
        method: "PATCH",
        body: {
          ...initialComment,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
    }),
    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: "/comments",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
    }),
  }),
});

export const {
  useAddNewCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
} = commentsApiSlice;

export const selectCommentsResult =
  commentsApiSlice.endpoints.getComments.select("commentList");

const selectCommentsData = createSelector(
  selectCommentsResult,
  (commentsResult) => commentsResult.data
);

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors(
  (state: RootState) => selectCommentsData(state) ?? initialState
);
