import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, ScrollView, Button, View, FlatList, TextInput,Alert } from 'react-native'; // Importamos FlatList y TextInput
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import FichaClienteModal from "./FichaClienteModal";

import { fetchClientes, addClientes, deleteTableClientes, deleteClientes } from "../../database/databaseClientes";


export default ScreenClientes = () => {


  const [valorInput, setValorInput] = useState(""); // Estado para almacenar el valor del input de búsqueda
  const [filteredClientes, setFilteredClientes] = useState([]); // Estado para almacenar los clientes filtrados
  const [listaClientes,setListaClientes]=useState();

  const traerDatos=()=>{
    fetchClientes((data)=>{
      setListaClientes(data);
      console.log(data)
    })
  }

  useEffect(()=>{
      traerDatos()  
      //deleteTableClientes()
  },[])
  
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState();
  const [SelectedClienteID,setSelectedClienteID]=useState();
  
  useEffect(() => {
    // Lógica para filtrar los clientes según lo que se escriba en el input
    if(listaClientes!=undefined){
      const filteredResults = listaClientes.filter((cliente) =>
      cliente.nombreCliente.toLowerCase().includes(valorInput.toLowerCase())
    );
    setFilteredClientes(filteredResults);
    }
  }, [valorInput,listaClientes]);

 
  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (

    <View style={{width:'100%',padding:5}}>
      <View style={{borderRadius:10,borderWidth:1,paddingLeft:10,marginLeft:5,marginRight:5,display:'flex',flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity style={{height:40,width:'80%',marginRight:10,justifyContent:'center'}} onPress={
                    () => {
                      setSelectedCliente(item.nombreCliente);
                      setSelectedClienteID(item.id);
                      setModalIsVisible(true)
                        console.log("Seleccionado:", item)
                    }
                    
                    }>
              <Text>{item.nombreCliente}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderRadius:50,backgroundColor:'red',padding:5}} onPress={()=>{
              deleteClientes(item.id,item.nombreCliente);
              setValorInput('');
              traerDatos();
              }}>
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
      </View>
        
    </View>
  );

  const MostrarLista=()=>{
    return(
        <FlatList
          data={filteredClientes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id} // Puedes cambiar esto si tienes un identificador único para cada cliente
        />
    )
  }

  const funsionCerrar=()=>{
      setModalIsVisible(false);
  }

  const BotonAgregar=()=>{
    return(
        <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.btn} onPress={()=>{
                          addNewCliente();
                    }}>
                    <Text>Agregar Nuevo Cliente</Text>
               </TouchableOpacity>
        </View>
    )    
  }

  const addNewCliente=()=>{
    
    if(valorInput!=(null||''||undefined)){
          Alert.alert(
            'Agregar Cliente',`Desea Agregar a ${valorInput} a la base de datos de Clientes`,
          [{
            text:'Si',
            onPress:()=>{
              addClientes(valorInput,()=>{traerDatos()});
              
            },
            style:'default'
          },
          {
            text:'No',
            onPress:()=>{},
            style:'default'
          }
        ]
        );
    }else{
      Alert.alert('Atención','Debe agregar un nombre para el Cliente',[{text:'Aceptar',onPress:()=>{},style:'default'}])
    }
    
  }

  return (
    
      <View style={{ height: '100%' }}>
        
            <View style={styles.header}>
                    <Text>Clientes</Text>
            </View>
            <View style={styles.body}>

        {/* Agregamos el TextInput para ingresar el término de búsqueda */}
        <View style={styles.input}>
                        <TextInput
                        style={{width:'90%'}}
                        placeholder="Buscar cliente..."
                        value={valorInput}
                        onChangeText={setValorInput}
                        />
                                        
                        <TouchableOpacity style={{width:'20%'}} onPress={()=>{
                            setValorInput('')
                        }}>
                            <AntDesign name="closecircle" size={24} color="black" />
                        </TouchableOpacity>
        </View>

        {/* La FlatList que mostrará los resultados filtrados */}
        {filteredClientes.length>0?<MostrarLista/>:<BotonAgregar />}

            </View>
            
           
      <FichaClienteModal idCliente={SelectedClienteID} nameCliente={selectedCliente} visible={modalIsVisible} closeModal={funsionCerrar}/>

      </View>
      
    
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin:10,
    alignItems: 'center',
    padding:10,
    width:'97%'
  },row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    display:'flex',
    flexDirection:'row'
  },
  btn:{
    borderRadius:10,
    borderWidth:1,
    padding:5
  },body:{
    height:'80%'
    
  }
});
