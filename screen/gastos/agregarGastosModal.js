import React,{useState} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { addGastos } from '../../database/databaseGastos';


export default  AgregarGastosModal=({visible,close,actualizar})=>{
    const mesesEnEspanol = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
      ];
      
    const [InputDescripcion, setInputDescripcion] = useState('');
    const [InputValor, setInputValor] = useState();

    const InputChange0 = (text) => {
        console.log(text)
        setInputDescripcion(text);
    };
    const InputChange1 = (text) => {
        console.log(text)
        setInputValor(text);
    };

    const obtenerFecha=()=>{

let fecha = new Date();

// Obtener el día del mes
let dia = fecha.getDate();

let mes = mesesEnEspanol[fecha.getMonth()];

// Formatear la fecha en el formato deseado
return `${dia}/${mes}`;
    }

    const agregarGasto=()=>{
        
            if(InputDescripcion!=null&&InputValor!=null){

                let fecha=obtenerFecha();
                
                addGastos(fecha,InputDescripcion,InputValor);
                    setInputDescripcion();
                    setInputValor();
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
            
    
            
            actualizar;
            close;
        
    }

    
    return(
    <Modal visible={visible} onRequestClose={close}>
        <View style={styles.header}>
        <Text>Agregar Gastos</Text>
      </View>
        <View style={styles.body}>

                <View style={styles.input}>
                    <Text>Gastos:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    onChangeText={InputChange0}
                    value={InputDescripcion}/>
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setInputDescripcion('')
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.input}>
                    <Text>Valor:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    keyboardType='numeric'
                    onChangeText={InputChange1}
                    value={InputValor}
                    />
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setInputValor()
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>
        </View>

      {/* botones */}
      <View style={[styles.row,{justifyContent:'center',alignItems:'center'}]}>

                <TouchableOpacity style={styles.btn} onPress={
                        ()=>{
                            agregarGasto();
                        }
                    }>
                        <Text>Agregar</Text>

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