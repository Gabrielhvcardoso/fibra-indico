import knex from '../../../database';
import { Response } from '../../../types/response';

const destroy = async (hierarchyId: number): Promise<Response> => {
  try {
    await knex('hierarchy').where({ hierarchyId }).del();
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default destroy;
