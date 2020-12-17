import knex from '../../../database';
import { Hierarchy } from '../../../types/hierarchy';
import { Response } from '../../../types/response';

export type NewHierarchy = Omit<Hierarchy, 'hierarchyId'>;
export type HierarchyCreateResponse = Promise<Response & { hierarchyId?: number }>;

const create = async (hierarchy: NewHierarchy): HierarchyCreateResponse => {
  const response = await knex('hierarchy').insert(hierarchy);

  if (!response[0]) {
    return ({ code: 'error' });
  }

  return ({
    code: 'success',
    hierarchyId: response[0]
  });
};

export default create;
