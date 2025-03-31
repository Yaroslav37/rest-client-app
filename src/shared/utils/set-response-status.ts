export const getStatusColor = (status: number) => {
  if (status >= 100 && status < 200) return 'text-gray-600';
  if (status >= 200 && status < 300) return 'text-green-600';
  if (status >= 300 && status < 400) return 'text-blue-600';
  return 'text-red-600';
};

export const getStatusMessage = (status: number) => {
  if (status >= 100 && status < 200) return 'Informational';
  if (status >= 200 && status < 300) return 'Success';
  if (status >= 300 && status < 400) return 'Redirection';
  if (status >= 400 && status < 500) return 'Client Error';
  if (status >= 500 && status < 600) return 'Server Error';
  return 'Unknown Status';
};
