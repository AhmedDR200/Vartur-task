import { FastifySchema } from 'fastify';

const categoryProperties = {
  id: { type: 'number' },
  name: { type: 'string', minLength: 1 },
  parentId: { type: 'number', nullable: true },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' }
};

const productCountSchema = {
  type: 'object',
  properties: {
    products: { type: 'number' }
  }
};

const categoryResponseSchema = {
  type: 'object',
  properties: {
    ...categoryProperties,
    _count: productCountSchema,
    subcategories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...categoryProperties,
          _count: productCountSchema
        }
      }
    }
  }
};

export const getCategoriesSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: categoryResponseSchema
    }
  }
};

export const getCategorySchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', pattern: '^\d+$' }
    }
  },
  response: {
    200: categoryResponseSchema,
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export const createCategorySchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1 },
      parentId: { type: 'number', nullable: true }
    }
  },
  response: {
    201: categoryResponseSchema
  }
};

export const updateCategorySchema: FastifySchema = {
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
      parentId: { type: 'number', nullable: true }
    },
    minProperties: 1
  },
  response: {
    200: categoryResponseSchema,
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export const deleteCategorySchema: FastifySchema = {
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