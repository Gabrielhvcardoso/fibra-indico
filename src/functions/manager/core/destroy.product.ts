import knex from '../../../database';
import { Response } from '../../../types/response';

const destroy = async (productId: number): Promise<Response> => {
  try {
    await knex('product').where({ productId }).update({ STATUS: 0 });
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default destroy;
