import { SignedIn, SignedOut } from '@clerk/tanstack-react-start';
import type { ReactNode } from 'react';
import { AppLayout } from '~/components/AppLayout';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SignedIn>
        <AppLayout>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </AppLayout>
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
      </SignedOut>
    </>
  );
};
