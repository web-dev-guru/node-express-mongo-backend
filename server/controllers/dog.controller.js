import Dog from '../models/dog.model';
var request = require('request');
/**
 * Load dog and append to req.
 */
function load(req, res, next, id) {
  Dog.get(id)
    .then((dog) => {
      req.dog = dog; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}
/**
 * Get dog
 * @returns {Dog}
 */
function get(req, res) {
 console.log('eeeeeeeeeeeeeeeeeeeee');
  return res.json(req.dog);
}
/**
 * Call another service to retrieve image
 * @returns image or error if not found
 */
function getImage(req,res){
  console.log("breed is "+req.dog.breed)
   request(' https://dog.ceo/api/breed/'+req.dog.breed+'/images/random', function (error, response, body) {
     console.log('body:', body); // Print the HTML for the Google homepage.
     if(body.status==='404'){
        res.status(404)        // HTTP status 404: NotFound
             .send('Dog Image is not found');
     }else{
        console.log(body);

        res.status(200)        // HTTP status 404: NotFound
                 .send('Dog Image is found');
     }
   });

}
/**
 * Create new dog
 * @property {string} req.body.name - The name of dog.
 * @property {string} req.body.breed - The mobileNumber of dog.
 * @returns {Dog}
 */
function create(req, res, next) {
  const dog = new Dog({
    name: req.body.name,
    breed: req.body.breed,
    sex:  req.body.sex,
    weight : req.body.weight,
    location : req.body.location,
    owner: req.body.owners
  });

  dog.save()
    .then(savedDog => res.json(savedDog))
    .catch(e => next(e));
}

/**
 * Update existing dog
 * @property {string} req.body.ame - The name of dog.
 * @property {string} req.body.breed - The breed of dog.
 * @returns {Dog}
 */
function update(req, res, next) {
  const dog = req.dog;
  dog.name = req.body.name;
  dog.breed = req.body.breed;
  dog.sex = req.body.sex;
  dog.weight = req.body.weight;
  dog.location = req.body.location;
  dog.owner = req.body.owners;
  dog.save()
    .then(savedDog => res.json(savedDog))
    .catch(e => next(e));
}


function updateOwnerById(req, res, next) {
  console.log("get into the update OwnerById");
  const dog = req.dog;
  dog.owner = req.body.owners;
  dog.save()
    .then(savedDog => res.json(savedDog))
    .catch(e => next(e));
}

function addOwnerById(req, res, next) {
  console.log("get into the update OwnerById");
  const dog = req.dog;
  dog.owner = req.body.owners;
  dog.save()
    .then(savedDog => res.json(savedDog))
    .catch(e => next(e));
}
/**
 * Get dog list.
 * @property {number} req.query.skip - Number of dogs to be skipped.
 * @property {number} req.query.limit - Limit number of dogs to be returned.
 * @returns {Dog[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Dog.list({ limit, skip })
    .then(dogs => res.json(dogs))
    .catch(e => next(e));
}

/**
 * Delete dog.
 * @returns {Dog}
 */
function remove(req, res, next) {
  const dog = req.dog;
  dog.remove()
    .then(deletedDog => res.json(deletedDog))
    .catch(e => next(e));
}

function removeOwnerById(req, res, next) {
  const dog = req.dog;
  dog.owner = [];
    dog.save()
      .then(savedDog => res.json(savedDog))
      .catch(e => next(e));
}
function getOwnersById(req,res,next){
  return res.json(req.dog.owner);
}
export default { load, get, create, update, list, remove ,getImage,getOwnersById,updateOwnerById,removeOwnerById};
