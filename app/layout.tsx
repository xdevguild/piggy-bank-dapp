import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import packageJson from '@/package.json';
import { Github } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ModeToggle } from '@/components/mode-toggle';
import { ElvenInit } from '@/components/elven-ui/elven-init';
import { LoginModalButton } from '@/components/elven-ui/login-modal-button';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

const dappHostname = process.env.NEXT_PUBLIC_DAPP_HOST;
const globalTitle =
  'Piggy Bank Dapp - Learn Blockchain Development on MultiversX';
const globalDescription =
  'Discover our dApp integrating a user-friendly smart contract on the MultiversX blockchain, designed for educational and learning purposes.';
const globalImage = `${dappHostname}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(dappHostname!),
  title: globalTitle,
  description: globalDescription,
  authors: { name: 'xDevGuild', url: 'https://www.xdevguild.com' },
  openGraph: {
    title: globalTitle,
    images: [globalImage],
    description: globalDescription,
    type: 'website',
    url: dappHostname,
  },
  twitter: {
    title: globalTitle,
    description: globalDescription,
    images: [globalImage],
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ElvenInit />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="container mx-auto">
            <div className="w-full flex items-center justify-between flex-wrap gap-2 py-9 flex-col lg:flex-row">
              <Link href="/">
                <div className="flex items-center gap-2 relative select-none">
                  <span className="cursor-pointer mb-0 text-4xl font-black text-center">
                    Piggy Bank Dapp
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-3 flex-col md:flex-row">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/xdevguild/piggy-bank-dapp"
                    target="_blank"
                  >
                    <span className="flex gap-2 items-center">
                      <Github size={20} /> Dapp
                    </span>
                  </a>
                  <a
                    href="https://github.com/xdevguild/multiversx-simple-sc"
                    target="_blank"
                  >
                    <span className="flex gap-2 items-center">
                      <Github size={20} /> SC
                    </span>
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span tabIndex={0}>
                          <Button
                            variant="ghost"
                            disabled
                            className="pointer-events-none"
                          >
                            Tutorial (soon)
                          </Button>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Soon you will read about how the smart contract and
                          dapp are built.
                        </p>
                        <p>
                          You will get more insights on how to develop on the
                          MultiversX blockchain.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <LoginModalButton />
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto min-h-[calc(100vh-280px)] lg:min-h-[calc(100vh-235px)]">
            {children}
          </div>
          <div className="flex h-[120px] items-center">
            <div className="flex flex-col items-center justify-center container mx-auto text-center text-sm">
              <div className="font-bold">
                Piggy Bank Dapp (v{`${packageJson.version}`})
              </div>
              <div className="text-xs font-light">
                Built with{' '}
                <a
                  href="https://github.com/xdevguild/nextjs-dapp-template"
                  className="underline"
                  target="_blank"
                >
                  MultiversX Next.js Dapp template
                </a>
                . You can use it as a starting point for your dapps. Please star
                the projects on{' '}
                <a
                  href="https://github.com/xdevguild"
                  target="_blank"
                  className="underline"
                >
                  xDevGuild GitHub repositories
                </a>
                .
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
