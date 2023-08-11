import React, { useState, useEffect, useRef } from "react";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity,Alert} from 'react-native';
import AgregarPreciosModal from './agregarPreciosModal'
import EditPreciosModal from "./editPreciosModal";
import {fetchPrecios,deletePrecios} from "../../database/precios/databasePrecios";


export default function ScreenPrecios() {

const[datosPrecios,setDatosPrecios]=useState([])
 
const traerDatos=()=>{
    
  fetchPrecios((data)=>{
      setDatosPrecios(data);
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
  const[valueServicio,setValueServicio]=useState();
  const[valuePrecio,setValuePrecio]=useState();
  const[valueId,setValueId]=useState();

  //funciones para ver los MODALES
  const closeAdd=()=>{
    setVisibleAdd(false)
  }
  const closeEdit=()=>{
    setVisibleEdit(false)
  }
 
  const [showButtons, setShowButtons] = useState(Array(datosPrecios.length).fill(false));

  const hideButtons = () => {
    setShowButtons(Array(datosPrecios.length).fill(false));
    
  };

  const handleTouchStart = (index) => {
    const newShowButtons = [...showButtons];
    newShowButtons.fill(false);
    newShowButtons[index] = true;
    setShowButtons(newShowButtons);
    
  };

  const ListarPrecios = () => {
    return datosPrecios.map((element, index) => (
      
        <View key={index} style={styles.row}>
          
            <View
              style={[styles.row, styles.border]}
              onTouchStart={() => handleTouchStart(index)}
            >
              <Text style={{ width: '50%',textAlign:'center' }}>{element.servicio}</Text>
              <Text style={{ width: '50%',textAlign:'center' }}>{element.precio} $</Text>
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
                  editPrecios(element.id,element.servicio,element.precio); 
                  setReSelect(!reSelect)}}
              >
                <AntDesign name="edit" size={24} color="orange" />
              </TouchableOpacity>
    
              <TouchableOpacity
                style={{height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => {


                Alert.alert(
                  'Atención',
                  '¿Desea eliminar estos datos?',
                  [
                    {
                      text: 'Si',
                      onPress: () => {

                        //funcion para eliminar 
                        deletePrecios(element.id);

                        let newObjet=datosPrecios.filter((datosPrecios)=>{
                          return datosPrecios.id!=element.id;
                          
                          })
                        setDatosPrecios(
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

                  
                }}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        
      
    ));
  };

  

  const editPrecios = (id,servicio,precio) => {
    console.log(id,servicio,precio);
    setValueId(id)
    setValueServicio(servicio);
    setValuePrecio(precio);
    setVisibleEdit(true);
  };

  
  
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <AgregarPreciosModal visible={visibleAdd} close={closeAdd} actualizar={traerDatos}/>
      <EditPreciosModal visible={visibleEdit} close={closeEdit} servicio={valueServicio} precio={valuePrecio} id={valueId} setDatos={setDatosPrecios} datos={datosPrecios} reSelect={reSelect}/>
      




      <View style={styles.header}>
        <Text>Precios de la Peluqueria</Text>
      </View>

      <View style={[styles.rowTable, styles.border, { backgroundColor: 'black' }]}>
        <Text style={styles.columnTable}>Servicio</Text>
        <Text style={styles.columnTable}>Precio</Text>
      </View>

      <ScrollView >

        <ListarPrecios/>
        
      </ScrollView>

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


      <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={() => {
        setVisibleAdd(true)
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
    margin: 10,
    alignItems: 'center',
    padding: 10,
    width: '97%'
  },
  border: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    width: '97%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  rowTable: {
    display: 'flex',
    flexDirection: 'row',
    width: '98%'
  },
  columnTable: {
    width: '50%',
    textAlign: 'center',
    color: 'white'
  }
});
