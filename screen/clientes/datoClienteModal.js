import React,{useState,useEffect} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default  datoClienteModal=({visible,close,name,id,datosClientes,setDatos,cambios})=>{

    const [inputAdress, setInputAdress] = useState();
    const [inputPhone, setInputPhone] = useState();
    const [inputEstilista, setinputEstilista] = useState();
    
    useEffect(() => {
        // Actualizar los estados cuando cambian las propiedades
        setInputAdress(datosClientes.adress);
        setInputPhone(datosClientes.phone);
        setinputEstilista(datosClientes.estilista);
      }, [id]);
    

    const InputChange0 = (text) => {
        
        setInputAdress(text);
    };
    const InputChange1 = (text) => {
        
        setInputPhone(text);
    };

    const InputChange2 = (text) => {
        
      setinputEstilista(text);
  };

    const actualizarDatos=()=>{
      if((inputAdress!=null&&inputPhone!=null&&inputEstilista!=null)&&({
        "adress":inputAdress,
        "phone":inputPhone,
        "estilista":inputEstilista
      }!==datosClientes)){

        Alert.alert(
          'Atención',
          '¿Desea Editar estos datos estos datos?',
          [{
              text:'SI',
              onPress:()=>{

                  setDatos({
                    "adress":inputAdress,
                    "phone":inputPhone,
                    "estilista":inputEstilista
                  });
                  cambios(true);
                  close();
                
              },
              style:'default'
          },
          {
              text:'No',
              onPress:()=>{},
              style:'default'
          }
      ])




        
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
    }

    
    return(
    <Modal visible={visible} onRequestClose={close}>
        <View style={styles.header}>
        <Text>Editar Detalle Del cliente {name}</Text>
      </View>
        <View style={styles.body}>

                <View style={styles.input}>
                    <Text>Dirección:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    onChangeText={InputChange0}
                    value={inputAdress}/>
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setInputAdress()
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.input}>
                    <Text>Telefono:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    //keyboardType='numeric'
                    onChangeText={InputChange1}
                    value={inputPhone} // Convertimos el valor a una cadena de texto
                    
                    />
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setInputPhone()
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.input}>
                    <Text>Estilista:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    keyboardType='text'
                    onChangeText={InputChange2}
                    value={inputEstilista} // Convertimos el valor a una cadena de texto
                    
                    />
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setinputEstilista()
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>
        </View>

      {/* botones */}
      <View style={[styles.row,{justifyContent:'center',alignItems:'center'}]}>

                <TouchableOpacity style={styles.btn} onPress={
                        ()=>{
                          actualizarDatos();
                        }
                    }>
                        <Text>Gurdar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={
                            ()=>{
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