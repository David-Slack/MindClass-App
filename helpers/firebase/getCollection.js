import { collection, getDocs, query, where, Timestamp, orderBy } from "firebase/firestore";
import {db} from "@/helpers/firebase/firebase";

export async function getCollection(
    collectionID="resources",
    sortBy = "publish_date",
    live=true
) {
    let querySnapshot = null;
    try {
        if(live===true){
            const q = query(
                collection(db, collectionID),
                where("live", "==", true),
                orderBy(sortBy, "desc") // THIS CAUSES A NEED FOR AN INDEX
            );
            querySnapshot = await getDocs(q);
        }else{
            querySnapshot = await getDocs(collection(db, collectionID));
        }

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
