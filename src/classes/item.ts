export interface ProcessedBazaarProduct {
  sellPrice: number | undefined;
  buyPrice: number | undefined;
}

export interface ProcessedBazaarData {
  [key: string]: ProcessedBazaarProduct;
}

interface ItemData {
    name: string;
    bazaar: boolean;
    id?: string;
    timeToCraft: number;
    resourcesRequired?: RecipeItem[];
}

interface RecipeItem {
    name: Items;
    amount: number;
}


export default class Items {
    private item: ItemData;

    constructor(item: ItemData) {
        this.item = item;
    }

    public getIfBazaar(): boolean {
        return this.item.bazaar;
    }

    public getName(): string {
        return this.item.name;
    }

    public getTimeToCraft(): number {
        return this.item.timeToCraft;
    }

    public getResources(): RecipeItem[] | undefined {
        return this.item.resourcesRequired;
    }

    public getAuctionSellPrice(auctionsData: Map<string, number>): number | undefined {
        return auctionsData.get(this.item.name);
    }

    public getBazaarSellPrice(bazaarData: ProcessedBazaarData): number | undefined {
        if (!this.item?.id) {
            return undefined;
        }

        return bazaarData[this.item.id]?.buyPrice;
    }

    public getBazaarBuyPrice(bazaarData: ProcessedBazaarData): number | undefined {
        if (!this.item?.id) {
            return undefined;
        }

        return bazaarData[this.item.id]?.sellPrice;
    }

    public getPartialMaterialCost(auctionsData: Map<string, number>, bazaarData: ProcessedBazaarData): number | undefined{
        if (!this.item.resourcesRequired) {
            return undefined
        }

        let price = 0;
        for (const mat of this.item.resourcesRequired) {
            const p = mat.name.getCost(auctionsData, bazaarData);
            if (p) price += p * mat.amount;
        }
        return price;
    }

    public getCost(auctionsData: Map<string, number>, bazaarData: ProcessedBazaarData): number | undefined {
        return this.getIfBazaar() ? this.getBazaarBuyPrice(bazaarData) : this.getAuctionSellPrice(auctionsData);
    }

    public getProfit(auctionsData: Map<string, number>, bazaarData: ProcessedBazaarData): number | undefined {
        const materialCost = this.getPartialMaterialCost(auctionsData, bazaarData);
        if(!materialCost) {
            return undefined
        }

        const itemCost = this.getCost(auctionsData, bazaarData);
        if (!itemCost) {
            return undefined
        }

        return itemCost - materialCost;
    }
}