import {getItem} from "@/helpers/firebase/getItem";

export async function getServerSideProps(context) {
    const { id } = context.params;
    return getItem(id, "resources");
}

export default function ArticlePage({ article }) {
    if (!article || article.live === false) {
        return <div>Article not found.</div>;
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
        </div>
    );
}
