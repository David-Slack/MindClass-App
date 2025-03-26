import { collection, getDocs, Timestamp } from "firebase/firestore";
import {db} from "@/helpers/firebase/firebase";

export async function getCollection(collectionID) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionID));
        const data = [];
        querySnapshot.forEach((doc) => {
            const docData = doc.data();

            if (docData["publish_date"] instanceof Timestamp) {
                docData["publish_date"] = docData["publish_date"].toDate().toISOString();
            }

            data.push({ id: doc.id, ...docData });
        });

        return {
            props: {
                collection: data,
            },
        };
    } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        return {
            props: {
                collection: null,
            },
        };
    }
}
