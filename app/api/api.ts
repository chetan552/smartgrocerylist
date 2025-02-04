import {IGrocery} from "@/types/grocery";

const baseUrl = 'http://localhost:3001';

export const getAllGroceries = async (): Promise<IGrocery[]> => {
    const response = await fetch(`${baseUrl}/groceries`, { cache: "no-store" });

    return await response.json();
}

export const addNewGroceryItem = async (item: IGrocery): Promise<IGrocery> => {
    const response = await fetch(`${baseUrl}/groceries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })

    return await response.json();
}

export const completeGroceryItem = async (item: IGrocery): Promise<IGrocery> => {
    item.completed = true;
    const response = await fetch(`${baseUrl}/groceries/${item.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })

    return await response.json();
}

export const updateNewGroceryItem = async (item: IGrocery): Promise<IGrocery> => {
    const response = await fetch(`${baseUrl}/groceries/${item.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })

    return await response.json();
}

export const deleteGroceryItem = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/groceries/${id}`, {
        method: 'DELETE'
    })
}
