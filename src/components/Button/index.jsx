import P from 'prop-types';
// import { useCounterContext } from '../../contexts/CounterContext';

export const Button = ({ children, onButtonClick, disabled = false }) => {
  // const [state, actions] = useCounterContext();
  // console.log(actions);

  return (
    <button disabled={disabled} style={{ fontSize: '60px' }} onClick={onButtonClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: P.node.isRequired,
  onButtonClick: P.func.isRequired,
  disabled: P.bool,
};
