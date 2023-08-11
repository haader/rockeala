import React, { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity,Alert} from 'react-native';
import AgregarGastosModal from './agregarGastosModal';
import EditGastosModal from "./editGastosModal";
import { fetchGastos,deleteGastos } from "../../database/databaseGastos";

export default function ScreenGastos() { 

  const[datosGastos,setDatosGastos]=useState([])
 
const traerDatos=()=>{
    
  fetchGastos((data)=>{
      setDatosGastos(data);
    })

}

useEffect(()=>{
  
  traerDatos();
    
},[])

   //MODALES VISIBILIDAD
   const[visibleAdd,setVisibleAdd]=useState(false);
   const[visibleEdit,setVisibleEdit]=useState(false);
   const[reSelect,setReSelect]=useState(false);
 
   //MODALES EDITAR VALORES
   const[valueId,setValueId]=useState();
   const[fecha,setFecha]=useState();
   const[descripcion,setDescripcion]=useState();
   const[valor,setValor]=useState();
   
   //funciones para ver los MODALES
   const closeAdd=()=>{
     setVisibleAdd(false)
   }
   const closeEdit=()=>{
     setVisibleEdit(false)
   }

  const editGastos = (id,fecha,descripcion,valor) => {
    console.log(id,fecha,descripcion,valor);
    setValueId(id)
    setFecha(fecha);
    setDescripcion(descripcion);
    setValor(valor)
    setVisibleEdit(true);
  };

 
  const eliminarGastos = (id) => {
    
    Alert.alert(
      'Atención',
      '¿Desea eliminar estos datos?',
      [
        {
          text: 'Si',
          onPress: () => {

            //funcion para eliminar 
            deleteGastos(id);

            let newObjet=datosGastos.filter((datosGastos)=>{
              return datosGastos.id!=id;
              
              })
            setDatosGastos(
              newObjet
            )

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

  };





  
  const obtenerTotal=()=>{
    
    let total=0;
    for (let index = 0; index < datosGastos.length; index++) {
      total=total+parseInt(datosGastos[index].valor);
      
    }
    return total
  }

   
  const [showButtons, setShowButtons] = useState(Array(datosGastos.length).fill(false));

  const hideButtons = () => {
    setShowButtons(Array(datosGastos.length).fill(false));
    
  };

  const handleTouchStart = (index) => {
    const newShowButtons = [...showButtons];
    newShowButtons.fill(false);
    newShowButtons[index] = true;
    setShowButtons(newShowButtons);
    
  };




const ListarGastos = () => {
  return datosGastos.map((element, index) => ( // Agregamos un paréntesis aquí para devolver explícitamente los elementos
    
  <View key={index} style={styles.row}>

    <View  style={[styles.row, { borderRadius: 10, borderWidth: 1, margin: 5, padding: 5, width: '97%' }]}
     onTouchStart={() => handleTouchStart(index)}
    >
      <Text style={{ width: '33%',textAlign:'center' }}>{element.fecha}</Text>
      <Text style={{ width: '33%',textAlign:'center' }}>{element.descripcion}</Text>
      <Text style={{ width: '33%',textAlign:'center' }}>{element.valor}$</Text>
    </View>
    {showButtons[index] && (
      <View style={{ 
        flexDirection: 'row',
        position: 'absolute', 
        right: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 30,
        width: '40%',
        borderRadius: 10,
        margin: 5,
        borderWidth: 1
      }}>
        {/* Aquí colocas tus botones */}
        <TouchableOpacity
          style={{height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            editGastos(element.id,element.fecha,element.descripcion,element.valor)
            setReSelect(!reSelect);
          }}
        >
          <AntDesign name="edit" size={24} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center'}}
          onPress={() => eliminarGastos(element.id)}
        >
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    )}

  </View>
  ));
};

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
      <AgregarGastosModal visible={visibleAdd} close={closeAdd} actualizar={traerDatos}/>
      <EditGastosModal visible={visibleEdit} close={closeEdit} id={valueId} fecha={fecha} descripcion={descripcion} valor={valor} setDatos={setDatosGastos} datos={datosGastos} reSelect={reSelect}/>
      

        <View style={styles.header}>
          <Text>Gastos</Text>
        </View>

        <View style={styles.rowTable}>
          <Text style={styles.columnTable}>Fecha</Text>
          <Text style={styles.columnTable}>Descripción</Text>
          <Text style={styles.columnTable}>Valor</Text>
          
        </View>
        <ScrollView>
          <ListarGastos/>
        </ScrollView>
        <View style={styles.row}>
          
          <Text>Total:</Text>
          <Text>{obtenerTotal()}</Text>
            
        </View>


        <TouchableOpacity style={{
        
              width:'100%',
              height:'100%',
              position:'absolute',
              zIndex:-1
            }}
            onPress={()=>{
              hideButtons()
            }}
            />
        
        <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={()=>{
          setVisibleAdd(true);
        }}>
                <AntDesign name="pluscircleo" size={50} color="black" />
        </TouchableOpacity>

      </View>
    );
  }
const styles=StyleSheet.create({
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
  },
  row:{
    display:'flex',
    flexDirection:'row'
  },
  rowTable:{
    display:'flex',
    flexDirection:'row',
    width:'98%',
    borderWidth:1,
    borderRadius:10,
    margin:10,
    padding:5,
    backgroundColor:'black'
  },
  columnTable:{
    width:'33%',
    textAlign:'center',
    color:'white'
  }
})
  