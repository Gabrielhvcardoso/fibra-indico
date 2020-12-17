import knex from '../../../database';
import { Product } from '../../../types/product';
import { Response } from '../../../types/response';

type NewProduct = Omit<Omit<Product, 'productId'>, 'status'>;

interface ProductCreateResponse extends Response {
  productId?: number
}

const create = async (product: NewProduct): Promise<ProductCreateResponse> => {
  const response: Array<number> = await knex('product').insert(product);

  if (!response[0]) {
    return ({ code: 'error' });
  }

  return ({
    code: 'success',
    productId: response[0]
  });
};

export default create;
