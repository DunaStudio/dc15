import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Página no encontrada
            </h2>
            <p className="text-gray-500 mb-8">
              La página que buscas no existe.
            </p>
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
