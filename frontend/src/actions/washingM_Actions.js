import axios from "axios";
import {
  ALL_WASHING_MACHINE_FAIL,
  ALL_WASHING_MACHINE_REQUEST,
  ALL_WASHING_MACHINE_SUCCESS,
  WASHING_MACHINE_DETAIL_FAIL,
  WASHING_MACHINE_DETAIL_REQUEST,
  WASHING_MACHINE_DETAIL_SUCCESS,
  CLEAR_ERRORS,
  UPDATE_WASHING_MACHINE_REQUEST,
  UPDATE_WASHING_MACHINE_SUCCESS,
  UPDATE_WASHING_MACHINE_FAIL,
} from "../constants/washingM_constants";

export const getAllWashingMachine = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_WASHING_MACHINE_REQUEST });

    let link = `/api/v1/all/watching/machines`;

    const { data } = await axios.get(link);

    dispatch({ type: ALL_WASHING_MACHINE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_WASHING_MACHINE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getWashingMachineDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WASHING_MACHINE_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/v1/single/watching/machine/${id}`);

    dispatch({
      type: WASHING_MACHINE_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WASHING_MACHINE_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateWashingMachine =
  (id, washingMachineData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_WASHING_MACHINE_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/v1/update/watching/machine/${id}`,
        washingMachineData,
        config
      );

      dispatch({
        type: UPDATE_WASHING_MACHINE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_WASHING_MACHINE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
