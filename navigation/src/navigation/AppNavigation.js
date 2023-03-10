import React, {useEffect, useState}from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IndexStack from "./IndexStack";
import DetailsStack from "./DetailsStack";
import ProfileStack from "./ProfileStack";
import {getAuth, onAuthStateChanged} from 'firebase/auth';


const Tab = createBottomTabNavigator();

export default function AppNavigation() {

  const [session, setSession] = useState(null)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth ,(user)=>{
      setSession(user ? true : false)
    })

  
  }, [])

  return session ? (
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
      component={IndexStack}
      name="index"
      options={{
        title: "Inicio",
        // headerShown:false
      }}
    />
    <Tab.Screen
      component={DetailsStack}
      name="details"
      options={{
        title: "Detalles",
      }}
    />
    <Tab.Screen
      component={ProfileStack}
      name="profile"
      options={{
        title: "Perfil",
      }}
    />
    {/* <Tab.Screen component={LoginSreen} name='login' options={{
      title:'Inicio Sesión'
  }}/> */}
  </Tab.Navigator>
   ) : (
    <IndexStack>
      
    </IndexStack>
   );
}
function showIcons(route, color) {
  let icono;
  if (route.name == "index") {
    icono = "home-circle";
  }
  if (route.name == "details") {
    icono = "details";
  }
  if (route.name == "profile") {
    icono = "account-outline";
  }
  return (
    <Icon type="material-community" name={icono} color={color} size={25} />
  );
}