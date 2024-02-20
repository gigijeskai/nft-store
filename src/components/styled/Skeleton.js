import React from "react";
import Box from "./Box";
import styled, { keyframes } from "styled-components";
import { variant } from "styled-system";

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const WaveBox = styled(Box)`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent);
    animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
  }
`;

const SkeletonBox = styled(WaveBox)(
  variant({
    variants: {
      circle: {
        borderRadius: "50%",
      },
      rect: {},
    },
  }),
  {
    position: "relative",
    overflow: "hidden",
  }
);

SkeletonBox.defaultProps = {
  backgroundColor: "var(--grey-500)",
};

const Skeleton = ({ variant = "rect", ...rest }) => {
  return <SkeletonBox variant={variant} {...rest} />;
};

export default Skeleton;