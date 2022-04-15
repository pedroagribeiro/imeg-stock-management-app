import React, { useState, useRef } from "react";
import {
  Box,
  Heading,
  Stack,
  FormControl,
  Select,
  Input,
  Button,
  CheckIcon,
  Text,
  AlertDialog,
  HStack,
  Spinner,
} from "native-base";
import axios from "axios";
import WorkSiteSelection from "./selection/WorkSiteSelection";
import ItemSelection from "./selection/ItemSelection";

const RemoveItemStockScreen = () => {
  const api_host = process.env["BACKEND_HOST"];
  const api_port = process.env["BACKEND_PORT"];

  const [state, setState] = useState({
    item: null,
    workSite: null,
    quantity: null,
    error: false,
  });

  const [waitingResponse, setWaitingResponse] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const onClose = () => setDialogOpen(false);
  const cancelRef = useRef(null);

  const handleQuantityChange = (quantity) => {
    setState({
      item: state.item,
      workSite: state.workSite,
      quantity: quantity,
      error: state.error,
    });
  };

  const handleChangeSelectedWorkSite = (value) => {
    setState({
      item: state.item,
      workSite: value,
      quantity: state.quantity,
      error: state.error,
    });
  };

  const handleChangeSelectedItem = (value) => {
    setState({
      item: value,
      workSite: state.workSite,
      quantity: state.quantity,
      error: state.error,
    });
  };

  const submitForm = () => {
    const url =
      "http://" +
      api_host +
      ":" +
      api_port +
      "/items/remove/item/" +
      state.item +
      "/work_site/" +
      state.workSite +
      "/quantity/" +
      state.quantity;
    setWaitingResponse(true);
    setDialogOpen(true);
    axios
      .post(url)
      .then((response) => console.log(response.status))
      .catch((err) => {
        setState({
          item: state.item,
          workSite: state.workSite,
          quantity: state.quantity,
          error: true,
        });
        console.log("errei");
      })
      .finally(() => {
        setWaitingResponse(false);
      });
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
            {waitingResponse
              ? "Comunicando a transação..."
              : "Transação comunicada"}
          </AlertDialog.Header>
          <AlertDialog.Body>
            {waitingResponse ? (
              <Spinner accessibilityLabel="Loading posts" />
            ) : state.error ? (
              <Heading color="red.500" fontSize="md">
                Tentaste remover mais que o stock existente
              </Heading>
            ) : (
              <Heading color="primary.500" fontSize="md">
                Transação comunicada com sucesso
              </Heading>
            )}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              onPress={() => {
                setState({
                  item: null,
                  workSite: null,
                  quantity: null,
                  error: false,
                });
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
              Remover stock
            </Heading>
          </Box>
        </FormControl.Label>
        <Stack space={6}>
          <WorkSiteSelection
            changeSelectedWorkSite={handleChangeSelectedWorkSite}
          />
          <ItemSelection changeSelectedItem={handleChangeSelectedItem} />
          <Input
            type="number"
            placeholder="Insere a quantidade"
            onChangeText={handleQuantityChange}
          />
          <Button
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

export default RemoveItemStockScreen;
