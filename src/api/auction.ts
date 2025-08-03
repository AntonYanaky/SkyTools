export const getAuctionsData = async () => {
  try {
    const firstPageResponse = await fetch('https://api.hypixel.net/v2/skyblock/auctions');
    if (!firstPageResponse.ok) {
      throw new Error(`${firstPageResponse.status}`);
    }
    const firstPageData = await firstPageResponse.json();
    
    const allAuctions = firstPageData.auctions;
    const totalPages = firstPageData.totalPages;

    if (totalPages <= 1) {
      return allAuctions;
    }

    const pagePromises = [];
    for (let pageNum = 1; pageNum < totalPages; pageNum++) {
      pagePromises.push(
        fetch(`https://api.hypixel.net/v2/skyblock/auctions?page=${pageNum}`)
          .then(res => res.json())
      );
    }

    const otherPagesData = await Promise.all(pagePromises);

    const remainingAuctions = otherPagesData.flatMap(pageData => pageData.auctions);

    return [...allAuctions, ...remainingAuctions];

  } catch (error) {
    console.error("Failed to fetch all auction data:", error);
    return [];
  }
};
