import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import dogCtrl from '../controllers/dog.controller';

const router = express.Router(); // eslint-disable-line new-cap
router.param('dogId', dogCtrl.load);
router.route('/')
  /** GET /api/doss - Get list of dogs */
  .get(dogCtrl.list)

  /** POST /api/dogs - Create new dogs */
  .post(validate(paramValidation.createDog), dogCtrl.create);

router.route('/:dogId')
  /** GET /api/dogs/:dogId - Get dog */
  .get(dogCtrl.get)

  /** PUT /api/dogs/:dogId - Update dog */
  .put(validate(paramValidation.updateDog), dogCtrl.update)

  /** DELETE /api/dogs/:dogId - Delete dog */
  .delete(dogCtrl.remove);


/** Load dog when API with dogId route parameter is hit */


router.route('/:dogId/image')
  .get(dogCtrl.getImage);

router.route('/:dogId/owner')
  .get(dogCtrl.getOwnersById)
  .put((validate(paramValidation.updateDogOwner), dogCtrl.updateOwnerById))
  .delete(dogCtrl.removeOwnerById);
export default router;
