import knex from '../../../database';
import { Response } from '../../../types/response';

const destroy = async (token: string): Promise<Response> => {
  try {
    await knex('user').where({ token }).del();
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default destroy;
