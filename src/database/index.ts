import knexmodules from 'knex';
import knexfile from './knexfile';

const knex = knexmodules(knexfile);

export default knex;
