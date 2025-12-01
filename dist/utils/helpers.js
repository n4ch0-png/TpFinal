export const nowISO = () => new Date().toISOString();
export const formatDateISO = (iso) => {
    if (!iso)
        return "Sin datos";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? "Inválida" : d.toLocaleString();
};
