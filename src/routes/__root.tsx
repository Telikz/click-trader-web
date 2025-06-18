import {
   createRootRouteWithContext,
   HeadContent,
   Outlet,
   Scripts,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";
import { useSpacetimeConnection } from "~/spacetimedb/useSpacetimeConnection";
import { usePlayerSync } from "~/spacetimedb/usePlayerSync";
import { useUpgradeSync } from "~/spacetimedb/useUpgradeSync";
import NavBar from "~/components/NavBar";
import { useStockSync } from "~/spacetimedb/useStockSync";

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient;
}>()({
   head: () => ({
      meta: [
         {
            charSet: "utf-8",
         },
         {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
         },
         ...seo({
            title: "Click Trader | Clicker type game with MMO mechanics",
            description: `Click Trader is a clicker type game with MMO mechanics.`,
         }),
      ],
      links: [
         { rel: "stylesheet", href: appCss },
         {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
         },
         {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
         },
         {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
         },
         { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
         { rel: "icon", href: "/favicon.ico" },
      ],
   }),
   errorComponent: (props) => {
      return (
         <RootDocument>
            <DefaultCatchBoundary {...props} />
         </RootDocument>
      );
   },
   notFoundComponent: () => <NotFound />,
   component: RootComponent,
});

function RootComponent() {
   return (
      <RootDocument>
         <Outlet />
      </RootDocument>
   );
}

function RootDocument({ children }: { children: React.ReactNode }) {
   useSpacetimeConnection();
   usePlayerSync();
   useUpgradeSync();
   useStockSync();
   return (
      <html>
         <head>
            <HeadContent />
         </head>
         <body>
            <NavBar />
            {children}
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <Scripts />
         </body>
      </html>
   );
}
