import React, { useState,useEffect } from "react";
import { View, Modal, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { fetchDatosCliente, updateClientes } from "../../database/databaseClientes";
import DatoClienteModal from "./datoClienteModal";
import DesplegableModal from './desplegableModal'
import HistorialTurnoClienteModal from "./historialTurnoClienteModal";

const FichaClienteModal = ({ idCliente,nameCliente, closeModal, visible }) => {

    const[desplegableVisible,setDesplegableVisible]=useState(false);
    const[desplegableDatos,setDesplegableDatos]=useState([]);
    const[titleDesplegable,setTitleDesplegable]=useState("");
    
    //modal DATOS DEL CLIENTE
    const[ModalDatosClienteVisible,setModalDatosClienteVisible]=useState(false);

    

    const[hayCambios,setHayCambios]=useState(false);
    
    const[clave,setClave]=useState()

    // realizamos un fetch a la base de datos para traer los datos en un objeto
    //id, nombreCliente ,
    const[objetoDatos,setOjetoDatos]=useState({
        "adress":
        'beruty 2070',
        "phone":1133531540,
        "estilista":"natalia soledad romero"
    });
    const[objetoHistorial,setObjetoHistorial]=useState([{}]);
    const[objetoDetalle,setObjetoDetalle]=useState({"altura": "No informado", "canas": "No informado", "centimetrosCrecimiento": "No informado", "colorDeseado": "No informado", "colorNatural": "No informado", "deseoCliente": "No informado", "formulaDecolorante": "No informado", "formulaTinte": "No informado", "longitud": "No informado", "nivelMedios": "No informado", "nivelPuntas": "No informado", "nivelRequerido": "No informado", "porosidad": "No informado", "procedimientos": "No informado", "tecnicasUtilizadas": "No informado", "textura": "No informado", "tratamientos": "No informado", "volumenesUtilizados": "No informado"});

    const[historialVisible,setHistorialVisible]=useState(false);
    

    const historialClose=()=>{
        setHistorialVisible(false);
    }

    //creamos la función para cerrar el ModalDatosClientes
    const closeModalDC=()=>{
        setModalDatosClienteVisible(false);
    }
//     const [datos,setDatos]=useState([

// {"id":"100"},
// {nombreCliente:"desconocido"},
//     {objetoDatos:{"adress":
//     'beruty 2070',
//     "phone":1133531540,
//     "estilista":"natalia soledad romero"},
// }, {"objetoHistorial":
//         {
//             "fecha":"1/02/2023",
//             "descripción":"algo",
//             "importe":100,
//             "deuda":0
//         }},
//         {objetoDescripcion:{
//     longitud:5,
//     textura:"rigido",
//     porosidad:"poroso",
//     colorNatural:"rojo",
//     colorDeseado:"rubio",
//     nivelRequerido:"mucho",
//     canas: 'Cantidad de canas',
//     procedimientos: 'Procedimientos realizados',
//     altura: 'Altura',
//     volumenesUtilizados: 'Volumenes utilizados',
//     formulaTinte: 'Formula de tinte',
//     centimetrosCrecimiento: 'Centimetros de crecimiento',
//     nivelMedios: 'Nivel en medios',
//     nivelPuntas: 'Nivel en puntas',
//     deseoCliente: 'Deseo del cliente',
//     formulaDecolorante: 'Formula del decolorante',
//     tecnicasUtilizadas: 'Tecnicas utilizadas',
//     tratamientos: 'Tratamientos'}} ])

    //creamos la función para traer los datos
    const traerDatos=()=>{
console.log("idCliente:",idCliente)
        //objetoDatos,objetoHistorial,objetoDetalle
        fetchDatosCliente(idCliente, (data) => {
          
            if (data && data.length > 0) {
              const clienteData = data[0];
              console.log(clienteData.nombreCliente);  
              
              const objetoDatos = JSON.parse(clienteData.objetoDatos);
              const objetoHistorial = JSON.parse(clienteData.objetoHistorial);
              const objetoDetalle = JSON.parse(clienteData.objetoDetalle);
          
              // Ahora puedes acceder a las propiedades de los objetos como lo harías normalmente
              console.log("Datos del cliente:", objetoDatos);
              console.log("Historial del cliente:", objetoHistorial);
              console.log("Detalle del cliente:", objetoDetalle);
          
              // Actualiza el estado si es necesario
              setOjetoDatos(objetoDatos);
              setObjetoHistorial(objetoHistorial);
              setObjetoDetalle(objetoDetalle);

            } else {
              console.log("No se encontraron datos para el cliente con ID", idCliente);
            }
          });
          
    }
    //utilizaos el useEfect para traer los datos de la database
    useEffect(
        ()=>{idCliente!=undefined?traerDatos():null;
            //console.log("traer datos fichaClienteModal")
            hayCambios!=false?setHayCambios(false):null;
        }

        
        
    ,[idCliente])



    const desplegableClose=()=>{
        setDesplegableVisible(false)
    }

    const ActualizarDatos = (clave, valor) => {
        
        console.log("clave: ",clave," valor: ",valor)
        
        setObjetoDetalle(prevDatos => {
          return { ...prevDatos, [clave]: valor };
        })
            console.log("...PrevDatos: ",objetoDetalle)
      };

      const enviarValores=(title,clave,array)=>{
           //enviamos el title del modal
           setTitleDesplegable(title)
           //enviamos el valor a actualizar
           setClave(clave)
           // enviamos los datos de la lista desplegable
           setDesplegableDatos(array);
           //hacemos visible el modal
           setDesplegableVisible(true);
      }

      const Body=()=>{
        return(
            <View>
                   <Text style={{textAlign:'center'}}>Analisis del Tinte</Text>

<TouchableOpacity style={styles.row}
onPress={()=>{
 enviarValores("longuitud","longitud",["Largo","Semi Largo Mediano","Corto"])
    }
}
>
    <Text style={styles.clave}>Longitud:</Text>
    <Text style={styles.valor}>{objetoDetalle.longitud}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}
 onPress={()=>{
    enviarValores("Textura","textura",["Grueso","Delgado","Mediano","Fino"])

    }}
>
    <Text style={styles.clave}>Textura:</Text>
    <Text style={styles.valor}>{objetoDetalle.textura}</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.row}
 onPress={()=>{
    enviarValores("Porosidad","porosidad",["Virgen","Teñido","Decolorado","Color","Henna","Pastillas","Shampoo color","otros"])

    }}>
    <Text style={styles.clave}>Porosidad:</Text>
    <Text style={styles.valor}>{objetoDetalle.porosidad}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}>
    <Text style={styles.clave}>Canas:</Text>
    <Text style={styles.valor}>{objetoDetalle.canas}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}>
    <Text style={styles.clave}>Procedimientos:</Text>
    <Text style={styles.valor}>{objetoDetalle.procedimientos}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}
onPress={()=>{
    enviarValores("Color Natural del cabello","colorNatural",["1N","2N","3N"])

    }}>
    <Text style={styles.clave}>Color Natural del cabello:</Text>
    <Text style={styles.valor}>{objetoDetalle.colorNatural}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}
onPress={()=>{
    enviarValores("Color Deseado","colorDeseado",["9.21","10","11"])

    }}
>
    <Text style={styles.clave}>Color deseado:</Text>
    <Text style={styles.valor}>{objetoDetalle.colorDeseado}</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.row}
onPress={()=>{
    enviarValores("Niveles Requeridos","nivelReuerido",[1,2,3,4,5,6,7,8,9,10])

    }}
>
    <Text style={styles.clave}>Niveles Requeridos:</Text>
    <Text style={styles.valor}>{objetoDetalle.nivelRequerido}</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.row}
onPress={()=>{
enviarValores("Volumenes Utilizados","volumenesUtilizados",["5 vol","10 vol","15 vol","20 vol"])

}}>
<Text style={styles.clave}>Volumenes utilizados:</Text>
<Text style={styles.valor}>{objetoDetalle.volumenesUtilizados}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}>
<Text style={styles.clave}>Formula de tinte:</Text>
<Text style={styles.valor}>{objetoDetalle.formulaTinte}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}
onPress={()=>{
enviarValores("Centimetros de crecimiento","centimetrosCrecimiento",["1cm","2cm","3cm","4cm","5cm","6cm","7cm"])

}}>
<Text style={styles.clave}>Centimetros de crecimiento:</Text>
<Text style={styles.valor}>{objetoDetalle.centimetrosCrecimiento}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}
onPress={()=>{
enviarValores("Nivel en Medios","nivelMedios",["Altura 1","Altura 2","Altura 3","Altura 4","Altura 5"])

}}>
<Text style={styles.clave}>Nivel en medios:</Text>
<Text style={styles.valor}>{objetoDetalle.nivelMedios}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}
onPress={()=>{
enviarValores("Nivel en Puntas","nivelPuntas",["Altura 1","Altura 2","Altura 3","Altura 4","Altura 5"])

}}>
<Text style={styles.clave}>Nivel en puntas:</Text>
<Text style={styles.valor}>{objetoDetalle.nivelPuntas}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}>
<Text style={styles.clave}>Deseo del cliente:</Text>
<Text style={styles.valor}>{objetoDetalle.deseoCliente}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}>
<Text style={styles.clave}>Formula del decolorante:</Text>
<Text style={styles.valor}>{objetoDetalle.formulaDecolorante}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}>
<Text style={styles.clave}>Tecnicas utilizadas:</Text>
<Text style={styles.valor}>{objetoDetalle.tecnicasUtilizadas}</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.row}
onPress={()=>{
enviarValores("Tratamientos","tratamientos",["Biotina cada 10 dias","Biotina cada 20 dias","Biotina cada 30 dias"])

}}>
<Text style={styles.clave}>Tratamientos:</Text>
<Text style={styles.valor}>{objetoDetalle.tratamientos}</Text>
</TouchableOpacity>

            </View>
        )
      }

      const GuardarCambios=()=>{
        updateClientes(idCliente,nameCliente,JSON.stringify(objetoDatos),JSON.stringify(objetoHistorial),JSON.stringify(objetoDetalle))
        setHayCambios(false)
      }

  const RenderizarHistorial = () => {
    let tamaño = objetoHistorial.length;

    if (tamaño > 0) {
        try {
            const historialElements = []; 

            for (let index = tamaño - 1; index >= Math.max(tamaño - 3, 0); index--) {
                historialElements.push(
                    <View style={styles.row} key={index}>
                        <Text style={styles.celdaHistorial}>{objetoHistorial[index].fecha}</Text>
                        <Text style={styles.celdaHistorial}>{objetoHistorial[index].horario}</Text>
                        <Text style={styles.celdaHistorial}>{objetoHistorial[index].servicio}</Text>
                        <Text style={styles.celdaHistorial}>{objetoHistorial[index].descripcion}</Text>
                    </View>
                );
            }

            return (
                <View>
                    {historialElements} 
                </View>
            );
        } catch (error) {
            console.error("Ocurrió un error en el historial:", error);
        }
    } else {
        return (
            <View style={{ width: '100%' }}>
                <Text style={{ textAlign: 'center' }}>No hay historial previo</Text>
            </View>
        );
    }
};

      

  return (
    <Modal visible={visible} onRequestClose={closeModal}>

            <View style={styles.header}>
                    <Text>Ficha de cliente: {nameCliente}</Text>
            </View>
            <ScrollView>

                    <TouchableOpacity style={styles.desingTabla} onPress={()=>{setModalDatosClienteVisible(true)}}>

                        <Text style={styles.headerTable}>Datos del cliente</Text>

                        <View style={styles.rowTable}><Text style={styles.clave}>Dirección:</Text><Text>{objetoDatos.adress}</Text></View>

                        <View style={styles.rowTable}><Text style={styles.clave}>Telefono:</Text><Text>{objetoDatos.phone}</Text></View>

                        <View style={styles.rowTable}><Text style={styles.clave}>Nombre del estilista:</Text><Text>{objetoDatos.estilista}</Text></View>

                    </TouchableOpacity>


                    {/* cuadro que indique los turnos previos */}
                    {/* muestra los ultimo 4 turnos agregar un btn que diga ver mas para ver las fechas completas*/}

                    <TouchableOpacity style={[styles.column,styles.desingTabla,{paddingBottom:30}]}
                    onPress={()=>{
                        setHistorialVisible(true);
                    }}
                    >
                    
                    <Text style={styles.headerTable}>Historial de Atencion</Text>

                        <View style={styles.rowTable}>
                            <Text style={[styles.widthTabla,styles.clave]}>Fecha</Text>
                            <Text style={[styles.widthTabla,styles.clave]}>Horario</Text>
                            <Text style={[styles.widthTabla,styles.clave]}>Servicio</Text>
                            <Text style={[styles.widthTabla,styles.clave]}>Descripción</Text>
                            
                        </View>

                        <RenderizarHistorial />


                    </TouchableOpacity>

                    {objetoDetalle&&<Body/>}

                 
        </ScrollView>

        <View style={{display:'flex',flexDirection:'row',width:'100%'}}>

                <View style={{alignItems:'center',padding:20,width:'50%'}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        
                        if(hayCambios!==false){
                            Alert.alert('Atención','No se guardarón los cambios realizados, antes de salir, ¿Desea GUARDARLOS?',[{text:'Si, guardar',onPress:()=>{GuardarCambios();closeModal()}},{text:'No, descartar cambios',onPress:()=>{setHayCambios(false);closeModal()}}])
                        }else{
                            closeModal();    
                        }

                        }}>
                        <Text style={{fontSize:16}}>Atras</Text>
                    </TouchableOpacity>
                </View>


                <View style={{alignItems:'center',padding:20,width:'50%'}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        GuardarCambios();
                    }}>
                        <Text style={{fontSize:16}}>Guardar</Text>
                    </TouchableOpacity>
                </View>
        </View>

        <DatoClienteModal visible={ModalDatosClienteVisible} close={closeModalDC} name={nameCliente} id={idCliente} datosClientes={objetoDatos} setDatos={setOjetoDatos} cambios={setHayCambios} />
        <DesplegableModal visible={desplegableVisible} close={desplegableClose} title={titleDesplegable} valoresSeleccion={desplegableDatos} actualizar={ActualizarDatos} clave={clave} registrarCambios={setHayCambios}/>
        <HistorialTurnoClienteModal visible={historialVisible} close={historialClose} datosHistorialCliente={objetoHistorial} cliente={nameCliente}/>

    </Modal>
  );
};

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
        alignItems: 'center',
        margin:5,
        padding:5,
        borderWidth:1,
      },
      rowTable: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin:5
      },
      subTilte:{

      },
      widthTabla:{
        width:'25%'
      },
      celdaHistorial:{
        width:'25%',
        justifyContent:'center',
        alignContent:'center'
    },
      desingTabla:{
        margin:5,
        borderWidth:1,
        borderRadius:10
      },
      headerTable:{
        width:'100%',
        textAlign:'center'
      },
      btn:{
        borderRadius:10,
        borderWidth:1,
        width:'40%',
        alignItems:'center',
      },
      clave:{

        fontWeight:700
      },

    celdaHistorial:{
        width:'25%',
        justifyContent:'center',
        alignContent:'center'
    },


});

export default FichaClienteModal;


// {
//     "adress":
//     'beruty 2070',
//     "phone":1133531540,
//     "estilista":"natalia soledad romero",
//     "historial":
//         {
//             "fecha":"1/02/2023",
//             "descripción":"algo",
//             "importe":100,
//             "deuda":0
//         },
//     longitud:5,
//     textura:"rigido",
//     porosidad:"poroso",
//     colorNatural:"rojo",
//     colorDeseado:"rubio",
//     nivelRequerido:"mucho",
//     canas: 'Cantidad de canas',
//     procedimientos: 'Procedimientos realizados',
//     altura: 'Altura',
//     volumenesUtilizados: 'Volumenes utilizados',
//     formulaTinte: 'Formula de tinte',
//     centimetrosCrecimiento: 'Centimetros de crecimiento',
//     nivelMedios: 'Nivel en medios',
//     nivelPuntas: 'Nivel en puntas',
//     deseoCliente: 'Deseo del cliente',
//     formulaDecolorante: 'Formula del decolorante',
//     tecnicasUtilizadas: 'Tecnicas utilizadas',
//     tratamientos: 'Tratamientos',
//     }
