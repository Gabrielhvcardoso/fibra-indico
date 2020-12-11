import knex from '../../../database';
import { Response } from '../../../types/response';

const status = async (token: string, status: number): Promise<Response> => {
  try {
    await knex('user').where({ token }).update({ status });
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default status;
