import React, { useState,useEffect } from "react";
import { View, Modal, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { fetchAllClientes } from "../../database/databaseClientes";
import DesplegableModal from './desplegableModal'


const FichaClienteModal = ({ idCliente,nameCliente, closeModal, visible }) => {

    const[desplegableVisible,setDesplegableVisible]=useState(false);
    const[desplegableDatos,setDesplegableDatos]=useState([]);
    const[titleDesplegable,setTitleDesplegable]=useState("");
    const[valueIdCliente,setValueIdCliente]=useState();
    const[clave,setClave]=useState()

    // realizamos un fetch a la base de datos para traer los datos en un objeto
    //id, nombreCliente ,
    const[objetoDatos,setOjetoDatos]=useState([{"adress":
        'beruty 2070',
        "phone":1133531540,
        "estilista":"natalia soledad romero"}]);
    const[objetoHistorial,setObjetoHistorial]=useState([]);
    const[objetoDetalle,setObjetoDetalle]=useState([]);

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
        fetchAllClientes((data)=>{
            let obj0=JSON.parse(data.objetoDatos)
            setOjetoDatos(obj0);
            console.log(obj0);

            let obj1=JSON.parse(data[0])
            setObjetoHistorial(obj1);
            console.log(obj1);

            let obj2=JSON.parse(data[0])
            setObjetoDetalle(obj2);
            console.log(obj2);
        })
    }
    //utilizaos el useEfect para traer los datos de la database
    useEffect(
        ()=>{idCliente!=undefined?traerDatos():null;}
    ,[idCliente])



    const desplegableClose=()=>{
        setDesplegableVisible(false)
    }

    const ActualizarDatos = (clave, valor) => {
        setDatos(prevDatos => {
          return { ...prevDatos, [clave]: valor };
        });
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

      const RenderizarHistorial=()=>{
        return(
            <View style={styles.rowTable}>
                            <Text style={styles.widthTabla}>{objetoHistorial.fecha}</Text>
                            <Text style={styles.widthTabla}>{objetoHistorial.descripción}</Text>
                            <Text style={styles.widthTabla}>{objetoHistorial.importe}</Text>
                            <Text style={styles.widthTabla}>{objetoHistorial.deuda}</Text>
                            <Text style={styles.widthTabla}></Text>
                        </View>
        )
      }

  return (
    <Modal visible={visible} onRequestClose={closeModal}>

            <View style={styles.header}>
                    <Text>Ficha de cliente: {nameCliente}</Text>
            </View>
            <ScrollView>

                    <View style={styles.desingTabla}>

                        <Text style={styles.headerTable}>Datos del cliente</Text>

                        <View style={styles.rowTable}><Text style={styles.clave}>Dirección:</Text><Text>{objetoDatos.adress}</Text></View>

                        <View style={styles.rowTable}><Text style={styles.clave}>Telefono:</Text><Text>{objetoDatos.phone}</Text></View>

                        <View style={styles.rowTable}><Text style={styles.clave}>Nombre del estilista:</Text><Text>{objetoDatos.estilista}</Text></View>

                    </View>


                    {/* cuadro que indique los turnos previos */}
                    {/* muestra los ultimo 4 turnos agregar un btn que diga ver mas para ver las fechas completas*/}

                    <View style={[styles.column,styles.desingTabla,{paddingBottom:30}]}>
                    <Text style={styles.headerTable}>Historial de Atencion</Text>

                        <View style={styles.rowTable}>
                            <Text style={[styles.widthTabla,styles.clave]}>Fecha</Text>
                            <Text style={[styles.widthTabla,styles.clave]}>Descripción</Text>
                            <Text style={[styles.widthTabla,styles.clave]}>Importe</Text>
                            <Text style={[styles.widthTabla,styles.clave]}>Deuda</Text>
                            <Text style={[styles.widthTabla,styles.clave]}>Total</Text>
                        </View>

                        {objetoHistorial ? (<RenderizarHistorial />) : (
                            <View style={[styles.rowTable,{width:'95%'}]}>
                                <Text style={{width:'100%',textAlign:'center'}}>El cliente no tiene historial</Text>
                            </View>
                            )}


                    <View>
                            <Text style={[styles.widthTabla,{position:'absolute',right:0}]}>total</Text>
                        </View>

                    </View>

                    {objetoDetalle&&<Body/>}

                 
        </ScrollView>

        <View style={{display:'flex',flexDirection:'row',width:'100%'}}>

                <View style={{alignItems:'center',padding:20,width:'50%'}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{closeModal()}}>
                        <Text style={{fontSize:16}}>Atras</Text>
                    </TouchableOpacity>
                </View>


                <View style={{alignItems:'center',padding:20,width:'50%'}}>
                    <TouchableOpacity style={styles.btn} onPress={()=>{}}>
                        <Text style={{fontSize:16}}>Guardar</Text>
                    </TouchableOpacity>
                </View>
        </View>
        <DesplegableModal visible={desplegableVisible} close={desplegableClose} title={titleDesplegable} valoresSeleccion={desplegableDatos} actualizar={ActualizarDatos} clave={clave}/>

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
        width:'20%'
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
      valor:{

      }
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
