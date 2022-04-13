import React from "react";
import { VStack, Heading, Button, Center } from "native-base";
import CompanyLogo from "../CompanyLogo";

const GreetingScreen = ({ navigation }) => {
  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <CompanyLogo />
        <Button onPress={() => navigation.navigate("ActionScreen", {})}>
          Escolher ação
        </Button>
      </VStack>
    </Center>
  );
};

export default GreetingScreen;
