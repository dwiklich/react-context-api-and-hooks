import { createContext, useContext } from 'react';
import P from 'prop-types';

const Context = createContext();

export const CounterContextProvider = ({ children }) => {
  return <Context.Provider>{children}</Context.Provider>;
};

CounterContextProvider.propTypes = {
  children: P.node.isRequired,
};

export const useCounterContext = () => {
  const context = useContext();
  context;
};
