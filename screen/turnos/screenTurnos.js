import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import bannerImage from '../assets/banner.png';
import iconImage from '../assets/icon.png';
import TurnosDayModal from "./TurnosDayModal";

export default function ScreenTurnos() {
  const [anio, setAnio] = useState();
  const [mes, setMes] = useState();
  const [dia, setDia] = useState();
  const [dirImg,setDirImg]=useState(iconImage);
  const nameMeses=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','noviembre','diciembre'];
  const [closeModal,setCloseModal]=useState(false);
  const [estadoVisible,setEstadoVisible]=useState(false);

  //variables para la selección del modal
  const[diaSelect,setDiaSelect]=useState();
  const[mesSelect,setMesSelect]=useState();
  const[anioSelect,setAnioSelect]=useState();


  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    

    setAnio(year);
    setMes(month);
    setDia(day);

    console.log(`${dia}/${mes}/${anio}`);
  }, []);

  //función para ver el Modal con los turnos
  const ChangeEstadoVisible=()=>{
    setEstadoVisible(false);
  }

   
  const RenderizarSemana = ({ year, month, thisday }) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    console.log("Día actual: " + thisday);

    let calendar = [];
    let semana=[];
    let count=0;

    // Agregar espacios en blanco antes del primer día del mes
    for (let i = 0; i < firstDay.getDay(); i++) {
      count++;
      semana.push(
          <View key={`empty-${i}`} style={{width:"14%",height:50,alignContent:'center'}}>
              <Text  style={styles.day}>{' '}</Text>
          </View>
      );
    }

    // Imprimir los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      
      const isCurrentDay = thisday === day;
      const dayStyle = isCurrentDay ? [styles.day, styles.currentDay] : styles.day;
      if(count==7||count==14||count==21||count==28||count==35||count==42){
        calendar.push(
          <View key={`semana${day}`} style={{width:'100%',display:'flex',flexDirection:'row'}}>
            {semana}
          </View>
        )
        semana=[];
      }
      count++;

      semana.push(
        <TouchableOpacity key={`day-${day}`} style={{width:"14%",height:50,borderWidth:1}}
        onPress={()=>{
          setDiaSelect(day);
          setMesSelect(month);
          setAnioSelect(year);
          setEstadoVisible(true)
          }}>
            <Text  style={dayStyle}>
              {day}
            </Text>
        </TouchableOpacity>
        
      );
      if(day==daysInMonth){
        calendar.push(
          <View key={`semana${day}`} style={{width:'100%',display:'flex',flexDirection:'row'}}>
            {semana}
          </View>
        )
        semana=[];
      }
    }

    return <View style={styles.week}>{calendar}</View>;
  };

  const toggleImage = () => {
    if (dirImg === bannerImage) {
      setDirImg(iconImage);
    } else {
      setDirImg(bannerImage);
    }
  };

  const next=()=>{
    setMes(mes+1);
  }
  const prev=()=>{
    setMes(mes-1);
    
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <TurnosDayModal nameDay={nameMeses[mes-1]} numberDay={diaSelect} month={mesSelect} year={anioSelect} estadoVisible={estadoVisible} cerrarModal={ChangeEstadoVisible}/>
      
      <TouchableOpacity onPress={toggleImage} style={{height:'20%',width:'100%',position:'absolute',top:0}}>
          <ImageBackground source={dirImg} style={styles.img}>
            {/* Aquí colocarás el resto de los componentes de tu aplicación */}
          </ImageBackground>
      </TouchableOpacity>

      <View style={styles.calendarioHead}>
        <TouchableOpacity onPress={prev}>
          <MaterialIcons name="navigate-before" size={50} color="black" />
        </TouchableOpacity>
        
        <View style={[styles.column,{alignItems:'center',width:'60%'}]}>
              
                  <Text style={{fontSize:30}}>{nameMeses[mes-1]}</Text>
              
              <View style={[styles.row,{alignItems:'center',width:'30%'}]}>
                  <Text>{dia}/</Text>
                  <Text>{mes}/</Text>
                  <Text>{anio}</Text>
              </View>
        </View>

        <TouchableOpacity onPress={next}>
            <MaterialIcons name="navigate-next" size={50} color="black" />
        </TouchableOpacity>
      
      </View>
      
      <View style={[styles.row,{width:'100%',justifyContent:'center'}]}>
        
        <Text style={styles.nameDay}>Do</Text>
        <Text style={styles.nameDay}>Lu</Text>
        <Text style={styles.nameDay}>Ma</Text>
        <Text style={styles.nameDay}>Mi</Text>
        <Text style={styles.nameDay}>Ju</Text>
        <Text style={styles.nameDay}>Vi</Text>
        <Text style={styles.nameDay}>Sa</Text>
        
      </View>
      {/* <View style={[styles.column]}> */}
        <RenderizarSemana year={anio} month={mes} thisday={dia} />
      {/* </View> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  calendarioHead: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    borderWidth:1,
    backgroundColor:'orange'
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
  nameDay:{
    width:"14%",
    height:50,
    borderWidth:1,
    textAlign:'center',
    textAlignVertical:'center'
  },
  day: {
    flex: 1,
    textAlign: 'center',
    fontSize:20
  },
  currentDay: {
    backgroundColor: 'red'
  },
  img:{
    width:'100%',
    height:'100%',
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño del contenedor
    borderWidth:0
  }
});
