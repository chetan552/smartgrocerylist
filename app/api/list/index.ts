"use server"

import prisma from "@/lib/prisma";
import {IList} from "@/types/lists";
import {IGrocery} from "@/types/grocery";

export const createNewList = async (name: string): Promise<void> => {
    await prisma.list.create({
        data: {
            name: name
        }
    });
}

export const getAllLists = async (): Promise<IList[]> => {
    const lists = await prisma.list.findMany();

    const listArray : IList[] = JSON.parse(JSON.stringify(lists));
    return listArray
}

export const createNewGroceryItem = async (grocery: IGrocery, listId: string): Promise<void> => {
    await prisma.grocery.create({
        data: {
            name: grocery.name,
            listId: listId,
            quantity: grocery.quantity,
            store: grocery.store,
            recipe: grocery.recipe,
            recipeMeasure: grocery.recipeMeasure
        }
    });
}

export const updateGroceryItem = async (grocery: IGrocery, listId: string): Promise<void> => {
    await prisma.grocery.update({
        where:{
            id: grocery.id,
            listId: listId,
        },
        data: {
            name: grocery.name,
            listId: listId,
            quantity: grocery.quantity,
            store: grocery.store,
            recipe: grocery.recipe,
            recipeMeasure: grocery.recipeMeasure
        }
    });
}
