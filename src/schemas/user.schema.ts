import { FastifySchema } from 'fastify';

const userProperties = {
  id: { type: 'number' },
  username: { type: 'string', minLength: 1 },
  role: { type: 'string', enum: ['user', 'admin'] },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' }
};

export const getUsersSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: userProperties
      }
    }
  }
};

export const getUserSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', pattern: '^\d+$' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: userProperties
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export const createUserSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 6 },
      role: { type: 'string', enum: ['user', 'admin'] }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: userProperties
    }
  }
};

export const updateUserSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', pattern: '^\d+$' }
    }
  },
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 6 },
      role: { type: 'string', enum: ['user', 'admin'] }
    },
    minProperties: 1
  },
  response: {
    200: {
      type: 'object',
      properties: userProperties
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export const deleteUserSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', pattern: '^\d+$' }
    }
  },
  response: {
    204: {
      type: 'null'
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
}; 