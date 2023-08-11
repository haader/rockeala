import {Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('dataBasePeluqueria.db');


//funciones para la tabla STOCK (add,delete,update,fetch)
export const addStock=(cantidad,producto,precioUnitario)=>{
    database.transaction((tx)=>{
      tx.executeSql('INSERT INTO stock (cantidad, producto, precioUnitario) values  (?,?,?)', [cantidad,producto,precioUnitario],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          console.log("Se guardaron los datos en la tabla STOCK: -Cantidad: ",cantidad,"-Producto: ",producto,"Precio Unitario: ",precioUnitario);
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
          console.log("No se pudieron guardar los datos en la tabla STOCK.");
        }
      },)
    })
  }

  export const deleteStock=(id)=>{

    database.transaction((tx)=>{
      tx.executeSql('DELETE FROM stock WHERE id = ?', [id]);
    })
  }

  export const updateStock = (id,cantidad,producto,precioUnitario) => {

    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE stock SET cantidad = ?, producto = ?, precioUnitario = ? WHERE id = ?',
        [cantidad,producto,precioUnitario, id],
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
           console.log("Se actualizaron los datos en la tabla STOCK para el ID: ", id);
          } else {
              Alert.alert('Atencion','No se actualizaron los datos',[{text:'Ok',onPress:()=>{},style:'default'}])
            console.log("No se encontró ninguna fila con el ID proporcionado.",id);
          }
        },
        (error) => {
          console.log("Error al actualizar los datos en la tabla STOCK: ", error);
        }
      );
    });

    


  };
  

//traemos los datos de la tabla precios
  export const fetchStock = (callback) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM stock', [], (_, { rows }) => {
        callback(rows._array);
      });
    });
  };


  //ZONA DE PELIGRO

export const dropTableStock = () => {
    console.log("-eliminando tabla STOCK");
  database.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS stock');
});
};


export const deleteTableStock = () => {
    console.log("-vaciando tabla STOCK");
  database.transaction((tx) => {
        tx.executeSql('DELETE TABLE IF EXISTS stock');
});
};