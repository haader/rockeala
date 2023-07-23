import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';


export default function ScreenStock() {

  const gastos=[{fecha:"23/7","descripcion":"qwerty",valor:500},{fecha:"22/7","descripcion":"qwerty",valor:1500},{fecha:"14/5","descripcion":"qwerty",valor:2200}]
  
  
  
const ListarGastos = () => {
  return gastos.map((element, index) => ( // Agregamos un paréntesis aquí para devolver explícitamente los elementos
    <View key={index} style={[styles.row, { borderRadius: 10, borderWidth: 1, margin: 5, padding: 5, width: '97%' }]}>
      <Text style={{ width: '25%',textAlign:'center' }}>{element.fecha}</Text>
      <Text style={{ width: '25%',textAlign:'center' }}>{element.descripcion}</Text>
      <Text style={{ width: '25%',textAlign:'center' }}>{element.valor}$</Text>
      <Text style={{ width: '25%',textAlign:'center' }}>Invertido</Text>
      </View>
  ));
};

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Stock de Productos</Text>

        <View style={styles.rowTable}>
          <Text style={styles.columnTable}>Cantidad</Text>
          <Text style={styles.columnTable}>Producto</Text>
          <Text style={styles.columnTable}>Precio Unidad</Text>
          <Text style={styles.columnTable}>Invertido</Text>
        </View>
        <ScrollView>
          <ListarGastos/>
        </ScrollView>
        <View style={styles.row}>
            
            <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={()=>{}}>
                <AntDesign name="pluscircleo" size={50} color="black" />
            </TouchableOpacity>
        
        </View>

      </View>
    );
  }
const styles=StyleSheet.create({
  row:{
    display:'flex',
    flexDirection:'row'
  },
  rowTable:{
    display:'flex',
    flexDirection:'row',
    width:'98%'
  },
  columnTable:{
    width:'25%',
    textAlign:'center'
  }
})
  