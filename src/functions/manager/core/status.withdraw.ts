import knex from '../../../database';

import { Response } from '../../../types/response';

const status = async (withdrawOrderId: number, status: string): Promise<Response> => {
  try {
    await knex('withdrawOrder').where({ withdrawOrderId }).update({ status });
    return ({ code: 'success' });
  } catch (e) {
    console.log(e);
    return ({ code: 'error' });
  }
};

export default status;
