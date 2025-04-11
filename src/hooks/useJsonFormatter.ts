import { useTranslations } from 'next-intl';
import babelPlugin from 'prettier/plugins/babel';
import estreePlugin from 'prettier/plugins/estree';
import prettier from 'prettier/standalone';
import { toast } from 'react-toastify';

export const useJsonFormatter = () => {
  const t = useTranslations('RestClient');

  const formatJson = async (input: string) => {
    try {
      return await prettier.format(input, {
        parser: 'json',
        plugins: [babelPlugin, estreePlugin],
      });
    } catch {
      toast.error(t('error'));
      return input;
    }
  };

  return { formatJson };
};
