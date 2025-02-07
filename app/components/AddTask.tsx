"use client"
import {AiOutlinePlusCircle} from "react-icons/ai";
import {BsStars } from "react-icons/bs";
import Modal from "@/app/components/Modal";
import React, {FormEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {getSuggestions} from "@/app/api/openai";
import {createNewGroceryItem, deleteGroceryList} from "@/app/api/list";

export interface AddTaskProps {
    listId: string;
}

const AddTask: React.FC<AddTaskProps> = ({ listId }) => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [openModelDelete, setOpenModelDelete] = React.useState(false);
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

        aiGroceryItems?.map(async (aiGroceryItem) => {
            if (aiGroceryItem.item || aiGroceryItem.name) {
                const name: string = aiGroceryItem.item ? aiGroceryItem.item : aiGroceryItem.name ? aiGroceryItem.name : "";
                await createNewGroceryItem({
                    "name": name,
                    "store": "",
                    "recipe": recipeItemValue,
                    "recipeMeasure": aiGroceryItem.quantity,
                    "quantity": "",
                }, listId)
            }
        })
        setOpenAIModal(false);
        setLoading(false);
        router.refresh();
    }

   const handleDeleteList = async (id?: string) => {
        if (id) {
            await deleteGroceryList(id)
            setOpenModelDelete(false);
            router.push("/");
        }
    }

    return(
        <div className="mt-5">
            <div>
                <button onClick={() => setModalOpen(true)}
                        className="btn btn-primary mr-5">Add New Item
                    <AiOutlinePlusCircle className='ml-2' size={18}/>
                </button>
                <button onClick={() => setOpenAIModal(true)}
                        className="btn btn-primary">Add Items from Recipe
                    <BsStars className='ml-2' size={18}/>
                </button>
                <button onClick={() => setOpenModelDelete(true)}
                        className="ml-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Delete List
                </button>
            </div>
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
                                <div
                                    className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
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

            <Modal isOpen={openModelDelete} setModalOpen={setOpenModelDelete}>
                <h3 className="text-lg">Confirm Delete List </h3>
                <div className="modal-action">
                    <button className="btn" onClick={() => handleDeleteList(listId)}>Yes</button>
                    <button onClick={() => setOpenModelDelete(false)}
                            className="btn">Close
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default AddTask;
