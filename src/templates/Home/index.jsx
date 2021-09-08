import { useCounterContext } from '../../contexts/CounterContext';
import './styles.css';

export const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useCounterContext();

  return (
    <section className="container">
      <div className="search-container">
        <p>Ola Mundo</p>
      </div>
    </section>
  );
};
