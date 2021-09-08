import { initialState } from '.';
import * as actionTypes from './action-types';

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INCREASE: {
      return { ...state, counter: state.counter + 1 };
    }
    case actionTypes.ASYNC_INCREASE_START: {
      return { ...state, loading: true, error: false };
    }
    case actionTypes.ASYNC_INCREASE_END: {
      return { ...state, loading: false, counter: state.counter + 1, error: false };
    }
    case actionTypes.ASYNC_INCREASE_ERROR: {
      return { ...state, loading: false, error: true };
    }
    case actionTypes.DECREASE: {
      return { ...state, counter: state.counter - 1 };
    }
    // case actionTypes.ASYNC_DECREASE_START: {
    //   return { ...state, loading: true };
    // }
    // case actionTypes.ASYNC_DECREASE_END: {
    //   return { ...state, loading: false, counter: state.counter - 1 };
    // }
    // case actionTypes.ASYNC_DECREASE_ERROR: {
    //   return { ...state, loading: false };
    // }
    case actionTypes.RESET: {
      return { ...initialState };
    }
    case actionTypes.SET_COUNTER: {
      return { ...state, ...action.payload };
    }
    default:
      console.log('NENHUMA ACTION FOI EXECUTADA. ', action.type);
  }
  return { ...state };
};
