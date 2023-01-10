import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import NumberInput from "../components/NumberInput";

describe("NumberInput", () => {
  it("Calls the onChange callback handler", () => {
    const onChange = jest.fn();
    const onChangeValue = jest.fn();

    render(
      <NumberInput
        value={""}
        isInvalid={false}
        handleChangeIdInvalid={onChange}
        handleChangeValue={onChangeValue}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "1250" },
    });

    expect(onChangeValue).toHaveBeenCalledTimes(1);
  });

  it("Check if parsing correctly the value", () => {
    const setup = () => {
      const utils = render(<App />);
      const input = utils.getByRole("textbox");
      return {
        input,
        ...utils,
      };
    };

    const { input } = setup();

    fireEvent.change(input, { target: { value: "1200" } });

    //@ts-ignore
    expect(input.value).toBe("12,00");
  });
});
