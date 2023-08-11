import React, { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View ,TouchableOpacity,Alert} from 'react-native';
import AgregarStockModal from './agregarStockModal';
import EditStockModal from './editStockModal';
import { fetchStock,deleteStock } from "../../database/databaseStock";

export default function ScreenStock() {


const[datosStock,setDatosStock]=useState([])
 
const traerDatos=()=>{
    
  fetchStock((data)=>{
      setDatosStock(data);
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
   const[valueCantidad,setValueCantidad]=useState();
   const[valueProducto,setValueProducto]=useState();
   const[valuePrecioUnitario,setValuePrecioUnitario]=useState();
   
 
   //funciones para ver los MODALES
   const closeAdd=()=>{
     setVisibleAdd(false)
   }
   const closeEdit=()=>{
     setVisibleEdit(false)
   }


  const editStock = (id,cantidad,producto,precioUnitario) => {
    
    setValueId(id)
    setValueCantidad(cantidad);
    setValueProducto(producto);
    setValuePrecioUnitario(precioUnitario)
    setVisibleEdit(true);
  };

 
  const eliminarStock = (id) => {
    Alert.alert(
      'Atención',
      '¿Desea eliminar estos datos?',
      [
        {
          text: 'Si',
          onPress: () => {

            //funcion para eliminar 
            deleteStock(id);

            let newObjet=datosStock.filter((datosStock)=>{
              return datosStock.id!=id;
              
              })
            setDatosStock(
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

   
  const [showButtons, setShowButtons] = useState(Array(datosStock.length).fill(false));

  const hideButtons = () => {
    setShowButtons(Array(datosStock.length).fill(false));
    
  };

  const handleTouchStart = (index) => {
    const newShowButtons = [...showButtons];
    newShowButtons.fill(false);
    newShowButtons[index] = true;
    setShowButtons(newShowButtons);
    
  };


  
const ListarStock = () => {
  return datosStock.map((element, index) => ( // Agregamos un paréntesis aquí para devolver explícitamente los elementos
    <View key={index} style={styles.row}>
        <View  style={[styles.row, { borderRadius: 10, borderWidth: 1, margin: 5, padding: 5, width: '97%' }]}
                onTouchStart={() => handleTouchStart(index)}
                >
          <Text style={{ width: '25%',textAlign:'center' }}>{element.cantidad}</Text>
          <Text style={{ width: '25%',textAlign:'center' }}>{element.producto}</Text>
          <Text style={{ width: '25%',textAlign:'center' }}>{element.precioUnitario}$</Text>
          <Text style={{ width: '25%',textAlign:'center' }}>{element.cantidad * element.precioUnitario} $</Text>
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
                  editStock(element.id,element.cantidad,element.producto,element.precioUnitario);
                  setReSelect(!reSelect);
                }}
              >
                <AntDesign name="edit" size={24} color="orange" />
              </TouchableOpacity>
    
              <TouchableOpacity
                style={{height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => eliminarStock(element.id)}
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
      
      <AgregarStockModal visible={visibleAdd} close={closeAdd} actualizar={traerDatos}/>
      <EditStockModal visible={visibleEdit} close={closeEdit} id={valueId} cantidad={valueCantidad} producto={valueProducto} precioUni={valuePrecioUnitario} setDatos={setDatosStock} datos={datosStock} reSelect={reSelect}/>
      


            <View style={styles.header}>
                    <Text>Stock</Text>
            </View>

        <View style={styles.rowTable}>
          <Text style={styles.columnTable}>Cantidad</Text>
          <Text style={styles.columnTable}>Producto</Text>
          <Text style={styles.columnTable}>Precio Unidad</Text>
          <Text style={styles.columnTable}>Invertido</Text>
        </View>
        <ScrollView>
          <ListarStock/>
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

        <View style={styles.row}>
            
            <TouchableOpacity style={{alignItems:'center',margin:20}} onPress={()=>{
              setVisibleAdd(true)
            }}>
                <AntDesign name="pluscircleo" size={50} color="black" />
            </TouchableOpacity>
        
        </View>

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
  },row:{
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
    backgroundColor:'black'
  },
  columnTable:{
    width:'25%',
    textAlign:'center',
    color:'white',
    padding:5
  }
})
  