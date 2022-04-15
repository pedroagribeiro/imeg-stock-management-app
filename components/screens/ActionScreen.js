import React from "react";
import { Box, Center, Button, Stack } from "native-base";

const ActionScreen = ({ navigation }) => {
  return (
    <Box p={10} h="100%">
      <Center h="100%" alignItems="center">
        <Stack space={8} w="100%">
          <Button
            onPress={() => {
              navigation.navigate("AddItemStockScreen", {});
            }}
          >
            Adicionar stock
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("RemoveItemStockScreen", {});
            }}
          >
            Remover stock
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("CheckStockScreen", {});
            }}
          >
            Consultar stock
          </Button>
          <Button onPress={() => navigation.navigate("CreateItemScreen", {})}>
            Criar novo item
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("CreateWorkSiteScreen", {});
            }}
          >
            Criar nova obra
          </Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default ActionScreen;
