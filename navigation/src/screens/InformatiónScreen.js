import {Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'

export default function InformatiNScreen(props) {

    const {navigation} = props;
    return (
        <View>
            <Text>IndexInf</Text>
            <Button
                title='Ir a Inicio'
                onPress={()=>navigation.navigate("Index")}
            />
            <Button
                title='Ir a Detalles'
                onPress={()=>navigation.navigate("Details")}
            />
        </View>
    )
}

const styles = StyleSheet.create({})