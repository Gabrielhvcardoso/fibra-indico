import { Request, Response } from 'express';

import manager from '../../../functions/manager';

type Req = Request<any, any, { email: string, password: string }>

export default async function (req: Req, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(404);

  const response = await manager.auth.auth(email, password);
  res.send(response);
}
