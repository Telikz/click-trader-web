import { Link } from "@tanstack/react-router";
import {
   SignedIn,
   SignedOut,
   SignInButton,
   UserButton,
} from "@clerk/tanstack-react-start";

export const Header = () => {
   return (
      <header className="relative bg-base-200 p-3 flex items-center justify-between">
         <Link to="/" className="text-xl font-bold z-10">
            Click Trader
         </Link>
         <SignedIn>
            <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
               <Link to="/" className="[&.active]:font-bold">
                  Home
               </Link>
               <Link to="/trading" className="[&.active]:font-bold">
                  Trading
               </Link>
               <Link to="/upgrades" className="[&.active]:font-bold">
                  Upgrades
               </Link>
               <Link to="/profile" className="[&.active]:font-bold">
                  Profile
               </Link>
            </nav>
         </SignedIn>
         <div className="z-10">
            <SignedIn>
               <UserButton />
            </SignedIn>
            <SignedOut>
               <SignInButton mode={"modal"} />
            </SignedOut>
         </div>
      </header>
   );
};
