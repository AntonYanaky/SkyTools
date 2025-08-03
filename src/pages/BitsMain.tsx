import Header from '../components/Header.tsx';
import BitsData from '../components/BitsData.tsx'
import Footer from '../components/Footer.tsx'

export default function BitsMain() {
    return (  
        <div className='min-h-screen flex flex-col px-6 lg:px-12 bg-white dark:bg-black text-black dark:text-white'>
            <Header />
            <main className='flex-grow flex flex-col mt-8'>
                <h1 className="text-4xl text-center font-semibold">Bit Shop</h1>
                <BitsData />
            </main>
            <Footer />
        </div>
    );
}