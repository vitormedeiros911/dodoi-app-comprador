export const formatDate = (date: Date) => {
  date = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export const formatDateTime = (date: Date, adjust: boolean = false) => {
  const adjustedDate = new Date(date);

  if (adjust) adjustedDate.setHours(adjustedDate.getHours() - 3);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(adjustedDate);

  return formattedDate;
};
