import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { IWorkflowStatus } from "../interfaces/IWorkflowStatus";
import type { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const workflowStatusAdapter = createEntityAdapter<IWorkflowStatus>({});

const initialState = workflowStatusAdapter.getInitialState();

export const workflowStatusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflowStatus: builder.query<
      EntityState<IWorkflowStatus>,
      "workflowStatusList"
    >({
      query: () => ({
        url: "/workflows",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: IWorkflowStatus[]) => {
        const loadedWorkflowStatus = responseData.map((workflowStatus) => {
          workflowStatus.id = workflowStatus._id;
          return workflowStatus;
        });

        return workflowStatusAdapter.setAll(initialState, loadedWorkflowStatus);
      },
      providesTags: (result, error, tag) => {
        if (result?.ids) {
          return [
            { type: "WorkflowStatus" as const, id: "LIST" },
            ...result.ids.map((id) => ({
              type: "WorkflowStatus" as const,
              id,
            })),
          ];
        } else return [{ type: "WorkflowStatus" as const, id: "LIST" }];
      },
    }),
    addWorkflowStatus: builder.mutation({
      query: (initialWorkflowStatus) => ({
        url: "/workflows",
        method: "POST",
        body: {
          ...initialWorkflowStatus,
        },
      }),
      invalidatesTags: [{ type: "WorkflowStatus", id: "LIST" }],
    }),
    updateWorkflowStatus: builder.mutation({
      query: (initialWorkflowStatus) => ({
        url: "/workflows",
        method: "PATCH",
        body: {
          ...initialWorkflowStatus,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "WorkflowStatus", id: arg.id },
      ],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: "/workflows",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "WorkflowStatus", id: arg.id },
      ],
    }),
  }),
});

export const {
  useAddWorkflowStatusMutation,
  useDeleteProjectMutation,
  useGetWorkflowStatusQuery,
  useUpdateWorkflowStatusMutation,
} = workflowStatusApiSlice;

export const selectWorkflowStatusResult =
  workflowStatusApiSlice.endpoints.getWorkflowStatus.select(
    "workflowStatusList"
  );

const selectWorkflowStatusData = createSelector(
  selectWorkflowStatusResult,
  (workflowStatusResult) => workflowStatusResult.data
);

export const {
  selectAll: selectAllWorkflowStatus,
  selectById: selectWorkflowStatusById,
  selectIds: selectWorkflowStatusIds,
} = workflowStatusAdapter.getSelectors(
  (state: RootState) => selectWorkflowStatusData(state) ?? initialState
);
