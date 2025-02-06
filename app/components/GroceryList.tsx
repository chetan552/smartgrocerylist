import {IGrocery} from "@/types/grocery";
import Grocery from "@/app/components/Grocery";
import React from "react";

interface GroceryListProps {
    listId: string;
    groceries?: IGrocery[]
}

const GroceryList: React.FC<GroceryListProps> = ({groceries, listId}) => {
    return (
        <div>
            <div className="h-96 overflow-x-auto mb-18">
            <table className="table table-s table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Recipe</th>
                    <th>Recipe Measure</th>
                    <th>Store</th>
                </tr>
                </thead>
                <tbody>
                {
                    groceries?.map((grocery: IGrocery) => {
                            if (!grocery.completed) {
                                return <Grocery key={grocery.id} grocery={grocery} listId={listId}/>
                            }
                        }
                    )
                }
                </tbody>
            </table>
            </div>
            <div className="divider">Completed</div>

            <div className="h-96 overflow-x-auto">
            <table className="table table-s table-pin-cols">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Recipe</th>
                    <th>Recipe Measure</th>
                    <th>Store</th>
                </tr>
                </thead>
                <tbody>
                {
                    groceries?.map((grocery: IGrocery) => {
                            if (grocery.completed) {
                                return <Grocery key={grocery.id} grocery={grocery} listId={listId}/>
                            }
                        }
                    )
                }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default GroceryList;
