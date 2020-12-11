import knex from '../../../database';

import { Response } from '../../../types/response';
import { Recommendation } from '../../../types/recommendation';

type NewRecommendation = Omit<Recommendation, 'recommendationId'>;

type UserIndicateResponse = Response & { recommendationId?: number };

const indicate = async (recommendation: NewRecommendation): Promise<UserIndicateResponse> => {
  const response: Array<number> = await knex('recommendation').insert(recommendation);

  if (!response[0]) return ({ code: 'error' });

  return ({
    code: 'error',
    recommendationId: response[0]
  });
};

export default indicate;
