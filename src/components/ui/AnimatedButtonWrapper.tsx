"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import "./animated-button.css";

interface AnimatedButtonWrapperProps {
  children: React.ReactElement<
    { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void },
    string
  >;
}

export function AnimatedButtonWrapper({
  children,
}: AnimatedButtonWrapperProps) {
  const router = useRouter();

  const handleAnimationClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const originalOnClick = children.props.onClick;
    const wrapper = e.currentTarget.parentElement;

    if (wrapper) {
      wrapper.classList.add("animating");

      setTimeout(() => {
        originalOnClick(e);
        // It's a good practice to remove the class if the user navigates back
        // but given the app's flow, it might not be strictly necessary.
        setTimeout(() => wrapper.classList.remove("animating"), 100);
      }, 1300); // Match this to your longest animation delay
    }
  };

  return (
    <div className="btn-wrapper">
      <div className="line horizontal top" />
      <div className="line vertical right" />
      <div className="line horizontal bottom" />
      <div className="line vertical left" />

      <div className="dot top left" />
      <div className="dot top right" />
      <div className="dot bottom right" />
      <div className="dot bottom left" />

      {React.cloneElement(children, { onClick: handleAnimationClick })}
    </div>
  );
}
