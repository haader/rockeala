import React,{useState} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { addPrecios } from '../../database/precios/databasePrecios';

export default  AgregarPreciosModal=({visible,close,actualizar})=>{

    const [inputServicio, setInputServicio] = useState();
    const [inputPrecio, setInputPrecio] = useState();

    const InputChange0 = (text) => {
        console.log(text)
        setInputServicio(text);
    };
    const InputChange1 = (text) => {
        console.log(text)
        setInputPrecio(text);
    };

    const funcionAddPrecio=()=>{
        if(inputServicio!=null&&inputPrecio!=null){
            addPrecios(inputServicio,inputPrecio);
            setInputPrecio();
            setInputServicio();
            close();
            actualizar();    
        }else{
            Alert.alert(
                'Atención',
                'NO se agregaron valores',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('Alerta cerrada'),
                    style: 'default',
                  },
                ]
              );
        }
        
    };

    
    return(
    <Modal visible={visible} onRequestClose={close}>
        <View style={styles.header}>
        <Text>Agregar Servicio</Text>
      </View>
        <View style={styles.body}>

                <View style={styles.input}>
                    <Text>Servicios:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    onChangeText={InputChange0}
                    value={inputServicio}/>
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setInputServicio('')
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.input}>
                    <Text>Precio:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    keyboardType='numeric'
                    onChangeText={InputChange1}
                    value={inputPrecio}
                    />
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setInputPrecio()
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>
        </View>

      {/* botones */}
      <View style={[styles.row,{justifyContent:'center',alignItems:'center'}]}>

                <TouchableOpacity style={styles.btn} onPress={
                        ()=>{
                            funcionAddPrecio();
                        }
                    }>
                        <Text>Agregar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={
                            ()=>{
                              setInputServicio()
                              setInputPrecio()
                                close()
                            }
                        }>
                            <Text>Cancelar</Text>

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
          inputText:{
            width:'50%',textAlign:'center'
            },
          row:{
            display:'flex',
            flexDirection:'row'
          },
          input:{
            borderRadius:10,
            borderWidth:1,
            justifyContent:'center',
            alignItems:'center',
            padding:5,margin:10,
            display:'flex',
            flexDirection:'row',
            width:'80%'
          },
          btn:{
            borderRadius:10,
            borderWidth:1,
            padding:5,
            margin:5
          }
    }
)