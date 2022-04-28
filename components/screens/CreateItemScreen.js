import React, { useState, useRef } from "react";
import {
  Box,
  FormControl,
  Heading,
  Stack,
  Input,
  Button,
  AlertDialog,
  HStack,
  Spinner,
} from "native-base";
import axios from "axios";

const CreateItemScreen = () => {
  const submitForm = () => {
    const api_host = "https://imeg-stock-management.herokuapp.com";

    const headers = { "Content-Type": "application/json" };

    setLoading(true);
    setDialogOpen(true);
    axios
      .post(api_host + "/items", state, {
        headers,
      })
      .then((res) => console.log(res))
      .catch((err) => setError(true))
      .finally(() => {
        setLoading(false);
      });
  };

  const [state, setState] = useState({
    name: null,
    quantity: null,
    unit: null,
  });

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(false);

  const cancelRef = useRef(null);

  const onClose = () => setDialogOpen(false);

  const handleItemDesignation = (value) => {
    setState({ name: value, quantity: state.quantity, unit: state.unit });
  };

  const handleStartingQuantity = (value) => {
    setState({ name: state.name, quantity: value, unit: state.unit });
  };

  const handleUnit = (value) => {
    setState({ name: state.name, quantity: state.quantity, unit: value });
  };

  const submitable = () => {
    return (
      state.name !== null &&
      state.name !== "" &&
      state.unit !== null &&
      state.unit !== "" &&
      state.quantity !== null &&
      state.quantity > 0
    );
  };

  return (
    <Box p={10}>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>
            {loading ? "Comunicando a transação..." : "Transação comunicada"}
          </AlertDialog.Header>
          <AlertDialog.Body>
            {loading ? (
              <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                  Comunicando a transação
                </Heading>
              </HStack>
            ) : error ? (
              <Heading color="red.500" fontSize="md">
                Não foi possível criar o item, reveja os seus inputs por favor
              </Heading>
            ) : (
              <Heading color="primary.500" fontSize="md">
                O item foi criado. Já poderá escolhê-lo nas secções destinadas
                ao efeito.
              </Heading>
            )}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              onPress={() => {
                setState({ item: null, workSite: null, quantity: null });
                setLoading(false);
                setError(false);
                onClose();
              }}
            >
              OK
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <FormControl>
        <FormControl.Label>
          <Box w="100%" p={4}>
            <Heading size="lg" textAlign="center">
              Criar um novo item
            </Heading>
          </Box>
        </FormControl.Label>
        <Stack space={6}>
          <Input
            type="text"
            placeholder="Insere a designação do item"
            onChangeText={handleItemDesignation}
          />
          <Input
            type="number"
            placeholder="Insere a quantidade inicial do item"
            onChangeText={handleStartingQuantity}
          />
          <Input
            type="text"
            placeholder="Insere a unidade de medida do item"
            onChangeText={handleUnit}
          />
          <Button
            isDisabled={!submitable()}
            onPress={() => {
              submitForm();
            }}
          >
            Confirmar
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default CreateItemScreen;
