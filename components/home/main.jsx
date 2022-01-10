import Image from "next/image";
import { useRouter } from "next/router";

export default function Main(props) {

    const { selectedCategory, posts } = props;
    const router = useRouter();

    const goToDetail = (e, obj) => {
        e.preventDefault();
        router.push({ pathname: '/detail/' + obj.id });
    }

    return (
        <div className="rightColumn" id="right-bar">
            <div className='pl20'>
                <h1 className='newclass'>{selectedCategory?.title ? selectedCategory.title : ''}<br /></h1>
                {/* <h1 className="s f600">Top Stories</h1> */}

                <div className="grid">
                    {posts && posts.length > 0 && posts.map((item, index) => (
                        <a onClick={(e) => goToDetail(e, item)} key={index} className="card">
                            <Image src={`/images/${item.image}`} width={300} height={250} />
                            <div>
                                <h2>{item.title ? item.title : ''} </h2>
                                <p>{item.content[0]['title'] ? item.content[0]['title'] : ''}</p>
                            </div>
                            <div className="btm-desc">
                                {item.views} &#128064; &nbsp; | &nbsp; {item.likes} &#128077; &nbsp; | &nbsp; &#128467; {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </div>
    )
}