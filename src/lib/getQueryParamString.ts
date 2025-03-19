export function getQueryParamString(params: Record<string, string | number>) {
  // need to convert number values to string
  const stringifiedParams = Object.keys(params).map((key) => [
    key,
    params[key].toString(),
  ]);

  return new URLSearchParams(stringifiedParams).toString();
}
