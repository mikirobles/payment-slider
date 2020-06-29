import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Icon } from "antd";
import { useSpring, animated } from "react-spring";

const SliderWrapper = styled(animated.div)`
  width: 250px;
  height: 40px;
  border-radius: 10px;
  position: relative;
  box-shadow: inset 0 0 11px 1px #00000012;

  .pay-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    opacity: 0.5;
    font-size: 0.9em;
    letter-spacing: 1px;
    pointer-events: none;
    user-select: none;
    text-align: center;
    margin-left: 10px;
    width: 140px;
  }

  .completed-text {
    text-transform: uppercase;
    font-size: 0.9em;
    letter-spacing: 1px;
    font-weight: bold;
    pointer-events: none;
    user-select: none;
  }

  .thumb {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: move;
    cursor: -webkit-grab;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      color: white;
    }
  }

  &.is-dragging,
  &.is-dragging .thumb {
    cursor: -webkit-grabbing;
  }
`;

function PaymentSlider({ onComplete }) {
  const sliderRef = useRef();
  const [isDragging, toggleDragging] = useState(false);
  const [x, setX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [completed, setCompleted] = useState(false);

  const endX = 210;
  const distance = Math.min(Math.max(x - startX, 0), endX);
  const progress = distance / endX;

  const payTextProps = useSpring({
    opacity: Math.max(0, 1 - progress * 5)
  });

  const thumbProps = useSpring({
    transform: `scale(${isDragging ? 1.1 : 1})`,
    width: completed ? `250px` : "40px",
    background: completed ? "white" : "rgb(159, 206, 38)",
    opacity: completed ? 1 : 0.7
  });

  const completedTextProps = useSpring({
    opacity: completed ? 1 : 0
  });

  const sliderProps = useSpring({
    background: `linear-gradient(45deg, #e1f594 ${Math.max(
      progress * 100
    )}%, #ffffff)`
  });

  const onEndReached = () => {
    setCompleted(true);
    onDragEnd();
    onComplete();
  };

  const onDragStart = e => {
    if (completed) return;
    toggleDragging(true);
    setStartX(e.clientX);
    setX(e.clientX);
  };

  const onDragEnd = () => {
    setX(0);
    setStartX(0);
    toggleDragging(false);
  };

  const onDrag = e => {
    if (isDragging) {
      setX(e.clientX);
    }
    if (distance >= endX) {
      onEndReached();
    }
  };

  return (
    <SliderWrapper
      ref={sliderRef}
      className={isDragging ? "is-dragging" : ""}
      onMouseUp={onDragEnd}
      onMouseMove={onDrag}
      style={sliderProps}
    >
      <animated.span style={payTextProps} className="pay-text">
        Arrastra para comprar
      </animated.span>
      <animated.div
        className="thumb"
        onMouseDown={onDragStart}
        style={{
          left: completed ? "auto" : isDragging ? distance : 0,
          ...thumbProps,
          right: completed ? 0 : "auto",
          ...(completed ? { cursor: "default" } : {})
        }}
      >
        {completed ? (
          <animated.span style={completedTextProps} className="completed-text">
            Procesando...
          </animated.span>
        ) : (
          <Icon type="double-right" />
        )}
      </animated.div>
    </SliderWrapper>
  );
}

export default PaymentSlider;
