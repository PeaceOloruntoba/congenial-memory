import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useWalletStore } from '../../store/walletStore';

const WalletPage: React.FC = () => {
  const { balance, trialBonus, deposit, withdraw, bindAddress, boundAddress } = useWalletStore();
  const [amount, setAmount] = useState('');
  const [network, setNetwork] = useState('Ethereum ERC20');
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('');
  const [hasPin, setHasPin] = useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Balance</div>
            <div className="text-2xl font-semibold">€{balance.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Trial Bonus</div>
            <div className="text-lg">€{trialBonus.toFixed(2)}</div>
          </div>
        </div>
      </Card>

      <Card>
        <h4 className="font-medium">Deposit</h4>
        <div className="mt-2">
          <input className="border p-2 rounded w-full" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div className="flex space-x-2 mt-2">
            {[10,50,100,500,1000].map(v => <button key={v} onClick={() => setAmount(String(v))} className="px-3 py-1 bg-gray-100 rounded">{v}</button>)}
          </div>
          <div className="mt-3 flex space-x-2">
            <button onClick={() => setNetwork('Ethereum ERC20')} className={`px-3 py-2 rounded ${network==='Ethereum ERC20' ? 'bg-amber-100' : 'bg-gray-100'}`}>Ethereum ERC20</button>
            <button onClick={() => setNetwork('USDT TRC20')} className={`px-3 py-2 rounded ${network==='USDT TRC20' ? 'bg-amber-100' : 'bg-gray-100'}`}>USDT TRC20</button>
          </div>
          <div className="mt-3 text-right"><Button onClick={() => deposit(Number(amount) || 0)}>Proceed to Pay</Button></div>
        </div>
      </Card>

      <Card>
        <h4 className="font-medium">Withdrawal</h4>
        {!hasPin ? (
          <div className="mt-2">
            <div className="text-sm text-gray-600">Set a 6-digit withdrawal PIN first</div>
            <div className="mt-2 flex space-x-2"><input maxLength={6} value={pin} onChange={(e)=>setPin(e.target.value)} className="border p-2 rounded w-full" placeholder="6-digit PIN" /><Button onClick={()=>setHasPin(true)}>Set PIN</Button></div>
          </div>
        ) : (
          <div className="mt-2">
            <div>Bound address: {boundAddress?.address || 'Not bound'}</div>
            <div className="mt-2 flex space-x-2"><Button onClick={()=>withdraw(10)}>Withdraw €10</Button></div>
          </div>
        )}
      </Card>

      <Card>
        <h4 className="font-medium">Payout Binding</h4>
        <div className="mt-2">
          <select value={network} onChange={(e)=>setNetwork(e.target.value)} className="border p-2 rounded w-full">
            <option>Ethereum ERC20</option>
            <option>USDT TRC20</option>
          </select>
          <input className="border p-2 rounded w-full mt-2" placeholder="Paste wallet address" value={address} onChange={(e)=>setAddress(e.target.value)} />
          <input className="border p-2 rounded w-full mt-2" placeholder="Friendly tag name" />
          <div className="mt-3 text-right"><Button onClick={()=>bindAddress(network, address)}>Save</Button></div>
        </div>
      </Card>
    </div>
  );
};

export default WalletPage;
