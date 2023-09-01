import React,{useState,useEffect} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default  HistorialTurnoClienteModal=({visible,close,datosHistorialCliente, cliente})=>{

 const ListHistorial=()=>{
          
            return(
              
                datosHistorialCliente.map((element,index)=>{
                  
                  return(
                        <View key={'texto'+index} style={[styles.row,{borderRadius:10,borderWidth:1,margin:5}]}>
                          
                            <Text style={styles.celdaHistorial}>{element.fecha}</Text>
                            <Text style={styles.celdaHistorial}>{element.horario}</Text>
                            <Text style={styles.celdaHistorial}>{element.servicio}</Text>
                            <Text style={styles.celdaHistorial}>{element.descripcion}</Text>
                        </View>
                    )
                 
                    
                    }
                )   
            )    
    
        
      }

  return(

    <Modal visible={visible} onRequestClose={close}>
        
        <View style={styles.header}>
                <Text>Historial de: {cliente}</Text>
        </View>

        <View style={styles.body}>

                <View style={[styles.row,{borderRadius:10,borderWidth:1,margin:5,backgroundColor:'black'}]}>
                    
        
                    <Text style={[styles.widthTabla]}>Fecha</Text>
                    <Text style={[styles.widthTabla]}>Horario</Text>
                    <Text style={[styles.widthTabla]}>Servicio</Text>
                    <Text style={[styles.widthTabla]}>Descripción</Text>
                            
                        

                </View>

                <ListHistorial/>

        </View>

      {/* botones */}
      <View style={[styles.row,{justifyContent:'center',alignItems:'center'}]}>

                <TouchableOpacity style={styles.btn} onPress={
                        ()=>{
                          close()
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
            
          },

          widthTabla:{
            width:'25%',
            fontWeight:'bold',
            textAlign:'center',
            color:'white'
          },
          celdaHistorial:{
            width:'25%',
            justifyContent:'center',
            textAlign:'center',
            alignContent:'center'
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