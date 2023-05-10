import db from "../../config";

export const authCreateUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authLoginUser = () => async (dispatch, getState) => {};
export const authLogoutUser = () => async (dispatch, getState) => {};
