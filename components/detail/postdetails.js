import Image from "next/image";

export default function PostDetails(props) {

    const { details } = props;

    return (
        <div className="rightColumn" id="right-bar">
            <div className='pl20'>
                <h1 className='newclass'>{details?.title ? details.title : ''}<br /></h1>
                <div className='image-container'>
                    <Image src={`/images/${details?.image}`} layout="fill" className={'image'} />
                </div>
                <br />
                <div>
                    &#128064; Views &nbsp; - &nbsp; {details?.views} &nbsp;&nbsp; | &nbsp;&nbsp; &#128077; Likes &nbsp; - &nbsp; {details?.likes} &nbsp;&nbsp; | &nbsp;&nbsp; &#128467; Posted Date &nbsp; - &nbsp; {new Date(details?.createdAt).toLocaleDateString()}
                </div>
                {details?.content && details.content.length > 0 && details.content.map((item, index) => (
                    <p className="content-desc" key={index} style={item.style == 'Italics' ? { fontStyle: "italic", fontSize: item.fontsize } : item.style == 'Bold' ? { fontWeight: 600, fontSize: item.fontsize } : { fontSize: item.fontsize }}>{item.title} <br /></p>
                ))}
                <div className="grid">
                    {/* {posts && posts.length > 0 && posts.map((item, index) => (
                        <a key={index} className="card">
                            <Image src={`/images/${item.image}`} width={300} height={250} />
                            <div>
                                <h2>{item.title ? item.title : ''}  &rarr;</h2>
                                <p>{item.content[0] ? item.content[0] : ''}</p>
                            </div>
                        </a>
                    ))} */}
                </div>
            </div>

        </div>
    )
}