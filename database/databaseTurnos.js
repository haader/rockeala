import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('dataBasePeluqueria.db');
import { Alert } from 'react-native'; // Importamos FlatList y TextInput

  export const fetchTurnos = (mesYAnio, dia, callback,callback2) => {
    console.log("---fetch turnos---");
    console.log("-tabla: ", mesYAnio, " dia seleccionado: ", dia);
  
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT dia,cliente,hora,servicio,descripcion FROM ${mesYAnio} WHERE dia == ${dia}`,[],
        (txObj, resultSet) => {
          if (resultSet.rows._array.length > 0) {
            callback(resultSet.rows._array);
          }else{
            callback2("-NO hay turnos para el dia, okey?")
            // console.log("-NO hay turnos para el dia",dia)
            // console.log("-tabla consultada:",mesYAnio)
            // console.log(JSON.stringify(resultSet))
          }
          
          
        },
        (_, error) => {
          console.error("Error en consulta:", error);
        }
      );
    });
  };
  
  export const addHistorial = (cliente, newObjeto) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT objetoHistorial FROM clientes WHERE nombreCliente = ?',
        [cliente],
        (txObj, resultSet) => {
      
          
          if (resultSet.rows.length > 0) {
            console.log("objeto traido de la db:",resultSet.rows.item(0).objetoHistorial)
            let existingObject = JSON.parse(resultSet.rows.item(0).objetoHistorial);
            
            // Verificar si el objeto existente es un array vacío o no tiene un campo arrayField
            if (!Array.isArray(existingObject.arrayField)) {
              existingObject.arrayField = []; // Inicializar como array vacío si no es un array válido
            }
          
            console.warn("****** addHistorial: objeto existente:", JSON.stringify(existingObject));
            console.warn("****** addHistorial: nuevo objeto ", JSON.stringify(newObjeto));
          
            existingObject.push(newObjeto[0]); // Agregar el nuevo objeto al arrayField
          
            const updatedObject = JSON.stringify(existingObject);
            console.warn("****** addHistorial:  objeto resultante", updatedObject);
          //' clientes ( nombreCliente TEXT, objetoDatos TEXT, objetoHistorial TEXT, objetoDetalle TEXT)' 
            tx.executeSql(
              'UPDATE clientes SET objetoHistorial = ? WHERE nombreCliente = ?',
              [updatedObject, cliente],
              (txObj, resultSet) => {
                console.warn('********Nuevo objeto agregado al array correctamente', resultSet);
                if (resultSet.rowsAffected > 0) {
                  console.warn('********Nuevo objeto agregado al array correctamente');
                }
              },
              (error) => {
                console.error('Error al actualizar el objeto: ', error);
              }
            );
          }
          
        },
        (error) => {
          console.error('Error al obtener el objeto: ', error);
        }
      );
    });
  };

  export const deleteHistorial = (cliente, newObjeto) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT objetoHistorial FROM clientes WHERE nombreCliente = ?',
        [cliente],
        (txObj, resultSet) => {
      
          
          if (resultSet.rows.length > 0) {
            console.log("objeto traido de la db:",resultSet.rows.item(0).objetoHistorial)
            let existingObject = JSON.parse(resultSet.rows.item(0).objetoHistorial);
            
            // Verificar si el objeto existente es un array vacío o no tiene un campo arrayField
            if (!Array.isArray(existingObject.arrayField)) {
              existingObject.arrayField = []; // Inicializar como array vacío si no es un array válido
            }
          
            console.warn("****** addHistorial: objeto existente:", JSON.stringify(existingObject));
            console.warn("****** addHistorial: nuevo objeto ", JSON.stringify(newObjeto));
          
            //existingObject.push(newObjeto[0]); // Agregar el nuevo objeto al arrayField
            const nuevoArray = existingObject.filter(obj => {
              // Aquí, define tu lógica para comparar los objetos
              // Devuelve true para mantener el objeto en el nuevo array, y false para excluirlo
              return (
                obj.fecha !== objetoAEliminar.fecha &&
                obj.horario !== objetoAEliminar.horario &&
                obj.servicio !== objetoAEliminar.servicio 
                
              );
            });
          
            const updatedObject = JSON.stringify(nuevoArray);
            console.warn("****** addHistorial:  objeto resultante", updatedObject);
          //' clientes ( nombreCliente TEXT, objetoDatos TEXT, objetoHistorial TEXT, objetoDetalle TEXT)' 
            tx.executeSql(
              'UPDATE clientes SET objetoHistorial = ? WHERE nombreCliente = ?',
              [updatedObject, cliente],
              (txObj, resultSet) => {
                console.warn('********Nuevo objeto agregado al array correctamente', resultSet);
                if (resultSet.rowsAffected > 0) {
                  console.warn('********Nuevo objeto agregado al array correctamente');
                }
              },
              (error) => {
                console.error('Error al actualizar el objeto: ', error);
              }
            );
          }
          
        },
        (error) => {
          console.error('Error al obtener el objeto: ', error);
        }
      );
    });
  };
  
  
  export const addTurnos = (mesandyear, dia,hora, cliente,servicio,descripcion,callback,callback2) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${mesandyear} (dia, cliente, hora, servicio, descripcion) VALUES ( ? , ? , ?, ?, ?);`,
        [dia+'', cliente, hora, servicio, descripcion],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            
            function extractMonthAndYear(inputString) {
              
              const regex = /(\d{1,2})(\d{4})/;
              const match = inputString.match(regex);
                                  
                      if (match) {
                          const month = match[1];
                          const year = match[2];
                          return `${dia}/${month}/${year}`;
                      } else {
                          return 'sin especificar';
                      }
              }
                const fecha = extractMonthAndYear(mesandyear);

          console.warn("cliente",cliente,"objeto a guardar:",[{"fecha":fecha,"horario":hora,"servicio":servicio,"descripcion":descripcion}])
          try {
            addHistorial(cliente, [{ "fecha": fecha,"horario":hora, "servicio": servicio, "descripcion": descripcion }]);
          } catch (error) {
            console.error("Hubo un error:", error);
          }
          
          

            //console.log(JSON.stringify(resultSet))
          
          // actualizamos los datos de los turnos (llamamos a fetchTurnos)
          
              callback();
              
              callback2();
    
            // Resto del código...
          } else {
            console.error("ERROR: se pudieron guardar los datos en la tabla:", mesandyear);
          }
        },(error)=>{
          console.warn("Error:",error)
          console.log("Datos a guardar: ")
          console.log("--tabla: ",mesandyear)
          console.log("--dia: ",dia)
          console.log("--cliente:",cliente)
          console.log("--time:",hora)
        }
      );
    });
    
  }
  
  export const deleteTurno = (tabla, dia, hora, cliente,servicio,callback) => {
  // console.warn("tabla: ",tabla)
  // console.warn("dia: ",dia)
  // console.warn("hora: ",hora)
  
  
    database.transaction(
      (tx) => {
        tx.executeSql(
          `DELETE FROM ${tabla} WHERE dia = ? AND hora = ? ;`,
          [dia+'', hora],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              Alert.alert('Atención', 'Se eliminó el turno', [{ text: 'Ok', onPress: callback }]);
            //COLOCAMOS UN CODIGO PARA ELIMINAR REGISTROS DEL HISTORIAL
              //PREPARAMOS PARA OBTENER LA FECHA
            function extractMonthAndYear(inputString) {
              
              const regex = /(\d{1,2})(\d{4})/;
              const match = inputString.match(regex);
                                  
                      if (match) {
                          const month = match[1];
                          const year = match[2];
                          return `${dia}/${month}/${year}`;
                      } else {
                          return 'sin especificar';
                      }
              }
                const fecha = extractMonthAndYear(mesandyear);

                //CONSULTAMOS LA COLUMNA DE HISTORIAL EN LA TABLA DE CLIENTES
                //enviamos el objeto parcial para eliminar
                deleteHistorial(cliente,{"fecha":fecha,"horario":hora,"servicio":servicio})



            } else {
              console.warn(JSON.stringify(resultSet))
              Alert.alert('Error', 'No se eliminó el turno', [{ text: 'Ok', onPress: callback }]);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };
  
  
  
  
  export const editTurnos = (tabla, dia, hora, cliente,servicio,descripcion,callback,callback2) => {
    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${tabla} SET cliente = ?, servicio = ?, descripcion = ? WHERE dia = ? AND hora = ?`,
        [cliente,servicio,descripcion, dia+'', hora],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            Alert.alert('Atención', 'Se actualizó el turno', [{ text: 'Ok', onPress: () => {
              callback();
            callback2();
            } }]);
          } else {
            Alert.alert('Error', 'No se actualizó el turno', [{ text: 'Ok', onPress: () => {
              callback();
            callback2();
            } }]);
          }
        },(error)=>{
          console.error(error)
        }
      );
    });
  };
  