import knex from '../../../database';
import { Response } from '../../../types/response';

const status = async (recommendationId: number, status: string): Promise<Response> => {
  try {
    await knex('recommendations').where({ recommendationId }).update({ status });
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default status;
