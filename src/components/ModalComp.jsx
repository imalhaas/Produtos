import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [categoria, setCategoria] = useState(dataEdit.categoria || "");
    const [preco, setPreco] = useState(dataEdit.preco || "");
  
    const handleSave = () => {
      if (!name || !categoria || !preco) return;
  
      const newDataArray = Object.keys(dataEdit).length
        ? data.map((item, index) =>
            index === dataEdit.index ? { name, categoria, preco } : item
          )
        : [...(data ? data : []), { name, categoria, preco }];
  
      localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
      setData(newDataArray);
      onClose();
    };
  

  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastro de Produtos</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Categoria</FormLabel>
                  <Input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Preço</FormLabel>
                  <Input
                    type="int"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </Box>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleSave}>
                SALVAR
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                CANCELAR
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalComp;