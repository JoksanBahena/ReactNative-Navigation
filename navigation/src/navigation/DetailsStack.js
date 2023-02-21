import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function DetailsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = "detailsS"
            component = {DetailsScreen}
            options = {{title: "Detalles"}}/>
            <Stack.Screen
            name = "loginS"
            component = {LoginScreen}
            options = {{title: "Inicio Sesion"}}/>
        </Stack.Navigator>
      )
}

const styles = StyleSheet.create({})