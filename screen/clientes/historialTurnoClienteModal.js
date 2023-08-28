import React,{useState,useEffect} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default  HistorialTurnoClienteModal=({visible,close,datosHistorialCliente})=>{

 const ListHistorial=()=>{

            return(
                datosHistorialCliente.map((element)=>{
                  let index=0;  
                  return(
                        <View key={index++} style={styles.row}>
                          
                            <Text style={styles.fecha}>{element.fecha}</Text>
                            <Text style={styles.tratamiento}>{element.tratamiento}</Text>
                            <Text style={styles.descripcion}>{element.descripcion}</Text>
                        </View>
                    )
                    
                    }
                )   
            )    
    
        
      }

  return(

    <Modal visible={visible} onRequestClose={close}>
        
        <View style={styles.header}>
                <Text>Historial de turnos de {datosHistorialCliente.cliente}</Text>
        </View>

        <View style={styles.body}>

                <View style={styles.row}>
                    
                    <Text>Fecha</Text>
                    <Text>Tratamiento</Text>
                    <Text>Descripción</Text>

                </View>

                <ListHistorial/>

        </View>

      {/* botones */}
      <View style={[styles.row,{justifyContent:'center',alignItems:'center'}]}>

                <TouchableOpacity style={styles.btn} onPress={
                        ()=>{
                          cerrar();
                        }
                    }>
                        <AntDesign name="closecircleo" size={24} color="black" />

                    </TouchableOpacity>

                    
      </View>
        
    </Modal>
    )
}

const styles=StyleSheet.create(
    {
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
          body:{
            display:'flex',
            flexDirection:'column',
            margin:10,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:10,
            borderWidth:1
          },

          fecha:{
                width:'20%',
                justifyContent:'center'
            },
            tratamiento:{
                width:'20%',
                justifyContent:'center'
            },
            descripcion:{
                width:'20%',
                justifyContent:'center'
            },

          row:{
            display:'flex',
            flexDirection:'row'
          },
          btn:{
            borderRadius:10,
            borderWidth:1,
            padding:5,
            margin:5
          }
    }
)