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



export const initMes = (mesandyear) => {
  if(mesandyear!='tableundefinedundefined'){

    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${mesandyear} (id INTEGER PRIMARY KEY AUTOINCREMENT, dia TEXT, cliente TEXT, hora TEXT, servicio TEXT, descripcion TEXT)`,[]
      );
    });
    console.log("se creo la tabla del mes: ", mesandyear);

  }
  
}









//TURNOS//TURNOS//TURNOS//TURNOS//TURNOS//TURNOS//TURNOS






