import {Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('dataBasePeluqueria.db');


//funciones para la tabla CLIENTES (add,delete,update,fetch)

export const addClientes=(nombreCliente,callback)=>{
  
  const objetoDatos=
  {
  "adress":"No informado",
  "phone":"000000000",
  "estilista":"Natalia Soledad Romero"
  };
  const objetoHistorial=
    []
  ;
  const objetoDetalle={
    "longitud":"No informado",
    "textura":"No informado",
    "porosidad":"No informado",
    "colorNatural":"No informado",
    "colorDeseado":"No informado",
    "nivelRequerido":"No informado",
    "canas": "No informado",
    "procedimientos": "No informado",
    "altura": "No informado",
    "volumenesUtilizados": "No informado",
    "formulaTinte": "No informado",
    "centimetrosCrecimiento": "No informado",
    "nivelMedios": "No informado",
    "nivelPuntas": "No informado",
    "deseoCliente": "No informado",
    "formulaDecolorante": "No informado",
    "tecnicasUtilizadas": "No informado",
    "tratamientos": "No informado",
    }

  
  
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
          callback()
        } else {
          console.log("No se pudieron guardar los datos en la tabla CLIENTES.");
        }
      },)
    })
  }


  

  export const deleteClientes=(id,name)=>{

    Alert.alert("ATENCION",`desea eliminar de la base de datos a ${name}`,[{text:'Si',onPress:()=>{
      database.transaction((tx)=>{
        tx.executeSql('DELETE FROM clientes WHERE id = ?', [id],
        
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
           Alert.alert(
              'Atención: OPERACIÓN REALIZADA',
              `Se Elimino a ${name}`,
              [{
                  text:'OK',
                  onPress:()=>{},
                  style:'default'
              }]
           ); 
           
          } else {
              Alert.alert('Atencion:ERROR',`No se pudo Eliminar a ${name}`,[{text:'Ok',onPress:()=>{},style:'default'}])
            console.log("No se encontró ninguna fila con el ID proporcionado.",id);
          }
        },
        (error) => {
          console.log("Error al actualizar los datos en la tabla CLIENTES: ", error);
        }


        
        
        
        );
      })
    }},{text:'No',onPress:()=>{}}])
    
  }

  export const updateClientes = (id,nombreCliente,objetoDatos,objetoHistorial,objetoDetalle) => {

    Alert.alert("Atencion","desea guardar los cambios?",
    [
    {
        text:'Si',
        onPress:()=>{
            
          database.transaction((tx) => {
            tx.executeSql(
              //nombreCliente TEXT, objetoDatos TEXT, objetoHistorial TEXT, objetoDetalle TEXT
              'UPDATE clientes SET nombreCliente = ?, objetoDatos = ?, objetoHistorial = ?, objetoDetalle = ? WHERE id = ?',
              [nombreCliente,objetoDatos,objetoHistorial,objetoDetalle, id],
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
          
          
        }

    },
    {
        text:'No',
        onPress:()=>{}
    }
    ])



    

  };
  
//(id INTEGER PRIMARY KEY AUTOINCREMENT, nombreCliente TEXT, objetoDatos TEXT, objetoHistorial TEXT, objetoDetalle TEXT)' 
//traemos los datos de la tabla precios
  export const fetchDatosCliente = (id,callback) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT nombreCliente,objetoDatos,objetoHistorial,objetoDetalle FROM clientes WHERE id = ?', [id], (_, { rows }) => {
        callback(rows._array);
        
      }
      , (tx, error) => {
        console.error("Error en la consulta SQL:", error);
      });
    });
  };

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