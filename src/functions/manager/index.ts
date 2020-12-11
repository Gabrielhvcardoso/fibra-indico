import rStatus from './core/status.recommendation';
import rRead from './core/read.recommendation';

import uStatus from './core/status.user';
import uRead from './core/read.user';

import wStatus from './core/status.withdraw';
import wRead from './core/read.withdraw';

export default {
  recommendation: {
    read: rRead,
    status: rStatus
  },
  user: {
    read: uRead,
    status: uStatus
  },
  withdraw: {
    read: wRead,
    status: wStatus
  }
};
