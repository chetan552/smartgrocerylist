"use server"

import prisma from "@/lib/prisma";
import {IList} from "@/types/lists";
import {IGrocery} from "@/types/grocery";

interface User {
    id: string;
    name: string;
    email: string;
}

export const findUser = async (name?: string | null, email?: string | null): Promise<string | null> => {
    if (!name || !email) {
       return null
    }

    const user = await getUser(email);
    if (user) {
        return user.id;
    }

    const createdUser = await createNewUser(name, email);

    return JSON.parse(JSON.stringify(createdUser)).id;
}

export const createNewUser = async (name?: string | null, email?: string | null): Promise<void> => {
    if (name && email) {
        await prisma.user.create({
            data: {
                name: name,
                email: email
            }
        });
    }
}

export const getUser = async (email?: string | null): Promise<User | null> => {
    if (!email) {
        return null
    }
    const user = await prisma.user.findFirst({
        where: {
            email: email
        },
        select: {
            name: true,
            id: true,
            email: true
        }
    });

    return JSON.parse(JSON.stringify(user));
}

export const createNewList = async (name: string, userId: string): Promise<void> => {
    await prisma.list.create({
        data: {
            name: name,
            userId: userId
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

export const getAllLists = async (id: string): Promise<IList[]> => {
    const lists = await prisma.list.findMany(
        {
            where: {
                userId: id
            }
        }
    );

    return JSON.parse(JSON.stringify(lists));
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
