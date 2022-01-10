import { useRouter } from "next/router";
import { Fragment, useState } from "react";

export default function SideBar({ data, selectedCategory, setSelectedCategory }) {
    const router = useRouter();

    const [show, setShow] = useState(false);
    const [name, setName] = useState('Submit')

    const clickCategory = (e, obj) => {
        e.preventDefault();
        setSelectedCategory(obj);
        router.push({ pathname: '/tab/' + obj.code });
    }

    const subscribeNews = async () => {
        let email = document.getElementById('email').value;
        let username = 'author_1';
        try {
            const res = await fetch(`${process.env.BASE_URI}/api/subscribers?username=${username}&email=${email}`, {
                method: 'POST',
                body: JSON.stringify({})
            });
            document.getElementById('email').value = '';
            const res1 = await res.json();
            if(res1.success) {
                setName('Success');
                setTimeout(() => setName('Submit'), 2000);
            } else {
                setName('Error');
                setTimeout(() => setName('Submit'), 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    return (
        <div className="leftColumn" id="leftBar">
            {data && data.length > 0 && data.map((item, index) => (
                <Fragment key={index}>
                    <p className="h7">{item.title}</p>
                    {item.children && item.children.length > 0 && item.children.map((child, indx) => (
                        <p onClick={(e) => clickCategory(e, child)} key={index + '-' + indx} className="categoryLink">{child.title}</p>
                    ))}
                </Fragment>
            ))}
            <div className="subscribe">
                <p>Subscribe to our Newsletter</p>
                <input onChange={(e) => validateEmail(e.target.value)} type="email" id="email" placeholder="enter your email" />
                <div>
                    <button disabled={!show} onClick={() => subscribeNews()}> {name} </button>
                </div>
            </div>
        </div>
    )
}