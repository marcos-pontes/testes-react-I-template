import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../components/Counter";

describe("Testando as funções do componente Counter", () => {
  test("deve iniciar com o contador em zero e incrementar para 3 ao clicar no botão 'toggle'", async () => {
    render(<Counter />);
    const user = userEvent.setup();
    const counterDisplay = screen.getByText("0");
    expect(counterDisplay).toBeInTheDocument();

    const toggleButton = screen.getByRole("button", {
      name: /\+/i,
    });

    await user.click(toggleButton);
    await user.click(toggleButton);
    await user.click(toggleButton);

    expect(counterDisplay).toBeInTheDocument("3");
  });
});
