import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Dog Schema
 */
const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String
  },
  sex: {
      type: String
  },
  weight: {
      type: String
   },
  location: {
      type: String
   },
  owner:[{name:{type:String},sex:{type:String},address:{type:String}}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
DogSchema.method({
});

/**
 * Statics
 */
DogSchema.statics = {
  /**
   * Get dog
   * @param {ObjectId} id - The objectId of dog.
   * @returns {Promise<Dog, APIError>}
   */
  get(id) {
    console.log("abc");
    return this.findById(id)
      .exec()
      .then((dog) => {
        if (dog) {
          return dog;
        }
        const err = new APIError('No such dog exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List dogs in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of dogs to be skipped.
   * @param {number} limit - Limit number of dogs to be returned.
   * @returns {Promise<Dog[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef dog
 */
export default mongoose.model('Dog', DogSchema);
