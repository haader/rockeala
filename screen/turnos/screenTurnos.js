import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import bannerImage from '../../assets/banner.png';
import iconImage from '../../assets/icon.png';
import TurnosDayModal from "./TurnosDayModal";
import { initMes } from "../../database/init/initDatabase";

export default function ScreenTurnos() {
  const[monthAndYear,setMonthAndYear]=useState('')
  const [thisAnio, setThisAnio] = useState();
  const [thisMes, setThisMes] = useState();
  const [thisDia, setThisDia] = useState();
  //variables para la selección del modal
  const[selectDia,setSelectDia]=useState();
  const[selectMes,setSelectMes]=useState();
  const[selectAnio,setSelectAnio]=useState();


  // const [dirImg,setDirImg]=useState(iconImage);
  const nameMeses=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  // const [closeModal,setCloseModal]=useState(false);
  const [estadoVisible,setEstadoVisible]=useState(false);
  //colocamos una nueva variable para limitar el add de turnos a dias que ya pasaron
  const[addTurno,setAddTurno]=useState(false);

  useEffect(()=>{

    initMes(monthAndYear);

  },[monthAndYear])

  useEffect(() => {

    //iniciamos la tabla del mes actual
    

    //obtenemos los dias mes y anio actuales y guardamos las variables
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    

    setThisAnio(year);
    setThisMes(month);
    setThisDia(day);

    //colocamos los valores iniciales a las selecciones
    setSelectAnio(year);
    setSelectMes(month);
    setSelectDia(day)

    //creamos la tabla del mes actual si no existe
    setMonthAndYear(`table${month}${year}`);

    console.log(`fecha actual: ${day}/${month}/${year}`);
  }, []);

  //función para ver el Modal con los turnos
  const ChangeEstadoVisible=()=>{
    setEstadoVisible(false);
  }
  
  const RenderizarSemana = ({ thisMonth, thisDay }) => {
    const firstDay = new Date(selectAnio, selectMes - 1, 1);
    const lastDay = new Date(selectAnio, selectMes, 0);
    const daysInMonth = lastDay.getDate();
    console.log("Día actual: " + thisDay);

    let calendar = [];
    let semana=[];
    let count=0;

    // Agregar espacios en blanco antes del primer día del thisMes
    for (let i = 0; i < firstDay.getDay(); i++) {
      count++;
      semana.push(
          <View key={`empty-${i}`} style={{width:"14%",height:51,}}>
              <Text  style={styles.day}>{'  '}</Text>
          </View>
      );
    }

    // Imprimir los días del thisMes
    for (let day = 1; day <= daysInMonth; day++) {
      
      //si el dia actual es igual al que se renderiza cambia de color
      //si los dias ya pasaron cambia de color
      
      const isCurrentDay = thisDay === day && thisMonth === selectMes && thisAnio == selectAnio;
      const dayStyle = isCurrentDay ? [styles.day, styles.currentDay] :  day<thisDay && thisMonth === selectMes ?styles.passDay:styles.day;
      
      
      if(count==7||count==14||count==21||count==28||count==35||count==42){
        calendar.push(
          <View key={`semana${day}`} style={{width:'100%',display:'flex',flexDirection:'row'}}>
            {semana}
          </View>
        )
        semana=[];
      }
      count++;
  
      //pusheamos las semanas
      semana.push(
        <TouchableOpacity key={`day-${day}`} style={{width:"14%",height:50,borderWidth:1}}
        onPress={()=>{
          setSelectDia(day);
          setSelectMes(selectMes);
          setSelectAnio(selectAnio);
          setEstadoVisible(true);
          
                if(thisMonth === selectMes){
                day < thisDay ? setAddTurno(false):setAddTurno(true);
                }else{
                  setAddTurno(true);
                }
                
          }}>
            <Text  style={dayStyle}>
              {day}
            </Text>
        </TouchableOpacity>
        
      );
      if(day==daysInMonth){
        calendar.push(
          <View key={`semanaFin${day}`} style={{width:'100%',display:'flex',flexDirection:'row'}}>
            {semana}
          </View>
        )
        semana=[];
      }
    }

    return <View style={styles.week}>{calendar}</View>;
  };

  // const toggleImage = () => {
  //   if (dirImg === bannerImage) {
  //     setDirImg(iconImage);
  //   } else {
  //     setDirImg(bannerImage);
  //   }
  // };

  const nextMonth=()=>{
    if(selectMes>=12){
      setSelectMes(1);
      setSelectAnio(prevSelectAnio=>prevSelectAnio+1);
      setMonthAndYear(`table1${selectAnio+1}`);
    }else{
      setSelectMes(prevSelectMes=>prevSelectMes+1);
      setMonthAndYear(`table${selectMes+1}${selectAnio}`);
    }
    
  }
  const prevMonth=()=>{

    if(selectMes<=1){
      setSelectMes(12);
      setSelectAnio(prevSelectAnio=>prevSelectAnio-1);
      setMonthAndYear(`table12${selectAnio-1}`);
    }else{
      setSelectMes(prevSelectMes=>prevSelectMes-1);
      setMonthAndYear(`table${selectMes-1}${selectAnio}`);
    }
  }

 
//son funciones que se pasas al MODAL (turnosDayModal)
  const anteriorDia = () => {
    console.log("anterior día");
    setSelectDia(prevSelectDia => prevSelectDia - 1);
  }
  
  const siguienteDia = () => {
    console.log("siguiente día");
    setSelectDia(prevSelectDia => prevSelectDia + 1);
  }
  

  return (
    <View style={{ flex: 1, alignItems: 'center',height:'100%' }}>
      
      {selectDia&& (<TurnosDayModal 
      nameDay={nameMeses[thisMes-1]} 
      numberDay={selectDia} 
      prevDay={()=>anteriorDia()}
      nextDay={()=>siguienteDia()}
      month={selectMes} 
      year={selectAnio} 
      estadoVisible={estadoVisible} 
      cerrarModal={ChangeEstadoVisible}
      addTurno={addTurno}
      />)}
      
      {/* <TouchableOpacity onPress={toggleImage} style={{height:'20%',width:'100%',position:'absolute',top:0}}>
          <ImageBackground source={dirImg} style={styles.img}>
            
          </ImageBackground>
      </TouchableOpacity> */}
        <View style={styles.header}>
          <Text>Turnos</Text>
        </View>

      <View style={styles.calendarioHead}>
           
           <View stle={{width:'100%'}}>
                <Text style={styles.thisMes}>{selectAnio}</Text>
           </View>
            <View style={[styles.row,{justifyContent:'center'}]}>
                       
                          <TouchableOpacity onPress={prevMonth}>
                        <MaterialIcons name="navigate-before" size={50} color="white" />
                      </TouchableOpacity>
                      
                      <View style={[styles.column,{alignItems:'center',justifyContent:'center',width:'60%'}]}>
                            
                                  <Text style={styles.thisMes}>{nameMeses[selectMes-1]}</Text>
                            
                            {/* <View style={[styles.row,{alignItems:'center',width:'30%'}]}>
                                <Text style={styles.fecha}>{thisDia}/</Text>
                                <Text style={styles.fecha}>{selectMes}/</Text>
                                <Text style={styles.fecha}>{thisAnio}</Text>
                            </View> */}
                      </View>

                      <TouchableOpacity onPress={nextMonth}>
                          <MaterialIcons name="navigate-next" size={50} color="white" />
                      </TouchableOpacity>
                    
            </View>
            <View style={[styles.row,styles.diasSemana,{width:'100%',justifyContent:'center'}]}>
              
              <Text style={styles.nameDay}>Do</Text>
              <Text style={styles.nameDay}>Lu</Text>
              <Text style={styles.nameDay}>Ma</Text>
              <Text style={styles.nameDay}>Mi</Text>
              <Text style={styles.nameDay}>Ju</Text>
              <Text style={styles.nameDay}>Vi</Text>
              <Text style={styles.nameDay}>Sa</Text>
              
            </View>
      </View>
      
      
      {/* <View style={[styles.column]}> */}
      <RenderizarSemana thisMonth={thisMes} thisDay={thisDia}/>
      {/* </View> */}

      <View style={{borderRadius:10,borderWidth:1,padding:10,margin:10}}>
        
          <Text>Hoy es {thisDia}/{thisMes}/{thisAnio}</Text>
        
      </View>
      

     {(thisMes!=selectMes||thisAnio!=selectAnio) && ( <View style={{borderRadius:10,borderWidth:1,padding:10,margin:10}}>
        <TouchableOpacity onPress={()=>{
          setSelectDia(thisDia);
          setSelectMes(thisMes);
          setSelectAnio(thisAnio)
        }}>
          <Text>Volver a {nameMeses[thisMes-1]} de {thisAnio}</Text>
        </TouchableOpacity>
      </View>)}
      

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
  },calendarioHead: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    borderWidth:1,
    backgroundColor:'black'
  },thisMes:{
    fontSize:30,
    color:'white'
  },fecha:{
    color:'white'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  week: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 5,
    marginBottom: 10
  },
  diasSemana:{
    borderWidth:1,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
    backgroundColor:'black'
  },
  nameDay:{
    width:"14%",
    height:50,
    borderWidth:1,
    textAlign:'center',
    textAlignVertical:'center',
    color:'white'
  },
  day: {
    flex: 1,
    fontSize:17,
    
  },passDay:{
    color:'gray',
    fontSize:17,
    borderColor:'gray'
  },
  currentDay: {
    backgroundColor: 'black',
    color:'white',
    fontSize:20,
    color:'red',
    alignItems:'center',
    justifyContent:'center'
  },
  img:{
    width:'100%',
    height:'100%',
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño del contenedor
    borderWidth:0
  }
});
