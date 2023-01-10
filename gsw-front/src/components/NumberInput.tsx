import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const precision = 2;

const format = (valueAsString: string) => {
  const [integerPart, decimalPart = ""] = valueAsString.split(".");

  if (decimalPart) {
    valueAsString = `${integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    )},${decimalPart.padEnd(precision, "0")}`;
  } else {
    valueAsString = `${integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    )},${"0".repeat(precision)}`;
  }

  return valueAsString;
};

const parse = (valueAsString: string) => {
  let valueAsNumber = "0";

  try {
    let parsedValueAsString = valueAsString.replace(/\D/g, "");

    parsedValueAsString = parsedValueAsString.padStart(precision + 1, "0");

    parsedValueAsString = `${parsedValueAsString.substring(
      0,
      parsedValueAsString.length - precision
    )}.${parsedValueAsString.slice(precision * -1)}`;

    valueAsNumber = parseFloat(parsedValueAsString).toString();
  } catch {
    valueAsNumber = "0";
  }

  return valueAsNumber;
};

interface Props {
  value: string;
  isInvalid: boolean;
  handleChangeIdInvalid: (vle: boolean) => void;
  handleChangeValue: (vle: string) => void;
}

function NumberInput(props: Props) {
  const { value, isInvalid, handleChangeIdInvalid, handleChangeValue } = props;

  return (
    <InputGroup width={300} marginTop={10}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children="R$"
        />

        <Input
          marginRight={5}
          paddingLeft={10}
          placeholder="Valor"
          value={format(value)}
          errorBorderColor="red.300"
          isInvalid={isInvalid}
          onChange={(e) => {
            handleChangeIdInvalid(false);
            handleChangeValue(parse(e.target.value));
          }}
        />
      </InputGroup>
    </InputGroup>
  );
}

export default NumberInput;
