const Influx = require('influx');

exports.handler = async (event, context) => {
  // Configurar la conexión a la base de datos
  const client = new Influx.InfluxDB({
    host: '143.244.190.236',
    port: 8086,
    protocol: 'http',
    username: 'omicas',
    password: 'phenosense',
    database: 'sensors'
  });
  
  // Realizar una consulta
  const result = await client.query('SELECT * FROM "MEASUREMENT" LIMIT 10');
  
  // Retornar el resultado
  return result;
};