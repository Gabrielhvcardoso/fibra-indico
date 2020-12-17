/* eslint-disable camelcase */
import knex from '../../../database';
import { Response } from '../../../types/response';

const update = async (admin_secret: string, email: string, password: string): Promise<Response> => {
  try {
    await knex('auth').update({ email, password }).where({ admin_secret });
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default update;
