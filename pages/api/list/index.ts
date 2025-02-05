"use server"

import prisma from "@/lib/prisma";
import {IList} from "@/types/lists";

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
