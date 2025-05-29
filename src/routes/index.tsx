import { createFileRoute } from "@tanstack/react-router";
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

   if (!connected || !conn) return <h3>Connecting...</h3>;

   return (
      <div className="p-2">
         <h3>Welcome Home!!!</h3>
         <button
            className="btn btn-primary"
            onClick={() => conn.reducers.sayHello()}
         >
            Say Hello
         </button>
      </div>
   );
}
