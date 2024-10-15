
interface Deposit {
    description?: string; // Modify as per your actual data structure
  }
  
 export  interface WalletData {
    wallet_balance: string;
    transferable_balance: string;
    equivalent_money: string;
    deposits: {
      data: Deposit[];
    };
  }