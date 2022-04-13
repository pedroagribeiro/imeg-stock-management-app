import React from "react";
import {
  Box,
  Heading,
  Stack,
  FormControl,
  Select,
  Input,
  Button,
  CheckIcon,
} from "native-base";

const RemoveItemStockScreen = () => {
  const [selectedItem, setSelectedItem] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const handleQuantityChange = (quantity) => setQuantity(quantity);

  return (
    <Box p={10}>
      <FormControl onSubmit={() => console.log("cenas")}>
        <FormControl.Label>
          <Box w="100%" p={4}>
            <Heading size="lg" textAlign="center">
              Remover stock
            </Heading>
          </Box>
        </FormControl.Label>
        <Stack space={6}>
          <Select
            selectedValue={selectedItem}
            accessibilityLabel="Seleciona o item"
            placeholder="Seleciona o item"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(value) => setSelectedItem(value)}
          >
            <Select.Item label="Cobre" value="cobre" />
            <Select.Item label="Alumínio" value="aluminio" />
            <Select.Item label="Prata" value="prata" />
          </Select>
          <Input
            type="number"
            placeholder="Insere a quantidade"
            onChangeText={handleQuantityChange}
          />
          <Button
            type="submit"
            onPress={() => {
              console.log(selectedItem + " " + quantity);
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
