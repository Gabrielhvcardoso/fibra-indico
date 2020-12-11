import rRead from './recommendations/read';
import rStatus from './recommendations/status';
import uRead from './users/read';
import uStatus from './users/status';
import wRead from './withdraws/read';
import wStatus from './withdraws/status';

const recommendations = {
  read: rRead,
  status: rStatus
};

const users = {
  read: uRead,
  status: uStatus
};

const withdraws = {
  read: wRead,
  status: wStatus
};

export {
  recommendations,
  users,
  withdraws
};
