import * as resas from '../../../utils/resas';
import type { NextApiHandler } from 'next';
import type { JSONType } from '../../../utils/types';

const handler: NextApiHandler<JSONType> = async (req, res) => {
  const { prefCode } = req.query;

  if (typeof prefCode !== 'string') {
    res.status(500).send('');
    return;
  }

  try {
    const json = await resas.get('/api/v1/population/composition/perYear', {
      prefCode,
      cityCode: '-'
    });
    res.status(200).json(json);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : null;
    res.status(502).json({ message });
  }
};
export default handler;
