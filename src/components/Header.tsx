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
