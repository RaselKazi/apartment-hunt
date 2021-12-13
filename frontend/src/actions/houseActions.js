import axios from "axios";
import {
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
  HOUSE_LIST_FAIL,
} from "../constants/houseConstants";

export const listHouses = () => async (dispatch) => {
  try {
    dispatch({ type: HOUSE_LIST_REQUEST });

    const { data } = await axios.get(`/apartments`);

    dispatch({
      type: HOUSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOUSE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
