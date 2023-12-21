export const baseUrl = (url: string) => {
  // return `http://localhost:8080${url}`;10.20.191.154
  // return `http://10.20.191.154:8080${url}`;
  return `${process.env.NEXT_PUBLIC_LOCAL_API_URL}${url}`;
};
