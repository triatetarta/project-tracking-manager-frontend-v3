import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { IProject } from "../interfaces/IProject";
import type { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const projectsAdapter = createEntityAdapter<IProject>({});

const initialState = projectsAdapter.getInitialState();

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<EntityState<IProject>, "projectList">({
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
    updateProject: builder.mutation({
      query: (initialProject) => ({
        url: "/projects",
        method: "PATCH",
        body: {
          ...initialProject,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: "/projects",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
  }),
});

export const {
  useAddNewProjectMutation,
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectsApiSlice;

export const selectProjectsResult =
  projectsApiSlice.endpoints.getProjects.select("projectList");

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
