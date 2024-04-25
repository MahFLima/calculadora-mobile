import { StyleSheet, Text, TouchableOpacity } from "react-native"

type botao = {
  text: string
  isDarkMode: boolean
  buttonWidth: number
  buttonHeight : number
  onPress(): void
}

export default function ButtonMath({text, isDarkMode, buttonWidth, buttonHeight, onPress}: botao){
  
  return(
    <TouchableOpacity onPress={() => {onPress()}} style={
      [
        styles.button, 
        { 
          width: buttonWidth, 
          height: buttonHeight 
        },
        isDarkMode ? {backgroundColor: "#424242"} : {backgroundColor: '#fafafa'}
      ]
    }>
      <Text style={
        [
          styles.textButton,
          isDarkMode ? {color: "#FAFAFA"} : {color: "#212121"}
        ]
      }>
        {text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  textButton:{
    fontSize: 24
  }
})