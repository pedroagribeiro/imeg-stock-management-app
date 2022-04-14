import React, { useState, useEffect } from "react";
import {
  HStack,
  Spinner,
  Heading,
  Select,
  CheckIcon,
  Box,
  Text,
} from "native-base";
import axios from "axios";

const WorkSiteSelection = (props) => {
  const api_host = process.env["BACKEND_HOST"];
  const api_port = process.env["BACKEND_PORT"];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedWorkSite, setSelectedWorkSite] = useState(null);

  const url = "http://" + api_host + ":" + api_port + "/work_site";

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
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

  if (error) console.log(error);

  return (
    <Box>
      <Select
        selectedValue={selectedWorkSite}
        accessibilityLabel="Seleciona a obra"
        placeholder="Seleciona a obra"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(value) => {
          setSelectedWorkSite(value);
          props.changeSelectedWorkSite(value);
        }}
      >
        {data?.map((worksite) => (
          <Select.Item
            key={worksite.id}
            label={worksite.name}
            value={worksite.id}
          />
        ))}
      </Select>
    </Box>
  );
};

export default WorkSiteSelection;
