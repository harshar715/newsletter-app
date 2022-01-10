import Image from "next/image";
import { Fragment, useState } from "react";

export default function PostData({ data, authors }) {

    const [contentNum, setContentNum] = useState([{ style: 'Normal', fontsize: '16px', title: '' }]);
    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(' --- Select category of the post --- ');
    const [isAuth, setIsAuth] = useState(false);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const selectRadio = (e, value, index) => {
        // e.preventDefault();
        let arr = [...contentNum];
        arr[index]['style'] = value;
        setContentNum(arr);
    }

    const addNewPara = () => {
        let arr = [...contentNum];
        arr.push({ style: 'Normal', fontsize: '16px' });
        setContentNum(arr);
    }

    const deletePara = (index) => {
        let arr = [...contentNum];
        arr = arr.filter((res, indx) => indx !== index);
        setContentNum(arr);
    }

    const setFontsize = (index, value) => {
        let arr = [...contentNum];
        arr[index]['fontsize'] = value;
        setContentNum(arr);
    }

    const setDescription = (index, value) => {
        let arr = [...contentNum];
        arr[index]['title'] = value;
        setContentNum(arr);
    }

    const submitData = async (e) => {
        e.preventDefault();
        let obj = {
            title: title,
            category: category,
            content: contentNum,
            image: '',
            views: 0,
            likes: 0,
            tags: [],
            author: ''
        }
        try {
            const res = await fetch(`${process.env.BASE_URI}/api/news`, {
                method: 'POST',
                body: JSON.stringify(obj)
            });
            const data = await res.json();
            console.log(data)

            setTimeout(async () => {
                const filedata = new FormData();
                filedata.append('file', image)
                const res1 = await fetch(`${process.env.BASE_URI}/api/image?id=${data.data.id}`, {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'multipart/form-data',
                    //     'Accept': 'application/json'
                    // },
                    body: filedata
                });
                const data1 = await res1.json();
                console.log(data1);
            }, 1000);

            setTimeout(() => {
                setTitle('');
                setImage(false);
                setCategory(' --- Select category of the post --- ');
                setContentNum([{ style: 'Normal', fontsize: '16px', title: '' }]);
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    }

    const checkLogin = (e) => {
        e.preventDefault();
        let data = authors.filter(res => res.username == username && res.password == password);
        if (data.length > 0) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }

    return (
        <div className="rightColumn" id="right-bar">
            <div className='pl20'>
                <h1 className='newclass'>Create New Post<br /></h1>
                <br />
                {!isAuth && <div className="container">
                    <div>
                        <div className="row">
                            <div className="col-20">
                                <label htmlFor="title">UserName</label>
                            </div>
                            <div className="col-80">
                                <input type="text" id="username" name="username" onChange={(e) => setusername(e.target.value)} value={username} placeholder="Enter username" />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '20px' }}>
                            <div className="col-20">
                                <label htmlFor="category">Password</label>
                            </div>
                            <div className="col-80">

                                <input type="password" id="password" name="pssword" onChange={(e) => setpassword(e.target.value)} value={password} placeholder="Enter password" />
                                <div className="row">
                                    <button onClick={(e) => checkLogin(e)} className="submit" disabled={!(username != '' && password != '')} >Proceed to Login </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {isAuth && <div className="container">
                    <div>
                        <div className="row">
                            <div className="col-20">
                                <label htmlFor="title">Post Title</label>
                            </div>
                            <div className="col-80">
                                <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter title of the post" />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '20px' }}>
                            <div className="col-20">
                                <label htmlFor="category">Select Post Category</label>
                            </div>
                            <div className="col-80">
                                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                                    <option disabled value=" --- Select category of the post --- "> --- Select category of the post --- </option>
                                    {data && data.length > 0 && data.map((item, index) => (
                                        index > 0 && <optgroup key={index} label={item.title}>
                                            {item.children && item.children.length > 0 && item.children.map((item1, index1) => (
                                                <option key={index + '-' + index1} value={item1.code}>{item1.title}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '20px' }}>
                            <div className="col-20">
                                <label htmlFor="image">Post Image</label>
                            </div>
                            <div className="col-80">
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" name="image" accept="image/*" />
                                <br />{image && <img src={URL.createObjectURL(image)} height={'300'} />}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-20">
                                <label htmlFor="subject" style={{ marginTop: '20px' }}>Content Paragraph</label>
                            </div>
                            <div className="col-80">
                                {contentNum.map((item, index) => (
                                    <Fragment key={index}>
                                        <textarea value={item.title} onChange={(e) => setDescription(index, e.target.value)} id={"content" + index} name={"content" + index} placeholder="Description as single paragraph..." style={item.style == 'Italics' ? { height: '200px', fontStyle: 'italic', fontSize: item.fontsize } : item.style == 'Bold' ? { height: '200px', fontWeight: 600, fontSize: item.fontsize } : { height: '200px', fontSize: item.fontsize }}></textarea>
                                        <label htmlFor={"contentstyle" + index}>
                                            <input type="radio" name={"contentstyle" + index} id={"contentstyle1" + index} onChange={(e) => selectRadio(e, 'Normal', index)} checked={item.style === 'Normal' ? true : false} value="Normal" />
                                            Normal
                                        </label>

                                        <label htmlFor={"contentstyle" + index}>
                                            <input type="radio" name={"contentstyle" + index} id={"contentstyle2" + index} onChange={(e) => selectRadio(e, 'Italics', index)} checked={item.style === 'Italics' ? true : false} value="Italics" />
                                            Italics
                                        </label>
                                        <label htmlFor={"contentstyle" + index}>
                                            <input type="radio" name={"contentstyle" + index} id={"contentstyle3" + index} onChange={(e) => selectRadio(e, 'Bold', index)} checked={item.style === 'Bold' ? true : false} value="Bold" />
                                            Bold
                                        </label>
                                        <select onChange={(e) => setFontsize(index, e.target.value)} name={"fontsize" + index} id={"fontsize" + index} style={{ width: '100px', height: '40px', fontSize: '16px', padding: 0 }}>
                                            <option value="16px"> 16 px </option>
                                            <option value="18px"> 18 px </option>
                                            <option value="20px"> 20 px </option>
                                            <option value="22px"> 22 px </option>
                                            <option value="24px"> 24 px </option>
                                        </select>
                                        {contentNum.length > 1 && <span onClick={() => deletePara(index)} className="btns"> Delete</span>}
                                        {contentNum.length <= 5 && contentNum.length == index + 1 && <span onClick={() => addNewPara()} className="btns">&#43; Add New</span>}
                                    </Fragment>
                                ))}

                                <div className="row">
                                    <button onClick={(e) => submitData(e)} className="submit" disabled={!(title != '' && !category.includes('---') && image && contentNum.length > 0)} >Submit Data </button>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>}
            </div>

        </div>
    )
}