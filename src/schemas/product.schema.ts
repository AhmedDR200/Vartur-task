import { FastifySchema } from 'fastify';

const productProperties = {
  id: { type: 'number' },
  name: { type: 'string', minLength: 1 },
  price: { type: 'number', minimum: 0 },
  categoryId: { type: 'number' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' }
};

const categoryProperties = {
  id: { type: 'number' },
  name: { type: 'string' },
  parentId: { type: 'number', nullable: true }
};

const productResponseSchema = {
  type: 'object',
  properties: {
    ...productProperties,
    category: {
      type: 'object',
      properties: categoryProperties
    }
  }
};

export const getProductsSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: productResponseSchema
    }
  }
};

export const getProductSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', pattern: '^\d+$' }
    }
  },
  response: {
    200: productResponseSchema,
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export const createProductSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['name', 'price', 'categoryId'],
    properties: {
      name: { type: 'string', minLength: 1 },
      price: { type: 'number', minimum: 0 },
      categoryId: { type: 'number' }
    }
  },
  response: {
    201: productResponseSchema
  }
};

export const updateProductSchema: FastifySchema = {
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
      name: { type: 'string', minLength: 1 },
      price: { type: 'number', minimum: 0 },
      categoryId: { type: 'number' }
    },
    minProperties: 1
  },
  response: {
    200: productResponseSchema,
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export const deleteProductSchema: FastifySchema = {
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