export const initializeOptions = (options: string[]): Record<string, boolean> => {
    return options.reduce((acc, option) => ({ ...acc, [option]: false }), {})
};