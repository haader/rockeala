import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

// esta ventana tiene una opción para compartir por whatsapp los precios
export default function ScreenPrecios() {
 
  const precios=[
    {"servicio":"Corte",valor:1000},{"servicio":"Tintura",valor:4000},{"servicio":"Alisado",valor:9000}]
  
const ListarPrecios = () => {
  return precios.map((element, index) => ( // Agregamos un paréntesis aquí para devolver explícitamente los elementos
    <View key={index} style={[styles.row, styles.border]}>
      <Text style={{ width: '50%',textAlign:'center' }}>{element.servicio}</Text>
      <Text style={{ width: '50%',textAlign:'center' }}>{element.valor} $</Text>
    </View>
  ));
};

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Precios de la Peluqueria</Text>

        <View style={[styles.rowTable,styles.border,{backgroundColor:'black'}]}>
          <Text style={styles.columnTable}>Servicio</Text>
          <Text style={styles.columnTable}>Precio</Text>
        </View>

        <ScrollView>
          <ListarPrecios/>
        </ScrollView>
      
        
            <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={()=>{}}>
                <AntDesign name="pluscircleo" size={50} color="black" />
            </TouchableOpacity>
        
            

      </View>
    );
  }
const styles=StyleSheet.create({
  border:{
    borderRadius: 10, borderWidth: 1, margin: 5, padding: 5, width: '97%' 
  },
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
    width:'50%',
    textAlign:'center',
    color:'white'
  }
})
  