"use client"
import Link from 'next/link';
import {AiOutlinePlusCircle} from "react-icons/ai";
import React, {FormEventHandler, useEffect, useState} from "react";
import Modal from "@/app/components/Modal";
import {useRouter} from "next/navigation";
import {createNewList, getAllLists} from "@/app/api/list";
import {IList} from "@/types/lists";
import {useSession} from "next-auth/react";

const Sidebar = () => {
    const router = useRouter();
    const [listAddModalOpen, setListAddModalOpen] = useState<boolean>(false);
    const [newItemValue, setNewItemValue] = useState<string>("");
    const [listValues, setListValues] = useState<IList[]>([]);

    const { data: session } = useSession()

    useEffect(() => {
        const fetchLists = async () => {
            const lists = await getAllLists()
            setListValues(lists)
        }
        fetchLists();
    }, [newItemValue]);

    const handleSubmitNewList: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await createNewList(newItemValue)

        setNewItemValue("");
        setListAddModalOpen(false);
        router.refresh();
    }

    return (
        <>
            {session ? (
                    <div className="bg-gray-800 text-white h-screen w-64 p-4">
                        <h2 className="text-xl font-bold mb-4">
                            <Link href={"/"}>
                                Smart Grocery List
                            </Link>
                        </h2>
                        <ul>
                            <li className="mb-2">
                                <button onClick={() => setListAddModalOpen(true)}
                                        className="btn btn-primary mb-5"> Add List
                                    <AiOutlinePlusCircle className='' size={18}/>
                                </button>
                                <h2 className='text-xl font-bold'>Lists</h2>

                                <ul className="menu w-50">
                                    {listValues?.map((listValue) =>
                                        <li key={listValue.id}>
                                            <Link key={listValue.id} href={`/lists/${listValue.id}`}>
                                                {listValue.name}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                                <Modal isOpen={listAddModalOpen} setModalOpen={setListAddModalOpen}>
                                    <form method="dialog" onSubmit={handleSubmitNewList}>
                                        <h3 className="font-bold text-lg">Add New Item</h3>
                                        <div className="modal-action">
                                            <input
                                                value={newItemValue}
                                                onChange={(e) => setNewItemValue(e.target.value)}
                                                type="text"
                                                placeholder="Type here"
                                                className="input input-bordered w-full"/>

                                            <button type="submit" className="btn">Submit</button>
                                            <button type="button" onClick={() => setListAddModalOpen(false)}
                                                    className="btn">Close
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            </li>
                            {/* Add more links as needed */}
                        </ul>
                    </div>
                ) : <div></div>
            }
        </>
    );
};

export default Sidebar;
