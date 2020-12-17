import knex from '../../../database';
import { Hierarchy } from '../../../types/hierarchy';

export type HierarchyReadResponse = Promise<Array<Hierarchy>>;

const read = async (): HierarchyReadResponse => {
  const response: Array<Hierarchy> = await knex('hierarchy');
  return response;
};

export default read;
