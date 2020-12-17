import knex from '../../../database';
import { Product } from '../../../types/product';
import { Response } from '../../../types/response';

export type NewProduct = Omit<Product, 'productId'>;

const update = async (productId: number, product: NewProduct): Promise<Response> => {
  try {
    await knex('product').where({ productId }).update(product);
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default update;
