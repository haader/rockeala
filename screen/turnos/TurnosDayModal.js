import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity,ScrollView ,Button,View, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AgregarTurnoModal from "./AgregarTurnoModal";

export default TurnosDayModal=({numberDay,month,year,cerrarModal, estadoVisible, addTurno})=>{

    const[visibleModalAddTurno,setVisibleModalAddTurno]=useState(false)
    const[timeSelect,setTimeSelect]=useState("")
    const nameClientes=["mario","natalia","matias","rodrigo","ambar"];

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

    const [datos, setDatos] = useState([
        { "nombreCliente": 'Horario Disponible', "hora": '08' },
        { "nombreCliente": 'Horario Disponible', "hora": '09' },
        { "nombreCliente": 'Horario Disponible', "hora": '10' },
        { "nombreCliente": 'Horario Disponible', "hora": '11' },
        { "nombreCliente": 'ramon', "hora": '12' },
        { "nombreCliente": 'Horario Disponible', "hora": '13' },
        { "nombreCliente": 'Horario Disponible', "hora": '14' },
        { "nombreCliente": 'Horario Disponible', "hora": '15' },
        { "nombreCliente": 'Horario Disponible', "hora": '16' },
        { "nombreCliente": 'Horario Disponible', "hora": '17' },
        { "nombreCliente": 'Horario Disponible', "hora": '18' },
        { "nombreCliente": 'Horario Disponible', "hora": '19' },
        { "nombreCliente": 'Horario Disponible', "hora": '20' },
        { "nombreCliente": 'Horario Disponible', "hora": '21' },
        { "nombreCliente": 'Horario Disponible', "hora": '22' },
        { "nombreCliente": 'Horario Disponible', "hora": '23' },
        
      ]);
      

// Consultar en la base de datos los turnos para el dia yn el mes elegido
// Renderizamos los datos traidos:
// Horario, Clientes

// Funciones que debe tener:
// eliminar, agregar turno
const agregarTurno=(time)=>{
    console.log("-agregar time"+time)
    setTimeSelect(time)
    setVisibleModalAddTurno(true)
 
}
const eliminarTurno=()=>{
    console.log("-eliminar")
}
const editarTurno=()=>{
    console.log("-editar")
}


const BtnAcciones=()=>{
    return(
        <View style={styles.btn}>
                {/* editar */}
                <TouchableOpacity onPress={()=>editarTurno()}>
                    <AntDesign name="edit" size={24} color="chocolate" />
                </TouchableOpacity>
                {/* eliminar */}
                <TouchableOpacity style={{marginLeft:10}} onPress={()=>eliminarTurno()}>
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
            <View style={[styles.hora,datos[hora-8].nombreCliente!='Horario Disponible'?styles.horaWhite:styles.horaBlack]}>
                {datos[hora-8].nombreCliente=='Horario Disponible'?<MaterialCommunityIcons name="circle-outline" size={24} color="white" />:<MaterialIcons name="check-circle-outline" size={24} color="green" />}
                <Text style={datos[hora-8].nombreCliente=='Horario Disponible'?styles.textWhite:styles.textBlack}>{datos[hora-8].hora}:00 hs</Text>
            </View>
            
            <View style={styles.body}>
                <Text>{datos[hora-8].nombreCliente}</Text>
            </View>
            {datos[hora - 8].nombreCliente!='Horario Disponible' ? <BtnAcciones /> : <BtnAgregar addTurno={addTurno} time={datos[hora - 8].hora}/>}
        </View>

        )

    }

    return(<View style={styles.column}>{horarios}</View>)
}

const anterior=()=>{
    console.log("anteriror");
}
const siguiente=()=>{
    console.log("siguiente");
}

const closeModal=()=>{
    setVisibleModalAddTurno(false)
}

    return(
        <Modal visible={estadoVisible} onRequestClose={cerrarModal}>

            <View style={styles.title}>
            <TouchableOpacity onPress={anterior()}>
                <MaterialIcons name="navigate-before" size={50} color="black" />
            </TouchableOpacity>
                <Text>{nameDay(numberDay,month,year)}</Text>
                <Text>{numberDay}/</Text>
                <Text>{month}</Text>
            <TouchableOpacity onPress={siguiente()}>
                <MaterialIcons name="navigate-next" size={50} color="black" />
            </TouchableOpacity>
        
            </View>
            <View style={[styles.row,{marginTop:10,marginBottom:10}]}>
                <Text style={{width:'20%',textAlign:'center'}}>Horarios</Text>
                <Text style={{width:'60%',textAlign:'center'}}>Clientes</Text>
                <Text style={{width:'20%',textAlign:'center'}}>Acciones</Text>
            </View>

            <ScrollView >
                <View style={styles.column}>
                    <Horarios/>
                </View>
            </ScrollView>

            <TouchableOpacity style={{alignItems:'center'}} onPress={cerrarModal}>
                <AntDesign name="closecircleo" size={50} color="black" />
            </TouchableOpacity>
            
            <AgregarTurnoModal nameDay={nameDay(numberDay,month,year)} numberDay={numberDay} month={month} visible={visibleModalAddTurno} cerrarModal={closeModal} time={timeSelect} clientes={nameClientes}/>


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
        alignItems:'center'
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