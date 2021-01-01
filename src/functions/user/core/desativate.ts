import knex from '../../../database';
import { Response } from '../../../types/response';

const desativate = async (token: string): Promise<Response> => {
  try {
    await knex('user').where({ token }).update({ status: 0 });
    return ({ code: 'success' });
  } catch (e) {
    console.log(e);
    return ({ code: 'error' });
  }
};

export default desativate;
