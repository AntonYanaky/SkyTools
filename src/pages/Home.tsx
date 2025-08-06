import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

export default function Home() {
    return (  
        <div className='min-h-screen flex flex-col px-6 lg:px-12 bg-white dark:bg-black text-black dark:text-white'>
            <Header />
            <main className='flex-grow flex flex-col lg:mt-8'>
                <h1 className="text-2xl lg:text-4xl text-center font-semibold">Welcome to SkyTools! 🚀✨</h1>
                <div className="w-[14em] lg:w-[40vw] justify-center text-xl py-8 mx-auto">
                    <p>Want to get the most value from your bits in Hypixel SkyBlock? 🤑🧠</p>
                    <p className="mt-4">SkyTools tracks real-time market prices from the Bazaar and Auction House to help you find the best bit flips, boost your profit, and stay ahead in the game! 📈💸</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
 