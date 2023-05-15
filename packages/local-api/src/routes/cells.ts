import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

interface IErrorType {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    const hasErrCode = (error: any): error is IErrorType => {
      return typeof error.code === 'string';
    };

    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err) {
      if (hasErrCode(err)) {
        if (err.code === 'ENOENT') {
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        }
      } else {
        if (err instanceof Error)
          console.log(`Here's the problem`, err.message);
        else
          throw err;
      }
      process.exit(1);
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};