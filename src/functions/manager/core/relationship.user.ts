import knex from '../../../database';
import { Hierarchy } from '../../../types/hierarchy';
import { User } from '../../../types/user';

export type UserTree = User & { children?: UserTree };

function listToTree (list: Array<User & { children?: any }>): Array<UserTree> {
  const map = {};
  const roots = [];

  let node: User;
  let i: number;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].token] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.indicatedBy !== '') {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.indicatedBy]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

const relationship = async (token: string): Promise<Array<UserTree>> => {
  const hierarchies: Array<Hierarchy> = await knex('hierarchy');
  const user: User = (await knex('user').where({ token }))[0];

  const depth = hierarchies.length;
  let done: Array<User> = [];
  let todo: Array<User> = [user];

  for (let i = 0; i < depth; i++) {
    const children: Array<User> = await knex('user').whereIn('indicatedBy', todo.map(item => item.token));
    done = [...done, ...todo];
    todo = children;
  }

  const response = listToTree(done);
  return response;
};

export default relationship;
