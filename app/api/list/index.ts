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

export const deleteGroceryList = async (id: string): Promise<void> => {
    await deleteAllGroceryItems(id)
    await prisma.list.delete(
        {
            where: {
                id: id
            }
        }
    )
}

export const getAllLists = async (): Promise<IList[]> => {
    const lists = await prisma.list.findMany();

    const listArray : IList[] = JSON.parse(JSON.stringify(lists));
    return listArray
}

export const deleteGroceryItem = async (id: string): Promise<void> => {
    await prisma.grocery.delete(
        {
            where: {
                id: id
            }
        }
    )
}

export const deleteAllGroceryItems = async (listId: string): Promise<void> => {
    await prisma.grocery.deleteMany(
        {
            where: {
                listId: listId
            }
        }
    )
}

export const completeGroceryItem = async (id?: string): Promise<void> => {
    await prisma.grocery.update(
        {
            where: {
                id: id
            },
            data: {
                completed: true,
            }
        }
    )
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
