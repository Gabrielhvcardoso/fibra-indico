import { Request, Response } from 'express';
import user from '../../../functions/user';

type Req = Request<{ token: string, secret: string }>

export default async function (req: Req, res: Response) {
  const { token } = req.params;

  if (!token) return res.sendStatus(404);

  const response = await user.readRecommendation(token);
  res.send(response);
};
