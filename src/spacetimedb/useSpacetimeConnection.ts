import { useAuth, useUser } from '@clerk/tanstack-react-start';
import type { Identity } from '@clockworklabs/spacetimedb-sdk';
import { useCallback, useEffect } from 'react';
import { create } from 'zustand';
import { DbConnection, type ErrorContext } from '../../module_bindings';

interface SpacetimeState {
  connected: boolean;
  identity: Identity | null;
  conn: DbConnection | null;
}

export const useSpacetime = create<SpacetimeState>(() => ({
  connected: false,
  identity: null,
  conn: null,
}));

export function useSpacetimeConnection() {
  const setState = useSpacetime.setState;
  const { getToken } = useAuth();
  const { user, isLoaded, isSignedIn } = useUser();

  const connectToSpacetime = useCallback(async () => {
    const token = await getToken();

    const onConnect = (connection: DbConnection, identity: Identity) => {
      setState({ connected: true, identity, conn: connection });

      connection
        .subscriptionBuilder()
        .subscribe([
          'SELECT * FROM player',
          'SELECT * FROM upgrades',
          'SELECT * FROM stock',
        ]);
      conn.reducers.setName(user?.username || 'Unknown');
    };

    const onDisconnect = () => {
      setState({ connected: false });
    };

    const onConnectError = (_ctx: ErrorContext, _err: Error) => {
      setState({ connected: false });
    };

    const conn = DbConnection.builder()
      .withUri(
        import.meta.env.PROD
          ? 'wss://spacetime.minmaxing.net'
          : 'ws://localhost:3001'
      )
      .withModuleName('test')
      .withToken(token?.toString())
      .onConnect(onConnect)
      .onDisconnect(onDisconnect)
      .onConnectError(onConnectError)
      .build();

    setState({ conn });
  }, [getToken, setState, user?.username]);

  useEffect(() => {
    if (!(isLoaded && isSignedIn)) {
      return;
    }

    connectToSpacetime();

    const handleFocus = () => {
      if (!useSpacetime.getState().connected) {
        connectToSpacetime();
      }
    };

    const handleOnline = () => {
      if (!useSpacetime.getState().connected) {
        connectToSpacetime();
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
    };
  }, [isLoaded, isSignedIn, connectToSpacetime]);
}
