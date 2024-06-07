'use client';
import Wallet from './homepage/Wallet';

export default function Home() {
  return (
    <div>
      <main>
        <div>
          {' '}
          {/*className="flex flex-row"*/}
          <Wallet className="p-8" />
        </div>
      </main>
    </div>
  );
}
