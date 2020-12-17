import knex from '../../../database';
import { Product } from '../../../types/product';

type ProductReadResponse = Promise<Array<Product>>;

const read = async (): ProductReadResponse => {
  const response: Array<Product> = await knex('product');
  return response;
};

export default read;
