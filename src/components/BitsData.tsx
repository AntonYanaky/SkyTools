import { useEffect, useState } from 'react';
import { getBazaarData } from '../api/bazaar';
import { getAuctionsData } from '../api/auction';

interface OrderSummary { 
    pricePerUnit: number; 
    amount: number; 
    orders: number; 
}

interface BazaarProduct { 
    product_id: string; 
    buy_summary: OrderSummary[]; 
    sell_summary: OrderSummary[]; 
}

interface BazaarData { 
    [key: string]: 
    BazaarProduct; 
}

interface ItemConfig {
  bits: number;
  bazaar: boolean;
  id?: string;
}

const ITEMS_TO_TRACK: Record<string, ItemConfig> = {
  'God Potion': { bits: 1500, bazaar: false },
  'Kismet Feather': { bits: 1350, bazaar: true, id: 'KISMET_FEATHER' },
  'Kat Flower': { bits: 500, bazaar: false },
  'Kat Bouquet': { bits: 2500, bazaar: false },
  'Heat Core': { bits: 3000, bazaar: false },
  'Hyper Catalyst Upgrade': { bits: 300, bazaar: false },
  'Ultimate Carrot Candy Upgrade': { bits: 8000, bazaar: false},
  'Colossal Experience Bottle Upgrade': { bits: 1200, bazaar: false},
  'Jumbo Backpack Upgrade': { bits: 4000, bazaar: false},
  'Minion Storage X-pender': { bits: 1500, bazaar: false},
  'Matriarch\'s Perfume': { bits: 1200, bazaar: false},
  'Hologram': { bits: 2000, bazaar: false},
  'Ditto Blob': { bits: 600, bazaar: false},
  'Builder\'s Wand': { bits: 12000, bazaar: false},
  'Block Zapper': { bits: 5000, bazaar: false},
  'Bits Talisman': { bits: 15000, bazaar: false},
  'Bitbug': { bits: 5000, bazaar: true, id: 'SHARD_BITBUG'},
  'Pocket Sack-in-a-Sack': { bits: 8000, bazaar: false },
  'Dungeon Sack': { bits: 14000, bazaar: false },
  'Rune Sack': { bits: 14000, bazaar: false },
  'Flower Sack': { bits: 14000, bazaar: false },
  'Dwarvern Sack': { bits: 14000, bazaar: false },
  'Crystal Hollows Sack': { bits: 14000, bazaar: false },
  'Portalizer': { bits: 4800, bazaar: false },
  'Abiphone Contacts Trio': { bits: 6450, bazaar: false },
  'Sumsung© G3 Abicase': { bits: 15000, bazaar: false },
  'Sumsung© GG Abicase': { bits: 25000, bazaar: false },
  'Rezar® Abicase': { bits: 26000, bazaar: false},
  'Blue™ but Red Abicase': { bits: 17000, bazaar: false},
  'Actually Blue™ Abicase': { bits: 17000, bazaar: false},
  'Blue™ but Green Abicase': { bits: 17000, bazaar: false},
  'Blue™ but Yellow Abicase': { bits: 17000, bazaar: false},
  'Lighter Blue™ Abicase': { bits: 17000, bazaar: false},
  'Autopet Rules 2-Pack': { bits: 21000, bazaar: false},
  'Pure Black Dye': { bits: 250000, bazaar: false},
  'Pure White Dye': { bits: 250000, bazaar: false},
  'Inferno Fuel Block': { bits: 75, bazaar: true, id: 'INFERNO_FUEL_BLOCK'},
  'Inferno Fuel Block x64': { bits: 56.25, bazaar: true, id: 'INFERNO_FUEL_BLOCK'},
  'Expertise 1': { bits: 4000, bazaar: true, id: 'ENCHANTMENT_EXPERTISE_1'},
  'Compact 1': { bits: 4000, bazaar: true, id: 'ENCHANTMENT_COMPACT_1'},
  'Cultivating 1': { bits: 4000, bazaar: true, id: 'ENCHANTMENT_CULTIVATING_1'},
  'Absorb 1': { bits: 4000, bazaar: true, id: 'ENCHANTMENT_ABSORB_1'},
  'Champion 1': { bits: 4000, bazaar: true, id: 'ENCHANTMENT_CHAMPION_1'},
  'Hecatomb 1': { bits: 6000, bazaar: true, id: 'ENCHANTMENT_HECATOMB_1'},
  'Toxophilite 1': { bits: 4000, bazaar: true, id: 'ENCHANTMENT_TOXOPHILITE_1'},
  'Speed Enrichment': { bits: 5000, bazaar: false },
  'Intelligence Enrichment': { bits: 5000, bazaar: false },
  'Critical Damage Enrichment': { bits: 5000, bazaar: false },
  'Critical Chance Enrichment': { bits: 5000, bazaar: false },
  'Strength Enrichment': { bits: 5000, bazaar: false },
  'Defense Enrichment': { bits: 5000, bazaar: false },
  'Health Enrichment': { bits: 5000, bazaar: false },
  'Magic Find Enrichment': { bits: 5000, bazaar: false },
  'Ferocity Enrichment': { bits: 5000, bazaar: false },
  'Sea Creature Chance Enrichment': { bits: 5000, bazaar: false },
  'Attack Speed Enrichment': { bits: 5000, bazaar: false },
  'Accessory Enrichment Swapper': { bits: 200, bazaar: false },
};

const getBazaarSellPrice = (bazaar: BazaarData, productID: string): number | null => {
  return bazaar[productID]?.buy_summary?.[0]?.pricePerUnit ?? null;
};

interface ProcessedItemData {
  name: string;
  bits: number;
  marketPrice: number | null;
  coinsPerBit: number | null;
}

export default function BitsData() {
  const [tableData, setTableData] = useState<ProcessedItemData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        console.log("Starting data fetch...");
        
        const [auctionsData, bazaarData] = await Promise.all([
          getAuctionsData(),
          getBazaarData(),
        ]);

        const cheapestBinPrices = new Map<string, number>();
        for (const auction of auctionsData) {
          if (auction.bin && auction.item_name) {
            const currentCheapest = cheapestBinPrices.get(auction.item_name);
            if (!currentCheapest || auction.starting_bid < currentCheapest) {
              cheapestBinPrices.set(auction.item_name, auction.starting_bid);
            }
          }
        }

        const processedData = Object.entries(ITEMS_TO_TRACK).map(([name, config]) => {
          let priceForCalc: number | null = null;
          let displayPrice: number | null = null;
          
          if (config.bazaar) {
            const bazaarId = config.id || name.toUpperCase().replace(/ /g, '_');
            const singlePrice = getBazaarSellPrice(bazaarData, bazaarId);
            
            priceForCalc = singlePrice;
            
            if (name.includes('x64') && singlePrice) {
                displayPrice = singlePrice * 64;
            } else {
                displayPrice = singlePrice;
            }
          } else {
            let cheapestPriceForThisItem: number | null = null;
            const normalizedTrackedName = name.replace(/’|'/g, "'");

            for (const [auctionItemName, auctionItemPrice] of cheapestBinPrices.entries()) {
              const normalizedAuctionName = auctionItemName.replace(/’|'/g, "'");
              if (normalizedAuctionName.startsWith(normalizedTrackedName)) {
                if (cheapestPriceForThisItem === null || auctionItemPrice < cheapestPriceForThisItem) {
                  cheapestPriceForThisItem = auctionItemPrice;
                }
              }
            }
            priceForCalc = cheapestPriceForThisItem;
            displayPrice = priceForCalc;
          }

          const coinsPerBit = priceForCalc ? priceForCalc / config.bits : null;

          return {
            name,
            bits: config.bits,
            marketPrice: displayPrice,
            coinsPerBit,
          };
        });
        
        processedData.sort((a, b) => {
          if (a.coinsPerBit === null) return 1;
          if (b.coinsPerBit === null) return -1;
          return b.coinsPerBit - a.coinsPerBit;
        });

        setTableData(processedData);
      } catch (err) {
        console.error("Failed to fetch SkyBlock data:", err);
        setError("Could not load market data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []); 

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={4} className="px-4 py-5 text-center">Loading SkyBlock data...</td>
        </tr>
      );
    }
    if (error) {
       return (
        <tr>
          <td colSpan={4} className="px-4 py-5 text-center text-red-500">{error}</td>
        </tr>
      );
    }
    if (!tableData || tableData.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="px-4 py-5 text-center">No item data available.</td>
        </tr>
      );
    }
    const baseTable = 'px-2 lg:px-4 py-5';
    return tableData.map((item) => (
      <tr key={item.name} className='border-t border-[#f38a32] dark:border-[#FDE9D8]'>
        <td className={baseTable}>{item.name}</td>
        <td className={baseTable}>{item.bits.toLocaleString()}</td>
        <td className={baseTable}>
          {item.coinsPerBit !== null
            ? Math.round(item.coinsPerBit).toLocaleString()
            : 'N/A'}
        </td>
        <td className={baseTable}>
          {item.marketPrice !== null
            ? item.marketPrice.toLocaleString()
            : 'N/A'}
        </td>
      </tr>
    ));
  };
  
  return (
    <div className="mt-8 bg-[#FDE9D8] dark:bg-[#602E06] rounded-md">
      <table className="w-full text-left table-fixed">
        <thead>
          <tr>
            <th className="px-2 lg:px-4 py-3">Item</th>
            <th className="px-2 lg:px-4 py-3">Bits Cost</th>
            <th className="px-2 lg:px-4 py-3">Coins/Bit</th>
            <th className="px-2 lg:px-4 py-3">Coins</th>
          </tr>
        </thead>
        <tbody>
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  );
}