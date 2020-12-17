import { Request, Response } from 'express';

import manager from '../../../functions/manager';

export default async function (req: Request, res: Response) {
  const read = await manager.product.read();
  res.send(read);
}
