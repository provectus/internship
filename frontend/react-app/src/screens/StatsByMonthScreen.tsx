import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, SafeAreaView, StatusBar, TouchableOpacity, Alert, ListRenderItem} from 'react-native';
import { IStackScreenProps } from '../library/StackScreenProps';
import { Line } from '@ant-design/charts';

const StatsByMonthScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation } = props;
    const [expenses,setexpenses] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    let [data,setdata] = useState( [
        { month: '1', value: 0 },
        { month: '2', value: 0 },
        { month: '3', value: 0 },
        { month: '4', value: 0 },
        { month: '5', value: 0 },
        { month: '6', value: 0 },
        { month: '7', value: 0 },
        { month: '8', value: 0 },
        { month: '9', value: 0 },
        { month: '10', value: 0 },
        { month: '11', value: 0 },
        { month: '12', value: 0 },
      ]);
    
    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'month',
        yField: 'value',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };
    
    let chart;

    type Expense = {
        _id: string;
        category_id: string;
        category: string;
        amount: number;
        date: string;
        month: number,
        description: string;
      };
    
  
      const getExpenses = async () => {
          const surl = 'http://localhost:5000/expenses';
          const response = await fetch(surl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            }).then(response => response.json())
            .then(data => {
                setexpenses(data);
            })
            .catch(err => console.error(err));
          }

          const addToData = (index: number, amount: number) => {
              let mydata = data;
              mydata[index].value += amount
              setdata(mydata);
          }
        const fillByMonth = async () =>{
            expenses.forEach((element: Expense) => addToData(new Date(element.date).getMonth(),element.amount));
        }
      
        useEffect(() => {
          getExpenses();
          fillByMonth();
      }, [refreshKey]);

    
    return (
        <View style={styles.container}>
        <Text style={styles.baseText}>Total amount spent by month</Text>
        <TouchableOpacity
                    onPress={() => {setRefreshKey(oldKey => oldKey +1)}}
                    style={[styles.button1, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                        marginBottom: 10
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Click here to refresh</Text>
                </TouchableOpacity>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        
      </View>
    );
};
export default StatsByMonthScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: StatusBar.currentHeight || 0,
    },
    baseText: {
      fontWeight: 'bold',
      fontSize: 40,
      textAlign: "center"
    },
    item: {
      backgroundColor: '#009387',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
      textAlign: "center",
      color: '#ffffff'
    },
    normaltext: {
      fontSize: 16,
      textAlign: "center",
      color: '#ffffff'
    },
    button1: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  button2: {
    backgroundColor: '#B22222',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
    textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
  });

