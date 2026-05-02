import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { formatContractError } from '../lib/mockData';
import { useToast } from '../components/ui/Toast';

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

type WalletContextValue = {
  address: string | null;
  chainId: string | null;
  networkName: string;
  isConnected: boolean;
  isWrongNetwork: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToLocalhost: () => Promise<void>;
};

const WalletContext = createContext<WalletContextValue | null>(null);
const LOCAL_CHAIN = '0x7a69';

const chainName = (chainId: string | null) => (chainId === LOCAL_CHAIN ? 'Localhost 8545' : chainId ? `Chain ${parseInt(chainId, 16)}` : 'Not connected');

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const { showToast } = useToast();

  const connect = useCallback(async () => {
    try {
      if (!window.ethereum) {
        showToast('error', 'MetaMask is not installed. Install it to connect your wallet.');
        return;
      }
      const accounts = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
      const currentChain = (await window.ethereum.request({ method: 'eth_chainId' })) as string;
      setAddress(accounts[0] ?? null);
      setChainId(currentChain);
      showToast('success', 'Wallet connected');
    } catch (error) {
      showToast('error', formatContractError(error));
    }
  }, [showToast]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setChainId(null);
    showToast('info', 'Wallet disconnected');
  }, [showToast]);

  const switchToLocalhost = useCallback(async () => {
    try {
      if (!window.ethereum) {
        showToast('error', 'MetaMask is not installed. Install it to switch networks.');
        return;
      }
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: LOCAL_CHAIN }] });
      setChainId(LOCAL_CHAIN);
      showToast('success', 'Switched to Localhost 8545');
    } catch (error) {
      showToast('error', formatContractError(error));
    }
  }, [showToast]);

  const value = useMemo(
    () => ({
      address,
      chainId,
      networkName: chainName(chainId),
      isConnected: Boolean(address),
      isWrongNetwork: Boolean(address && chainId !== LOCAL_CHAIN),
      connect,
      disconnect,
      switchToLocalhost,
    }),
    [address, chainId, connect, disconnect, switchToLocalhost],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used inside WalletProvider');
  return context;
}
