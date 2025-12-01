export const filterBy = (prop: string, value: any) =>
    (tasks: any[]) => tasks.filter(t => t[prop] === value);

export const filterVencidas = (tasks: any[]) =>
    tasks.filter(t => t.fechaVencimiento && new Date(t.fechaVencimiento) < new Date());