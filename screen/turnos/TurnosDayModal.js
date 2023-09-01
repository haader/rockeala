import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity,ScrollView ,Alert,Button,View, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AgregarTurnoModal from "./AgregarTurnoModal";
import EditarTurnoModal from "./EditarTurnoModal";
import { fetchClientes } from "../../database/databaseClientes";
import { deleteTurno, fetchTurnos } from "../../database/databaseTurnos";
import { fetchPrecios } from "../../database/precios/databasePrecios";
import LoadingScreen from "../../componentes/LoadingScreen";

export default TurnosDayModal=({numberDay,month,year,cerrarModal, estadoVisible, addTurno, prevDay, nextDay})=>{

    const [loading,setLoading]=useState(false);
    const [visibleModalAddTurno,setVisibleModalAddTurno]=useState(false);
    const [visibleModalEditeTurno,setVisibleModalEditeTurno]=useState(false);
    const [timeSelect,setTimeSelect]=useState("");
    const [nameClientes,setNameClientes]=useState([{"id": 8, "nombreCliente": "Hola"}, {"id": 9, "nombreCliente": "Tres"}]);
    const [listServicios, setListServicios]=useState([[{"id": 8, "servicio": "peinado","precio":"300"},{"id": 9, "servicio": "lavado","precio":"500"}]]);
    //dia TEXT, cliente TEXT, hora TEXT
    const [cronograma, setCronograma] = useState([]);
    const [plantilla, setPlantilla] = useState([
      
        { "hora": "08","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "09","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "10","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "11","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "12","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "13","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "14","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "15","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "16","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "17","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "18","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "19","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "20","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "21","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "22","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""},
        { "hora": "23","cliente": 'Horario Disponible', "dia": "33", "servicio": "No informado","descripcion": ""}
        
      ]);

      const cargarTurnos=()=>{
        if(month!==undefined&&year!==undefined&&numberDay!==undefined){
            setLoading(true);
            fetchTurnos(`table${month}${year}`, numberDay, 
        (datosDesdeDB) => {
            // console.log("Turnos para el dia:",numberDay);
            datosDesdeDB.map(item=>console.log("->",item));
          
            const resultado = plantilla.map(itemPlantilla => {
                const item2 = datosDesdeDB.find(itemDatosDesdeDB => itemDatosDesdeDB.hora === itemPlantilla.hora);
                if (item2) {
                  return item2;
                }
                return itemPlantilla;
              });
              //luego del map iteramos en consola
            //   console.log("-MAPEADO: ",);
            //   resultado.map(item=>{console.log("-hora:",item.hora,"-cliente:",item.cliente,"-Servicio:",item.servicio)})
            //   console.log("--------",);

              if(resultado.length>0){setCronograma(resultado);setLoading(false);}

          },(datosDesdeDB)=>{
            console.log(datosDesdeDB)
            setCronograma(plantilla)
            setLoading(false);
          });
        }
        
        
      }
      
    //traemos los nombres de los usuarios
    useEffect(()=>{
        
        fetchClientes((data)=>{
            setNameClientes(data)
            console.log("CLIENTES",data)
        })

        

            fetchPrecios((data)=>{
              setListServicios(data)
            })
        
          

        console.log("trayendo nombre de clientes y servicios")


        cargarTurnos();  
          

    },[numberDay]);


    const nameDay=(numberDay,month,year)=>{

    //definimos la lista de clientes
    
      // Definir un arreglo con los nombres de los días de la semana en español
      const daysOfWeekNames = [
        "Domingo ",
        "Lunes ",
        "Martes ",
        "Miércoles ",
        "Jueves ",
        "Viernes ",
        "Sábado ",
      ];

    let date= new Date(year, month-1,numberDay);
    let name=date.getDay();
    const nameDay=daysOfWeekNames[name];
    return  nameDay;

}

//'CREATE TABLE IF NOT EXISTS ? (id INTEGER PRIMARY KEY AUTOINCREMENT, 


// Consultar en la base de cronograma los turnos para el dia yn el mes elegido
// Renderizamos los cronograma traidos:
// Horario, Clientes

// Funciones que debe tener:
// eliminar, agregar turno
const agregarTurno=(time)=>{
    console.log("-agregar time: "+time)
    setTimeSelect(time)
    setVisibleModalAddTurno(true)
 
}
const eliminarTurno=(tabla,dia,hora,cliente,servicio)=>{
    Alert.alert('Atención','¿Desea eliminar el turno Seleccionado?',[{text:'Si',onPress:()=>{
    
        deleteTurno(tabla,dia,hora,cliente,servicio,()=>{cargarTurnos()})
    
    }},{text:'No',onPress:()=>{}}])
}
const editarTurno=(time)=>{
    console.log("-Editar time: "+time)
    setTimeSelect(time)
    setVisibleModalEditeTurno(true)
}


const BtnAcciones=({time,cliente,servicio})=>{
    return(
        <View style={styles.btn}>
                {/* editar */}
                <TouchableOpacity onPress={()=>editarTurno(time)}>
                    <AntDesign name="edit" size={24} color="chocolate" />
                </TouchableOpacity>
                {/* eliminar */}
                <TouchableOpacity style={{marginLeft:10}} onPress={()=>{
    
    eliminarTurno(`table${month}${year}`,numberDay,time,cliente,servicio)

                    }}>
                        <AntDesign name="closecircle" size={24} color="red" />
                </TouchableOpacity>
        </View>
    )
}

const BtnAgregar=({time, addTurno})=>{
    return(
        <TouchableOpacity style={styles.btn} onPress={()=>{
            if(addTurno){
                agregarTurno(time)
            }
        }
        
            
        
        }>
                
                {/* Agregar */}
                
                    <AntDesign name="pluscircleo" size={24} color={addTurno?"black":'gray'} />
                
                
        </TouchableOpacity>
    )
}

const Horarios=()=>{

    let horarios=[];

    for (let hora = 8; hora < 24; hora++) {

        horarios.push(

        <View style={styles.ficha} key={`hora${hora}`}>
            {/* si esta vacio */}
            <View style={[styles.hora,cronograma[hora-8].cliente!=='Horario Disponible'?styles.horaWhite:styles.horaBlack]}>
                {/* si NO esta vacio, es decir "Horario Disponible"*/}
                {cronograma[hora-8].cliente=='Horario Disponible'?<MaterialCommunityIcons name="circle-outline" size={24} color="white" />:<MaterialIcons name="check-circle-outline" size={24} color="green" />}
                <Text style={cronograma[hora-8].cliente!=='Horario Disponible'?styles.textBlack:styles.textWhite}>{cronograma[hora-8].hora}:00 hs</Text>
            </View>
            
            <View style={styles.body}>
            {cronograma[hora-8].cliente==(''||'Horario Disponible')?<Text>{cronograma[hora-8].cliente}</Text>:<Text style={{fontWeight:'bold',fontSize:18}}> {cronograma[hora-8].cliente}</Text>}
                {cronograma[hora-8].servicio==(''||'No informado')?null:<Text style={{fontSize:8}}><Text style={{fontWeight:'bold',fontSize:10}}>-Servico:</Text> {cronograma[hora-8].servicio}</Text>}
                {cronograma[hora-8].descripcion==("")?null:<Text style={{fontSize:8}}><Text style={{fontWeight:'bold',fontSize:10}}>-Detalle:</Text> {cronograma[hora-8].descripcion}</Text>}
                
            </View>
            {cronograma[hora - 8].cliente!='Horario Disponible' ? <BtnAcciones time={cronograma[hora - 8].hora} cliente={cronograma[hora - 8].cliente} servicio={cronograma[hora - 8].servicio} /> : <BtnAgregar addTurno={addTurno} time={cronograma[hora - 8].hora}/>}
        </View>

        )

    }

    return(<View style={styles.column}>{horarios}</View>)
}


const anterior=()=>{
    setLoading(true);
    prevDay()
}
const siguiente=()=>{
    setLoading(true);
    nextDay()
}

const closeModal=()=>{
    setVisibleModalAddTurno(false)
}

const closeModalEdite=()=>{
    setVisibleModalEditeTurno(false)
}

    return(
        <Modal visible={estadoVisible} onRequestClose={cerrarModal}>

            {loading && (<LoadingScreen/>)}

            <View style={styles.title}>
                    <TouchableOpacity onPress={()=>anterior()}>
                        <MaterialIcons name="navigate-before" size={50} color="black" />
                    </TouchableOpacity>
                        <Text>{nameDay(numberDay,month,year)}</Text>
                        <Text>{numberDay}/</Text>
                        <Text>{month}</Text>
                    <TouchableOpacity onPress={()=>siguiente()}>
                        <MaterialIcons name="navigate-next" size={50} color="black" />
                    </TouchableOpacity>
                
            </View>
            <View style={[styles.row,{marginTop:10,marginBottom:10,borderRadius:10,borderWidth:1,backgroundColor:'black',padding:5,margin:5}]}>
                <Text style={{width:'20%',textAlign:'center',color:'white'}}>Horarios</Text>
                <Text style={{width:'60%',textAlign:'center',color:'white'}}>Clientes</Text>
                <Text style={{width:'20%',textAlign:'center',color:'white'}}>Acciones</Text>
            </View>

            <ScrollView >
                <View style={styles.column}>
                    {cronograma.length>0?<Horarios/>:null}
                </View>
            </ScrollView>

            <TouchableOpacity style={{alignItems:'center'}} onPress={cerrarModal}>
                <AntDesign name="closecircleo" size={50} color="black" />
            </TouchableOpacity>
            
            <AgregarTurnoModal anio={year} nameDay={nameDay(numberDay,month,year)} numberDay={numberDay} month={month} visible={visibleModalAddTurno} cerrarModal={closeModal} time={timeSelect} servicios={listServicios} clientes={nameClientes} actualizarTurnos={cargarTurnos}/>
            <EditarTurnoModal anio={year} nameDay={nameDay(numberDay,month,year)} numberDay={numberDay} month={month} visible={visibleModalEditeTurno} cerrarModal={closeModalEdite} time={timeSelect} servicios={listServicios} clientes={nameClientes} actualizarTurnos={cargarTurnos}/>


        </Modal>
    )

    
}
const styles=StyleSheet.create(
    {
    title:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        height:50,
        alignItems:'center',
        margin:5
    },
    row:{
    display:'flex',
    flexDirection:'row'
    },
    ficha:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        alignContent:'center',
        backgroundColor:'white',
        margin:5,
        padding:0,
        
        
    },
    column:{
        display:'flex',
        flexDirection:'column'
    },
    body:{  
        width:'60%',
        borderBottomWidth:1,
        borderTopWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    bodyVerde:{
        backgroundColor:'green'
    },
    btn:{
        display:'flex',
        flexDirection:'row',
        position:'absolute',
        justifyContent:'center',
        right:0,
        padding:5,
        borderRightWidth:1,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        height:'100%',
        width:'20%',
        marginRight:10
        
    },
    btnVerde:{
        backgroundColor:'green'
    },
    hora:{
        display:'flex',
        flexDirection:'row',
        padding:5,
        borderWidth:1,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    horaBlack:{
        backgroundColor:'black'
    },
    horaWhite:{
        backgroundColor:'white'
    },
    textBlack:{
        color:'black'
    },
    textWhite:{
        color:'white'
    }
    }
)