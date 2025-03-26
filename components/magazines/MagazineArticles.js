import {useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/helpers/firebase/firebase";
import Image from "next/image";

export function MagazineArticles() {
    const collectionType = "resources"; // Magazine articles are called resources in the DB
    const [magazine, setMagazine] = useState([]);

    (async (collectionType) => {
        const querySnapshot = await getDocs(collection(db, collectionType));
        setMagazine(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    })(collectionType);

    return (
        <>
            { magazine.map((item) => (
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
    );
}
