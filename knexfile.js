// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lessons.db3'
    },
    //pool es el código para la relación entre la child tabla y la tabla padre
    pool: {
      afterCreate: (conn, done) =>{
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  
};
