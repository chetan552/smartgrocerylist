import AddTask from "./components/AddTask";
import GroceryList from "@/app/components/GroceryList";
import {getAllGroceries} from "@/app/api/api";
import {IGrocery} from "@/types/grocery";

export default async function Home() {
    //const groceries: IGrocery[] = await getAllGroceries();
    return (
        <main className='max-w-4xl mx-auto mt-4'>
            <div className='text-center my-5 flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>
                    Smart Shopper App
                </h1>
                <AddTask/>
            </div>
            {/*<GroceryList groceries={groceries} />*/}
        </main>
    );
}
