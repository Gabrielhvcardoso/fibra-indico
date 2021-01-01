/* eslint-disable camelcase */
import knex from '../../../database';
import { Response } from '../../../types/response';

const ative = async (token: string): Promise<Response> => {
  try {
    await knex('user').update({ new: 0, status: 1 }).where({ token });
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default ative;
