"use server"

//import OpenAI from "openai";
import {AzureOpenAI} from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_ENDPOINT = process.env.OPENAI_API_ENDPOINT;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

const openai = new AzureOpenAI({
    apiVersion: '2024-08-01-preview',
    endpoint: OPENAI_API_ENDPOINT,
    // baseURL: OPENAI_API_ENDPOINT,
    apiKey: OPENAI_API_KEY
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
            model: OPENAI_MODEL as string,
        });

        const jsonString = completion.choices[0].message.content

        console.log(jsonString);

        const jsonStringExtract = extractJSONContent(jsonString)

        const parsedData  = jsonStringExtract != null ? JSON.parse(jsonStringExtract[0]) : [];

        console.log(parsedData);

        if (parsedData["items"]) {
            return parsedData["items"] as AIGroceryItem[];
        } else if (parsedData["grocery_items"]) {
            return parsedData["grocery_items"] as AIGroceryItem[];
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
