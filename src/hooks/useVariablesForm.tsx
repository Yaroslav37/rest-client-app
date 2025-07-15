import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const LOCAL_STORAGE_KEY = 'rest-client-variables';

interface Variable {
  id: string;
  key: string;
  value: string;
}

export function useVariablesForm() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { control, setValue, watch, getValues } = useForm<{ variables: Variable[] }>({
    defaultValues: {
      variables: [],
    },
    mode: 'onChange',
  });
  const t = useTranslations('Variables');
  const currentVariables = watch('variables');

  useEffect(() => {
    const loadVariables = () => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!saved) {
          setIsLoaded(true);
          return;
        }

        const parsed = JSON.parse(saved) as unknown;

        if (!Array.isArray(parsed)) {
          setIsLoaded(true);
          return;
        }

        const validVariables = (parsed as unknown[]).filter(
          (v): v is Variable =>
            typeof v === 'object' &&
            v !== null &&
            'id' in v &&
            'key' in v &&
            'value' in v &&
            typeof (v as Variable).id === 'string' &&
            typeof (v as Variable).key === 'string' &&
            typeof (v as Variable).value === 'string',
        );

        setValue('variables', validVariables);
        setIsLoaded(true);
      } catch (_error) {
        toast.error(t('errors.error-failed'));
        setIsLoaded(true);
      }
    };

    loadVariables();
  }, [setValue, t]);

  useEffect(() => {
    if (!isLoaded) return;
    const validVariables = currentVariables.filter((v) => v.id && v.key.trim() && v.value.trim());
    try {
      if (validVariables.length === 0) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(validVariables));
      }
    } catch (_error) {
      toast.error(t('errors.error-failed'));
    }
  }, [currentVariables, isLoaded, t]);

  const addVariable = useCallback(
    (variable: Omit<Variable, 'id'>) => {
      if (!variable.key.trim() || !variable.value.trim()) {
        return false;
      }
      const newVariables = [...getValues('variables'), { ...variable, id: Date.now().toString() }];
      setValue('variables', newVariables);
      return true;
    },
    [getValues, setValue],
  );

  const updateVariable = useCallback(
    (index: number, key: string, value: string) => {
      const variables = getValues('variables');
      if (!key.trim() || !value.trim()) return false;

      const updated = [...variables];
      updated[index] = { ...updated[index], key, value };
      setValue('variables', updated);
      return true;
    },
    [getValues, setValue],
  );

  const removeVariable = useCallback(
    (index: number) => {
      const variables = getValues('variables');
      const safeIndex = Math.min(index, variables.length - 1);
      const newVariables = variables.filter((_, i) => i !== safeIndex);
      setValue('variables', newVariables);
    },
    [getValues, setValue],
  );

  const applyVariables = useCallback(
    (text: string) => {
      return currentVariables
        .filter((v) => v.key.trim() && v.value.trim())
        .reduce((acc, { key, value }) => {
          return acc.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
        }, text);
    },
    [currentVariables],
  );

  const validateVariables = useCallback(
    (text: string): { isValid: boolean; missingVariables: string[] } => {
      const missingVariables: string[] = [];
      const existingVariables = new Set(
        currentVariables.filter((v) => v.key.trim() && v.value.trim()).map((v) => v.key),
      );

      const variableMatches = text.match(/\{\{\w+\}\}/g) || [];
      const uniqueVariables = [...new Set(variableMatches)];

      uniqueVariables.forEach((variable) => {
        const varName = variable.replace(/\{\{|\}\}/g, '');
        if (!existingVariables.has(varName)) {
          missingVariables.push(varName);
        }
      });

      return {
        isValid: missingVariables.length === 0,
        missingVariables,
      };
    },
    [currentVariables],
  );

  const getVariablesAsObject = useCallback(() => {
    return currentVariables
      .filter((v) => v.key.trim() && v.value.trim())
      .reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );
  }, [currentVariables]);

  return {
    control,
    variables: currentVariables.filter((v) => v.key.trim() && v.value.trim()),
    isLoaded,
    addVariable,
    removeVariable,
    updateVariable,
    getVariablesAsObject,
    applyVariables,
    validateVariables,
    setVariables: (variables: Variable[]) => setValue('variables', variables),
  };
}
