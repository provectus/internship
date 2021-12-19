import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, SafeAreaView, StatusBar, TouchableOpacity, Alert, ListRenderItem} from 'react-native';
import { IStackScreenProps } from '../library/StackScreenProps';
import { Line } from '@ant-design/charts';

const StatsByCategoryScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation } = props;
    const [categories,setcategories] = useState([]);
    const [expenses,setexpenses] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    let [data,setdata] = useState( [
        { category: 'Housing', value: 0 },
        { category: 'Transportation', value: 0 },
        { category: 'Food', value: 0 },
        { category: 'Utilities', value: 0 },
        { category: 'Insurance', value: 0 },
        { category: 'Medical & Healthcare', value: 0 },
        { category: 'Gym', value: 0 },
        { category: 'Gifts', value: 0 },
        { category: 'Entertainment', value: 0 },
        { category: 'Hobbies', value: 0 },
      ]);
    
    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'category',
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
      type category = {
        _id: string,
        title: string
      }
      type dataType = {
        category: string,
        value: number
      }

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
    
  
      const getCateogires = async () => {
        const surl = 'http://localhost:5000/categories';
        const response = await fetch(surl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
          }).then(response => response.json())
          .then(data => {
            setcategories(data);
          })
          .catch(err => console.error(err));
        }

          const addToData = (categ: string, amount: number) => {
              let index = 0
              data.forEach((element: dataType) => {if (element.category == categ) index = data.indexOf(element)})
              let mydata = data;
              mydata[index].value += amount
              setdata(mydata);
          }
        const fillByCategory = async () =>{
            expenses.forEach((element: Expense) => element.category = categories.filter((c: category)=> c._id == element.category)[0]['title']);
            expenses.forEach((element: Expense) => addToData(element.category,element.amount))
            
        }
      
        useEffect(() => {
            getExpenses();
            getCateogires();
            fillByCategory();
        }, [refreshKey]);

    
    return (
        <View style={styles.container}>
        <Text style={styles.baseText}>Total amount spent by category</Text>
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
export default StatsByCategoryScreen;

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

