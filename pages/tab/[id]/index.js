import Head from 'next/head'
import SideBar from '../../../components/sidebar';
import Main from '../../../components/home/main';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Pages(props) {

    const { categories, category, posts } = props;
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [postsList, setPostsList] = useState(posts);
    const router = useRouter();

    useEffect(() => {
        if(Object.keys(selectedCategory).length > 0) {
            getPostsLists(selectedCategory.code);
        }
    }, [selectedCategory]);

    const getPostsLists = async (id) => {
        const res1 = await fetch(`${process.env.BASE_URI}/api/news/category/` + id);
        const res2 = await res1.json();
        setPostsList(res2.data);
    }

    const goToPost = (e) => {
        e.preventDefault();
        router.push({ pathname: '/post' });
    }

    return (
        <>
            <Head>
                <title>Newsletter | {selectedCategory?.title ? selectedCategory.title : ''}</title>
                <meta name="description" content="Newsletter Application For Test" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="row" width="100%">
                <SideBar data={categories} selectedCategory={selectedCategory} setSelectedCategory={(data) => setSelectedCategory(data)} />
                <Main posts={postsList} selectedCategory={selectedCategory} />
            </div>
            <div onClick={(e) => goToPost(e)} className='newpost'> + Add New Post</div>
        </>

    )
}

Pages.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${process.env.BASE_URI}/api/categories`);
    const { data } = await res.json();
    let data1 = data.filter(res1 => {
        let obj = res1.children.filter(res2 => {
            if(res2.code === id) {
                return res2;
            }
        });
        if(obj.length > 0) {
            return obj[0];
        }
    });
    let data2;
    let data3;
    if(data1 && data1.length > 0) {
        data2 = data1[0].children.filter(res => res.code === id)[0];
        const res1 = await fetch(`${process.env.BASE_URI}/api/news/category/` + id);
        const res2 = await res1.json();
        data3 = res2.data;
    }

    return { categories: data, category: data2, posts: data3 }
}
