import knex from '../../../database';

import { Response } from '../../../types/response';

const status = async (withdrawId: number, status: string): Promise<Response> => {
  try {
    await knex('withdrawOrder').where({ withdrawId }).update({ status });
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default status;
