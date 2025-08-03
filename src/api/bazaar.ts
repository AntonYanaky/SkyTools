export const getBazaarData = async () => {
    try {
        const response = await fetch('https://api.hypixel.net/v2/skyblock/bazaar');

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data = await response.json();
        return data.products;
    } catch (error) {
    console.error(error);
    return {};
    }
};