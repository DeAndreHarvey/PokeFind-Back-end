
var api = require('pokemon-go-api');
var _ = require('underscore')
const username = '';
const password = '';
const provider = 'google';
var location = 'dublin blvd and donlon way'
var latitude ;
var longitude;
var results = []
// note the immediate function and the object that is returned
module.exports = (function() {
  return {
// notice how index in the factory(client side) is calling the index method(server side)
    login: function(req, res) {
      api.login(username, password, provider)
  .then(function() {
    return api.location.set('address', location)
      .then(api.getPlayerEndpoint);
  })
  .then(_.partial(api.mapData.getByCoordinates, 37.700246, -121.938618))
  .then(function(data) {
    console.log('success',data);
    for ( var y in data){
      if (data[y].wild_pokemon.length > 0){
        for(var x in data[y].wild_pokemon){
          results.push({
            "poke_id": data[y].wild_pokemon[x].pokemon_data.pokemon_id,
            "lat" : data[y].wild_pokemon[x].latitude,
            "long" : data[y].wild_pokemon[x].longitude,
            "time_left" : data[y].wild_pokemon[x].time_till_hidden_ms
          })

        }


      }
    }
    console.log(data);
    res.json(data)
  })
  .catch(function(error) {
    console.log('error', error.stack);
  })


},
search_area: function(req, res) {
  console.log('this is current results ->',results);
  console.log(req.body);
   var latitude = req.body.lat
   var longitude = req.body.lng
  console.log(latitude, longitude);
  api.login(username, password, provider)
  .then(function() {
    return api.location.set('address', req.body.location)
  .then(api.getPlayerEndpoint);
    })
.then(_.partial(api.mapData.getByCoordinates, latitude, longitude))
.then(function(data) {
console.log('success',data);
for ( var y in data){
  console.log(data[y].wild_pokemon);
  if (data[y].wild_pokemon.length > 0){
    for(var x in data[y].wild_pokemon){
      results.push({
        "poke_id": data[y].wild_pokemon[x].pokemon_data.pokemon_id,
        "lat" : data[y].wild_pokemon[x].latitude,
        "long" : data[y].wild_pokemon[x].longitude,
        "time_left" : data[y].wild_pokemon[x].time_till_hidden_ms
      })

    }


  }
}
console.log(results);
res.json(results)
results = []
})
.catch(function(error) {
console.log('error', error.stack);
})


}
  }
})();
