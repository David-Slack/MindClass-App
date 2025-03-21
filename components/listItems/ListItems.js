"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import {db} from "@/helpers/firebase/firebase";
import Image from "next/image";

const ListItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, "resources"));
            setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        fetchItems().then();
    }, []);

    return (
        <>
            {items.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <Image
                        src={item.image}
                        alt={item.title}
                        height={0}
                        width={150}
                        style={{ height: "auto", width: "100%", maxWidth: "500px" }}
                    />
                </div>
            ))}
            </>
    )
}

export default ListItems
