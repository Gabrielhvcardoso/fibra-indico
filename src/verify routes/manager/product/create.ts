import knex from '../../../database';
import { Request, Response } from 'express';

import { NewProduct } from '../../../functions/manager/core/create.product';
import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string }, any, { product: NewProduct }>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { product } = req.body;

  if (!product) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) return res.sendStatus(404);

  const read = await manager.product.create(product);
  res.send(read);
}
