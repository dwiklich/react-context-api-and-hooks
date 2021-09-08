import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { Home } from './index';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title handler 1',
          body: 'body handler 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title handler 2',
          body: 'body handler 2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title handler 3',
          body: 'body handler 3',
        },
        {
          userId: 4,
          id: 4,
          title: 'quit of ... handler',
          body: 'body handler 4',
        },
        {
          userId: 5,
          id: 5,
          title: 'quit of ... handler',
          body: 'body handler 5',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'img/img-handler-1.jpg',
        },
        {
          url: 'img/img-handler-2.jpg',
        },
        {
          url: 'img/img-handler-3.jpg',
        },
        {
          url: 'img/img-handler-4.jpg',
        },
        {
          url: 'img/img-handler-5.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  test('should render search, posts and load more', async () => {
    // expect(1).toBe(1);
    /*const { debug } = */ render(<Home />);

    expect.assertions(13);

    const searchInput = screen.getByPlaceholderText('Type your search');
    const noMorePosts = screen.getByText('Não existem posts =x');

    expect(searchInput).toBeInTheDocument();
    expect(noMorePosts).toBeInTheDocument();

    await waitForElementToBeRemoved(noMorePosts);
    const images = screen.getAllByRole('img', { name: /title handler/i });
    const titlePost1 = screen.getAllByText(/title handler/i);
    const button = screen.getByRole('button', { name: /load more posts/i });

    expect(images).toHaveLength(2);
    expect(titlePost1).toHaveLength(2);
    expect(button).toBeInTheDocument();

    // Input search com o valor inserido "quit"

    const searchOfValue = 'quit';

    userEvent.type(searchInput, searchOfValue); // Inserindo o valor "quit" ao input search

    const titlePost2 = screen.getAllByText('quit of ... handler');

    expect(titlePost2).toHaveLength(2);
    expect(button).not.toBeInTheDocument();
    expect(searchInput).toHaveAttribute('value', 'quit');
    expect(searchInput).toHaveValue('quit');

    // Input com o valor inserido

    userEvent.clear(searchInput); // Limpando o input search

    expect(images).toHaveLength(2);
    expect(titlePost2).toHaveLength(2);
    expect(searchInput).toHaveValue('');
    expect(searchInput).toHaveAttribute('value', '');

    // debug();
  });

  test('should search for posts', async () => {
    /* const { debug } = */ render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts =x');

    expect.assertions(17);

    await waitForElementToBeRemoved(noMorePosts);

    const searchInput = screen.getByPlaceholderText('Type your search');

    expect(screen.getByRole('heading', { name: /title handler 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title handler 2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title handler 3' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(2);

    userEvent.type(searchInput, 'handler 1'); // Inserindo o valor "handler 1" ao input search

    expect(screen.getByRole('heading', { name: /title handler 1/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title handler 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title handler 3' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(1);

    userEvent.clear(searchInput); // Limpando o input search

    expect(screen.getByRole('heading', { name: /title handler 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title handler 2/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title handler 3' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(2);

    userEvent.type(searchInput, 'post does not exist'); // Inserindo o valor "post does not exist" ao input search

    expect(screen.queryByRole('heading', { name: /title handler 1/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title handler 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title handler 3' })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('heading', { name: /title/i })).toHaveLength(0);
    expect(screen.getByText('Não existem posts =x')).toBeInTheDocument();
  });

  test('should have button load more post', async () => {
    const { debug } = render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts =x');

    // expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const searchInput = screen.getByPlaceholderText('Type your search');
    const button = screen.getByRole('button', { name: /load more posts/i });

    expect(button).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);

    userEvent.click(button);
    expect(screen.getAllByRole('img')).toHaveLength(4);
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    userEvent.click(button);
    userEvent.click(button);
    expect(screen.getAllByRole('img')).toHaveLength(5);
    expect(button).toHaveAttribute('disabled', '');
    expect(button).toBeDisabled();

    userEvent.type(searchInput, 'search text and disabled button load more');
    expect(button).toBeDisabled();

    userEvent.clear(searchInput);

    expect(screen.getAllByRole('img')).toHaveLength(5);
    expect(button).toBeDisabled();

    debug();
  });
});
