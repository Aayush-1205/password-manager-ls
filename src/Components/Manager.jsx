import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passRef = useRef();
    const [form, setForm] = useState({ url: "", site: "", useremail: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
        
    }, [])

    const showPass = () => {
        if (ref.current.src.includes("/assets/hidden-eye.png")) {
            ref.current.src = "/assets/eye.png";
            passRef.current.type = "password"
        } else {
            ref.current.src = "/assets/hidden-eye.png"
            passRef.current.type = "text";
        }
    };

    const savePass = () => {
        if (form.site.length > 3 && form.useremail.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            toast("Password saved!", { theme: "dark" })
        } else {
            toast.warning("Please fill all the fields!", { theme: "dark" })
        }
        setForm({ url: "", site: "", useremail: "", password: "" })

    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        toast(`Copied to clipboard " ${text} "`, {
            theme: "dark"
        });
        navigator.clipboard.writeText(text);
    };

    const deletePass = (id) => {
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id != id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)));
            toast("Password Deleted!", { theme: "dark" })
        }
    }

    const editPass = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id != id));
    }

    return (
        <>
            <div className='absolute top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>

            <div className="mx-auto max-w-4xl text-white mt-20">
                <h1 className="text-3xl text-center sub-title select-none">&lt;Password <span className='text-indigo-500'>Manager</span>/&gt;</h1>
                <p className='text-center sub-text select-none'>Your own Password Manager</p>

                <div>
                    <form className="text-black flex flex-col p-4 gap-2">
                        <input onChange={handleChange} value={form.url} placeholder='Enter Website Url' type="text" name='url' className="rounded-full border-2 border-indigo-500 w-full px-3 py-1 placeholder:text-black" />
                        <input onChange={handleChange} value={form.site} placeholder='Enter Website Name' type="text" name='site' className="rounded-full border-2 border-indigo-500 w-full px-3 py-1 placeholder:text-black" />

                        <div className="flex w-full">
                            <input onChange={handleChange} value={form.useremail} placeholder='Enter Username/Email' type="text" name='useremail' className="rounded-full border-2 w-full border-indigo-500 px-3 py-1 placeholder:text-black" />

                            <div className="relative w-full">
                                <input ref={passRef} onChange={handleChange} value={form.password} placeholder='Enter Password' type="password" name='password' className="rounded-full border-2 w-full border-indigo-500 px-3 py-1 placeholder:text-black" autoComplete='on' />
                                <span className="absolute right-1 top-[1px] cursor-pointer" onClick={showPass}>
                                    <img ref={ref} className='p-1' width="35" height="35" src="/assets/eye.png" alt="eye" /></span>
                            </div>
                        </div>
                    </form>
                    <button onClick={savePass} className="px-5 py-1 mt-5 border bg-indigo-500 hover:bg-indigo-700 text-white w-fit flex gap-2 items-center rounded-full mx-auto">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            colors='primary:#ffffff'
                            style={{ width: "25px", height: "25px" }}
                            trigger="hover"></lord-icon>Save
                    </button>
                </div>

                <div className="passwords mt-10">
                    <h2 className='text-2xl font-semibold mb-5'>Your Passwords</h2>

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-indigo-500 dark:bg-indigo-700 dark:text-white">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Site
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Username/Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Password
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            {passwordArray.length !== 0 ? (
                                <tbody>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index} class="border-b border-black bg-white text-black">

                                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.site}</a>
                                            </th>
                                            <td class="px-6 py-4 flex items-center">
                                                {item.useremail}
                                                <img onClick={() => copyText(item.useremail)} width="20" height="20" className='cursor-pointer' src="/assets/copy.png" alt="copy" />
                                            </td>

                                            <td class="px-6 py-4">
                                                <div className='flex items-center'>
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div>
                                                        <img onClick={() => copyText(item.password)} width="20" height="20" className='cursor-pointer' src="/assets/copy.png" alt="copy" />
                                                    </div>

                                                </div>
                                            </td>

                                            <td class="px-6 py-4">
                                                <div className='flex items-center gap-5'>
                                                    <span onClick={() => editPass(item.id)} className='cursor-pointer'>
                                                        <img src="/assets/edit.png" alt="edit" />
                                                    </span>
                                                    <span onClick={() => deletePass(item.id)} className='cursor-pointer'>
                                                        <img src="/assets/delete.png" alt="delete" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                    })}

                                </tbody>
                            ) : (<><h2 className='w-full text-xl'>No Passwords</h2></>)}
                        </table>
                    </div>

                </div>
            </div >
        </>
    )
}

export default Manager