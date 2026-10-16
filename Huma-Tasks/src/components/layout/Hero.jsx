import { useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Table from "../ui/Table";

const Hero = () => {
  const [isBlue, setIsBlue] = useState(false);
  const handleClick = () => {
    setIsBlue((b) => !b);
  };
  const tableColumns = ["Name", "Age", "City"];
  const tableData = [
    { name: "Khaled", age: 25, city: "Cairo" },
    { name: "Ashraf", age: 30, city: "Alexandria" },
    { name: "Mohamed", age: 22, city: "Giza" },
  ];
  return (
    <section>
      <p style={{ color: isBlue ? "blue" : "#555" }}>Ashraf</p>
      <Button
        text="Hello From Hero Section"
        handleClick={handleClick}
        variant="danger"
      />
      <h2>Cards Section</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <Card
          title="Card One"
          description="This is a simple card description without children."
          image="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ0wApAJPUSi3amhWMXJysSyuCsTSyUnppg2NuD3emX6zXs-xuaJxM2s8EZIZL2AzhclnG5ppUvskp6YWoUDuKysKtSF_wu-QtJ-KjVU64Mh1RbwE2tG8s4&usqp=CAc"
        />

        <Card
          title="Card Two (With Children)"
          description="This card uses the children prop below:"
          children={
            <>
              <h2>Child1</h2>
              <p>Welcome to this Child One</p>
            </>
          }
        />
      </div>
      <h2>Table Section</h2>
      <Table columns={tableColumns} data={tableData} striped={true} />
    </section>
  );
};
export default Hero;
