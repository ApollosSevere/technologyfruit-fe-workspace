import type { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { selectAccessToken } from '../auth/selector';
import { TOKEN } from '../auth/slice';
import { RootState } from '../store';

export const prepareHeadersWithAuth =
  (restricted: string[] = []): Required<FetchBaseQueryArgs>['prepareHeaders'] =>
  (headers, api) => {
    if (
      restricted.some(
        (restrictedEndpoint) => restrictedEndpoint === api.endpoint
      )
    ) {
      return headers;
    }

    const token = selectAccessToken(api.getState() as RootState);
    const localStorageToken = window.localStorage.getItem(TOKEN);


    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    } else if (localStorageToken) {
      headers.set('Authorization', `Bearer ${localStorageToken}`);
    }
    
    return headers;
  };
