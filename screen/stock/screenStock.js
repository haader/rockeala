import React, { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity,Alert} from 'react-native';
import AgregarStockModal from './agregarStockModal';

import { fetchStock } from "../../database/databaseStock";
import VerStockModal from "./verStockModal";

export default function ScreenStock() {


const[datosStock,setDatosStock]=useState([])
 
const traerDatos=()=>{
    
  fetchStock((data)=>{
      setDatosStock(data);
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
   const[valueCantidad,setValueCantidad]=useState();
   const[valueProducto,setValueProducto]=useState();
   const[valuePrecioUnitario,setValuePrecioUnitario]=useState();
   
 
   //funciones para ver los MODALES
   const closeAdd=()=>{
     setVisibleAdd(false)
   }
   const closeVer=()=>{
     setVisibleVer(false)
   }


  
const ListarStock = () => {
  return datosStock.map((element, index) => ( // Agregamos un paréntesis aquí para devolver explícitamente los elementos
    <View key={index} style={styles.row}>
        <View  style={[styles.row, { borderRadius: 10, borderWidth: 1, margin: 5, padding: 5, width: '97%' }]}
                onTouchStart={() =>{

                  setValueId(element.id)
                  setValueCantidad(element.cantidad)
                  setValueProducto(element.producto)
                  setValuePrecioUnitario(element.precioUnitario)
                  setVisibleVer(true)
                } 
                }
                >
          <Text style={{ width: '25%',textAlign:'center' }}>{element.cantidad}</Text>
          <Text style={{ width: '25%',textAlign:'center' }}>{element.producto}</Text>
          <Text style={{ width: '25%',textAlign:'center' }}>{element.precioUnitario}$</Text>
          <Text style={{ width: '25%',textAlign:'center' }}>{element.cantidad * element.precioUnitario} $</Text>
        </View>
        
    </View>
  ));
};

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <AgregarStockModal visible={visibleAdd} close={closeAdd} actualizar={traerDatos}/>
      <VerStockModal visible={visibleVer} close={closeVer} id={valueId} cantidad={valueCantidad} producto={valueProducto} precioUni={valuePrecioUnitario} setDatos={setDatosStock} datos={datosStock} reSelect={reSelect}/>
      


            <View style={styles.header}>
                    <Text>Stock</Text>
            </View>

        <View style={styles.rowTable}>
          <Text style={styles.columnTable}>Cantidad</Text>
          <Text style={styles.columnTable}>Producto</Text>
          <Text style={styles.columnTable}>Precio Unidad</Text>
          <Text style={styles.columnTable}>Invertido</Text>
        </View>
        <ScrollView>
          <ListarStock/>
        </ScrollView>

       

        <View style={styles.row}>
            
            <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={()=>{
              setVisibleAdd(true)
            }}>
                <AntDesign name="pluscircleo" size={50} color="black" />
            </TouchableOpacity>
        
        </View>

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
  },row:{
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
    backgroundColor:'black'
  },
  columnTable:{
    width:'25%',
    textAlign:'center',
    color:'white',
    padding:5
  }
})
  