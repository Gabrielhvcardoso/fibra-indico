import rStatus from './core/status.recomendation';
import uStatus from './core/status.user';
import wStatus from './core/status.withdraw';

export default {
  recommendation: { status: rStatus },
  user: { status: uStatus },
  withdraw: { status: wStatus }
};
