import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

   createDog: {
      body: {
        name: Joi.string().required()
      }
    },
  // POST /api/posts
  createPost: {
    body: {
      title: Joi.string().required(),
    }
  },


  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  updateDog: {
      body: {
        name: Joi.string().required()
      },
      params: {
        dogId: Joi.string().hex().required()
      }
    },
  updateDogOwner: {
      body: {

      }

    },
  // UPDATE /api/posts/:postId
  updatePost: {
    body: {
      title: Joi.string().required(),
    },
    params: {
      postId: Joi.string().hex().required()
    }
  },



  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
