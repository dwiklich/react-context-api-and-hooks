import * as actionTypes from './action-types';

export const buildAction = (dispatch) => {
  return {
    increase: () => dispatch({ type: actionTypes.INCREASE }),
    decrease: () => dispatch({ type: actionTypes.DECREASE }),
    reset: () => dispatch({ type: actionTypes.RESET }),
    setCounter: (payload) => dispatch({ type: actionTypes.SET_COUNTER, ...payload }),
    asyncIncrease: () => asyncIncreaseFn(dispatch),
    asyncError: () => asyncErrorFn(dispatch),
  };
};

const asyncIncreaseFn = async (dispatch) => {
  dispatch({ type: actionTypes.ASYNC_INCREASE_START });

  return await new Promise((resolve) => {
    setTimeout(() => {
      dispatch({ type: actionTypes.ASYNC_INCREASE_END });
      resolve('RESOLVED');
    }, 2000);
  });
};

const asyncErrorFn = async (dispatch) => {
  dispatch({ type: actionTypes.ASYNC_INCREASE_START });

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch({ type: actionTypes.ASYNC_INCREASE_ERROR });
      reject(new Error('Deu Ruim'));
    }, 2000);
  });
};
