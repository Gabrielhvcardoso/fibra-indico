import knex from '../../../database';
import { Hierarchy } from '../../../types/hierarchy';
import { Response } from '../../../types/response';

export type UpdateHierarchy = Omit<Hierarchy, 'hierarchyId'>;

const update = async (hierarchyId, hierarchy: UpdateHierarchy): Promise<Response> => {
  try {
    await knex('hierarchy').where({ hierarchyId }).update(hierarchy);
    return ({ code: 'success' });
  } catch {
    return ({ code: 'error' });
  }
};

export default update;
