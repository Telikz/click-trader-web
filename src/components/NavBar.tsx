import { Link } from "@tanstack/react-router";
import {
   SignedIn,
   SignOutButton,
   UserButton,
} from "@clerk/tanstack-react-start";

export default function NavBar() {
   return (
      <div className={"flex flex-row gap-4 bg-base-200"}>
         <Link to={"/"}>HOME</Link>
         <Link to={"/trading"}>TRADES</Link>
         <Link to={"/leaderboards"}>LEADERBOARDS</Link>
         <Link to={"/upgrades"}>UPGRADES</Link>
         <Link to={"/profile"}>PROFILE</Link>
         <SignedIn>
            <UserButton />
            <SignOutButton />
         </SignedIn>
      </div>
   );
}
