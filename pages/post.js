import Head from 'next/head'
import SideBar from '../components/sidebar';
import PostData from '../components/post/postdata';
import { useState } from 'react';

export default function Post(props) {

    const { categories, authors } = props;
    const [selectedCategory, setSelectedCategory] = useState({});

    return (
        <>
            <Head>
                <title>Newsletter | Post Data</title>
                <meta name="description" content="Newsletter Application For Test" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="row" width="100%">
                <SideBar data={categories} selectedCategory={selectedCategory} setSelectedCategory={(data) => setSelectedCategory(data)} />
                <PostData data={categories} authors={authors} />
            </div>
        </>

    )
}

Post.getInitialProps = async (query) => {
    const res = await fetch(`${process.env.BASE_URI}/api/categories`);
    const { data } = await res.json();

    const res1 = await fetch(`${process.env.BASE_URI}/api/author`);
    const data1 = await res1.json();

    return { categories: data, authors: data1.data };
}
