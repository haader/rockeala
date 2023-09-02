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

export const initTablaCompartir = () => {
  console.log("-creando tabla COMPARTIR");
  database.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS compartir (id INTEGER PRIMARY KEY AUTOINCREMENT, textoInicial TEXT, textoFinal TEXT)',
      [],
      (tx) => {
        // La tabla se ha creado con éxito, ahora podemos insertar datos iniciales
        tx.executeSql(
          'INSERT INTO compartir (textoInicial, textoFinal) VALUES (?, ?)',
          ['Dato Inicial 1', 'Resultado 1'],
          (tx) => {
            console.log('Dato Inicial 1 insertado con éxito');
          },
          (error) => {
            console.error('Error al insertar Dato Inicial 1:', error);
          }
        );

        tx.executeSql(
          'INSERT INTO compartir (textoInicial, textoFinal) VALUES (?, ?)',
          ['✂️Peluqueria Rockeala💇Lista de Precios:', 'Cualquier duda consultame!'],
          (tx) => {
            console.log('Dato Inicial 2 insertado con éxito');
          },
          (error) => {
            console.error('Error al insertar Dato Inicial 2:', error);
          }
        );

        // Puedes agregar más inserciones de datos iniciales aquí si es necesario

      },
      (error) => {
        console.error('Error al crear la tabla COMPARTIR:', error);
      }
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






