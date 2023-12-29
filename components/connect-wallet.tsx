'use client';

interface PleaseConnectYourWallet {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
}

export const PleaseConnectYourWallet = ({
  isLoggingIn,
  isLoggedIn,
}: PleaseConnectYourWallet) => {
  return (
    !isLoggingIn &&
    !isLoggedIn && (
      <span className="ml-3 text-sm font-semibold text-[#A80000]">
        Connect wallet!
      </span>
    )
  );
};
