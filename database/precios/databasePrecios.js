import {Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('dataBasePeluqueria.db');


export const fetchCompartir = (callback) => {
  database.transaction((tx) => {
    tx.executeSql('SELECT * FROM compartir', [], (_, { rows }) => {
      callback(rows._array);
    });
  });
};

export const updateCompartir=(texto1,texto2,callback)=>{
  database.transaction((tx)=>{
    tx.executeSql(
      `UPDATE compartir SET textoInicial = ?, textoFinal = ? WHERE row = 1`,[texto1,texto2],
      (obj,resultSet)=>{
        if(resultSet.rowsAffected>0){
          callback
        }
      },error=>{console.error("update error: ",error)}
    )
    } 
  )
}

//funciones para la tabla PRECIOS (add,delete,update,fetch)
export const addPrecios=(servicio,precio)=>{
    database.transaction((tx)=>{
      tx.executeSql('INSERT INTO precios (servicio, precio) values  (?,?)', [servicio,precio],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          console.log("Se guardaron los datos en la tabla PRECIOS SERVICIO: ", servicio, "PRECIO: ", precio);
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
          console.log("No se pudieron guardar los datos en la tabla PRECIOS.");
        }
      },)
    })
  }

  export const deletePrecios=(id)=>{

    database.transaction((tx)=>{
      tx.executeSql('DELETE FROM precios WHERE id = ?', [id]);
    })
  }

  export const updatePrecios = (id, servicio, precio) => {

    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE precios SET servicio = ?, precio = ? WHERE id = ?',
        [servicio, precio, id],
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
           console.log("Se actualizaron los datos en la tabla PRECIOS para el ID: ", id);
          } else {
              Alert.alert('Atencion','No se actualizaron los datos',[{text:'Ok',onPress:()=>{},style:'default'}])
            console.log("No se encontró ninguna fila con el ID proporcionado.",id);
          }
        },
        (error) => {
          console.log("Error al actualizar los datos en la tabla PRECIOS: ", error);
        }
      );
    });

    


  };
  

//traemos los datos de la tabla precios
  export const fetchPrecios = (callback) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM precios', [], (_, { rows }) => {
        callback(rows._array);
      });
    });
  };


  //ZONA DE PELIGRO

export const dropTablePrecios = () => {
    console.log("-eliminando tabla PRECIOS");
  database.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS precios');
});
};


export const deleteTablePrecios = () => {
    console.log("-vaciando tabla PRECIOS");
  database.transaction((tx) => {
        tx.executeSql('DELETE TABLE IF EXISTS precios');
});
};