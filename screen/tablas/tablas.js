import React, { useEffect,useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

import * as SQLite from 'expo-sqlite';
import { addTurnos } from '../../database/databaseTurnos';

const db = SQLite.openDatabase('dataBasePeluqueria.db');

export default function Tablas() { 

const traerNombreTablas=()=>{
  db.transaction(tx => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
      [],
      (_, result) => {
        const tableNames = result.rows._array.map(row => row.name);
        console.log('Nombres de las tablas:', tableNames);
      }
    );
  });
  
}

  useEffect(() => {
    // Consulta para obtener los nombres de todas las tablas en la base de datos
    
    traerNombreTablas();

  }, []);

  const[input,setInput]=useState('');
 const changeText=(text)=>{
  setInput(text)
 }

 const consultar=()=>{
  db.transaction(tx=>{
    tx.executeSql(input,[],
      (txObj, resultSet) => {
        if (resultSet.rows._array.length > 0) {
          console.warn("-resultados")
          resultSet.rows._array.map((item)=>{
            
            console.log("-->",JSON.stringify(item))

          })
          
          
          // Resto del código...
        }else if(resultSet.rowsAffected > 0) {
          console.warn("->Consulta:",input)
          console.warn("->Cambios: "+JSON.stringify(resultSet.rowsAffected));
          // Resto del código...
        }else{
          console.warn("->Consulta:",input)
          console.error("->no afectado: "+JSON.stringify(resultSet));
          
        }
      },(error)=>{console.error("Error:",error)})
  })
 }

  return (
    <View>
      <Text>Ver la consola para los nombres de las tablas</Text>
          <Text>Insertar SQL:</Text>        
          <TextInput styles={{width:'90%',padding:10,margin:10,borderRadius:10,borderWidth:1}} placeholder='ingrese consulta' value={input} onChangeText={(text)=>{changeText(text)}}></TextInput>
          <Button title='consultar' onPress={()=>{consultar()}}></Button>
        
        <ScrollView>
          <View>

          <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>traerNombreTablas() }>
                  <Text>TRAER NOMBRE DE LAS TABLAS</Text>
            </TouchableOpacity>
        </View>  

          <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput('SELECT * FROM table82023')}}>
                  <Text>SELECT * FROM table82023</Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`
            SELECT objetoHistorial FROM clientes WHERE nombreCliente = 'Ambar'
            `)}}>
                  <Text>Traer Clientes</Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>addTurnos('table82023', '30', '15', 'Ambar','uñas','prueba',()=>{console.log("call1")},()=>{console.log("call2")})}>
                  <Text>add turnos</Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`SELECT dia,hora,servicio,descripcion FROM table82023 WHERE cliente = 'Ambar'`)}}>
                  <Text>traer cliente</Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`SELECT nombreCliente,objetoHistorial FROM clientes WHERE nombreCliente = 'Ambar'`)}}>
                  <Text>traer objetoHistorial</Text>
            </TouchableOpacity>
        </View>

        

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`UPDATE clientes SET objetoHistorial = '[{"nombre":"ad"},{"nombre":"prueba"}]' WHERE nombreCliente = 'Ambar'`)}}>
                  <Text>update clientes/historial</Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`DELETE FROM clientes`)}}>
                  <Text>DELETE FROM clientes</Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`DELETE FROM table82023`)}}>
                  <Text>DELETE FROM table82023</Text>
            </TouchableOpacity>
        </View>

        {/* <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`CREATE TABLE table112023 (
                                                          id INTEGER PRIMARY KEY,
                                                          dia TEXT,
                                                          cliente INTEGER,
                                                          hora TEXT
                                                      );`)
            }}>
              <Text> CREATE TABLE table112023 (
              id INTEGER PRIMARY KEY,
              dia TEXT,
              cliente INTEGER,
              hora TEXT
          );
            </Text>
              </TouchableOpacity>
        </View>
        

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`INSERT INTO table82023 (dia,cliente,hora) VALUES ('22','maria','12');`)}}>
                  <Text>
                    INSERT INTO table82023 (dia,cliente,hora) VALUES ('22','maria','12);
                  </Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`SELECT dia, cliente, hora FROM table82023 WHERE dia == 22;`)}}>
                  <Text>
                  SELECT dia, cliente, hora FROM table82023 WHERE dia == 22;

                  </Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10}}>
            <TouchableOpacity onPress={()=>{setInput(`UPDATE table82024 SET cliente = pepe WHERE dia = '22';`)}}>
                  <Text>
                  UPDATE table82024 SET cliente = pepe WHERE dia = '22';
                  </Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10, backgroundColor:'red'}}>
            <TouchableOpacity onPress={()=>{setInput(`DELETE FROM table82023 WHERE dia = '22';`)}}>
                  <Text>
                  DELETE FROM table82023 WHERE dia = '22';

                  </Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10, backgroundColor:'red'}}>
            <TouchableOpacity onPress={()=>{setInput(`DROP TABLE table2023`)}}>
                  <Text>
                  DROP TABLE table2023

                  </Text>
            </TouchableOpacity>
        </View>

        <View style={{borderWidth:1,borderRadius:10,margin:10,padding:10, backgroundColor:'red'}}>
            <TouchableOpacity onPress={()=>{setInput(`DELETE FROM table2023;`)}}>
                  <Text>DELETE FROM table2023;</Text>
            </TouchableOpacity>
        </View> */}

          </View>
        </ScrollView>
        
        
    </View>
  );
};


