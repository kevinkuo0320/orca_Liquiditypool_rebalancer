interface BalanceResponse {
    balance: number;
  }
  

export async function fetchBalance(): Promise<BalanceResponse> {
  try {
    const response = await fetch('/api/balances/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as BalanceResponse;
  } catch (error) {
    console.error('Error fetching positions:', error);
    return { balance: 0 };
  }
} 