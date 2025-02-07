"use client"
import {AiOutlinePlusCircle} from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import Modal from "@/app/components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {getSuggestions} from "@/app/api/openai";
import {createNewGroceryItem} from "@/app/api/list";

export interface AddTaskProps {
    listId: string;
}

const AddTask: React.FC<AddTaskProps> = ({ listId }) => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newItemValue, setNewItemValue] = useState<string>("");
    const [newItemStoreValue, setNewItemStoreValue] = useState<string>("");
    const [newItemQuantity, setNewItemQuantity] = useState<string>("1");

    const [openAIModal, setOpenAIModal] = React.useState(false);
    const [recipeItemValue, setRecipeItemValue] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const handleSubmitNewItem: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await createNewGroceryItem({
            "name": newItemValue,
            "store": newItemStoreValue,
            "recipe": "",
            "recipeMeasure": "",
            "quantity": newItemQuantity,
        }, listId)
        setNewItemValue("");
        setNewItemStoreValue("");
        setNewItemQuantity("");
        setModalOpen(false);
        router.refresh();
    }

    const handleAIGrocersSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);

        const aiGroceryItems = await getSuggestions(recipeItemValue);

        console.log("got the list: " + JSON.stringify(aiGroceryItems));

        aiGroceryItems?.map(async (aiGroceryItem) => {
            await createNewGroceryItem({
                "name": aiGroceryItem.item,
                "store": "",
                "recipe": recipeItemValue,
                "recipeMeasure": aiGroceryItem.quantity,
                "quantity": "",
            }, listId)
        })
        setOpenAIModal(false);
        setLoading(false);
        router.refresh();
    }

    return(
        <div className="mt-5">
            <button onClick={() => setModalOpen(true)}
                    className="btn btn-primary mr-5">Add New Item
                <AiOutlinePlusCircle className='ml-2' size={18}/>
            </button>
            <button onClick={() => setOpenAIModal(true)}
                    className="btn btn-primary">Add Items from Recipe
                <BsStars className='ml-2' size={18}/>
            </button>

            <Modal isOpen={openAIModal} setModalOpen={setOpenAIModal}>
                <form method="dialog" onSubmit={handleAIGrocersSubmit}>
                    <h3 className="font-bold text-lg">Enter Recipe</h3>
                    <div className="modal-action">
                        <input
                            value={recipeItemValue}
                            onChange={(e) => setRecipeItemValue(e.target.value)}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"/>
                        <button type="submit" className="btn" disabled={loading}>Get Recipe Items</button>
                        <button type="button" onClick={() => setOpenAIModal(false)}
                                className="btn">Close
                        </button>

                        {loading && (
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </form>
            </Modal>

            <Modal isOpen={modalOpen} setModalOpen={setModalOpen}>
                <form method="dialog" onSubmit={handleSubmitNewItem}>
                    <h3 className="font-bold text-lg">Add New Item</h3>
                    <div className="modal-action">
                        <input
                            value={newItemValue}
                            onChange={(e) => setNewItemValue(e.target.value)}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"/>
                        <input
                            value={newItemQuantity}
                            onChange={(e) => setNewItemQuantity(e.target.value)}
                            type="text"
                            placeholder="Quantity"
                            className="input input-bordered w-24"/>
                        <select className="select select-bordered w-32"
                                value={newItemStoreValue}
                                name="Store"
                                onChange={(e) => setNewItemStoreValue(e.target.value)}>
                            <option disabled defaultValue=""></option>
                            <option>Costco</option>
                            <option>Walmart</option>
                        </select>
                        <button type="submit" className="btn">Submit</button>
                        <button type="button" onClick={() => setModalOpen(false)}
                                className="btn">Close
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddTask;
