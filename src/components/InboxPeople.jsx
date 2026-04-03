import { useState } from "react";
import { SerchBox } from "./SerchBox";
import { SideBar } from "./SideBar";

export const InboxPeople = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button className="drawer-toggle" onClick={() => setIsOpen(true)}>👥</button>

      {isOpen && <div className="drawer-overlay" onClick={() => setIsOpen(false)} />}

      <div className={`inbox_people ${isOpen ? "drawer-open" : ""}`}>
        <button className="drawer-close" onClick={() => setIsOpen(false)}>✕</button>
        <SerchBox />
        <SideBar onSelectChat={() => setIsOpen(false)} />
      </div>
    </>
  )
}
