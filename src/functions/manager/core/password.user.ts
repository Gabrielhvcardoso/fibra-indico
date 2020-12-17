import knex from '../../../database';
import { Response } from '../../../types/response';

const passwordReset = async (token: string, password: string): Promise<Response> => {
  try {
    await knex('user').where({ token }).update({ password });
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default passwordReset;
