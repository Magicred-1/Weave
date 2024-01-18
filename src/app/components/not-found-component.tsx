import Link from "next/link"
import localfont from 'next/font/local'
const PressStart2P = localfont({ src: './../assets/fonts/PressStart2P.ttf' })

export const NotFoundComponent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-32 h-32 mb-8">
        <img
          alt="Weave Logo"
          className="object-contain"
          height={128}
          src="/LogoTransparent.png"
          style={{
            aspectRatio: "128/128",
            objectFit: "cover",
          }}
          width={128}
        />
      </div>
      <h1 className={`${PressStart2P.className} text-2xl font-bold text-gray-900 dark:text-gray-100 text-center`}>Thank you Mario but our princess is in another castle.</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        This page does not exist.
      </p>
      <Link
        className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-gray-200 border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:border-gray-800"
        href="#"
      >
        Go to homepage
      </Link>
    </div>
  )
}

export default NotFoundComponent;