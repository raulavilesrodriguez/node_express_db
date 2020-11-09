
exports.up = function(knex) {
 return knex.schema.createTable('lessons', tbl =>{
     tbl.increments() //'id' field
     tbl.text('name', 128)
        .notNullable()
     tbl.timestamps(true, true)   
 })
 .createTable('messages', tbl=>{
     tbl.increments() //id field
     tbl.string('sender')
        .notNullable()
        .index()
     tbl.text('text')
        .notNullable()
     tbl.timestamps(true, true)

     //Foreing key info a la tabla lessons
     tbl.integer('lesson_id')
        .unsigned()
        .references('id')
        .inTable('lessons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
 }) 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons')
};
