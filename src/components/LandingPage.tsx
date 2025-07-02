import { SignInButton, SignUpButton } from '@clerk/tanstack-react-start';

export const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-100 p-4 text-center">
      <h1 className="mb-4 font-bold text-5xl">Welcome to Click Trader!</h1>
      <p className="mb-8 text-xl">
        The ultimate clicker game with MMO mechanics. Click your way to riches,
        trade stocks, and compete on the leaderboards.
      </p>
      <div className="flex gap-4">
        <SignInButton mode={'modal'} />
        <SignUpButton mode={'modal'} />
      </div>
    </div>
  );
};
