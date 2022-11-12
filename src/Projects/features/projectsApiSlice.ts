import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { IProject } from "../interfaces/IProject";
import type { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const projectsAdapter = createEntityAdapter<IProject>({});

const initialState = projectsAdapter.getInitialState();

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<EntityState<IProject>, void>({
      query: () => ({
        url: "/projects",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: IProject[]) => {
        const loadedProjects = responseData.map((project) => {
          project.id = project._id;
          return project;
        });

        return projectsAdapter.setAll(initialState, loadedProjects);
      },
      providesTags: (result, error, tag) => {
        if (result?.ids) {
          return [
            { type: "Project" as const, id: "LIST" },
            ...result.ids.map((id) => ({ type: "Project" as const, id })),
          ];
        } else return [{ type: "Project" as const, id: "LIST" }];
      },
    }),
    addNewProject: builder.mutation({
      query: (initialProject) => ({
        url: "/projects",
        method: "POST",
        body: {
          ...initialProject,
        },
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
  }),
});

export const { useAddNewProjectMutation, useGetProjectsQuery } =
  projectsApiSlice;

export const selectProjectsResult =
  projectsApiSlice.endpoints.getProjects.select();

const selectProjectsData = createSelector(
  selectProjectsResult,
  (projectsResult) => projectsResult.data
);

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors(
  (state: RootState) => selectProjectsData(state) ?? initialState
);
