export const nowISO = (): string => new Date().toISOString();

export const formatDateISO = (iso: string | null) => {
  if (!iso) return "Sin datos";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "Inválida" : d.toLocaleString();
};
