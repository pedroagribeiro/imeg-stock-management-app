import React, { useState, useEffect } from "react";
import {
  HStack,
  Spinner,
  Heading,
  Loading,
  Box,
  Select,
  CheckIcon,
} from "native-base";
import axios from "axios";

const ItemSelection = (props) => {
  const api_host = "https://imeg-stock-management.herokuapp.com";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const url = api_host + "/items";

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  if (loading)
    return (
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );

  return (
    <Box>
      <Select
        selectedValue={selectedItem}
        accessibilityLabel="Seleciona o item"
        placeholder="Seleciona o item"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(value) => {
          setSelectedItem(value);
          props.changeSelectedItem(value);
        }}
      >
        {data?.map((item) => (
          <Select.Item key={item.id} label={item.name} value={item.id} />
        ))}
      </Select>
    </Box>
  );
};

export default ItemSelection;
