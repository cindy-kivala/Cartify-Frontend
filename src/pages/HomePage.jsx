import React from "react";

export default function HomePage() {
  return (
    <div
      className="homepage"
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage:
          "url('https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Soft dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          zIndex: 2,
          maxWidth: "800px",
          padding: "0 20px",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#FFD700",
            textShadow: "0 0 15px rgba(255, 215, 0, 0.8)", // softer glow
            lineHeight: "1.2",
          }}
        >
          Welcome to Cartify
        </h1>
        <p
          style={{
            fontSize: "1.8rem",
            marginBottom: "30px",
            color: "#FFFFE0",
            textShadow: "0 0 10px rgba(255, 255, 224, 0.7)", // softer glow
          }}
        >
          Discover amazing products at your fingertips
        </p>
        <a
          href="/products"
          style={{
            padding: "14px 40px",
            fontSize: "1.2rem",
            color: "#fff",
            background: "linear-gradient(90deg, #FF4500, #FF6347)",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Shop Now
        </a>
      </div>

      {/* Simple keyframes animation */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

