function Newsletter() {
    return (
        <div className="relative flex text-center flex-col gap-5 my-8 px-8 py-6 md:p-10 lg:p-12 w-full" >
            <h1 className="font-bold nunito text-lg md:text-xl leading-1.5">Subscribe now & get updated</h1>
            <div className="flex flex-col sm:gap-1 sm:flex-row justify-center">
                <h6 className="text-xs sm:text-sm tracking-tight text-neutral-500">Stay Updated with the Latest Tech Deals. </h6>
                <h6 className="text-xs sm:text-sm tracking-tight text-neutral-500"> Never miss out on the best deals !</h6>
            </div>
            <div className="flex justify-center">
                <input type="email" autoComplete="false" name="email" className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 py-3 px-4 border border-secondary/20 text-xs rounded-s-[3px] focus:outline-none nunito" placeholder="Enter your email" />
                <button className="text-xs bg-accent py-3 border-e border-b border-t border-secondary/20 px-5 rounded-e-[3px] hover:bg-secondary hover:text-white transition-colors ease cursor-pointer nunito">Subscribe</button>
            </div>
        </div>
    )
}
export default Newsletter