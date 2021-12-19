import { StatusBar } from 'react-native';
import React from 'react';
import { Button, StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { IStackScreenProps } from '../library/StackScreenProps';

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation} = props;

    return (
        <View style={styles.container}>
            <Text style={styles.baseText}>Expenses app</Text>
            <TouchableOpacity
                    onPress= {() => navigation.navigate('Display')}
                    style={[styles.button1, {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#ffffff'
                    }]}>Display all expenses</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Add')}}
                    style={[styles.button1, {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#ffffff'
                    }]}>Add new expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('StatsM')}}
                    style={[styles.button1, {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#ffffff'
                    }]}>Stats by month</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('StatsC')}}
                    style={[styles.button1, {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#ffffff'
                    }]}>Stats by spending category</Text>
                </TouchableOpacity>
            <StatusBar/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
        alignItems: 'center',
        justifyContent: 'center'
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: "center"
      },
      textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    button1: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 10
  }
});

export default HomeScreen;