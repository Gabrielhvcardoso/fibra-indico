import rStatus from './core/status.recommendation';
import rRead, { RecommendationReadResponse } from './core/read.recommendation';

import uStatus from './core/status.user';
import uRead, { UserReadResponse } from './core/read.user';

import wStatus from './core/status.withdraw';
import wRead, { WithdrawReadResponse } from './core/read.withdraw';

import { Response } from '../../types/response';

interface Props {
  recommendation: {
    read: () => Promise<RecommendationReadResponse>,
    status: (recommedationId: number, status: string) => Promise<Response>
  },
  user: {
    read: (status: number) => Promise<UserReadResponse>,
    status: (token: string, status: number) => Promise<Response>
  },
  withdraw: {
    read: () => Promise<WithdrawReadResponse>,
    status: (withdrawId: number, status: string) => Promise<Response>
  },
}

const manager: Props = {
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

export default manager;
