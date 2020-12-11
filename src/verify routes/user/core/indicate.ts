import { Request, Response } from 'express';
import actions from '../../../functions/user';
import { Recommendation } from '../../../types/recommendation';

type ReqUser = Omit<Omit<Omit<Recommendation, 'recommendationId'>, 'createdAt'>, 'status'>;

type Req = Request<any, any, { recommendation: ReqUser }>;

export default async function (req: Req, res: Response) {
  const { recommendation } = req.body;

  if (!recommendation) return res.sendStatus(404);

  const status = 'pendent';
  const createdAt = new Date().getTime().toString();

  const response = await actions.indicate({ ...recommendation, status, createdAt });

  res.send(response);
};
