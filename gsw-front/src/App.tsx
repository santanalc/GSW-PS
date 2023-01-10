import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { accountAPI } from "./api/AccountAPI";
import logo from "./assets/gswIcon.png";
import NumberInput from "./components/NumberInput";

const Container = styled.main`
  width: 100%;
  min-height: 100%;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  background-color: #f5f5fc;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  background-color: #161a1e;
  border-bottom: 1px solid #a39f9f5e;
  -webkit-box-shadow: 0px 3px 19px 3px #0000005e;
  -moz-box-shadow: 0px 3px 19px 3px rgba(0, 0, 0, 0.254);
  box-shadow: 0px 3px 19px 3px rgba(0, 0, 0, 0.186);

  display: flex;
  align-items: center;
  padding: 20px;
  z-index: 10;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  border: none;
  background-color: #d8ae5e;
  color: white;
`;

const Icon = styled.img`
  height: 80px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #e7d49e, #161a1e);
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Field = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
`;

const FieldHeader = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #4d5d6d;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .marg-l {
    margin-left: 25px;
  }

  .marg-r {
    margin-right: 25px;
  }

  .name {
    font-weight: 400;
    margin-left: 5px;
  }
`;

const CardsContainer = styled.div`
  width: 70vw;
  height: 60vh;
  margin-top: 60px;
  background-color: white;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SubTitle = styled.div`
  font-size: 22px;
  font-weight: 400;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export interface IAccount {
  _id: string;
  name: string;
  registerId: string;
  bank: string;
  balance: string;
}

function App() {
  const [value, setValue] = useState("0");
  const [account, setAccount] = useState<IAccount | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [description, setDescription] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const data = await accountAPI().getAccount(499273229);

      setAccount(data);
    })();
  }, []);

  async function saque(value: number) {
    if (!account) return;

    if (value > Number(account?.balance)) {
      setIsInvalid(true);

      toast({
        title: "Saldo Insuficiente",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (value < 10) {
      setIsInvalid(true);

      toast({
        title: "Valor mínimo de saque: R$10,00",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const data = await accountAPI().moneyWithdraw(account?.registerId, value);

    if (!data) {
      toast({
        title: "Erro ao sacar",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    if (data.total === 0) {
      setIsInvalid(true);

      toast({
        title: "Valor indisponível para retirada",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    let des = Object.keys(data.notes)
      .map((key) => {
        //@ts-ignore
        if (data.notes[key] > 0)
          //@ts-ignore
          return `R$${key}: ${data.notes[key]} cédula${
            //@ts-ignore
            data.notes[key] > 1 ? "s" : ""
          }`;
        return "";
      })
      .reverse();

    if (data.rest)
      des.push(
        `Por falta de cédulas no caixa, não foi possível sacar o valor de: R$${Number(
          data.rest
        ).toFixed(2)}`
      );

    des.push(`Valor do saque: R$${Number(data.total)}`);

    setAccount({
      ...account,
      balance: (Number(account.balance) - Number(data.total)).toString(),
    });

    setDescription(des);

    onOpen();
  }

  return (
    <Container>
      <Header>
        <Icon src={logo} />
      </Header>

      <Wrapper>
        <CardsContainer>
          <FieldHeader>
            <Field className="marg-l">
              Nome:
              <div className="name">{account?.name}</div>
            </Field>

            <Field className="marg-r">
              Saldo:
              <div className="name">R${account?.balance}</div>
            </Field>
          </FieldHeader>

          <Title>Saque</Title>

          <SubTitle>
            Notas disponíveis: R$ 100,00; R$ 50,00; R$ 20,00 e R$ 10,00
          </SubTitle>

          <NumberInput
            value={value}
            isInvalid={isInvalid}
            handleChangeIdInvalid={(vle) => setIsInvalid(vle)}
            handleChangeValue={(vle) => setValue(vle)}
          />

          <StyledButton
            role={"button"}
            colorScheme={"#e7d49e"}
            marginTop={20}
            onClick={() => {
              saque(Number(value));
            }}
          >
            Retirar
          </StyledButton>
        </CardsContainer>
      </Wrapper>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Saque concluído</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {description.map((desc) => {
              if (desc) {
                return <p>{desc}</p>;
              }
            })}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  );
}

export default App;
