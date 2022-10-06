export function getParameterCaseInsensitive<T = any>(
    object: Record<string, unknown>,
    key: string
): T {
    const asLowercase = key.toLowerCase();

    return object[
        Object.keys(object).find((k) => k.toLowerCase() === asLowercase)
    ] as T;
}
