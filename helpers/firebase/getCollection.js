import { collection, getDocs, query, where, Timestamp, orderBy, limit } from "firebase/firestore";
import {db} from "@/helpers/firebase/firebase";

export async function getCollection({
        collectionID= "resources",
        sortBy = "publish_date",
        live= true,
        limitNumber = 0,
        returnKey = "collection"
    } = {}) {
    let querySnapshot = null;
    try {
        let q = collection(db, collectionID);

        if (live === true) {
            q = query(
                q,
                where("live", "==", true),
                orderBy(sortBy, "desc") // THIS CAUSES A NEED FOR AN INDEX
            );
        } else {
            q = query(q, orderBy(sortBy, "desc")); // Still order even if not live
        }

        // Add the limit if limitNumber is greater than 0
        if (limitNumber > 0) {
            q = query(q, limit(limitNumber));
        }

        querySnapshot = await getDocs(q);

        const data = [];
        querySnapshot.forEach((doc) => {
            const docData = doc.data();

            if (docData["publish_date"] instanceof Timestamp) {
                docData["publish_date"] = docData["publish_date"].toDate().toISOString();
            }

            if (docData["modules"]) {
                docData.modules = null;
            }

            if (docData["expert"]) {
                docData.expert = null;
            }

            data.push({ id: doc.id, ...docData });
        });

        return {
            props: {
                [returnKey]: data,
            },
        };
    } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        return {
            props: {
                [returnKey]: null,
            },
        };
    }
}
