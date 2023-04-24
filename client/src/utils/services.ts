import { ethers } from 'ethers';

export interface Appreciation {
  appreciator: string;
  amountAppreciated: string;
  appreciationQuantity: number;
}


interface AppreciationSummary {
  appreciator: string;
  amountAppreciated: string;
  appreciationQuantity: number;
}

  

export const Summation = (arrAppreciators: any): string | undefined => {
  if (arrAppreciators) {
    // Sum the amountAppreciated values in the array
    const totalAmount: string | number = arrAppreciators.reduce(
      (total: any, appreciation: any) => {
        const amount = ethers.utils.formatEther(appreciation.amountAppreciated);
        return total + parseFloat(amount);
      },
      0
    );

    const amount = totalAmount.toString();
    // Format the total amount as ETH with 4 decimal places
    const formattedTotal = parseFloat(amount).toFixed(4);

    return formattedTotal;
  }
};


export const summarizeAppreciations = (appreciations: Appreciation[]): Appreciation[] => {
  const summary: Record<string, Appreciation> = {};
  
  for (const appreciation of appreciations) {
    const { appreciator, amountAppreciated, appreciationQuantity } = appreciation;
    
    if (appreciator in summary) {
      const existing = summary[appreciator];
      existing.amountAppreciated = (parseFloat(existing.amountAppreciated) + parseFloat(amountAppreciated)).toString();
      existing.appreciationQuantity += appreciationQuantity;
    } else {
      summary[appreciator] = { appreciator, amountAppreciated, appreciationQuantity };
    }
  }
  
  return Object.values(summary);
}