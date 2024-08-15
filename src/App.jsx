import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleRemove = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem("cad_cliente", JSON.stringify(newData));
  };

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
    ? JSON.parse(localStorage.getItem("cad_cliente"))
    : [];

    setData(db_costumer);
  }, [setData]);

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO PRODUTO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Categoria
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Preço
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, categoria, preco }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{categoria}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{preco}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, categoria, preco, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;