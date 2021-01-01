import knex from '../../../database';
import { Product } from '../../../types/product';

export type ProductReadResponse = Promise<Array<Product>>;

const read = async (): ProductReadResponse => {
  const response: Array<Product> = await knex('product').where({ STATUS: 1 });
  return response;
};

export default read;
