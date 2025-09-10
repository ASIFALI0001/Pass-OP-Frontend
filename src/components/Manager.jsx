import { configs } from 'eslint-plugin-react-refresh';
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async (params) => {
        let req = await fetch("https://pass-op-backend-jet.vercel.app/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()

    }, [])

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyeclosed.png")) {
            ref.current.src = "icons/eyeopen.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "icons/eyeclosed.png";
            passwordRef.current.type = "password"
        }
    }
    const savePassword = async () => {
        if (form.site.length > 2 && form.username.length > 2 && form.password.length > 2) {
            // If editing → keep old id, else create a new one
            const newPassword = form.id ? { ...form } : { ...form, id: uuidv4() };

            try {
                let res;
                if (form.id) {
                    // EDIT → PUT request
                    res = await fetch(`https://pass-op-backend-jet.vercel.app/${form.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newPassword)
                    });
                } else {
                    // NEW → POST request
                    res = await fetch("https://pass-op-backend-jet.vercel.app/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newPassword)
                    });
                }

                const data = await res.json();

                if (data.success) {
                    let updatedPasswords;
                    if (form.id) {
                        // Replace the edited one in state
                        updatedPasswords = passwordArray.map(item =>
                            item.id === form.id ? newPassword : item
                        );
                    } else {
                        // Add new one
                        updatedPasswords = [...passwordArray, newPassword];
                    }

                    setPasswordArray(updatedPasswords);
                    setform({ site: "", username: "", password: "" }); // reset form

                    toast(form.id ? 'Password Updated!' : 'Password Saved!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.error('Error saving password on server');
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error('Server error: Unable to save password');
            }

        } else {
            toast.error('Error: Min Length Not Satisfied', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleDelete = async (id) => {
        console.log("Deleting Password with ID:", id);
        let c = confirm("Do you really want to delete this Password?");

        if (c) {
            try {
                const res = await fetch(`https://pass-op-backend-jet.vercel.app/${id}`, {
                    method: "DELETE",
                });

                const data = await res.json();

                if (data.success) {
                    const updatedPasswords = passwordArray.filter(item => item.id !== id);
                    setPasswordArray(updatedPasswords);

                    toast('Password Deleted Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.error('Error: Could not delete password');
                }
            } catch (error) {
                console.error("Error deleting password:", error);
                toast.error('Server error: Unable to delete password');
            }
        }
    };


    const handleEdit = (id) => {
        const itemToEdit = passwordArray.find(i => i.id === id);
        if (!itemToEdit) return;

        console.log("Editing Password with ID:", id);

        // Just put old values into form
        setform(itemToEdit);

        toast(`Editing Site: ${itemToEdit.site}`, {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
        });
    };




    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const [copiedMsg, setCopiedMsg] = useState("");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedMsg("Copied!");
            setTimeout(() => setCopiedMsg(""), 1500);
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            {/* removed max-w-2xl so it can stretch on laptops */}


            <div className="p-3 md:px-0 mycontainer w-full mx-auto">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-center'>Your Own Password Manager</p>
                <div className="text-white flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} name="site" onChange={handleChange} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();   // stops accidental form submission refresh
                            savePassword();
                        }
                    }} placeholder='Enter Website URL' className='bg-white rounded-full border border-green-500 w-full text-black p-3 py-1' type="text" />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} name='username' onChange={handleChange} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();   // stops accidental form submission refresh
                                savePassword();
                            }
                        }} placeholder='Enter Username' className='bg-white rounded-full border border-green-500 w-full text-black p-3 py-1' type="text" />
                        <div className="relative w-full">
                            <input value={form.password} ref={passwordRef} name='password' onChange={handleChange} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();   // stops accidental form submission refresh
                                    savePassword();
                                }
                            }} placeholder='Enter Password' className='bg-white rounded-full border border-green-500 w-full text-black p-3 py-1' type="password" />
                            <span className='absolute right-2 top-1 mx-3 text-black cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="/icons/eyeclosed.png" alt="eyeclosed" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='text-black flex justify-center items-center gap-2 bg-green-500 hover:bg-green-700 cursor-pointer rounded-full px-8 py-2 w-fit border-3 border-green-950'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>

                {/* Expanded max width for laptops/desktops */}
                <div className="passwords w-full max-w-[1600px] mx-auto">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-4xl font-bold text-center py-30'>No Passwords to Show</div>}
                    {passwordArray.length !== 0 &&
                        <div className="overflow-x-auto w-full">
                            {copiedMsg && (
                                <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
                                    {copiedMsg}
                                </div>
                            )}
                            <div className="block min-w-full align-middle py-2 px-2 md:px-6 lg:px-12">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full w-full text-sm md:text-base rounded-xl">
                                        <thead className='bg-green-800 text-white'>
                                            <tr>
                                                <th className='py-2'>Site</th>
                                                <th className='py-2'>Username</th>
                                                <th className='py-2'>Password</th>
                                                <th className='py-2'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-green-100'>
                                            {passwordArray.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="py-2 border-2 border-white text-center break-all">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <a href={item.site} target="_blank" rel="noopener noreferrer"
                                                                className="break-all">{item.site}</a>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover"
                                                                style={{ width: "32px", height: "32px", cursor: "pointer" }}
                                                                onClick={() => copyToClipboard(item.site)}
                                                            ></lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 border-2 border-white text-center break-all">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span className="break-all">{item.username}</span>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover"
                                                                style={{ width: "32px", height: "32px", cursor: "pointer" }}
                                                                onClick={() => copyToClipboard(item.username)}
                                                            ></lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 border-2 border-white text-center break-all">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span className="break-all">{"*".repeat(item.password.length)}</span>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                                trigger="hover"
                                                                style={{ width: "32px", height: "32px", cursor: "pointer" }}
                                                                onClick={() => copyToClipboard(item.password)}
                                                            ></lord-icon>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 border-2 border-white text-center">
                                                        <div className="flex justify-center gap-2">
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/qawxkplz.json"
                                                                trigger="hover"
                                                                style={{ width: "32px", height: "32px", cursor: "pointer" }}
                                                                onClick={() => handleEdit(item.id)}
                                                            ></lord-icon>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                                trigger="hover"
                                                                style={{ width: "32px", height: "32px", cursor: "pointer" }}
                                                                onClick={() => handleDelete(item.id)}
                                                            ></lord-icon>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
