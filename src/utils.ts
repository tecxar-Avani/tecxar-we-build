import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { NextIncomingMessage } from 'next/dist/server/request-meta';

export const isBrowser = (): boolean => typeof window !== 'undefined';

export const isServer = (): boolean => !isBrowser();

export const getCookies = (
  request?: NextIncomingMessage & {
    cookies: NextApiRequestCookies;
  },
): string => {
  const cookie = request?.cookies;

  let cookies = '';

  if (cookie) {
    Object.keys(cookie).forEach(key => {
      cookies += key + '=' + cookie[key] + ';';
    });
  }

  return cookies;
};

export const pageSizeOptions = [
  {
    text: '5',
    value: 5,
  },
  {
    text: '10',
    value: 10,
  },
  {
    text: '25',
    value: 25,
  },
  {
    text: '50',
    value: 50,
  },
  {
    text: '75',
    value: 75,
  },
  {
    text: '100',
    value: 100,
  },
];
