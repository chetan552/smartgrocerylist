"use server"

import {GetServerSideProps} from "next";
import prisma from "@/lib/prisma";
import Sidebar from "@/app/components/Sidebar";
import AddTask from "@/app/components/AddTask";
import GroceryList from "@/app/components/GroceryList";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const listWithGroceries = await prisma.list.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            groceries: {
                select: {
                    name: true,
                    completed: true,
                    recipe: true,
                    recipeMeasure: true,
                    store: true,
                },
            },
        },
    });
    return {
        props: {
            listWithGroceries
        },
    };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const ListGroceries = ({listWithGroceries}) => {
    return (
        <div className="flex">
            <Sidebar/>
            <main className='max-w-4xl mx-auto mt-4'>
                <div className='text-center my-5 flex flex-col gap-4'>
                    <h1 className='text-2xl font-bold'>
                        Smart Shopper App
                    </h1>
                    <AddTask/>
                </div>
                <GroceryList groceries={listWithGroceries.groceries}/>
            </main>
        </div>
    )
}

export default ListGroceries
