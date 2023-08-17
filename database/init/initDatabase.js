import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('dataBasePeluqueria.db');

export const initTablaPrecios = () => {
  console.log("-creando tabla PRECIOS");
database.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS precios (id INTEGER PRIMARY KEY AUTOINCREMENT, servicio TEXT, precio TEXT)'
  );
});
};

export const initTablaStock = () => {
  console.log("-creando tabla STOCK");
database.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS stock (id INTEGER PRIMARY KEY AUTOINCREMENT, cantidad TEXT, producto TEXT, precioUnitario TEXT)' 
  );
});
};

export const initTablaGastos = () => {
  console.log("-creando tabla GASTOS");
database.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS gastos (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT, descripcion TEXT, valor TEXT)' 
  );
});
};

export const initTablaClientes = () => {
  console.log("-creando tabla CLIENTES");
database.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombreCliente TEXT, objetoDatos TEXT, objetoHistorial TEXT, objetoDetalle TEXT)' 
  );
});
};

//mesandyear mes y año juntos agosto2023
export const initMes=(mesandyear)=>{
    database.transaction((tx)=>{
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ? (id INTEGER PRIMARY KEY AUTOINCREMENT, dia TEXT, cliente TEXT, hora TEXT)',[mesandyear] 
            );
    })
    console.log("se creo la tabla del mes: ",mesandyear)
}

//mesandyear mes y año juntos agosto2023
export const fetchTurnos=(mesandyear,dia,callback)=>{
  database.transaction((tx)=>{
      tx.executeSql(
          'SELECT * FROM ? WHERE dia = ?',[mesandyear,dia],(_, { rows }) => {
            callback(rows._array);
          } 
          );
  })
  console.log("-se ENVIO los datos de la TABLA: ",mesandyear)
}


//mesandyear mes y año juntos agosto2023
export const addTurnos=(mesandyear,dia,cliente,hora)=>{
  database.transaction((tx)=>{
      tx.executeSql(
          'INSERT ? value (dia,cliente,hora)',[mesandyear,dia,cliente,hora],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              console.log("Se guardaron los datos en la tabla: ",mesandyear," (-Día: ",dia,")"," (-Cliente: ",cliente,")"," (-Hora: ",hora,")");
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
              console.log("No se pudieron guardar los datos en la tabla:",mesandyear);
            }
          }
          );
  })
  console.log("-se ENVIO los datos de la TABLA: ",mesandyear)
}

