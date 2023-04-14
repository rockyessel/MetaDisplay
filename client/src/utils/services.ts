

export const Summation = (arrAppreciators: any): string | undefined => {
  if (arrAppreciators) {
    // Sum the amountAppreciated values in the array
    const totalAmount: string | number = arrAppreciators.reduce(
      (total: any, appreciation: any) => {
        const amount = appreciation.amountAppreciated
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
