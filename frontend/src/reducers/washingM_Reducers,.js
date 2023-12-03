import {
  ALL_WASHING_MACHINE_FAIL,
  ALL_WASHING_MACHINE_REQUEST,
  ALL_WASHING_MACHINE_SUCCESS,
  CLEAR_ERRORS,
  UPDATE_WASHING_MACHINE_FAIL,
  UPDATE_WASHING_MACHINE_REQUEST,
  UPDATE_WASHING_MACHINE_RESET,
  UPDATE_WASHING_MACHINE_SUCCESS,
  WASHING_MACHINE_DETAIL_FAIL,
  WASHING_MACHINE_DETAIL_REQUEST,
  WASHING_MACHINE_DETAIL_SUCCESS,
} from "../constants/washingM_constants";

export const allWashingMachineReducer = (
  state = { washingMachines: [] },
  action
) => {
  switch (action.type) {
    case ALL_WASHING_MACHINE_REQUEST:
      return {
        loading: true,
        washingMachines: [],
      };

    case ALL_WASHING_MACHINE_SUCCESS:
      return {
        loading: false,
        washingMachines: action.payload.washingMachines,
      };

    case ALL_WASHING_MACHINE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const washingMachineDetailsReducer = (
  state = { washingMachine: {} },
  action
) => {
  switch (action.type) {
    case WASHING_MACHINE_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case WASHING_MACHINE_DETAIL_SUCCESS:
      return {
        loading: false,
        washingMachine: action.payload.washingMachine,
      };

    case WASHING_MACHINE_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const washingMachineReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_WASHING_MACHINE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_WASHING_MACHINE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_WASHING_MACHINE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_WASHING_MACHINE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
