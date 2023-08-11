import React,{useState,useEffect} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { updateStock } from '../../database/databaseStock';


export default  EditStockModal=({visible,close,cantidad,producto='',precioUni,id,setDatos,datos, reSelect})=>{

    const [inputCantidad, setInputCantidad] = useState(cantidad);
    const [inputProducto, setInputProducto] = useState(producto);
    const [precioUnitario, setPrecioUnitario] = useState(precioUni);
    const [valueId, setValueId] = useState(id);

    useEffect(() => {
        // Actualizar los estados cuando cambian las propiedades
        setInputCantidad(cantidad);
        setInputProducto(producto);
        setPrecioUnitario(precioUni)
        setValueId(id);
      }, [cantidad, producto, id,precioUni,reSelect]);
    

    const InputChange0 = (text) => {
        console.log("ingreso:",text)
        setInputCantidad(text);
    };
    const InputChange1 = (text) => {
        console.log("ingreso:",text)
        setInputProducto(text);
    };
    const InputChange2 = (text) => {
      console.log("ingreso:",text)
      setPrecioUnitario(text);
  };

  const actualizarDatos=()=>{
    if(inputCantidad!=null&&inputProducto!=null&&precioUnitario!=null){

      Alert.alert(
        'Atención',
        '¿Desea Editar estos datos estos datos?',
        [{
            text:'SI',
            onPress:()=>{


                      updateStock(valueId,inputCantidad,inputProducto,precioUnitario);
                      let newObjetEdit=datos.map((dato)=>{
                        if(dato.id==valueId){
                          dato.cantidad=inputCantidad;
                          dato.producto=inputProducto;
                          dato.precioUnitario=precioUnitario;
                        }
                        return dato
                      })
                      setDatos(newObjetEdit);
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
        <Text>Editar Stock: id {valueId}</Text>
      </View>
        <View style={styles.body}>

                <View style={styles.input}>
                    <Text>Cantidad:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    keyboardType='numeric'
                    onChangeText={InputChange0}
                    value={inputCantidad}/>
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setInputCantidad()
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.input}>
                    <Text>Producto:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    onChangeText={InputChange1}
                    value={inputProducto} // Convertimos el valor a una cadena de texto
                    
                    />
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setInputProducto()
                    }}>
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>



                <View style={styles.input}>
                    <Text>Precio Unitario:</Text>
                    <TextInput style={styles.inputText} 
                    placeholder='ingresar' 
                    onChangeText={InputChange2}
                    keyboardType='numeric'
                    value={precioUnitario} // Convertimos el valor a una cadena de texto
                    
                    />
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
                        setPrecioUnitario()
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