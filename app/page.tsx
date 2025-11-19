export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Hello World! 👋
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Welcome to Next.js with Tailwind CSS
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://nextjs.org/docs" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Next.js Docs
          </a>
          <a 
            href="https://tailwindcss.com/docs" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
          >
            Tailwind Docs
          </a>
        </div>
      </div>
    </div>
  );
}

