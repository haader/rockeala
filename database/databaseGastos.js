import {Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('dataBasePeluqueria.db');


//funciones para la tabla GASTOS (add,delete,update,fetch)
export const addGastos=(fecha,descripcion,valor)=>{
    database.transaction((tx)=>{
      tx.executeSql('INSERT INTO gastos (fecha, descripcion, valor) values  (?,?,?)', [fecha,descripcion,valor],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          console.log("Se guardaron los datos en la tabla GASTOS: -fecha: ",fecha," -descripcion: ",descripcion," -valor: ",valor);
          // Mostrar una alerta indicando que los datos se han guardado correctamente
          Alert.alert(
            'Datos guardados',
            'Los datos se han guardado correctamente en la base de datos.',
            [
              {
                text: 'OK',
                onPress: () => console.log('Alerta cerrada'),
                style: 'default',
              },
            ]
          );
        } else {
          console.log("No se pudieron guardar los datos en la tabla GASTOS.");
        }
      },)
    })
  }

  export const deleteGastos=(id)=>{

    database.transaction((tx)=>{
      tx.executeSql('DELETE FROM gastos WHERE id = ?', [id]);
    })
  }

  export const updateGastos = (id,fecha,descripcion,valor) => {

    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE gastos SET fecha = ?, descripcion = ?, valor = ? WHERE id = ?',
        [fecha,descripcion,valor, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
           Alert.alert(
              'Atención',
              'Se actualizaron los datos',
              [{
                  text:'OK',
                  onPress:()=>{},
                  style:'default'
              }]
           ); 
           console.log("Se actualizaron los datos en la tabla GASTOS para el ID: ", id);
          } else {
              Alert.alert('Atencion','No se actualizaron los datos',[{text:'Ok',onPress:()=>{},style:'default'}])
            console.log("No se encontró ninguna fila con el ID proporcionado.",id);
          }
        },
        (error) => {
          console.log("Error al actualizar los datos en la tabla GASTOS: ", error);
        }
      );
    });

    


  };
  

//traemos los datos de la tabla precios
  export const fetchGastos = (callback) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM gastos', [], (_, { rows }) => {
        callback(rows._array);
      });
    });
  };


  //ZONA DE PELIGRO

export const dropTableGastos = () => {
    console.log("-eliminando tabla GASTOS");
  database.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS gastos');
});
};


export const deleteTableGastos = () => {
    console.log("-vaciando tabla GASTOS");
  database.transaction((tx) => {
        tx.executeSql('DELETE TABLE IF EXISTS gastos');
});
};