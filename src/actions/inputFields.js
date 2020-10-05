import { SET_FIELDS } from "./types";

export default (res) => (dispatch) => {
  dispatch({
    type: SET_FIELDS,
    payload: res.data,
  });
};
