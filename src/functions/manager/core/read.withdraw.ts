import knex from '../../../database';
import { User } from '../../../types/user';
import { Response } from '../../../types/response';
import { WithdrawOrder } from '../../../types/withdrawOrder';

type WithdrawOrderWithUser = Omit<WithdrawOrder, 'fromUserToken'> & { user: User };
type WithdrawReadResponse = Response & { withdrawOrders?: Array<WithdrawOrderWithUser> };

const read = async (): Promise<WithdrawReadResponse> => {
  try {
    const response = await knex('withdrawOrder')
      .innerJoin('user', 'withdrawOrder.fromUserToken', 'user.token')
      .select('withdrawOrderId', 'amount', 'withdraw.status as withdrawStatus', 'createdAt', 'method', 'token', 'name', 'phone', 'cpf', 'indicatedBy', 'city', 'state', 'account', 'email', 'user.status as userStatus');

    const withdrawOrders: Array<WithdrawOrderWithUser> = response.map((item) => {
      return ({
        withdrawOrderId: item.withdrawOrderId,
        amount: item.amount,
        status: item.withdrawStatus,
        createdAt: item.createdAt,
        method: item.method,
        user: {
          token: item.token,
          name: item.name,
          phone: item.phone,
          cpf: item.cpf,
          indicatedBy: item.indicatedBy,
          city: item.city,
          state: item.state,
          account: item.account,
          email: item.email,
          status: item.userStatus
        }
      });
    });

    return ({ code: 'success', withdrawOrders });
  } catch {
    return ({ code: 'error' });
  }
};

export default read;
