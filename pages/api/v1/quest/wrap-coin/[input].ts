import { NextApiRequest, NextApiResponse } from 'next';

import { findWrapBySymbol } from '@/server/lib/quest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const symbol = req.query.input as string;
      const address = req.query.address as string;

      if (symbol) {
        const quest = await findWrapBySymbol(address, symbol);

        const is_ok = quest ? 1 : 0;

        res.status(200).json({ is_ok });
        return;
      }
    }

    res.status(404).send(new Error('Route not found'));
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
