'use client';

import { useTranslations } from 'next-intl';
import { convert } from 'postman-code-generators';
import { Header, Request } from 'postman-collection';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';

import { useVariablesForm } from '@/hooks/useVariablesForm';
import { cn } from '@/utils/tailwind-clsx';

interface RequestData {
  method: string;
  url: string;
  headers: Array<{ key: string; value: string }>;
  body: string;
}

type CodeGeneratorProps = {
  requestCurrent: RequestData;
};

const languageVariants: Record<string, string[]> = {
  curl: ['cURL'],
  javascript: ['Fetch', 'jQuery', 'XHR'],
  nodejs: ['Axios', 'Native', 'Request', 'Unirest'],
  python: ['http.client', 'Requests'],
  java: ['OkHttp', 'Unirest'],
  c: ['libcurl'],
  csharp: ['HttpClient', 'RestSharp'],
  go: ['Native'],
};

const languageOptions = Object.entries(languageVariants).map(([key]) => ({
  value: key,
  label: key === 'csharp' ? 'C#' : key.charAt(0).toUpperCase() + key.slice(1),
}));

export const CodeGenerator = ({ requestCurrent }: CodeGeneratorProps) => {
  const { applyVariables, getVariablesAsObject } = useVariablesForm();
  const [language, setLanguage] = useState('curl');
  const [variant, setVariant] = useState<string | null>(languageVariants['curl'][0]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const t = useTranslations('CodeGenerator');

  const variants = useMemo(() => languageVariants[language] || [], [language]);

  const replaceVariables = useCallback(
    (data: RequestData): RequestData => {
      const variables = getVariablesAsObject();

      let processedUrl = data.url;
      Object.entries(variables).forEach(([key, value]) => {
        processedUrl = processedUrl.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
      });

      const processedHeaders = data.headers.map((header) => ({
        key: header.key,
        value: header.value.replace(
          /\{\{(\w+)\}\}/g,
          (match, varName) => variables[varName] || match,
        ),
      }));

      const processedBody = applyVariables(data.body);

      return {
        ...data,
        url: processedUrl,
        headers: processedHeaders,
        body: processedBody,
      };
    },
    [applyVariables, getVariablesAsObject],
  );

  useEffect(() => {
    if (!requestCurrent?.url) {
      setGeneratedCode('');
      return;
    }

    try {
      const processedRequest = replaceVariables(requestCurrent);

      const postmanHeaders = processedRequest.headers.map((header) => new Header(header));

      const request = new Request({
        method: processedRequest.method,
        url: processedRequest.url,
        header: postmanHeaders,
        body: {
          mode: 'raw',
          raw: processedRequest.body,
        },
      });

      const options = {
        indentCount: 2,
        indentType: 'Space',
        trimRequestBody: true,
        followRedirect: true,
      };
      convert(language, variant, request, options, (error: Error | null, snippet: string) => {
        setGeneratedCode(
          error ? `⚠️ ${t('error')}: ${error.message}` : snippet || t('no-code-generated'),
        );
      });
    } catch (error) {
      setGeneratedCode(
        `⚠️ ${t('error')}: ${error instanceof Error ? error.message : t('unknown-error')}`,
      );
    }
  }, [requestCurrent, language, variant, t, replaceVariables]);

  const handleShowCode = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowCode((prev) => !prev);
  }, []);

  const handleLanguageChange = useCallback((selected: SingleValue<{ value: string }>) => {
    const newLanguage = selected?.value || 'curl';
    setLanguage(newLanguage);
    setVariant(languageVariants[newLanguage]?.[0] || null);
  }, []);

  const selectStyles = {
    control: (state: { isFocused: boolean }) =>
      cn(
        '!border-green !bg-dark !cursor-pointer !text-white !rounded-md !shadow-sm !w-[160px]',
        state.isFocused ? '!border-green !ring-1 !ring-green' : '',
      ),
    option: (state: { isSelected: boolean }) =>
      cn(
        '!text-white !cursor-pointer !bg-dark hover:!bg-dark-grey',
        state.isSelected ? '!bg-green !text-white !text-size-16' : '',
      ),
    singleValue: () => '!text-size-18 !text-white',
    menu: () => '!mt-1 !border !border-white !p-0 !rounded-md !shadow-lg',
    menuList: () => '!p-0 !bg-dark !border-0 !rounded-md',
  };

  return (
    <div className="space-y-4 font-montserrat">
      <p className="text-white text-sm mds:text-xl">{t('useGenerator')}</p>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <span className="text-light-green">{t('select-language')}</span>
          <Select
            options={languageOptions}
            value={languageOptions.find((opt) => opt.value === language)}
            onChange={handleLanguageChange}
            isSearchable={false}
            classNames={selectStyles}
            styles={{
              indicatorSeparator: () => ({ display: 'none' }),
            }}
          />
        </div>

        {variants.length > 1 && (
          <div className="flex flex-col gap-2">
            <span className="text-light-green">{t('select-variant')}</span>
            <Select
              options={variants.map((v) => ({ value: v, label: v }))}
              value={variant ? { value: variant, label: variant } : null}
              onChange={(selected) => setVariant(selected?.value || null)}
              isSearchable={false}
              classNames={selectStyles}
              styles={{ indicatorSeparator: () => ({ display: 'none' }) }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleShowCode}
          className="px-4 py-2 bg-green text-white rounded-md hover:bg-light-green transition-colors w-fit"
        >
          {showCode ? t('hide') : t('show')}
        </button>
      </div>

      {showCode && (
        <pre className="p-4 bg-dark rounded overflow-auto border border-green">
          <code className="text-white">{generatedCode || t('generate')}</code>
        </pre>
      )}
    </div>
  );
};
