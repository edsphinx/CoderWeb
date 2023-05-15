import path from "path";
import { Command } from "commander";
import { serve } from '@codewrite/local-api';

const isProduction = process.env.NODE_ENV === 'production';

interface IErrorType {
  code: string;
}

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p,--port <number>', 'port to run server on', '4005')
  .action(async (filename = 'codefile.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err) {
      const hasErrCode = (error: any): error is IErrorType => {
        return error.code;
      };
      if (hasErrCode(err)) {
        if (err.code === 'EADDRINUSE') {
          console.log('Port is in use. Try running on a different port.');
        }
      } else {
        if (err instanceof Error)
          console.log(`Here's the problem`, err.message);
      }
      process.exit(1);
    }
  });