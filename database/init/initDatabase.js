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
      'CREATE TABLE IF NOT EXISTS compartir (id INTEGER PRIMARY KEY AUTOINCREMENT, row INTEGER, textoInicial TEXT, textoFinal TEXT)',
      [],
      (obj, resultSet) => {
        console.log("RESULTADO CREATE COMPARTIR:", resultSet);

        // Verificar si ya existe una fila con id igual a 1
        tx.executeSql(
          'SELECT * FROM compartir',
          [],
          (tx, selectResult) => {
            console.log("RESULTADO SELECT * FROM COMPARTIR:", resultSet);
            if (selectResult.rows._array.length === 0) {
              // No existe una fila con id igual a 1, entonces realizamos la inserción
              tx.executeSql(
                'INSERT INTO compartir (textoInicial, textoFinal, row) VALUES (?, ?, ?)',
                [
                  '✂️Peluqueria Rockeala💇 Lista de Precios:',
                  'Cualquier duda consultame!',
                  1
                ],
                (tx) => {
                  console.log('Dato Inicial 1 insertado con éxito');
                },
                (error) => {
                  console.error('Error al insertar Dato Inicial 1:', error);
                }
              );
            } else {
              console.log('La fila con id igual a 1 ya existe, no se realizó la inserción.');
            }
          },
          (error) => {
            console.error('Error al verificar la existencia de la fila con id igual a 1:', error);
          }
        );
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
  if (mesandyear != 'tableundefinedundefined') {

    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${mesandyear} (id INTEGER PRIMARY KEY AUTOINCREMENT, dia TEXT, cliente TEXT, hora TEXT, servicio TEXT, descripcion TEXT)`, []
      );
    });
    console.log("se creo la tabla del mes: ", mesandyear);

  }

}









//TURNOS//TURNOS//TURNOS//TURNOS//TURNOS//TURNOS//TURNOS






