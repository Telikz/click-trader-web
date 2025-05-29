import { useEffect } from "react";
import { create } from "zustand";
import { DbConnection, ErrorContext } from "../../module_bindings";
import { Identity } from "@clockworklabs/spacetimedb-sdk";

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

   useEffect(() => {
      const onConnect = (
         conn: DbConnection,
         identity: Identity,
         token: string
      ) => {
         setState({ connected: true, identity });
         localStorage.setItem("auth_token", token);
         console.log("Connected:", identity.toHexString());

         conn
            .subscriptionBuilder()
            .onApplied(() => console.log("SDK cache initialized"))
            .subscribe(["SELECT * FROM message"]);
      };

      const onDisconnect = () => {
         console.log("Disconnected from SpaceTimeDB");
         setState({ connected: false });
      };

      const onConnectError = (_ctx: ErrorContext, err: Error) => {
         console.log("Connection error:", err);
      };

      const conn = DbConnection.builder()
         .withUri(import.meta.env.SPACETIMEDB_URL || "ws://localhost:3001")
         .withModuleName("test")
         .withToken(localStorage.getItem("auth_token") || "")
         .onConnect(onConnect)
         .onDisconnect(onDisconnect)
         .onConnectError(onConnectError)
         .build();

      setState({ conn });
   }, [setState]);
}
