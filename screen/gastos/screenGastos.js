import React, { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity,Alert} from 'react-native';
import AgregarGastosModal from './agregarGastosModal';

import { fetchGastos } from "../../database/databaseGastos";
import VerGastosModal from "./verGastosModal";

export default function ScreenGastos() { 

  const[datosGastos,setDatosGastos]=useState([])
 
const traerDatos=()=>{
    
  fetchGastos((data)=>{
      setDatosGastos(data);
    })

}

useEffect(()=>{
  
  traerDatos();
    
},[])

   //MODALES VISIBILIDAD
   const[visibleAdd,setVisibleAdd]=useState(false);
   const[visibleVer,setVisibleVer]=useState(false);
   const[reSelect,setReSelect]=useState(false);
 
   //MODALES EDITAR VALORES
   const[valueId,setValueId]=useState();
   const[fecha,setFecha]=useState();
   const[descripcion,setDescripcion]=useState();
   const[valor,setValor]=useState();
   
   //funciones para ver los MODALES
   const closeAdd=()=>{
     setVisibleAdd(false)
   }
   const closeEdit=()=>{
     setVisibleVer(false)
   }


  const obtenerTotal=()=>{
    
    let total=0;
    for (let index = 0; index < datosGastos.length; index++) {
      total=total+parseInt(datosGastos[index].valor);
      
    }
    return total
  }


const ListarGastos = () => {
  return datosGastos.map((element, index) => ( // Agregamos un paréntesis aquí para devolver explícitamente los elementos
    
  <View key={index} style={styles.row}>

    <View  style={[styles.row, { borderRadius: 10, borderWidth: 1, margin: 5, padding: 5, width: '97%' }]}
     onTouchStart={() =>
      {
        setValueId(element.id)
        setFecha(element.fecha)
        setDescripcion(element.descripcion)
        setValor(element.valor)
        setVisibleVer(true)
      }
    }
    >
      <Text style={{ width: '33%',textAlign:'center' }}>{element.fecha}</Text>
      <Text style={{ width: '33%',textAlign:'center' }}>{element.descripcion}</Text>
      <Text style={{ width: '33%',textAlign:'center' }}>{element.valor}$</Text>
    </View>
    

  </View>
  ));
};

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
      <AgregarGastosModal visible={visibleAdd} close={closeAdd} actualizar={traerDatos}/>
      <VerGastosModal visible={visibleVer} close={closeEdit} id={valueId} fecha={fecha} descripcion={descripcion} valor={valor} setDatos={setDatosGastos} datos={datosGastos} reSelect={reSelect}/>
      

        <View style={styles.header}>
          <Text>Gastos</Text>
        </View>

        <View style={styles.rowTable}>
          <Text style={styles.columnTable}>Fecha</Text>
          <Text style={styles.columnTable}>Descripción</Text>
          <Text style={styles.columnTable}>Valor</Text>
          
        </View>
        <ScrollView>
          <ListarGastos/>
        </ScrollView>
        <View style={styles.row}>
          
          <Text>Total:</Text>
          <Text>{obtenerTotal()}</Text>
            
        </View>


      
        
        <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={()=>{
          setVisibleAdd(true);
        }}>
                <AntDesign name="pluscircleo" size={50} color="black" />
        </TouchableOpacity>

      </View>
    );
  }
const styles=StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin:10,
    alignItems: 'center',
    padding:10,
    width:'97%'
  },
  row:{
    display:'flex',
    flexDirection:'row'
  },
  rowTable:{
    display:'flex',
    flexDirection:'row',
    width:'98%',
    borderWidth:1,
    borderRadius:10,
    margin:10,
    padding:5,
    backgroundColor:'black'
  },
  columnTable:{
    width:'33%',
    textAlign:'center',
    color:'white'
  }
})
  