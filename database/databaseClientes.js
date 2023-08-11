import {Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('dataBasePeluqueria.db');


//funciones para la tabla CLIENTES (add,delete,update,fetch)

export const addClientes=(nombreCliente,objetoDatos,objetoHistorial,objetoDetalle)=>{
    database.transaction((tx)=>{
      tx.executeSql('INSERT INTO clientes (nombreCliente, objetoDatos, objetoHistorial, objetoDetalle) values  (?,?,?,?)', 
      
      [nombreCliente,JSON.stringify(objetoDatos), JSON.stringify(objetoHistorial), JSON.stringify(objetoDetalle)],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          console.log("Se guardaron los datos en la tabla Clientes (-nombre: ",nombreCliente,")");
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
          console.log("No se pudieron guardar los datos en la tabla CLIENTES.");
        }
      },)
    })
  }

  export const deleteClientes=(id)=>{

    database.transaction((tx)=>{
      tx.executeSql('DELETE FROM clientes WHERE id = ?', [id]);
    })
  }

  export const updateClientes = (id,nombreCliente,objetoDatos,objetoHistorial,objetoDetalle) => {

    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE clientes SET fecha = ?, descripcion = ?, valor = ? WHERE id = ?',
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
           console.log("Se actualizaron los datos en la tabla CLIENTES para el ID: ", id);
          } else {
              Alert.alert('Atencion','No se actualizaron los datos',[{text:'Ok',onPress:()=>{},style:'default'}])
            console.log("No se encontró ninguna fila con el ID proporcionado.",id);
          }
        },
        (error) => {
          console.log("Error al actualizar los datos en la tabla CLIENTES: ", error);
        }
      );
    });

    


  };
  
//(id INTEGER PRIMARY KEY AUTOINCREMENT, nombreCliente TEXT, objetoDatos TEXT, objetoHistorial TEXT, objetoDetalle TEXT)' 
//traemos los datos de la tabla precios
  export const fetchClientes = (callback) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT id,nombreCliente FROM clientes', [], (_, { rows }) => {
        callback(rows._array);
      });
    });
  };

  export const fetchAllClientes = (callback) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM clientes', [], (_, { rows }) => {
        callback(rows._array);
      });
    });
  };


  //ZONA DE PELIGRO

export const dropTableClientes = () => {
  Alert.alert('Atención Zona de PELIGRO','desea borrar la tabla clientes?',[{text:'Si',onPress:()=>{
    
      console.log("-eliminando tabla CLIENTES");
      database.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS clientes');
    });
    
  }},{
    text:'No',
    onPress:()=>{}
  }])
    
};


export const deleteTableClientes = () => {
    console.log("-vaciando tabla CLIENTES");
  database.transaction((tx) => {
        tx.executeSql('DELETE TABLE IF EXISTS clientes');
});
};