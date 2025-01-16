import Image from "next/image";

export default function Kewl() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-6">
      {/* 
      Write something unique about you here! 
      It could be a club you're part of, a weird skill you have, or something special that happened to you.
      Feel free to put links, images, whatever! 
      Don't worry about styling- we aren't grading you on this- it's just to get to know you better! :) 
      */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-bold text-4xl">I draw a lot</h1>
          <h3 className="font-semibold text-xl">
            Here are some of my favorite pieces!
          </h3>
        </div>
        <div className="mt-4 max-w-[1500px] lg:h-[800px] flex max-lg:flex-col justify-center items-center gap-4">
          <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-4">
            <Image src="/piece7.PNG" className="w-full h-full object-cover col-span-1 row-span-1 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
            <Image src="/piece2.PNG" className="w-full h-full object-cover col-span-2 row-span-1 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
            <Image src="/piece4.PNG" className="w-full h-full object-cover col-span-2 row-span-1 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
            <Image src="/piece1.PNG" className="w-full h-full object-cover col-span-1 row-span-2 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
            <Image src="/piece5.PNG" className="w-full h-full object-cover col-span-2 row-span-1 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
          </div>
          <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-4">
            <Image src="/piece6.PNG" className="w-full h-full object-cover col-span-2 row-span-1 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
            <Image src="/piece8.PNG" className="w-full h-full object-cover col-span-1 row-span-1 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
            <Image src="/piece3.PNG" className="w-full h-full object-cover col-span-1 row-span-1 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
            <Image src="/piece9.PNG" className="w-full h-full object-cover col-span-2 row-span-2 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
            <Image src="/piece10.PNG" className="w-full h-full object-cover col-span-1 row-span-1 rounded-3xl" width={0} height={0} sizes="100vw" alt="Drawing" />
          </div>
        </div>
    </div>
  );
}