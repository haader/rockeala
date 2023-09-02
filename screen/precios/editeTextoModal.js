import React,{useState,useEffect} from 'react';
import {View,Modal,Text,TouchableOpacity,StyleSheet, TextInput,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {updatePrecios,deletePrecios, updateCompartir, fetchCompartir} from "../../database/precios/databasePrecios";


export default  EditeTextoModal=({visible,close,datos, reSelect})=>{

    const[textoInicialDb,setTextoInicialDb]=useState();
    const[textoFinalDb,setTextoFinalDb]=useState();

    const[textoInicial,setTextoInicial]=useState(`
    ✂️Peluqueria Rockeala💇
    Lista de Precios:
    `)
    const[textoFinal,setTextoFinal]=useState(`
    Cualquier duda consultame!
    `)

    useEffect(() => {
        //traemos los datos de la base de datos
        // fetchCompartir(
        //                             (dato)=>{
        //                                 setTextoInicialDb(dato.textoInicial);
        //                                 setTextoFinalDb(dato.textoFinal);

        //                                 setTextoInicial(dato.textoInicial);
        //                                 setTextoFinal(dato.textoFinal);
        //                             }
        //                         )
      }, []);
    

    const InputChange0 = (text) => {
        // console.log("ingreso:",text)
        setTextoInicial(text);
        
    };
    const InputChange1 = (text) => {
        // console.log("ingreso:",text)
        setTextoFinal(text);
    };

    const actualizarDatos=()=>{
      if((textoInicial!=null&&textoInicial!=textoInicialDb)||(textoFinal!=null&&textoFinal!=textoFinalDb)){

        Alert.alert(
          'Atención',
          '¿Desea Editar estos datos estos datos?',
          [{
              text:'SI',
              onPress:()=>{
                        updateCompartir(textoInicial,textoFinal,
                            ()=>{
                                fetchCompartir(
                                    (dato)=>{
                                        setTextoInicialDb(dato.textoInicial);
                                        setTextoFinalDb(dato.textoFinal);
                                    }
                                )
                            }
                            )
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




        
    }else if(textoInicial==textoInicialDb&&textoFinal==textoFinalDb){
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

    const ListaPrecios=()=>{

        datos.map((obj)=>{
            return(
                <View style={{display:'flex',flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold'}}>-{obj.servicio}</Text>
                    <Text>{obj.precio} $</Text>
                </View>
            )
        }
            
        )
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
    {/* <Text>Servicios:</Text> */}
    <TextInput style={styles.inputText} 
    placeholder='ingresar' 
    onChangeText={InputChange0}
    value={textoInicial}/>

    {/* REINCIAR DATOS INICIAL */}
    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
        setTextoInicial(textoInicialDb)
    }}>
        <AntDesign name="closecircleo" size={24} color="black" />
    </TouchableOpacity>
</View>


<ListaPrecios/>


<View style={styles.input}>
    {/* <Text>Precio:</Text> */}
    <TextInput style={styles.inputText} 
    placeholder='ingresar' 
    
    onChangeText={InputChange1}
    value={textoFinal} // Convertimos el valor a una cadena de texto
    
    />
    {/* REINCIAR DATOS FINAL */}
    <TouchableOpacity style={{position:'absolute',right:10}} onPress={()=>{
        setTextoFinal(textoFinalDb)
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
        <AntDesign name='save' size={30} color='orange'/>

    </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={
            ()=>{
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
        width:'90%',
        height:'80%',
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
            borderWidth:1,
            height:'80%'
          },
          inputText:{
            width:'90%',textAlign:'center',
            height:'90%'
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
            width:'90%',
            height:'40%'
          },
          btn:{
            borderRadius:10,
            borderWidth:1,
            padding:5,
            margin:5
          }
    }
)