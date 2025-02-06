"use server"

import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

interface AIGroceryItem {
    item: string;
    quantity: string;
}

export const getSuggestions = async (userInput:string): Promise<AIGroceryItem[]> => {
    try {

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `You are a helpful AI chat assistant.` },
                {role: "user", content: `Suggest grocery items based on this recipe. 
                Return only json response with the list of items and their quantities. ${userInput}`}],
            model: "deepseek-chat",
        });

        const jsonString = completion.choices[0].message.content

        const jsonStringExtract = extractJSONContent(jsonString)

        const parsedData = jsonStringExtract != null ? JSON.parse(
            JSON.stringify(jsonStringExtract)) : [];

        if (Array.isArray(parsedData.items)) {
            return parsedData.items;
        } else if (Array.isArray(parsedData["grocery_items"])) {
            return parsedData["grocery_items"];
        } else {
            console.error("No valid array found under 'items' or 'grocery_items'");
            return [];
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
};

function extractJSONContent(text?: string | null) {
    const regex = /```json\s*([\s\S]*?)\s*```/g;
    const matches = [];
    let match;

    while ((match = regex.exec(<string>text)) !== null) {
        matches.push(match[1].trim());
    }

    return matches;
}
