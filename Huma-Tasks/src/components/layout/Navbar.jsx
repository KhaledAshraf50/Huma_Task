import { useState } from "react";
import { Button } from "@/components/ui/Button";
const Navbar = () => {
  const [isRed, setIsRed] = useState(false);
  const handleClick = () => {
    setIsRed((r) => !r);
  };
  return (
    <nav>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>React.Js</li>
      </ul>
      <p style={{ color: isRed ? "red" : "#333" }}>khaled</p>
      <Button
        text="Hello From Navbar"
        handleClick={handleClick}
        variant="primary"
      />
    </nav>
  );
};
export default Navbar;
