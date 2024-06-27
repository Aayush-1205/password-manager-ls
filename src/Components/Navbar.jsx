import React from 'react'

const Navbar = () => {
    return (
        <div>
            <header className="text-white body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a href='/' className="flex title-font font-medium items-center mb-4 md:mb-0">
                        <h1 className="ml-3 text-xl select-none">&lt;Password <span className='text-indigo-500 select-none'>Manager</span>/&gt;</h1>
                    </a>
                    <div className='nav-link flex justify-between items-center'>
                        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                            <a className="mr-5 hover:text-indigo-300">Home</a>
                            <a className="mr-5 hover:text-indigo-300">About</a>
                            <a className="mr-5 hover:text-indigo-300">Contact</a>
                        </nav>
                        <div>
                            <a href="https://github.com/Aayush-1205" className='flex items-center gap-2' target='_blank'>
                                <button className="bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-300 rounded-full md:mt-0">
                                    <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/github.png" alt="github" />
                                </button>
                                <span>Github</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar