import { useEffect } from "react";
import { create } from "zustand";
import { DbConnection, ErrorContext } from "../../module_bindings";
import { Identity } from "@clockworklabs/spacetimedb-sdk";
import { useAuth, useUser } from "@clerk/clerk-react";

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

   useEffect(() => {
      if (!isLoaded) return;
      if (!isSignedIn) return;

      const connectToSpacetime = async () => {
         try {
            const token = await getToken();
            if (!token) throw new Error("No token from Clerk");

            const onConnect = (conn: DbConnection, identity: Identity) => {
               setState({ connected: true, identity });
               console.log("Connected:", identity.toHexString());

               conn
                  .subscriptionBuilder()
                  .onApplied(() => console.log("SDK cache initialized"))
                  .subscribe([
                     "SELECT * FROM player",
                     "SELECT * FROM upgrades",
                     "SELECT * FROM stock",
                  ]);
               conn.reducers.setName(user?.username || "Unknown");
            };

            const onDisconnect = () => {
               console.log("Disconnected from SpaceTimeDB");
               setState({ connected: false });
            };

            const onConnectError = (_ctx: ErrorContext, err: Error) => {
               console.log("Connection error:", err);
            };

            const conn = DbConnection.builder()
               .withUri(
                  import.meta.env.PROD
                     ? "wss://spacetimedb.minmaxing.net"
                     : "ws://localhost:3001"
               )
               .withModuleName("test")
               .withToken(token)
               .onConnect(onConnect)
               .onDisconnect(onDisconnect)
               .onConnectError(onConnectError)
               .build();

            setState({ conn });
         } catch (err) {
            console.error("Failed to connect to SpaceTimeDB:", err);
         }
      };

      connectToSpacetime();
   }, [isSignedIn, getToken, setState]);
}
