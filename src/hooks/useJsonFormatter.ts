import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';
import prettier from 'prettier/standalone';

export const useJsonFormatter = () => {
  const validateJSON = (input: string) => {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  };

  const formatJson = async (input: string) => {
    if (!validateJSON(input)) {
      // TODO: ADD TOASTER
      throw new Error('Invalid JSON format');
    }

    try {
      return await prettier.format(input, {
        parser: 'json',
        plugins: [babelPlugin, estreePlugin],
      });
    } catch (_e) {
      // TODO: ADD TOASTER
      throw new Error('Formatting failed');
    }
  };

  return { formatJson, validateJSON };
};
