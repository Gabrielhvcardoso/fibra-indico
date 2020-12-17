import { Request, Response } from 'express';

import manager from '../../../functions/manager';

export default async function (req: Request, res: Response) {
  const read = await manager.hierarchy.read();
  res.send(read);
}
