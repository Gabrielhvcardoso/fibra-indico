import rRead from './recommendations/read';
import rStatus from './recommendations/status';
import uRead from './users/read';
import uReadStatus from './users/readStatus';
import uReadNews from './users/readNews';
import uStatus from './users/status';
import wRead from './withdraws/read';
import wStatus from './withdraws/status';

import relationships from './users/relationship';
import resetPassword from './users/resetpassword';

import authAuth from './auth/auth';
import authCreate from './auth/create';
import authUpdate from './auth/update';

import pRead from './product/read';
import pCreate from './product/create';
import pUpdate from './product/update';
import pDestroy from './product/destroy';

import hRead from './hierarchies/read';
import hCreate from './hierarchies/create';
import hUpdate from './hierarchies/update';
import hDestroy from './hierarchies/destroy';

const auth = {
  auth: authAuth,
  create: authCreate,
  update: authUpdate
};

const hierarchies = {
  read: hRead,
  create: hCreate,
  update: hUpdate,
  destroy: hDestroy
};

const products = {
  read: pRead,
  create: pCreate,
  update: pUpdate,
  destroy: pDestroy
};

const recommendations = {
  read: rRead,
  status: rStatus
};

const users = {
  read: uRead,
  readNews: uReadNews,
  readStatus: uReadStatus,
  status: uStatus,
  relationships,
  resetPassword
};

const withdraws = {
  read: wRead,
  status: wStatus
};

export {
  auth,
  hierarchies,
  products,
  recommendations,
  users,
  withdraws
};
