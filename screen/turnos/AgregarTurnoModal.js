import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, ScrollView, Button, View, Modal, FlatList, TextInput } from 'react-native'; // Importamos FlatList y TextInput
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default AgregarTurnoModal = ({ nameDay, numberDay, month, cerrarModal, visible, time, clientes }) => {
  const [valorInput, setValorInput] = useState(""); // Estado para almacenar el valor del input de búsqueda
  const [filteredClientes, setFilteredClientes] = useState([]); // Estado para almacenar los clientes filtrados

  useEffect(() => {
    // Lógica para filtrar los clientes según lo que se escriba en el input
    const filteredResults = clientes.filter((cliente) =>
      cliente.toLowerCase().includes(valorInput.toLowerCase())
    );
    setFilteredClientes(filteredResults);
  }, [valorInput, clientes]);

  const anterior = () => {
    console.log("anterior");
  };

  const siguiente = () => {
    console.log("siguiente");
  };

  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (

    <View style={{width:'100%',padding:5}}>
        <TouchableOpacity style={{borderRadius:10,borderWidth:1,padding:5}} onPress={
            () => {
                cerrarModal()
                console.log("Seleccionado:", item)
            }
            
            }>
      <Text>{item}</Text>
    </TouchableOpacity>
    </View>
  );

  const MostrarLista=()=>{
    return(
        <FlatList
          data={filteredClientes}
          renderItem={renderItem}
          keyExtractor={(item) => item} // Puedes cambiar esto si tienes un identificador único para cada cliente
        />
    )
  }

  const BotonAgregar=()=>{
    return(
        <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.btn} onPress={()=>{console.log("se agregara el siguiente cliente: "+valorInput)}}>
                    <Text>Agregar Nuevo Cliente</Text>
               </TouchableOpacity>
        </View>
    )    
  }

  return (
    <Modal visible={visible} onRequestClose={cerrarModal}>
      <View style={{ height: '100%' }}>
        
            <View style={styles.header}>
                    <View style={styles.row}>
                    
                    <TouchableOpacity onPress={anterior}>
                    <MaterialIcons name="navigate-before" size={50} color="black" />
                    </TouchableOpacity>
                    <Text>{nameDay}</Text>
                    <Text>{numberDay}/</Text>
                    <Text>{month}</Text>
                    <TouchableOpacity onPress={siguiente}>
                    <MaterialIcons name="navigate-next" size={50} color="black" />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Text>Horario: {time} hs</Text>
                    </View>
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
                            setValorInput("")
                        }}>
                            <AntDesign name="closecircle" size={24} color="black" />
                        </TouchableOpacity>
        </View>

        {/* La FlatList que mostrará los resultados filtrados */}
        {filteredClientes.length>0?<MostrarLista/>:<BotonAgregar />}

            </View>
            
            <View style={styles.btnSalir}>
                <TouchableOpacity onPress={cerrarModal}>
                    <AntDesign name="closecircleo" size={50} color="black" />
                </TouchableOpacity>
            </View> 
      </View>
      
    </Modal>
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
    padding:10
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
    
  },
  btnSalir:{
    alignItems:'center',
    position:'absolute',
    bottom:0,
    width:'100%'
}
});
