export const filterBy = (prop, value) => (tasks) => tasks.filter(t => t[prop] === value);
export const filterVencidas = (tasks) => tasks.filter(t => t.fechaVencimiento && new Date(t.fechaVencimiento) < new Date());
