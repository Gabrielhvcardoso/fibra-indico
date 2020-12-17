import rStatus from './core/status.recommendation';
import rRead, { RecommendationReadResponse } from './core/read.recommendation';

import uStatus from './core/status.user';
import uRead, { UserReadResponse } from './core/read.user';

import wStatus from './core/status.withdraw';
import wRead, { WithdrawReadResponse } from './core/read.withdraw';

import pRead, { ProductReadResponse } from './core/read.product';
import pCreate, { NewProduct, ProductCreateResponse } from './core/create.product';
import pUpdate, { NewProduct as UpdateProduct } from './core/update.product';
import pDestroy from './core/destroy.product';

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
  product: {
    read: () => ProductReadResponse,
    create: (product: NewProduct) => Promise<ProductCreateResponse>,
    update: (productId: number, product: UpdateProduct) => Promise<Response>,
    destroy: (productId: number) => Promise<Response>
  }
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
  },
  product: {
    read: pRead,
    create: pCreate,
    update: pUpdate,
    destroy: pDestroy
  }
};

export default manager;
