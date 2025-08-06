interface Auction {
  bin?: boolean;
  item_name?: string;
  starting_bid: number;
}

export const getAuctionsData = async (): Promise<Map<string, number>> => {
  try {
    const cheapestBinPrices = new Map<string, number>();

    const processAuctions = (auctions: Auction[]) => {
      for (const auction of auctions) {
        if (auction.bin && auction.item_name) {
          const currentCheapest = cheapestBinPrices.get(auction.item_name);
          if (!currentCheapest || auction.starting_bid < currentCheapest) {
            cheapestBinPrices.set(auction.item_name, auction.starting_bid);
          }
        }
      }
    };

    const firstPageResponse = await fetch('https://api.hypixel.net/v2/skyblock/auctions');
    if (!firstPageResponse.ok) {
      throw new Error(`API request failed with status ${firstPageResponse.status}`);
    }
    const firstPageData = await firstPageResponse.json();
    const totalPages: number = firstPageData.totalPages;

    console.log("Processing page 0...");
    processAuctions(firstPageData.auctions);

    if (totalPages > 1) {
      const pagePromises = [];
      for (let pageNum = 1; pageNum < totalPages; pageNum++) {
        const promise = fetch(`https://api.hypixel.net/v2/skyblock/auctions?page=${pageNum}`)
          .then(res => {
            if (!res.ok) {
              console.error(`Failed to fetch page ${pageNum}, status: ${res.status}`);
              return { auctions: [] };
            }
            return res.json();
          })
          .then(pageData => {
            processAuctions(pageData.auctions);
            console.log(`Finished processing page ${pageNum}`);
          });
        pagePromises.push(promise);
      }
      
      await Promise.all(pagePromises);
    }
    
    console.log("All pages processed.");
    return cheapestBinPrices;

  } catch (error) {
    console.error("Failed to fetch and process auction data:", error);
    return new Map<string, number>();
  }
};