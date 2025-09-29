export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <div className="w-1/2 text-center">Banner</div>
      {children}
    </div>
  )
}
