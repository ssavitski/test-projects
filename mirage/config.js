export default function() {

  this.get('/movies', (schema) => {
    return schema.movies.all();
  });

  this.get('/characters', (schema) => {
    return schema.characters.all();
  })
}
