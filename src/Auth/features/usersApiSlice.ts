import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { IUser } from "../interfaces/IUser";
import type { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const usersAdapter = createEntityAdapter<IUser>({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<IUser>, "userList">({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      keepUnusedDataFor: 5,
      transformResponse: (responseData: IUser[]) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });

        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User" as const, id: "LIST" },
            ...result.ids.map((id) => ({ type: "User" as const, id })),
          ];
        } else return [{ type: "User" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object
export const selectUsersResult =
  usersApiSlice.endpoints.getUsers.select("userList");

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state: RootState) => selectUsersData(state) ?? initialState
);
