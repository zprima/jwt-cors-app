import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export function getToken() {
  const t = cookies.get("token");
  return t;
}