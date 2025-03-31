export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900/70 to-gray-800/40">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
