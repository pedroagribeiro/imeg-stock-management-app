import React, { useState } from "react";
import {
  Box,
  Heading,
  Select,
  Stack,
  Divider,
  Text,
  Center,
} from "native-base";
import axios from "axios";
import ItemSelection from "./selection/ItemSelection";

const CheckStockScreen = () => {
  const api_host = "https://imeg-stock-management.herokuapp.com";

  const [state, setState] = useState({
    item: null,
    quantity: null,
    unit: null,
  });

  const ask_for_item_stock = (item_id) => {
    const url = api_host + "/items/" + item_id;
    axios
      .get(url)
      .then((response) => {
        setState({
          item: item_id,
          quantity: response.data.quantity,
          unit: response.data.unit,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectedItemChange = (value) => {
    ask_for_item_stock(value);
  };

  return (
    <Box w="100%" p={10}>
      <Stack space={6}>
        <Heading textAlign="center" size="md">
          Consultar stock
        </Heading>
        <ItemSelection changeSelectedItem={handleSelectedItemChange} />
        <Divider my="2" />
        <Box w="100%" borderWith={4}>
          <Center>
            <Text bold fontSize="lg">
              {state.quantity
                ? state.quantity + " " + state.unit
                : "Nenhum item foi escolhido"}
            </Text>
          </Center>
        </Box>
      </Stack>
    </Box>
  );
};

export default CheckStockScreen;
