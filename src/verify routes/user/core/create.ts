import { Request, Response } from 'express';
import crypto from 'crypto';
import actions from '../../../functions/user';
import { User } from '../../../types/user';

type ReqUser = Omit<Omit<User, 'token'>, 'secret'>

type Req = Request<any, any, { user: ReqUser }>

export default async function (req: Req, res: Response) {
  const { user } = req.body;

  if (!user) return res.sendStatus(404);

  const secret = crypto.randomBytes(16).toString('hex');

  const response = await actions.create({ ...user, secret });

  res.send(response);
};
