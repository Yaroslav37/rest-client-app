import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';
import prettier from 'prettier/standalone';

export const useJsonFormatter = () => {
  const formatJson = async (input: string) => {
    try {
      return await prettier.format(input, {
        parser: 'json',
        plugins: [babelPlugin, estreePlugin],
      });
    } catch {
      // TODO: show TOAST
      return input;
    }
  };

  return { formatJson };
};
