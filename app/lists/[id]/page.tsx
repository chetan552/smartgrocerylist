"use server"

import prisma from "@/lib/prisma";
import AddTask from "@/app/components/AddTask";
import GroceryList from "@/app/components/GroceryList";
import {IGrocery} from "@/types/grocery";

export default async function ListGroceries({ params }: {
    params: Promise<{ id: string }>
}) {
    const listId = (await params).id

    const listWithGroceries = await prisma.list.findUnique({
        where: {
            id: String(listId),
        },
        select: {
            name: true,
            groceries: {
                orderBy:{
                    updatedAt: 'desc'
                },
                select: {
                    id:true,
                    name: true,
                    completed: true,
                    recipe: true,
                    recipeMeasure: true,
                    store: true,
                    quantity: true,
                    listId: true
                },
            },
        },
    });

    const parsedData: IGrocery[] = JSON.parse(JSON.stringify(listWithGroceries?.groceries));

    return (
        <main className='max-w-4xl mx-auto mt-4'>
            <div className='text-center my-5 flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>
                    {listWithGroceries?.name}
                </h1>
                <AddTask listId={listId}/>
            </div>
            <GroceryList listId = {listId} groceries={parsedData}/>
        </main>
    )
}
