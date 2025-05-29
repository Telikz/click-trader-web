import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  useSpacetime,
  useSpacetimeConnection,
} from "~/spacetimedb/spacetimedb-store";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useSpacetimeConnection();
  const { conn, connected } = useSpacetime();

  useEffect(() => {
    if (conn && connected) {
      conn.reducers.sayHello();
    }
  }, [conn]);

  if (!connected) return <h3>Connecting...</h3>;

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <button
        className="btn btn-primary px-4 py-2"
        onClick={() => conn?.reducers.sayHello()}
      >
        Say Hello
      </button>
    </div>
  );
}
