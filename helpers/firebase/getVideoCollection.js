import { collection, getDocs, query, where, Timestamp, orderBy } from "firebase/firestore";
import {db} from "@/helpers/firebase/firebase";

export async function getVideoCollection(
    type = null
) {
    let queryConstraints = [
        where("live", "==", true),
        orderBy("title", "desc") // Index required for this combination
    ];

    if (type !== null) {
        queryConstraints.unshift(where("type", "==", type))
    }

    const q = query(
        collection(db, "videoResources"),
        ...queryConstraints
    );

    let querySnapshot = null;
    try {
        querySnapshot = await getDocs(q);

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
