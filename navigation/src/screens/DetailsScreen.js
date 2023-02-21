import {Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'

export default function DetailsScreen(props) {

    const {navigation} = props;
    return (
        <View>
            <Text>IndexDet</Text>
            <Button
                title='Ir a Inicio'
                onPress={()=>navigation.navigate("Index")}
            />
            <Button
                title='ir a información'
                onPress={()=>navigation.navigate("Information")}
            />
        </View>
    )
}

const styles = StyleSheet.create({})