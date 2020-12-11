import knex from '../../../database';

import { Product } from '../../../types/product';
import { Recommendation } from '../../../types/recommendation';
import { Response } from '../../../types/response';
import { User } from '../../../types/user';

type RecommendationWithUser = Omit<Omit<Recommendation, 'fromUserToken'>, 'productId'> & { user: User, product: Product };
export type RecommendationReadResponse = Response & { recommendations?: Array<RecommendationWithUser> };

const read = async (): Promise<RecommendationReadResponse> => {
  try {
    const response = await knex('recommedation')
      .innerJoin('user', 'recommendation.fromUserToken', 'user.token')
      .innerJoin('product', 'recommendation.productId', 'product.productId')
      .select(
        'recommendationId', 'client', 'phone1', 'phone2', 'createdAt', 'recommendation.status as recommendationStatus',
        'token', 'name', 'phone', 'cpf', 'indicatedBy', 'city', 'state', 'account', 'email', 'user.status as userStatus',
        'product.productId', 'title', 'commission'
      );

    const recommendations = response.map((item) => {
      return ({
        recommendationId: item.recommendationId,
        client: item.client,
        phone1: item.phone1,
        phone2: item.phone2,
        createdAt: item.createdAt,
        status: item.recommendationStatus,

        user: {
          token: item.token,
          name: item.name,
          phone: item.phone,
          cpf: item.cpf,
          indicatedBy: item.indicatedBy,
          city: item.city,
          state: item.state,
          account: item.account,
          email: item.email,
          status: item.userStatus
        },

        product: {
          productId: item.productId,
          title: item.title,
          commission: item.commission
        }
      });
    });

    return ({ code: 'success', recommendations });
  } catch {
    return ({ code: 'error' });
  }
};

export default read;
