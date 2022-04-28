import React, { useState, useRef } from "react";
import {
  Box,
  AlertDialog,
  HStack,
  Spinner,
  Heading,
  Button,
  FormControl,
  Stack,
  Input,
} from "native-base";
import axios from "axios";

const CreateWorkSiteScreen = () => {
  const submitForm = () => {
    const api_host = "https://imeg-stock-management.herokuapp.com";

    const headers = { "Content-Type": "application/json" };

    setLoading(true);
    setDialogOpen(true);
    axios
      .post(api_host + "/work_site", state, {
        headers,
      })
      .then((res) => console.log(res))
      .catch((err) => setError(true))
      .finally(() => {
        setLoading(false);
      });
  };

  const [state, setState] = useState({
    code: null,
    name: null,
    location: null,
  });

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(false);

  const cancelRef = useRef(null);

  const onClose = () => setDialogOpen(false);

  const handleCode = (value) => {
    setState({ code: value, name: state.name, location: state.location });
  };

  const handleName = (value) => {
    setState({ code: state.code, name: value, location: state.location });
  };

  const handleLocation = (value) => {
    setState({ code: state.code, name: state.name, location: value });
  };

  const submitable = () => {
    return (
      state.code !== null &&
      state.name !== null &&
      state.name !== "" &&
      state.location !== null &&
      state.location !== ""
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
                Não foi possível criar a obra, reveja os seus inputs por favor
              </Heading>
            ) : (
              <Heading color="primary.500" fontSize="md">
                A obra foi criada. Já poderá escolhê-la nas secções destinadas
                ao efeito.
              </Heading>
            )}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              onPress={() => {
                setState({ code: null, name: null, location: null });
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
              Criar uma nova obra
            </Heading>
          </Box>
        </FormControl.Label>
        <Stack space={6}>
          <Input
            type="text"
            placeholder="Insere o código da obra"
            onChangeText={handleCode}
          />
          <Input
            type="text"
            placeholder="Insere o nome da obra"
            onChangeText={handleName}
          />
          <Input
            type="text"
            placeholder="Insere a localização da obra"
            onChangeText={handleLocation}
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

export default CreateWorkSiteScreen;
