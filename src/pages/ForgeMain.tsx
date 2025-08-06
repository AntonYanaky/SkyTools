import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import ForgeData from '../components/ForgeData.tsx';

export default function ForgeMain() {
    return (  
        <div className='min-h-screen flex flex-col px-6 lg:px-12 bg-white dark:bg-black text-black dark:text-white'>
            <Header />
            <main className='flex-grow flex flex-col lg:mt-8'>
                <h1 className="text-2xl lg:text-4xl text-center font-semibold">Forge Flips</h1>
                <ForgeData />
            </main>
            <Footer />
        </div>
    );
}
 