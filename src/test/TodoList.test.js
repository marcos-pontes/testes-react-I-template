import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import userEvent from "@testing-library/user-event";

describe("testando TodoList", () => {
  test("deve renderizar com o titulo", () => {
    render(<TodoList />);
    const tittle = screen.getByText(/Todo list/i);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    expect(tittle).toBeInTheDocument();
  });

  test("o input deve iniciar vazio", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a todo/i);
    //screen.debug();
    expect(input).toHaveValue("");
  });

  test("deve atulizar o valor do input ao digitar", async () => {
    const user = userEvent.setup();

    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a todo/i);
    await user.type(input, "teste");

    expect(input).toHaveValue("teste");
  });

  test("deve renderizar uma nova tarefa ao apertar o enter", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a todo/i);

    await user.type(input, "testee{enter}");

    const result = screen.getByText("testee");

    expect(result).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.logTestingPlaygroundURL();
  });

  test("deve auterar o status quando o botão for clicado", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a todo/i);

    await user.type(input, "testee{enter}");

    const todoItem = screen.getByText("testee");

    const button = screen.getByRole("button", {
      name: /toggle/i,
    });
    await user.click(button);

    expect(todoItem).toHaveStyle("text-decoration: line-through");
    await user.click(button);

    expect(todoItem).toHaveStyle("text-decoration: none");
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.logTestingPlaygroundURL();
  });

  test("deve remover a tarefa quando o butão for clicado", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter a todo/i);

    await user.type(input, "testee{enter}");

    const todoItem = screen.getByText("testee");

    const button = screen.getByRole("button", {
      name: /delete/i,
    });
    await user.click(button);

    const removedTodoItem = screen.queryByText("testee");
  expect(removedTodoItem).toBeNull();
  });
});
