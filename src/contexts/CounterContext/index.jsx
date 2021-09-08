import { createContext, useContext, useState } from 'react';
import P from 'prop-types';

export const initialState = {
  counter: 0,
  loading: false,
};

const Context = createContext();

export const CounterContextProvider = ({ children }) => {
  const [state, dispatch] = useState(initialState);

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

CounterContextProvider.propTypes = {
  children: P.node.isRequired,
};

export const useCounterContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('You have to use useCounterContext inside <CounterContextProvider />');
  }
  return [context[0], context[1]];
};
