import React from 'react';
import {View, Modal, TouchableOpacity,Text, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default DesplegableModal=({visible,close,valoresSeleccion,title,actualizar,clave,registrarCambios})=>{

    return(

        <Modal style={{height:'50%'}} visible={visible} onRequestClose={close}>
            <Text style={{width:'100%',textAlign:'center'}}>{title}</Text>
        <View>

            {valoresSeleccion.map((element,index)=> {
                return (
                    <TouchableOpacity style={{width:'100%', borderRadius:10,borderWidth:1,margin:5,padding:10}} key={index} 
                    onPress={()=>{
                        console.log(element)
                        actualizar(clave,element)
                        registrarCambios(true)
                        close()
                    }}>
                        <Text>{element}</Text>
                    </TouchableOpacity>                                
                )
            })}
            

        </View>
        <View style={styles.btnSalir}>
                <TouchableOpacity onPress={close}>
                    <AntDesign name="closecircleo" size={50} color="black" />
                </TouchableOpacity>
            </View> 
        </Modal>
    );

    
}
const styles=StyleSheet.create({
    btnSalir:{
        alignItems:'center',
        position:'absolute',
        bottom:0,
        width:'100%'
    }
})
