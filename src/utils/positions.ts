import { Position } from '@/types/Position';

interface PositionsResponse {
  positions: Position[];
}

export async function fetchPositions(): Promise<PositionsResponse> {
  try {
    const response = await fetch('/api/positions/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as PositionsResponse;
  } catch (error) {
    console.error('Error fetching positions:', error);
    return { positions: []};
  }
} 