import knex from '../../../database';
import { Hierarchy } from '../../../types/hierarchy';
import { Product } from '../../../types/product';
import { Recommendation } from '../../../types/recommendation';
import { Response } from '../../../types/response';
import { User } from '../../../types/user';

const status = async (recommendationId: number, status: string): Promise<Response> => {
  try {
    if (status === 'done') {
      const hierarchies: Array<Hierarchy> = (await knex('hierarchy')).sort((a, b) => a.depth - b.depth);
      const recommendation: Recommendation = (await knex('recommendation').where({ recommendationId }))[0];
      const product: Product = (await knex('product').where({ productId: recommendation.productId }))[0];
      const user: User = (await knex('user').where({ token: recommendation.fromUserToken }))[0];

      const commission = product.commission;

      await knex('recommendation').where({ recommendationId }).update({ status });

      const depth = hierarchies.length;

      let done = [];
      let todo = [user];

      for (let i = 0; i <= depth; i++) {
        todo.forEach(async (item) => {
          const increaseAmount = i === 0
            ? commission
            : commission * (hierarchies[i - 1].porcentage / 100);

          console.log(`${i} - ${increaseAmount}`);

          const newAccount = item.account + increaseAmount;
          await knex('user').where({ token: item.token }).update({ account: newAccount });
        });

        const children: Array<User> = await knex('user').whereIn('indicatedBy', todo.map(item => item.token));

        done = [...done, ...todo];
        todo = children;
      }

      return ({ code: 'success' });
    } else {
      await knex('recommendation').where({ recommendationId }).update({ status });
      return ({ code: 'success' });
    }
  } catch (e) {
    console.log(e);
    return ({ code: 'error' });
  }
};

export default status;
