import jsonPlaceholder from "../apis/jsonPlaceholder";
import users from "../apis/users";

export const fetchPosts = () => async (dispatch) => {
  const res = await jsonPlaceholder.get("/users");

  dispatch({ type: "FETCH_POSTS", payload: res.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const res = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: res.data });
};

export const createUser = (formValues) => async (dispatch) => {
  users.post("/users", formValues);
};
