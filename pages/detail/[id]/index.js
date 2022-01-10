import Head from 'next/head'
import SideBar from '../../../components/sidebar';
import PostDetails from '../../../components/detail/postdetails';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Detail(props) {

    const { categories, details } = props;
    const [selectedCategory, setSelectedCategory] = useState({});
    const router = useRouter();

    const goToPost = (e) => {
        e.preventDefault();
        router.push({ pathname: '/post' });
    }

    return (
        <>
            <Head>
                <title>Newsletter | {details?.title ? details.title : ''}</title>
                <meta name="description" content="Newsletter Application For Test" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="row" width="100%">
                <SideBar data={categories} selectedCategory={selectedCategory} setSelectedCategory={(data) => setSelectedCategory(data)} />
                <PostDetails details={details} />
            </div>
            <div onClick={(e) => goToPost(e)} className='newpost'> + Add New Post</div>
        </>

    )
}

Detail.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${process.env.BASE_URI}/api/categories`);
    const { data } = await res.json();

    const res1 = await fetch(`${process.env.BASE_URI}/api/news/` + id);
    const res2 = await res1.json();

    return { categories: data, details: res2.data };
}
