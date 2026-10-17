const CardChildren = ({ title, description, image, children }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "10px",
        maxWidth: "300px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {children && (
        <div
          style={{
            marginTop: "10px",
            borderTop: "1px solid #eee",
            paddingTop: "10px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CardChildren;
