import React,{useState,useEffect} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { updateGastos,deleteGastos } from "../../database/databaseGastos";




export default  VerGatosModal=({visible,close,id,fecha='',descripcion='',valor,setDatos,datos, reSelect})=>{

    
    const [inputFecha,setInputFecha]=useState(fecha);
    const [inputDescripcion, setInputDescripcion] = useState(descripcion);
    const [inputValor, setInputValor] = useState(valor);
    const [valueId, setValueId] = useState(id);

    useEffect(() => {
        // Actualizar los estados cuando cambian las propiedades
        setInputFecha(fecha);
        setInputDescripcion(descripcion);
        setInputValor(valor)
        setValueId(id);
      }, [fecha, descripcion, id,valor,reSelect]);
    

    const InputChange1 = (text) => {
        console.log("ingreso:",text)
        setInputDescripcion(text);
    };
    const InputChange2 = (text) => {
      console.log("ingreso:",text)
      setInputValor(text);
  };

    const actualizarDatos=()=>{
      if((inputDescripcion!=null&&inputDescripcion!=descripcion)||(inputValor!=null&&inputValor!=valor)){

        Alert.alert(
          'Atención',
          '¿Desea Editar estos datos estos datos?',
          [{
              text:'SI',
              onPress:()=>{


                updateGastos(valueId,inputFecha,inputDescripcion,inputValor);
                        let newObjetEdit=datos.map((dato)=>{
                          if(dato.id==valueId){
                            dato.descripcion=inputDescripcion;
                            dato.valor=inputValor;
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




        
    }else if(inputDescripcion==descripcion&&inputValor==valor){
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
{/* FECHA */}
        <View style={styles.input}>
    <Text>Fecha:</Text>
    <TextInput style={styles.inputText} 
    editable={false}
    value={inputFecha}/>
   
</View>




        <View style={styles.input}>
    <Text>Descripcion: </Text>
    <TextInput style={styles.inputText} 
    placeholder='ingresar' 
    onChangeText={InputChange1}
    value={inputDescripcion} // Convertimos el valor a una cadena de texto
    
    />
    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
        setInputDescripcion()
    }}>
        <AntDesign name="closecircleo" size={24} color="black" />
    </TouchableOpacity>
</View>


<View style={styles.input}>
    <Text>Valor:</Text>
    <TextInput style={styles.inputText} 
    placeholder='ingresar' 
    keyboardType='numeric'
    onChangeText={InputChange2}
    value={inputValor} // Convertimos el valor a una cadena de texto
    
    />
    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
        setInputValor()
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
        deleteGastos(valueId);

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