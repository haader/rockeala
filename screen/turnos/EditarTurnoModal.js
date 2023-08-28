import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, ScrollView, Button, View, Alert, Modal, FlatList, TextInput } from 'react-native'; // Importamos FlatList y TextInput
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { editTurnos } from "../../database/databaseTurnos";
import { fetchClientes, addClientes} from "../../database/databaseClientes";


export default EditarTurnoModal = ({anio,nameDay, numberDay, month, cerrarModal, visible, time, clientes,servicios, actualizarTurnos }) => {
  const [valorInput, setValorInput] = useState(""); // Estado para almacenar el valor del input de búsqueda
  const [filteredClientes, setFilteredClientes] = useState([]); // Estado para almacenar los clientes filtrados
  const [filteredServicios, setFilteredServicios] = useState([]);

  const [listaCliente,setListaCliente]=useState(clientes);

  //cliente seleccion
  const [clienteSeleccion,setClienteSeleccion]=useState("");
  const [etapa1,setEtapa1]=useState(true);
  const [etapa2,setEtapa2]=useState(false);
  const [etapa3,setEtapa3]=useState(false);

  const [save,setSave]=useState(false);

  //sercicios seleccion
  const [serviciosSeleccion,setServiciosSeleccion]=useState("");
  const [ListServicios,setListServicios]=useState(servicios);
  const [inputServicios,setInputServicios]=useState("");
  

  const [descripcionInput,setDescripcionInput]=useState('')

  const traerClientes=()=>{ 
    fetchClientes((data)=>{
      setListaCliente(data)
    })
  }

  useEffect(()=>{
    setEtapa1(true);
    setEtapa2(false);
    setEtapa3(false);
    setSave(false);
    setClienteSeleccion('');
    setServiciosSeleccion('');
    setDescripcionInput('');
  },[time])

  // useEffect(()=>{

  //   fetchPrecios((data)=>{
  //     setListServicios(data)
  //   })

  // },[])


  useEffect(() => {
    // Lógica para filtrar los clientes según lo que se escriba en el input
    const filteredResults = listaCliente.filter((cliente) =>{
      //console.log("***********ELEMENTOS",cliente)
      return  cliente.nombreCliente.toLowerCase().includes(valorInput.toLowerCase())
    }
    );
    setFilteredClientes(filteredResults);
  }, [valorInput, listaCliente]);

  useEffect(() => {
    const filteredServicios = ListServicios.filter((element) => {
      
      return element.servicio.toLowerCase().includes(inputServicios.toLowerCase());
    });
    setFilteredServicios(filteredServicios);
  }, [inputServicios,ListServicios]);
  
  


const anterior = () => {
    console.log("anterior");
  };

  const siguiente = () => {
    console.log("siguiente");
  };

  const agregarTurno=()=>{

    if(clienteSeleccion!==''&&serviciosSeleccion!==''){
        
      Alert.alert('Atencion!',`se editara el turno: Cliente: ${clienteSeleccion} Servicio: ${serviciosSeleccion}`,[{text:'Si',onPress:()=>{

          //addTurnos(`table${month}${anio}`,numberDay,time,clienteSeleccion,serviciosSeleccion,descripcionInput,actualizarTurnos,()=>cerrarModal())              
          editTurnos(`table${month}${anio}`,numberDay,time,clienteSeleccion,serviciosSeleccion,descripcionInput,actualizarTurnos,cerrarModal)              

      }},{text:'No',onPress:()=>{}}])
      
      
    }else{
      
    } 
  }

  const BtnGuardar=()=>{
    return(
            <View style={styles.btn}>
                <TouchableOpacity onPress={()=>agregarTurno()}>
                    <AntDesign name="save" size={50} color="black" />
                </TouchableOpacity>
            </View>
    )
  }


  // Función para renderizar cada elemento de la lista
  const renderItemClientes = ({ item }) => (

    <View style={{width:'100%',padding:5}}>
        <TouchableOpacity style={{borderRadius:10,borderWidth:1,padding:5}} onPress={
            () => {

                setClienteSeleccion(item.nombreCliente);
                setEtapa1(false);
                setEtapa2(true);
                console.log("Seleccionado:", item);
            }
            
            }>
      <Text>{item.nombreCliente}</Text>
    </TouchableOpacity>
    </View>
  );

  const renderItemServicios=({item})=>(

    <View style={{width:'100%',padding:5}}>
      <TouchableOpacity style={{borderRadius:10,borderWidth:1,padding:5}} onPress={
                () => {

                    setServiciosSeleccion(item.servicio);
                    setEtapa1(false);
                    setEtapa2(false);
                    setEtapa3(true);
                    setSave(true);
                    console.log("Seleccionado servicio:", item.servicio)
                }
                
                }>
          <Text>{item.servicio}</Text>
      </TouchableOpacity>
    </View>

  )

  const MostrarListaServicios=()=>{
    return(
      <FlatList
      data={filteredServicios}
      renderItem={renderItemServicios}
      keyExtractor={(item) => item.id.toString()}
      />
    )  
  }

  const MostrarListaClientes=()=>{
    return(
        <FlatList
          data={filteredClientes}
          renderItem={renderItemClientes}
          keyExtractor={(item) => item.id.toString()} // Puedes cambiar esto si tienes un identificador único para cada cliente
        />
    )
  }

  const BotonAgregarNewCliente=()=>{
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
              
              addClientes(valorInput,()=>{traerClientes()});
              
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
  const RenderizarListClientes=()=>{
    return(
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
                  {filteredClientes.length>0?<MostrarListaClientes/>:<BotonAgregarNewCliente />}

            </View>
    )
  }

  const RenderizarListServicios=()=>{
    return(
            <View style={styles.body}>

                  <View style={{width:'100%',padding:5}}>
                  <Text>-Cliente Seleccionado:</Text>
                        <TouchableOpacity style={styles.seleccion} onPress={
                                  () => {

                                      setClienteSeleccion('');
                                      setServiciosSeleccion('');
                                      setDescripcionInput('');
                                      setEtapa1(true);
                                      setEtapa2(false);
                                      setEtapa3(false);
                                      console.log("Seleccionado servicio:");

                                  }
                                  
                                  }>
                            <Text>{clienteSeleccion}</Text>
                        </TouchableOpacity>

                      


                  </View>
                  <Text>-Selecciona un Servicio:</Text>
                  {/* Agregamos el TextInput para ingresar el término de búsqueda */}
                  <View style={styles.input}>
                                  <TextInput
                                  style={{width:'90%',height:'100%'}}
                                  placeholder="Buscar Servicio..."
                                  value={inputServicios}
                                  onChangeText={setInputServicios}
                                  />
                                                  
                                  <TouchableOpacity style={{width:'20%'}} onPress={()=>{
                                      setInputServicios("")
                                  }}>
                                      <AntDesign name="closecircle" size={24} color="black" />
                                  </TouchableOpacity>
                  </View>
                  <Text>-Servicios disponibles:</Text>
                  {/* La FlatList que mostrará los resultados filtrados */}
                  {filteredServicios.length>0?<MostrarListaServicios/>:<Text>No se encontraron servicios</Text>}

            </View>
    )
  }

  const handleDescripcionPress = (text) => {
    setDescripcionInput(text)
    // Aquí puedes hacer algo con el valor ingresado en el TextInput
    console.log('Valor del TextInput:', text);
  };

  const RenderizarInputDescripcion=()=>{

    return(


            <View style={styles.body}>
          
          <Text>-Cliente Seleccionado:</Text>
          <TouchableOpacity style={styles.seleccion} onPress={
                      () => {

                          setClienteSeleccion('');
                          setServiciosSeleccion('');
                          setDescripcionInput('');
                          setEtapa1(true);
                          setEtapa2(false);
                          setEtapa3(false);
                          setSave(false);
                          //console.log("Seleccionado descripcion:");

                      }
                      
                      }>
                <Text>{clienteSeleccion}</Text>
            </TouchableOpacity>
            <Text>-Servicio Seleccionado:</Text>
            <TouchableOpacity style={styles.seleccion} onPress={
                      () => {

                          
                          setServiciosSeleccion('');
                          setDescripcionInput('');
                          setEtapa1(false);
                          setEtapa2(true);
                          setEtapa3(false);
                          setSave(false)
                          //console.log("Seleccionado descripcion:");

                      }
                      
                      }>
                <Text>{serviciosSeleccion}</Text>
            </TouchableOpacity>


            <View style={styles.input}>
                    <TextInput
                    style={{width:'90%',height:'100%'}}
                    placeholder="Agregue una descripción..."
                    value={descripcionInput}
                    onChangeText={handleDescripcionPress}
                    />
                                    
                    <TouchableOpacity style={{width:'20%'}} onPress={()=>{
                        setDescripcionInput("")
                    }}>
                        <AntDesign name="closecircle" size={24} color="black" />
                    </TouchableOpacity>
              </View>

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
           
           {etapa1==true&&(<RenderizarListClientes/>)}

           {etapa2==true&&(<RenderizarListServicios/>)}
           
           {etapa3==true&&(<RenderizarInputDescripcion/>)}


            
            <View style={styles.contenedorBtn}>

                  <View style={styles.btn}>
                      <TouchableOpacity onPress={cerrarModal}>
                          <AntDesign name="closecircleo" size={50} color="black" />
                      </TouchableOpacity>
                  </View>

                  {save&&(<BtnGuardar/>)}

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
    padding:5,
    margin:10
  },body:{
    height:'70%'
    
  },
  seleccion:{ 
    borderRadius:10,
    borderWidth:1,
    padding:5,
    margin: 5
  }
  ,
  contenedorBtn:{
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    display:'flex',
    flexDirection:'row',
    bottom:0,
    width:'100%'
}
});
