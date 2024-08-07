export const formatMoney = (amount: number) => {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export const formatEnergy = (amount: number) => {
    return amount + " MWh";
};
