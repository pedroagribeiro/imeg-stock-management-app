import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import GreetingScreen from "./components/layout/GreetingScreen";
import ActionScreen from "./components/screens/ActionScreen";
import AddItemStockScreen from "./components/screens/AddItemStockScreen";
import RemoveItemStockScreen from "./components/screens/RemoveItemStockScreen";
import CheckStockScreen from "./components/screens/CheckStockScreen";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

const Stack = createNativeStackNavigator();

const App = () => {
  // const [selectItem, setSelectedItem] = React.useState("");
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={GreetingScreen}
            options={{ title: "IMEG Stock Management" }}
          />
          <Stack.Screen
            name="ActionScreen"
            component={ActionScreen}
            options={{ title: "Gestão e consulta de stock" }}
          />
          <Stack.Screen
            name="AddItemStockScreen"
            component={AddItemStockScreen}
            options={{ title: "Adicionar stock" }}
          />
          <Stack.Screen
            name="RemoveItemStockScreen"
            component={RemoveItemStockScreen}
            options={{ title: "Remover stock" }}
          />
          <Stack.Screen
            name="CheckStockScreen"
            component={CheckStockScreen}
            options={{ title: "Consulta o stock" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
