import create, { NewUser, UserCreateResponse } from './core/create';
import read, { UserReadResponse } from './core/read';
import update from './core/update';
import destroy from './core/destroy';
import auth, { UserAuthResponse } from './core/auth';
import history, { UserHistoryResponse } from './core/history';
import withdraw, { UserWithdrawResponse } from './core/withdraw';
import indicate, { NewRecommendation, UserIndicateResponse } from './core/indicate';

import { User } from '../../types/user';
import { Response } from '../../types/response';

interface Props {
  create: (user: NewUser) => Promise<UserCreateResponse>,
  read: (token: string) => Promise<UserReadResponse>,
  update: (token: string, user: User) => Promise<Response>,
  destroy: (token: string) => Promise<Response>,
  auth: (login: string, password: string) => Promise<UserAuthResponse>,
  history: (token: string) => Promise<UserHistoryResponse>,
  withdraw: (token: string, amount: number) => Promise<UserWithdrawResponse>,
  indicate: (recommendation: NewRecommendation) => Promise<UserIndicateResponse>
}

export const user: Props = {
  create,
  read,
  update,
  destroy,
  auth,
  history,
  withdraw,
  indicate
};

export default user;
