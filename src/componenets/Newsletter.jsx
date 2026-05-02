function Newsletter() {
    return (
        <div className="relative flex text-center flex-col gap-5 my-8 px-8 py-6 md:p-10 lg:p-12 w-full" >
            <h1 className="font-bold nunito text-lg md:text-xl leading-1.5">Subscribe now & get updated</h1>
            <div className="flex flex-col sm:gap-1 sm:flex-row justify-center">
                <h6 className="text-xs sm:text-sm tracking-tight text-sec line">Stay Updated with the Latest Tech Deals. </h6>
                <h6 className="text-xs sm:text-sm tracking-tight text-sec line"> Never miss out on the best deals !</h6>
            </div>
            <div className="flex justify-center">
                <input type="email" className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 py-3 px-3 border border-sec text-xs rounded-s-xs bg-glassWhite focus:border-main focus:outline-none placeholder:tracking-wide" placeholder="Enter your email" />
                <button className="text-xs bg-mainBlur py-3 border-e border-b border-t border-sec px-5 rounded-e-xs hover:bg-sec hover:text-white transition-colors ease cursor-pointer">Subscribe</button>
            </div>
        </div>
    )
}
export default Newsletter