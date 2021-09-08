import { useEffect, useRef } from 'react';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { useCounterContext } from '../../contexts/CounterContext';
import './styles.css';

export const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, actions] = useCounterContext();
  console.log(state);

  const handleError = () => {
    actions
      .asyncError()
      .then((r) => console.log(r))
      .catch((e) => console.log(e.name, ':', e.message));
  };

  const input = useRef();

  useEffect(() => {
    actions.increase();
  }, [actions]);

  return (
    <div className="container">
      <Heading />
      <div>
        <Button onButtonClick={actions.increase}>Increase</Button>
        <Button onButtonClick={actions.decrease}>Decrease</Button>
        <Button onButtonClick={actions.reset}>Reset</Button>
        <Button
          onButtonClick={() => {
            actions.setCounter({ payload: { counter: 10 } });
          }}
        >
          setCouter 10
        </Button>
        <input type="number" ref={input} />
        <Button
          onButtonClick={() => {
            actions.setCounter({ payload: { counter: Number(input.current.value) } });
          }}
        >
          Enviar valor
        </Button>
        <Button disabled={state.loading} onButtonClick={actions.asyncIncrease}>
          Async Icrease
        </Button>
        <Button disabled={state.loading} onButtonClick={handleError}>
          Async Error
        </Button>
      </div>
    </div>
  );
};
