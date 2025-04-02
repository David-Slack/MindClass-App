import {doc, getDoc, getFirestore, Timestamp} from "firebase/firestore";
import firebaseApp from "@/helpers/firebase/firebase";

export async function getItem(
        id,
        collectionID="resources"
    ){
    try {
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, collectionID, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const articleData = { id: docSnap.id, ...docSnap.data() };

            if (articleData.publish_date instanceof Timestamp) {
                articleData.publish_date = articleData.publish_date.toDate().toISOString();
            }

            return {
                props: {
                    article: articleData,
                },
            };
        } else {
            return {
                notFound: true,
            };
        }
    } catch (error) {
        console.error("Error fetching article:", error);
        return {
            notFound: true,
        };
    }
}
