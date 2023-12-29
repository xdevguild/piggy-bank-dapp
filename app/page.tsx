import type { NextPage } from 'next';
import { CardContent, Card, CardTitle, CardFooter } from '@/components/ui/card';
import { DeployOperation } from '@/components/deploy-operation';
import { CreatePiggyOperation } from '@/components/create-piggy-operation';
import { DepositOperation } from '@/components/deposit-operation';
import { PayoutOperation } from '@/components/payout-operation';
import { CheckLockTimeOperation } from '@/components/check-lock-time-operation';
import { CheckLockedAmountOperation } from '@/components/check-locked-amount-operation';
import { ChangeSmartContractOperation } from '@/components/change-smart-contract-operation';

const Home: NextPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card className="lg:col-span-2">
        <CardContent className="mt-5 flex flex-col justify-between h-full">
          <CardTitle>Intro</CardTitle>
          <div>
            You are currently viewing the decentralized application (dApp),
            designed to interact with a straightforward smart contract on the
            MultiversX blockchain. The primary objective of this dApp is to
            provide an educational platform for beginners to learn the
            fundamentals of writing smart contracts and developing a dApp for
            seamless interaction. This dApp facilitates interaction with a smart
            contract, which users can deploy directly through the application
            interface. All operations and transactions occur on the development
            network (<strong>devnet</strong>), ensuring that there is no risk to
            your actual funds
          </div>
          <CardFooter></CardFooter>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-5 flex flex-col justify-between h-full">
          <CardTitle className="text-xl flex justify-between flex-col sm:flex-row">
            <div className="underline">Step 1</div>
            <div>Deployment</div>
          </CardTitle>
          <div>
            <div className="mb-3">
              In practical, real-world scenarios, the deployment of smart
              contracts is typically managed through scripts or through a
              dedicated and secure user interface. However, for the purposes of
              simplifying the learning process, we have enabled the ability for
              anyone to deploy the &apos;Piggy Bank&apos; smart contract
              directly from the{' '}
              <a
                href="https://github.com/xdevguild/multiversx-simple-sc"
                target="_blank"
                className="underline"
              >
                GitHub repository
              </a>{' '}
              onto the development network (devnet).
            </div>
            <div className="mb-3">
              Once you&apos;ve successfully deployed the smart contract, you
              will receive its unique address. This address is automatically
              saved in your browser&apos;s local storage, allowing for easy and
              consistent access for subsequent operations within the dApp. This
              feature streamlines the process, ensuring you don&apos;t have to
              re-enter the smart contract address each time you perform an
              operation.
            </div>
            <div>
              Additionally, the system is flexible, allowing you to deploy a new
              instance of the smart contract at any time. This capability is
              particularly useful for testing different scenarios or starting
              afresh if needed. Overall, this setup provides a user-friendly and
              risk-free environment for newcomers to explore and understand the
              intricacies of smart contract deployment and interaction in a
              blockchain context.
            </div>
          </div>
          <CardFooter className="px-0 flex justify-end text-right">
            <DeployOperation />
          </CardFooter>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-5 flex flex-col justify-between h-full">
          <CardTitle className="text-xl flex justify-between flex-col sm:flex-row">
            <div className="underline">Step 2</div>
            <div>Create a Piggy</div>
          </CardTitle>
          <div>
            <div className="mb-3">
              To effectively manage your Piggy Bank, the first step is to create
              a &apos;Piggy&apos;. It&apos;s important to note that you can have
              only one Piggy per smart contract. A crucial part of this process
              is specifying the date after which you are allowed to withdraw
              tokens from your Piggy Bank. While the user interface (UI) of this
              dapp simplifies this step, usually you would need to enter this
              date as a Unix timestamp, which is a standard method for tracking
              time in many computing systems
            </div>
            <div className="mb-3">
              In our dapp, we&apos;ve incorporated a feature that allows users
              to deploy smart contracts directly through the UI. Once a smart
              contract is deployed, its address is stored in your browser&apos;s
              local storage. This automatic saving means you won&apos;t have to
              manually input the smart contract address every time you wish to
              interact with it, streamlining the user experience significantly.
            </div>
            <div>
              Under normal circumstances, your smart contract address might be
              provided as an environmental variable (such as a .env file) or set
              as a constant in your development environment. However, in our
              dapp, we&apos;ve tailored the experience to prioritize ease of use
              and accessibility for those who are new to working with smart
              contracts, making the process as straightforward and user-friendly
              as possible.
            </div>
          </div>
          <CardFooter className="px-0 flex justify-end text-right">
            <CreatePiggyOperation />
          </CardFooter>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-5 flex flex-col justify-between h-full">
          <CardTitle className="text-xl flex justify-between flex-col sm:flex-row">
            <div className="underline">Step 3</div>
            <div>Put some money</div>
          </CardTitle>
          <div>
            <div className="mb-3">
              Now that you have successfully set up your smart contract and
              created your Piggy Bank, the next step is to deposit funds into
              it. In this stage, you will be working with the development
              network&apos;s (devnet) simulated version of EGLD, often referred
              to as &apos;fake EGLD&apos;. This virtual currency allows you to
              experience the process of using real EGLD without the financial
              risks involved.
            </div>
            <div className="mb-3">
              Before proceeding, it&apos;s crucial to ensure that the wallet you
              are currently logged into has sufficient funds. If your wallet is
              running low, don&apos;t worry - you can easily replenish your
              balance. Utilize the{' '}
              <a href="https://devnet-wallet.multiversx.com/" target="_blank">
                Web Wallet
              </a>{' '}
              faucet, a handy tool designed specifically for this purpose. The
              faucet will provide you with an amount of fake EGLD, enabling you
              to continue experimenting and learning about smart contract
              interactions and the mechanics of the Piggy Bank system in a
              risk-free environment.
            </div>
          </div>
          <CardFooter className="px-0 flex justify-end text-right">
            <DepositOperation />
          </CardFooter>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-5 flex flex-col justify-between h-full">
          <CardTitle className="text-xl flex justify-between flex-col sm:flex-row">
            <div className="underline">Step 4</div>
            <div>Query the smart contract</div>
          </CardTitle>
          <div>
            <div className="mb-3">
              You have the ability to continually monitor and review key details
              of your Piggy Bank, such as the lock date and the total amount of
              your deposit. This functionality is a crucial aspect of managing
              your funds effectively within the dApp
            </div>
            <div>
              All interactions and queries you make will be directed towards the
              most recently deployed and saved smart contract in your system.
              This means that whenever you want to check the status of your
              Piggy Bank - be it the accumulated amount or the date when the
              funds become accessible - the dApp will reference the latest smart
              contract that you have deployed and stored in your browser&apos;s
              local storage.
            </div>
          </div>
          <CardFooter className="px-0 flex justify-end text-right gap-3 flex-col sm:flex-row">
            <CheckLockTimeOperation />
            <CheckLockedAmountOperation />
          </CardFooter>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-5 flex flex-col justify-between h-full">
          <CardTitle className="text-xl flex justify-between flex-col sm:flex-row">
            <div className="underline">Step 5</div>
            <div>Take the money out</div>
          </CardTitle>
          <div>
            <div className="mb-3">
              When you initially set up your Piggy Bank in the dApp, one of the
              key steps involved defining a specific date. This date is crucial
              as it marks the earliest point at which you are permitted to
              withdraw tokens from your Piggy Bank. This setup is a fundamental
              aspect of the Piggy Bank&apos;s functionality, designed to mimic
              the concept of a real-world savings account where funds are locked
              in for a predetermined period.
            </div>
            <div>
              If you wish to proceed with withdrawing tokens, you can initiate
              this process within the dApp interface. However, it&apos;s
              important to bear in mind that withdrawing tokens prior to the
              specified date is not possible. This restriction is in place to
              ensure that the fundamental principle of the Piggy Bank - saving
              over a set period - is maintained.
            </div>
          </div>
          <CardFooter className="px-0 flex justify-end text-right">
            <PayoutOperation />
          </CardFooter>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-5 flex flex-col justify-between h-full">
          <CardTitle className="text-xl flex justify-between flex-col sm:flex-row">
            <div>Manually change the smart contract</div>
          </CardTitle>
          <div>
            <div className="mb-3">
              Within the framework of the dApp, your most recently deployed
              smart contract is conveniently saved in the browser&apos;s local
              storage. This feature is designed to streamline your experience,
              eliminating the need for repetitive input of the smart contract
              address each time you interact with your Piggy Bank.
            </div>
            <div>
              However, the system is also built with flexibility in mind. If you
              find yourself in a situation where it becomes necessary or
              desirable to interact with a different Piggy Bank smart contract,
              the dApp accommodates this. You have the option to manually
              replace the currently saved smart contract address with the
              address of another Piggy Bank smart contract. This could be useful
              in various scenarios, such as if you wish to manage multiple Piggy
              Banks, or if you cleared the browser&apos; storage.
            </div>
          </div>
          <CardFooter className="px-0 flex justify-end text-right">
            <ChangeSmartContractOperation />
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
