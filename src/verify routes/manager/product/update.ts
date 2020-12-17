import knex from '../../../database';
import { Request, Response } from 'express';

import { NewProduct } from '../../../functions/manager/core/update.product';
import manager from '../../../functions/manager';

type Req = Request<{ adminSecret: string }, any, { productId: number, product: NewProduct }>

export default async function (req: Req, res: Response) {
  const { adminSecret } = req.params;
  const { productId, product } = req.body;

  if (!productId || !product) return res.sendStatus(404);

  const response = await knex('auth').where({ admin_secret: adminSecret });

  if (!response[0]) res.sendStatus(404);

  const read = await manager.product.update(productId, product);
  res.send(read);
}
