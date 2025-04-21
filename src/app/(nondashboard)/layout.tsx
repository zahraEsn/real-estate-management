import Navbar from "@/components/Navbar"
import { NAVBAR_HEIGHT } from "@/lib/constants"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className={`flex flex-col h-full w-full pt-[${NAVBAR_HEIGHT}px]`}>
        {children}
      </main>
    </div>
  )
}

export default layout
