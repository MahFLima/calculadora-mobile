import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput } from 'react-native'
import ButtonMath from '../components/ButtonMath';
import { Entypo } from '@expo/vector-icons'
 
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Calculadora(){
  const [modoNoturno, setModoNoturno] = useState(true)
  const botoes = ["AC", "DEL", "%", "+", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "+/-", "="]

  const [displayValue, setDisplayValue] = useState("")
  const [historico, setHistorico] = useState("")
  const [lastOperation, setLastOperation] = useState("")
  let n1 = 0

  const [acumulado, setAcumulado] = useState(0); // Adicionando estado para o valor acumulado

  function handleClear(){
    setHistorico("")
    setDisplayValue("")
    setLastOperation("")
    setAcumulado(0)
  }

  async function handleResult(){
    
    if(lastOperation === "+"){
      await setDisplayValue((acumulado + n1).toString());
      await setHistorico((acumulado + n1).toString())
      setAcumulado(0);
    }
        
    if(lastOperation === "-"){
      await setDisplayValue((acumulado - n1).toString());
      await setHistorico((acumulado - n1).toString())
      setAcumulado(0);
    }

    if(lastOperation === "*"){
      await setDisplayValue((acumulado * n1).toString());
      await setHistorico((acumulado * n1).toString())
      setAcumulado(0);
    }

    if(lastOperation === "/"){
      await setDisplayValue((acumulado / n1).toString());
      await setHistorico((acumulado / n1).toString())
      setAcumulado(0);
    }
  }

  const handleButtonClick = (input: string) => {
    if (!isNaN(parseInt(input)) || input === '.') {
      // Se o input é um número ou um ponto
      if (displayValue === '0') {
        setDisplayValue(input);
      } else {
        setDisplayValue(prev => prev + input);
      }
    } else {
      if(input === "AC"){
        handleClear()
        return
      }
      if(input === "DEL"){
        let novaString = displayValue.substring(0, displayValue.length - 1);
        let novoHistorico = historico.substring(0, historico.length - 1);
        setDisplayValue(novaString)
        setHistorico(novoHistorico)
        return
      }
      // Se o input é um operador
      handleOperation(input);
    }
    if(input !== "+/-"){
      setHistorico(historico + input)
    }
    
  };

  async function handleOperation(op: string){
    n1 = parseFloat(displayValue || "0");

    switch(op) {
      case "+":
        setAcumulado(acumulado + n1);
        setDisplayValue(""); 
        setLastOperation(op)
        break;
      case "-":
        if(acumulado === 0){
          setAcumulado(n1 - acumulado);
        } else {
          setAcumulado(acumulado - n1);
        }
        setDisplayValue("");
        setLastOperation(op)
        break;
      case "*":
        console.log(acumulado)
        console.log(n1)
        if(acumulado === 0){
          setAcumulado(1)
          setAcumulado(acumulado + n1);
        } else{
          setAcumulado(acumulado * n1);
        }

        setDisplayValue("");
        setLastOperation(op)
        break
      case "/":
        setAcumulado(acumulado + n1);
        setDisplayValue(""); 
        setLastOperation(op)
        break
      case "%":
        n1 = n1 / 100
        setDisplayValue(n1.toString())
        break
      case "+/-":
        setDisplayValue(prev => {
          if (prev[0] === '-') {
            return prev.slice(1); // Remove o sinal de menos
          } else {
            return '-' + prev; // Adiciona o sinal de menos
          }
        });
        n1 = parseFloat(displayValue)
      case "=":
        handleResult()
        break;
      default:
        return;
    }
  }
  
  return(
    <View style={
      [
        styles.container,
        modoNoturno ? {backgroundColor: "#424242"} : {backgroundColor: "#fff"}
      ]
    }>
      <View style={
        [
          styles.result,
          modoNoturno ? {backgroundColor: "#424242"} : {backgroundColor: "#fff"}
        ]
      }>
        <TouchableOpacity style={styles.buttonMode}>
          <Entypo
            name={modoNoturno ? 'moon' : 'light-up'}
            size={24}
            onPress={() => {
              modoNoturno ? setModoNoturno(false) : setModoNoturno(true)
            }}
            style={modoNoturno ? {color: "#fff"} : {color: "#212121"}}
          />
        </TouchableOpacity>
        <Text style={
          [
            styles.textHistorico,
            modoNoturno ? {color: "#fff"} : {color: "#212121"}
          ]
        }>{historico}</Text>
        <Text style={
          [
            styles.textInput,
            modoNoturno ? {color: "#fff"} : {color: "#212121"}
          ]
        }>{displayValue}</Text>
      </View>
      <View style={
        [
          styles.keyboard,
          modoNoturno ? {backgroundColor: "#212121"} : {backgroundColor: '#E0E0E0'}
        ]
      }>
        {botoes.map((button,index) => {
          return(
            <ButtonMath
              key={index}
              text={button}
              isDarkMode={modoNoturno}
              buttonWidth={screenWidth * 0.2}
              buttonHeight={screenHeight * 0.09}
              onPress={() => {handleButtonClick(button)}}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{

  },
  result:{
    padding: 20,
    minHeight: screenHeight * 0.3,
    position: "relative",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  buttonMode:{
    position: "absolute",
    top: 20,
    left: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  textHistorico:{
    fontSize: 18,
  },
  textInput:{
    fontSize: 34,
    minHeight: 34
  },
  keyboard:{
    paddingTop: 20,
    minHeight: screenHeight * 0.7,
    backgroundColor: '#EEEEEE',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  button:{
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  textButton:{
    fontSize: 20
  }
})