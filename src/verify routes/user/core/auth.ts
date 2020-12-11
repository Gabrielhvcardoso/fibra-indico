import { Request, Response } from 'express';
import user from '../../../functions/user';

type Req = Request<any, any, { login: string, password: string }>

export default async function (req: Req, res: Response) {
  const { login, password } = req.body;

  if (!login || !password) return res.sendStatus(404);

  const response = await user.auth(login, password);
  res.send(response);
};
