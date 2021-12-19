import { StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { IStackScreenProps } from '../library/StackScreenProps';
import DateTimePicker from 'react-datetime-picker';

const UpdateScreen: React.FunctionComponent<IStackScreenProps> = ( props) => {


    const {id, amount, date, description, category} = props.route.params;

    const [up_date, setdate] = useState(new Date(date));

    const [selectedCategory, setSelectedCategory] = useState(category);
    const [data, setData] = React.useState({
        amount: String(amount),
        description: description,
        check_amountChange: false,
        check_desChange: false,
        isValidAmount: true,
        isValidDescription: true,
    });

    const AmountChange = (val: string) => {
        if( parseInt(val) > 0 && !isNaN(parseInt(val)) && val.length > 0) {
            setData({
                ...data,
                amount: val,
                check_amountChange: true,
                isValidAmount: true
            });
        } else {
            setData({
                ...data,
                amount: val,
                check_amountChange: false,
                isValidAmount: false
            });
        }
    }

    const handleValidAmount = (val: string) => {
        if( parseInt(val) > 0 && !isNaN(parseInt(val)) && val.length > 0 ) {
            setData({
                ...data,
                isValidAmount: true
            });
        } else {
            setData({
                ...data,
                isValidAmount: false
            });
        }
    }
    const DesChange = (val: string) => {
        if( val.length > 0) {
            setData({
                ...data,
                description: val,
                check_desChange: true,
                isValidDescription: true
            });
        } else {
            setData({
                ...data,
                description: val,
                check_desChange: false,
                isValidDescription: false
            });
        }
    }
    const handleValidDes = (val: string) => {
        if( val.length > 0) {
            setData({
                ...data,
                isValidDescription: true
            });
        } else {
            setData({
                ...data,
                isValidDescription: false
            });
        }  
    }


    const UpdateExpense = async (s_amount: string,des: string, categ: string) => {


        let amount = parseInt(s_amount)
        const surl = 'http://localhost:5000/expenses/' + id;

        const response = await fetch(surl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            "amount": amount,
            "date": up_date,
            "description": des
            })
            }).then(response => {
                if (response.status == 200)
                alert('This expense has been updated successfully')
                if (response.status == 422)
                alert('Unprocessable Entity')
              }).catch(error => {
                console.error(error);}
              );
    }



    return (
        <View style={styles.container}>
            <Text style={styles.baseText}>Update your expense</Text>
            <Text style={[styles.customText, {
                color: '#05375a'
            }]}>Amount</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder="Your Amount"
                    value={data.amount}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#05375a'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => AmountChange(val)}
                    onEndEditing={(e)=>handleValidAmount(e.nativeEvent.text)}
                />
            </View>
            { data.isValidAmount ? null :
            <Text style={styles.errorMsg}>Amount must be a positive number (Not a string or negative number).</Text>

            }
                <Text style={[styles.customText, {
                color: '#05375a'
            }]}>Description</Text>
                <TextInput 
                    placeholder="Description"
                    value = {data.description}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => DesChange(val)}
                    onEndEditing={(e)=>handleValidDes(e.nativeEvent.text)}
                />
                { data.isValidDescription ? null : 
            <Text style={styles.errorMsg}>This filed cannot be empty</Text>
            }
                <Text style={styles.textInput}>Date</Text>
                <DateTimePicker
                        onChange={setdate}
                        value={up_date}
                    />
                <Text style={styles.textInput}>Category</Text>
                <Picker style={styles.Picker_style}
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="Housing" value="617be036888f752511901458" />
                    <Picker.Item label="Transportation" value="617be036888f752511901459" />
                    <Picker.Item label="Food" value="617be036888f75251190145a" />
                    <Picker.Item label="Utilities" value="617be036888f75251190145b" />
                    <Picker.Item label="Insurance" value="617be036888f75251190145c" />
                    <Picker.Item label="Medical & Healthcare" value="617be036888f75251190145d" />
                    <Picker.Item label="Gym" value="617be036888f75251190145e" />
                    <Picker.Item label="Gifts" value="617be036888f75251190145f" />
                    <Picker.Item label="Entertainment" value="617be036888f752511901460" />
                    <Picker.Item label="Hobbies" value="617be036888f752511901461" />
                </Picker>
                <View style={{margin:20}}>
                    <Button title='Update expense' color='#009387' onPress={() => UpdateExpense(data.amount,data.description,selectedCategory)} />
                </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    baseText: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: "center"
    },
    customText: {
        fontSize: 14,
        marginTop: 10,
        textAlign: "center"
      },
      condText: {
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
        color: '#fff',
      },
    textInput: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
        width: '100%',
        color: '#05375a',
    },
    item: {
      backgroundColor: '#009387',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    title: {
      fontSize: 32,
      color: '#ffffff'
    },
    Picker_style:{
        flex: 1,
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: "rgba(0, 0, 0, 0.1)"
      },
    normaltext: {
      fontSize: 16,
      color: '#ffffff'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  errorMsg: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 14,
},
    textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
  });

export default UpdateScreen;