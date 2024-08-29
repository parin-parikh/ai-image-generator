import Image from "next/image"
import Link from "next/link"

function Header() {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
        <div className="flex space-x-2 items-center">
            <Image src='https://links.papareact.com/4t3' alt="Chat-gpt logo" height={30} width={30} />

            <div>
                <h1><span className="text-violet-500">AI</span> Image Generator</h1>
                <h2 className="text-xs">Powered by DALL·E 2, Chat GPT & Microsoft Azure</h2>
            </div>
        </div>

        <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
            <Link href="https://parinparikh.live/" className="px-2 font-light text-right">
                Visit My Portfolio
            </Link>
            <Link href="https://www.linkedin.com/in/parinparikh1/" className="px-2 font-light">
                LinkedIn
            </Link>
        </div>
    </header>
  )
}
export default Header