import React,{useState,useEffect} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { updateStock,deleteStock } from '../../database/databaseStock';




export default  VerStockModal=({visible,close,cantidad,producto='',precioUni,id,setDatos,datos, reSelect})=>{

    
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
      if((inputCantidad!=null&&inputCantidad!=cantidad)||(inputProducto!=null&&inputProducto!=producto)||(precioUnitario!=null&&precioUnitario!=precioUni)){

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




        
    }else if(inputCantidad==cantidad&&inputProducto==producto&&precioUnitario==precioUni){
        Alert.alert(
            'Atención',
            'NO se editaron los valores',
            [
              {
                text: 'OK',
                onPress: () => console.log('Alerta cerrada'),
                style: 'default',
              },
            ]
          );
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
    <Modal 
    visible={visible}
    onRequestClose={close}
    transparent={true}
    animationType='fade'
    >

      <View style={styles.contenedorModal}>
      <View style={styles.modalDiseño}>
        <View style={styles.body}>

        <View style={styles.input}>
    <Text>Producto</Text>
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
    <Text>Precio Unitario:</Text>
    <TextInput style={styles.inputText} 
    placeholder='ingresar' 
    keyboardType='numeric'
    onChangeText={InputChange2}
    value={precioUnitario} // Convertimos el valor a una cadena de texto
    
    />
    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
        setPrecioUnitario()
    }}>
        <AntDesign name="closecircleo" size={24} color="black" />
    </TouchableOpacity>
</View>
</View>

{/* BOTONES */}

<View style={[styles.row,{justifyContent:'center',alignItems:'center'}]}>

<TouchableOpacity style={styles.btn} onPress={
        ()=>{
          actualizarDatos();
        }
    }>
        <AntDesign name='edit' size={30} color='orange'/>

    </TouchableOpacity>



        <TouchableOpacity
      style={styles.btn}
onPress={() => {


Alert.alert(
  'Atención',
  '¿Desea eliminar estos datos?',
  [
    {
      text: 'Si',
      onPress: () => {

        //funcion para eliminar 
        deleteStock(valueId);

        let newObjet=datos.filter((datosPrecios)=>{
          return datosPrecios.id!=valueId;
          
          })
        setDatos(
          newObjet
        )
        close()

      },
      style: 'default',
    },{
      text: 'No',
      onPress: () => {
          
      },
      style: 'default',
    }
  ]
);

  
}}
>
<AntDesign name="delete" size={30} color="red" />
        </TouchableOpacity>


        <TouchableOpacity style={styles.btn} onPress={
            ()=>{
              setDatos(datos)
                close()
            }
        }>
            <AntDesign name='close' size={30} color='black'/>

        </TouchableOpacity>
</View>

        </View>
      </View>
        
    </Modal>
    )
}

const styles=StyleSheet.create(
    {
      contenedorModal:{
        backgroundColor:'rgba(0,0,0,0.7)',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
        
      },
      modalDiseño:{
        backgroundColor:'white',
        borderRadius:10,
        borderWidth:2,
        margin:10
      },
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