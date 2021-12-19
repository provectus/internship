import { setGlobal } from '@antv/g2plot';
import { format, parse } from 'path/posix';
import { title } from 'process';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList, SafeAreaView, StatusBar, TouchableOpacity, Alert, ListRenderItem} from 'react-native';
import { IStackScreenProps } from '../library/StackScreenProps';
import UpdateScreen from '../screens/UpdateScreen';


interface category {
  _id: string,
  title: string
}

const DisplayScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation } = props;
    const [expenses,setexpenses] = useState([]);
    const [categories,setcategories] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [code,setcode] = useState([0]);

    type Expense = {
        _id: string;
        category_id: string;
        category: string;
        amount: number;
        date: string;
        _date: string,
        description: string;
      };
      const deleteExpense = async (id: string) => {
        const surl = 'http://localhost:5000/expenses/' + id;
        const response = await fetch(surl, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
          }).then(response => {
            if (response.status == 200)
            alert('This expense has been deleted successfully')
            if (response.status == 404)
            alert('The folllowing expense does not found in the database')
          })
          .then(() => setRefreshKey(oldKey => oldKey +1))
          .catch(err => console.error(err));
        }
        /* () => setexpenses(expenses.filter((item:Expense) => item._id != id)) */
    
    const Item = ( expense: Expense ) => {
      return <View style={styles.item}>
        <Text style={styles.title}>{expense.description}</Text>
        <Text style={styles.normaltext}> Category is {expense.category}  </Text>
        <Text style={styles.normaltext}> Amount is  {expense.amount}  </Text>
        <Text style={styles.normaltext}> Expense date is {expense.date}  </Text>
        <TouchableOpacity
                    onPress={() => {navigation.navigate('Update',{
                      id: expense._id,
                      amount: expense.amount,
                      date: expense._date,
                      description: expense.description,
                      category: expense.category_id
                    })}}
                    style={[styles.button1, {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#ffffff'
                    }]}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {deleteExpense(expense._id)}}
                    style={[styles.button2, {
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#ffffff'
                    }]}>Delete</Text>
                </TouchableOpacity>
      </View>
    };
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

    
      useEffect(() => {
        getCateogires();
        getExpenses();
    }, [refreshKey]);

    
    
    let renderItem = ({item}: {item:Expense}) => {
      return (<Item _id={item._id} description={item.description} amount={item.amount} 
        _date={item.date} date={new Date(item.date).toString()} category_id={item.category} 
        category={categories.filter((c: category)=> c._id == item.category)[0]['title']}/>)
      };


    return (
        <View style={styles.container}>
        <Text style={styles.baseText}>Current expenses</Text>
        <SafeAreaView style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => `row-${item._id}`}
        renderItem={renderItem}
      />
    </SafeAreaView>
      </View>
    );
};
export default DisplayScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
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

