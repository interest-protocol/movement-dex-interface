import { NextApiRequest, NextApiResponse } from 'next';

import { findQuestProfile, findSwapBySymbols } from '@/server/lib/quest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const address = req.query.address as string;
      const symbolIn = req.query.in as string;
      const symbolOut = req.query.out as string;

      if (!symbolIn && !symbolOut) {
        const profile = await findQuestProfile(address);

        const is_ok = profile.lastSwapAt ? 1 : 0;

        res.status(200).json({ is_ok });
        return;
      }

      if (symbolIn && symbolOut) {
        const quest = await findSwapBySymbols(address, symbolIn, symbolOut);

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
