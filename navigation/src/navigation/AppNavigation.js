import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import DetailsScreen from "../screens/DetailsScreen";
import InformatiNScreen from "../screens/InformatiónScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import IndexStack from "./IndexStack";
import DetailsStack from "./DetailsStack";
import { Icon } from "react-native-elements";
import ProfileStack from "./ProfileStack";

// const Drawer = createDrawerNavigator();

// export default function AppNavigation() {
//     return (
//         <Drawer.Navigator>
//             <Drawer.Screen
//                 component={IndexScreen}
//                 name='index'
//                 option={{title:'Inicio'}}
//             />
//             <Drawer.Screen
//                 component={DetailsScreen}
//                 name='details'
//                 option={{title:'Detalles'}}
//             />
//             <Drawer.Screen
//                 component={InformatiNScreen}
//                 name='information'
//                 option={{title:'Detalles'}}
//             />
//         </Drawer.Navigator>
//     )
// }

const Tab = createBottomTabNavigator();
export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarStyle: {
          paddingBottom: 15,
          height: 60,
        },
        headerShown: false,
        tabBarActiveTintColor: "#00222a",
        tabBarInactiveTintColor: "#a3b6ac",
        tabBarIcon: ({ size }) => showIcons(route, size),
      })}
    >
      <Tab.Screen
        style={styles.text}
        component={IndexStack}
        name="Index"
        options={{
          title: "Inicio",
        }}
      />
      <Tab.Screen
        component={DetailsStack}
        name="Details"
        options={{
          title: "Detalles",
        }}
      />
      <Tab.Screen
        component={ProfileStack}
        name="Profile"
        options={{
          title: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
}

function showIcons(route, size) {
  let icono;

  if (route.name === "Index") {
    icono = "home-circle";
  }
  if (route.name === "Details") {
    icono = "book-open-outline";
  }
  if (route.name === "Profile") {
    icono = "account-outline";
  }

  return (
    <Icon type="material-community" name={icono} color={"black"} size={size} />
  );
}

/*const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    component={IndexScreen}
                    name='index'
                    option={{title:'Inicio'}}
                />
                <Stack.Screen
                    component={DetailsScreen}
                    name='details'
                    option={{title:'Detalles'}}
                />
                <Stack.Screen
                    component={InformatiNScreen}
                    name='information'
                    option={{title:'Detalles'}}
                />
            </Stack.Navigator>
    )
}
*/

const styles = StyleSheet.create({
  container: {
    marginLeft: 60,
  },
  text: {
    fontSize: 20,
  },
});
