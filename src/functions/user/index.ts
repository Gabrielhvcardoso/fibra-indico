import create, { NewUser, UserCreateResponse } from './core/create';
import read, { UserReadResponse } from './core/read';
import update from './core/update';
import destroy from './core/destroy';
import auth, { UserAuthResponse } from './core/auth';
import account, { AccountResponse, CreateOrUpdateAccount } from './core/account';
import history, { UserHistoryResponse } from './core/history';
import withdraw, { UserWithdrawResponse } from './core/withdraw';
import indicate, { NewRecommendation, UserIndicateResponse } from './core/indicate';

import readAccount from './core/read.account';
import readRecommendation, { UserReadRResponse } from './core/read.recommendation';
import readWithdraw, { UserReadWResponse } from './core/read.withdraw';

import { User } from '../../types/user';
import { Response } from '../../types/response';
import { Account } from '../../types/account';

interface Props {
  account: (data: CreateOrUpdateAccount) => Promise<AccountResponse>,
  create: (user: NewUser) => Promise<UserCreateResponse>,
  read: (token: string) => Promise<UserReadResponse>,
  update: (token: string, user: User) => Promise<Response>,
  destroy: (token: string) => Promise<Response>,
  auth: (login: string, password: string) => Promise<UserAuthResponse>,
  history: (token: string) => Promise<UserHistoryResponse>,
  withdraw: (token: string, amount: number) => Promise<UserWithdrawResponse>,
  indicate: (recommendation: NewRecommendation) => Promise<UserIndicateResponse>,
  readAccount: (token: string) => Promise<Account | null>,
  readRecommendation: (token: string) => Promise<UserReadRResponse>,
  readWithdraw: (token: string) => Promise<UserReadWResponse>
}

export const user: Props = {
  account,
  create,
  read,
  update,
  destroy,
  auth,
  history,
  withdraw,
  indicate,
  readAccount,
  readRecommendation,
  readWithdraw
};

export default user;
