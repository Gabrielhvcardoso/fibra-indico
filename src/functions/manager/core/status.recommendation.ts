import knex from '../../../database';
import { Product } from '../../../types/product';
import { Recommendation } from '../../../types/recommendation';
import { Response } from '../../../types/response';
import { User } from '../../../types/user';

const status = async (recommendationId: number, status: string): Promise<Response> => {
  try {
    if (status === 'done') {
      const recommendation: Recommendation = (await knex('recommendation').where({ recommendationId }))[0];
      const product: Product = (await knex('product').where({ productId: recommendation.productId }))[0];
      const user: User = (await knex('user').where({ token: recommendation.fromUserToken }))[0];

      const nextAccount = user.account + product.commission;

      await knex('recommendation').where({ recommendationId }).update({ status });
      await knex('user').where({ token: recommendation.fromUserToken }).update({ account: nextAccount });
      return ({ code: 'success' });
    } else {
      await knex('recommendation').where({ recommendationId }).update({ status });
      return ({ code: 'success' });
    }
  } catch {
    return ({ code: 'error' });
  }
};

export default status;
