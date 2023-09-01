import React, { useState, useEffect, useRef } from "react";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity,Linking} from 'react-native';
import AgregarPreciosModal from './agregarPreciosModal'
import {fetchPrecios} from "../../database/precios/databasePrecios";
import VerPreciosModal from "./verPreciosModal";



export default function ScreenPrecios() {

const[datosPrecios,setDatosPrecios]=useState([])
 
const traerDatos=()=>{
    
  fetchPrecios((data)=>{
      setDatosPrecios(data);
    })

}

useEffect(()=>{
  
  traerDatos();
    
},[])


  //MODALES VISIBILIDAD
  const[visibleAdd,setVisibleAdd]=useState(false);
  const[visibleEdit,setVisibleEdit]=useState(false);
  const[reSelect,setReSelect]=useState(false);
  

  //MODALES EDITAR VALORES
  const[valueServicio,setValueServicio]=useState();
  const[valuePrecio,setValuePrecio]=useState();
  const[valueId,setValueId]=useState();

  //funciones para ver los MODALES
  const closeAdd=()=>{
    setVisibleAdd(false)
  }
  
  const closeEdit=()=>{
    setVisibleEdit(false)
  }

  const ListarPrecios = () => {
    return datosPrecios.map((element, index) => (
      
        <View key={index} style={styles.row}>
          
            <View
              style={[styles.row, styles.border]}
              onTouchStart={() => {
                
                editPrecios(element.id,element.servicio,element.precio); 
                setReSelect(!reSelect)
                
              }}
            >
              <Text style={{ width: '50%',textAlign:'center' }}>{element.servicio}</Text>
              <Text style={{ width: '50%',textAlign:'center' }}>{element.precio} $</Text>
              
            </View>
          
    
         
        </View>
        
      
    ));
  };

  

  const editPrecios = (id,servicio,precio) => {
    console.log(id,servicio,precio);
    setValueId(id)
    setValueServicio(servicio);
    setValuePrecio(precio);
    setVisibleEdit(true);
  };

  
  const shareToWhatsApp = () => {
    
    let listaPrecios=datosPrecios.map((obj=>{
      return(
        `- *${obj.servicio}* : ${obj.precio}$ \n`
      )
    }))
     //= "Precio 1: $10\nPrecio 2: $20\nPrecio 3: $30"; 
    const message = `Hola como estas?\n Te paso la lista de precios:\n${listaPrecios} No dudes en consultarme! `;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.error("WhatsApp no está instalado en el dispositivo.");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(error => console.error("Error al abrir WhatsApp:", error));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <AgregarPreciosModal visible={visibleAdd} close={closeAdd} actualizar={traerDatos}/>
      <VerPreciosModal visible={visibleEdit} close={closeEdit} servicio={valueServicio} precio={valuePrecio} id={valueId} setDatos={setDatosPrecios} datos={datosPrecios} reSelect={reSelect}/>
      

      <View style={styles.header}>
        <Text>Precios de la Peluqueria</Text>
      </View>

      <View style={[styles.rowTable, styles.border, { backgroundColor: 'black' }]}>
        <Text style={styles.columnTable}>Servicio</Text>
        <Text style={styles.columnTable}>Precio</Text>
      </View>

     
      
    
  <ScrollView>
    
      {/* Contenido del ScrollView aquí */}
      <ListarPrecios />
    
  </ScrollView>


      
    




      <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={() => {
        setVisibleAdd(true)
      }}>
          <AntDesign name="pluscircleo" size={50} color="black" />
      </TouchableOpacity>

      
      <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={() => {
        shareToWhatsApp()
      }}>
          <AntDesign name="sharealt" size={24} color="black" />
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
    margin: 10,
    alignItems: 'center',
    padding: 10,
    width: '97%'
  },
  border: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    width: '97%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  rowTable: {
    display: 'flex',
    flexDirection: 'row',
    width: '98%'
  },
  columnTable: {
    width: '50%',
    textAlign: 'center',
    color: 'white'
  }
});
