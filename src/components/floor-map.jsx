'use client';

import { useEffect, useRef, useState } from "react";
import { PopUp } from "./pop-up";

export function FloorMap({ className, floorObject, ...props }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Observe the container size and update dimensions
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const svgElement = svgRef.current;

    if (!svgElement || !floorObject.floorImage) return;

    // Clear existing SVG content
    svgElement.innerHTML = "";

    // Calculate the bounding box of all paths
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    Object.keys(floorObject.floorImage).forEach((roomKey) => {
      const room = floorObject.floorImage[roomKey];
      if (roomKey.startsWith("room") && room.path) {
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", room.path);

        // Temporarily append the path to calculate its bounding box
        const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        tempSvg.appendChild(pathElement);
        document.body.appendChild(tempSvg);
        const bbox = pathElement.getBBox();
        document.body.removeChild(tempSvg);

        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
      } else if (roomKey.startsWith("name") && room.type === "text") {
        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        // textElement.textContent = room.name;
        textElement.setAttribute("font-size", "80");
        textElement.setAttribute("font-weight", "bold");
        textElement.setAttribute("fill", "black");

        Object.keys(room.span).forEach((spanKey) => {
          const span = room.span[spanKey];
          const spanElement = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          spanElement.textContent = span.text;
          spanElement.setAttribute("x", span.x);
          spanElement.setAttribute("y", span.y);
          textElement.appendChild(spanElement);
        });

        // Temporarily append the text to calculate its bounding box
        const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        tempSvg.appendChild(textElement);
        document.body.appendChild(tempSvg);
        const bbox = textElement.getBBox();
        document.body.removeChild(tempSvg);

        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
      }
    });

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    // Calculate scaling factors to fit the paths inside the canvas
    const scaleX = dimensions.width / contentWidth;
    const scaleY = dimensions.height / contentHeight;
    const scale = Math.min(scaleX, scaleY);

    // Calculate translation to center the paths
    const translateX = -minX * scale + (dimensions.width - contentWidth * scale) / 2;
    const translateY = -minY * scale + (dimensions.height - contentHeight * scale) / 2;

    // Draw and scale each path
    Object.keys(floorObject.floorImage).forEach((roomKey) => {
      const room = floorObject.floorImage[roomKey];

      if (roomKey.startsWith("room") && room.path) {
        const pathData = room.path;
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", pathData);
        pathElement.setAttribute("id", room.name);
        pathElement.setAttribute("stroke", "black");
        pathElement.setAttribute("stroke-width", "5");
        pathElement.setAttribute("stroke-linecap", "round");
        pathElement.setAttribute("fill", "blue");
        pathElement.style.transition = "all 0.2s ease";

        // Apply scaling and translation
        pathElement.setAttribute(
          "transform",
          `translate(${translateX}, ${translateY}) scale(${scale})`
        );

        // Add hover interactivity
        pathElement.addEventListener("mouseenter", () => {
          pathElement.setAttribute("fill", "red");
        });

        pathElement.addEventListener("mouseleave", () => {
          pathElement.setAttribute("fill", "blue");
        });

        if (room.clickable === "true") {
          // Add click interactivity to show the pop-up
          pathElement.addEventListener("click", () => {
            setSelectedRoom(room.name); // Set the selected room name
            setShowPopup(true); // Show the pop-up
          });
        }

        // Append the path to the SVG
        svgElement.appendChild(pathElement);
      } else if (roomKey.startsWith("name") && room.type === "text") {
        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        // textElement.textContent = room.name;
        textElement.setAttribute("font-size", "80");
        textElement.setAttribute("font-weight", "bold");
        textElement.setAttribute("fill", "black");
        textElement.setAttribute("text-anchor", "middle");
        textElement.setAttribute("dominant-baseline", "middle");
        textElement.setAttribute("xml:space", "preserve");
        textElement.setAttribute("letter-spacing", "0em");
        textElement.setAttribute("cursor", "pointer");

        Object.keys(room.span).forEach((spanKey) => {
          const span = room.span[spanKey];
          const spanElement = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          spanElement.textContent = span.text;
          spanElement.setAttribute("x", span.x);
          spanElement.setAttribute("y", span.y);
          textElement.appendChild(spanElement);
        });

        // Apply scaling and translation
        textElement.setAttribute(
          "transform",
          `translate(${translateX+7}, ${translateY}) scale(${scale})`
        );

        // Append the text to the SVG
        svgElement.appendChild(textElement);
      }      
    });
  }, [floorObject, dimensions]);

  return (
    <div ref={containerRef} className={className}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      />
      {showPopup && (
        <PopUp
          roomName={selectedRoom}
          reservations={[
            { hour: "08:00 AM - 10:30 AM", status: "Open" },
            { hour: "10:45 AM - 13:15 PM", status: "Closed" },
            { hour: "13:30 PM - 16:00 PM", status: "Open" },
            { hour: "16:15 PM - 18:45 PM", status: "Closed" },
            { hour: "19:00 PM - 21:30 PM", status: "Open" },
          ]}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}