export const replaceVariables = (str: string, variables: Record<string, string> = {}) => {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] || '');
};
