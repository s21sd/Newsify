import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import logo from '../assests/logo.avif'
import Newsbar from './Newsbar';
import Optionbar from './Optionbar';
import Newscard from '../Cards/Newscard';
import Buttombar from './Buttombar';
const Navbar = () => {
    const [value, setVal] = useState('');
    console.log(value);
    const [news, setNews] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const ShowThefavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }

    const getNews = async () => {
        try {
            const res = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${value}/in.json`);
            if (!res.ok) {
                console.error("HTTP error! status: ", res.status);
                return;
            }
            const data = await res.json();
            setNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }
    console.log(news);
    return (
        <div>
            <div className="bg-red-600 w-screen flex p-5 justify-between items-center sm:text-xl md:text-2xl">
                <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <img className='rounded-full w-[40px] sm:w-[50px] md:w-[50px] lg:[50px]' alt='logo' width={50} src={logo} />
                    <span className="ml-3  text-[14px] sm:text-sm md:text-xl lg:text-3xl cursor-pointer hidden sm:hidden md:block lg:block">Newsify</span>
                </div>

                <div className="md:ml-auto flex flex-wrap text-white justify-center cursor-pointer items-center ">
                    <p className="mr-5 hover:text-gray-900 hidden sm:hidden md:block lg:block">Login</p>
                    <p className="mr-5 hover:text-gray-900 hidden sm:hidden md:block lg:block">Register</p>
                    <div onClick={() => ShowThefavorites()} className='mr-5 cursor-pointer'>
                        <FaRegHeart size={26} />
                    </div>
                    <div
                        className="p-1 sm:p-3 md:p-5 lg:p-5 overflow-hidden w-[150px] sm:w-[150px] md:w-[270px] lg:[270px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[60px]  bg-[#dddfe7] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center "
                    >
                        <input
                            type="text" autoCapitalize='false' onChange={(e) => setVal(e.target.value.toLowerCase())}
                            className="outline-none text-[20px] bg-transparent w-full text-black font-normal px-4 " placeholder='Search a keyword'
                        />
                        <div onClick={() => getNews()} className="flex items-center justify-center cursor-pointer fill-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Isolation_Mode"
                                data-name="Isolation Mode"
                                viewBox="0 0 24 24"
                                width="22"
                                height="22"
                            >
                                <path
                                    d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>

            <Optionbar />
            {
                favorites.length == 0 ? <Newsbar /> : <div className='flex justify-between flex-wrap'>
                    {
                        favorites.map((newss, index) => {
                            return (
                                <div className='flex justify-between items-center w-fit ' key={index}>
                                    <Newscard newss={newss} />
                                </div>
                            )
                        })
                    }
                </div>
            }
            <div className='border border-grey-300 mt-5 w-full'></div>
            {
                value.length == 0 && favorites.length == 0 ? <Newsbar /> :
                    <div className='flex justify-between flex-wrap'>
                        {
                            news.map((newss, index) => {
                                return (
                                    <div className='flex justify-between items-center w-fit ' key={index}>
                                        <Newscard newss={newss} />
                                    </div>
                                )
                            })
                        }
                    </div>
            }
            <Buttombar />
        </div>
    )
}

export default Navbar