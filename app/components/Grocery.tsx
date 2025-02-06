"use client"

import React, {FormEventHandler} from 'react';
import {IGrocery} from "@/types/grocery";
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from "@/app/components/Modal";
import {completeGroceryItem, deleteGroceryItem} from "@/app/api/api";
import {useRouter} from "next/navigation";
import {updateGroceryItem} from "@/app/api/list";

export interface GroceryProps {
    listId: string;
    grocery: IGrocery;
}

const Grocery: React.FC<GroceryProps> = ({grocery, listId}) => {
    const router = useRouter();
    const [openModelEdit, setOpenModelEdit] = React.useState(false);
    const [openModelDelete, setOpenModelDelete] = React.useState(false);
    const [itemToEdit, setItemToEdit] = React.useState<string>(grocery.name);
    const [storeToEdit, setStoreToEdit] = React.useState<string>(grocery.store);
    const [quantityToEdit, setQuantityToEdit] = React.useState<string>(grocery.quantity);

    const handleSubmitEditItem: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await updateGroceryItem({
            "id": grocery.id,
            "name": itemToEdit,
            "store": storeToEdit,
            "recipe": grocery.recipe,
            "recipeMeasure": grocery.recipeMeasure,
            "quantity": quantityToEdit
        }, listId);
        setItemToEdit("")
        setStoreToEdit("")
        setQuantityToEdit("")
        setOpenModelEdit(false);
        router.refresh();
    }

    const handleDeleteItem = async (id?: string) => {
        if (id) {
            await deleteGroceryItem(id)
            setOpenModelDelete(false);
            router.refresh();
        }
    }

    const strikethroughStyle = (isCompleted?: boolean) => {
        return isCompleted ? { textDecoration: 'line-through'} : {textDecoration: 'none'}
    }

    const markComplete = async (grocery: IGrocery): Promise<void> => {
        await completeGroceryItem(grocery);

        router.refresh();
    }

    return (
        <tr key={grocery.id}>
            <td onClick={() => markComplete(grocery)}>
                <p style={strikethroughStyle(grocery.completed)}>{grocery.name}</p></td>
            <td>{grocery.quantity}</td>
            <td>{grocery.recipe}</td>
            <td>{grocery.recipeMeasure}</td>
            <td>{grocery.store}</td>
            <td className={!grocery.completed ? 'flex gap-5' : 'visibility: hidden'}>
                <FiEdit cursor="pointer" className="text-blue-500"
                        onClick={() => setOpenModelEdit(true)}/>
                <Modal isOpen={openModelEdit} setModalOpen={setOpenModelEdit}>
                    <form method="dialog" onSubmit={handleSubmitEditItem}>
                        <h3 className="font-bold text-lg">Update Item</h3>
                        <div className="modal-action">
                            <input
                                value={itemToEdit}
                                onChange={(e) => setItemToEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"/>
                            <input
                                value={quantityToEdit}
                                onChange={(e) => setQuantityToEdit(e.target.value)}
                                type="text"
                                placeholder="Quantity"
                                className="input input-bordered"/>
                            <select className="select select-bordered w-full max-w-xs"
                                    value={storeToEdit}
                                    name="Store"
                                    onChange={(e) => setStoreToEdit(e.target.value)}>
                                <option disabled defaultValue=""></option>
                                <option>Costco</option>
                                <option>Walmart</option>
                            </select>
                            <button type="submit" className="btn">Submit</button>
                            <button type="button" onClick={() => setOpenModelEdit(false)}
                                    className="btn">Close
                            </button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 cursor="pointer" className="text-red-500"
                          onClick={() => setOpenModelDelete(true)}/>
                <Modal isOpen={openModelDelete} setModalOpen={setOpenModelDelete}>
                    <h3 className="text-lg">Confirm Delete Item </h3>
                    <div className="modal-action">
                        <button className="btn" onClick={() => handleDeleteItem(grocery.id)}>Yes</button>
                        <button onClick={() => setOpenModelDelete(false)}
                                className="btn">Close
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
};

export default Grocery;
