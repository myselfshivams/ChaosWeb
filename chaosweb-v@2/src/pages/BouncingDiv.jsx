import React, { useEffect, useState } from "react";
const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const BouncingDiv = () => {
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [direction, setDirection] = useState({ x: 3, y: 3 });
  const [rotation, setRotation] = useState(0);
  const [color, setColor] = useState(randomColor());
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const moveDiv = () => {
      setPosition((prevPosition) => {
        let newTop = prevPosition.top + direction.y * speedMultiplier;
        let newLeft = prevPosition.left + direction.x * speedMultiplier;

        let newDirection = { ...direction };
        let newSpeedMultiplier = speedMultiplier;

        // Check for collision with the edges of the viewport
        if (newTop <= 0 || newTop >= window.innerHeight - 100) {
          newDirection.y = -newDirection.y;
          newSpeedMultiplier = Math.random() * 2 + 1; // Random speed change
          setColor(randomColor());
        }

        if (newLeft <= 0 || newLeft >= window.innerWidth - 100) {
          newDirection.x = -newDirection.x;
          newSpeedMultiplier = Math.random() * 2 + 1; // Random speed change
          setColor(randomColor());
        }

        setDirection(newDirection);
        setSpeedMultiplier(newSpeedMultiplier);
        setRotation((prevRotation) => prevRotation + 5); // Rotate by 5 degrees

        // Add the current position to the trail
        setTrails((prevTrails) => [
          ...prevTrails,
          { position: { top: newTop, left: newLeft }, color: color },
        ]);

        return { top: newTop, left: newLeft };
      });
    };

    const intervalId = setInterval(moveDiv, 20);

    return () => clearInterval(intervalId);
  }, [direction, speedMultiplier, color]);

  // Remove old trails over time
  useEffect(() => {
    const trailInterval = setInterval(() => {
      setTrails((prevTrails) =>
        prevTrails.length > 10 ? prevTrails.slice(1) : prevTrails
      );
    }, 200);

    return () => clearInterval(trailInterval);
  }, []);

  return (
    <>
      {trails.map((trail, index) => (
        <div
          key={index}
          style={{
            position: "fixed", // Use fixed so it doesn't affect page scrolling
            top: `${trail.position.top}px`,
            left: `${trail.position.left}px`,
            width: "4px", // Thinner trail width (line-like)
            height: "60px", // Height of trail (can adjust as needed)
            backgroundColor: trail.color,
            borderRadius: "2px",
            opacity: 0.4, // Fading effect for the trail
            transform: "scale(0.9)",
            transition: "opacity 1s, transform 1s",
            pointerEvents: "none", // Allows clicks to pass through the trail
            zIndex: -1, // Lower z-index so trail does not block other elements
          }}
        />
      ))}

      <div
        style={{
          position: "fixed", // Use fixed positioning for the bouncing div
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: "200px",
          height: "200px",
          backgroundColor: color,
          borderRadius: "15px",
          transform: `rotate(${rotation}deg)`,
          transition: "background-color 0.5s ease", // Smooth color transition
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", // Add some shadow to make it more dynamic
          pointerEvents: "none", // Allows clicks to pass through the div
          zIndex: -1, // Lower z-index so bouncing div does not block other elements
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Transparent DVD Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          viewBox="0 0 192.756 192.756"
        >
         
            <path fill="#fff" d="M0 0h192.756v192.756H0V0z" />
            <path d="M108.605 58.081c1.766-2.129 11.285-13.399 11.285-13.399h35.936c18.197 0 30.922 9.53 28.012 21.776-2.906 12.247-20.248 21.778-38.359 21.778h-24.09l7.227-30.422H145.6l-4.949 20.833h3.812c10.139 0 19.738-3.697 21.756-12.189 1.854-7.798-4.873-12.188-15.791-12.188h-3.984l-16.529.014-39.02 44.041-15.324-43.274s-.112-.276-.254-.649c-.035-.089-.328-.397-.485-.338-.286.106-.24.603-.19.711.125.266.162.367.196.497 1.368 3.34 1.446 8.946.89 11.187-3.031 12.218-20.25 21.778-38.359 21.778h-24.09l7.228-30.422H37.49l-4.949 20.833h3.812c10.138 0 19.682-3.697 21.699-12.189 1.852-7.798-4.817-12.188-15.734-12.188h-3.985l-16.983-.008 2.277-9.58H46.13l29.846-.039v.039h12.289s3.469 10.161 4.545 13.236c5.149 14.707 4.297 15.702 4.297 15.702s-.619-.949 11.498-15.54zM8.504 110.273c0-6.496 37.163-11.762 83.001-11.762 45.841 0 83.001 5.266 83.001 11.762 0 6.498-37.16 11.764-83.001 11.764-45.838 0-83.001-5.266-83.001-11.764zm79.997 4.153c10.47 0 18.954-1.754 18.954-3.922 0-2.164-8.484-3.92-18.954-3.92-10.467 0-18.952 1.756-18.952 3.92 0 2.168 8.485 3.922 18.952 3.922zM168.156 119.658h-.765l-.336 2.377h-.371l.332-2.377h-.764l.047-.338h1.902l-.045.338zM170.971 122.035h-.358v-2.058h-.008l-1.091 2.058-.469-2.078h-.008l-.67 2.078h-.357l.894-2.715h.311l.422 1.84.976-1.84h.358v2.715zM36.536 142.711h.062l5.119-10.32h4.816l-8.93 15.722h-2.622l-8.777-15.722h4.816l5.516 10.32zM61.983 147.707h-4.481v-15.316h4.481v15.316zM74.993 132.391h6.399c6.645 0 11.095 3.311 11.095 7.678 0 4.307-4.573 7.639-11.125 7.639h-6.37v-15.317h.001zm4.479 12.714h.731c5.517 0 7.651-2.031 7.651-5.059 0-3.33-2.562-5.057-7.651-5.057h-.731v10.116zM108.914 134.99v3.371h7.131v2.604h-7.131v4.14h7.406v2.602h-11.886v-15.316h11.886v2.599h-7.406zM127.955 140.027c0-4.287 4.662-8.045 11.367-8.045 6.703 0 11.369 3.758 11.369 8.045 0 4.387-4.666 8.086-11.369 8.086-6.705 0-11.367-3.699-11.367-8.086zm4.633-.119c0 2.312 2.926 5.26 6.734 5.26s6.734-2.947 6.734-5.26c0-2.479-2.803-4.979-6.734-4.979-3.933.001-6.734 2.501-6.734 4.979z" />
        </svg>
      </div>
    </>
  );
};

export default BouncingDiv;