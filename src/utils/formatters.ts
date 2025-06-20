
export const formatEuro = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

export const trendArrow = (oldVal: number, newVal: number) => {
  const change = ((newVal - oldVal) / oldVal) * 100;
  return {
    icon: change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon',
    color: change >= 0 ? 'text-emerald-400' : 'text-red-400',
    value: Math.abs(change).toFixed(1)
  };
};
