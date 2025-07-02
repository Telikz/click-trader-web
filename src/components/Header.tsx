import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/tanstack-react-start';
import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <header className="relative flex items-center justify-between bg-base-200 p-3">
      <Link className="z-10 font-bold text-xl" to="/">
        Click Trader
      </Link>
      <div className="z-10">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode={'modal'} />
        </SignedOut>
      </div>
    </header>
  );
};
