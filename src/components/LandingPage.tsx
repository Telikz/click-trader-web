import { SignInButton, SignUpButton } from "@clerk/tanstack-react-start";

export const LandingPage = () => {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center p-4">
         <h1 className="text-5xl font-bold mb-4">Welcome to Click Trader!</h1>
         <p className="text-xl mb-8">
            The ultimate clicker game with MMO mechanics. Click your way to
            riches, trade stocks, and compete on the leaderboards.
         </p>
         <div className="flex gap-4">
            <SignInButton mode={"modal"} />
            <SignUpButton mode={"modal"} />
         </div>
      </div>
   );
};
