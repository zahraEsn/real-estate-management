import Navbar from "@/components/Navbar"
import { NAVBAR_HEIGHT } from "@/lib/constants"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className={`flex flex-col h-full w-full`} style={{ marginTop: NAVBAR_HEIGHT }}>
        {children}
      </main>
    </div>
  )
}

export default layout
