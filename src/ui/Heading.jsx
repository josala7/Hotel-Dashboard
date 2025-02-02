import styled, { css } from "styled-components";

const Heading = styled.h1`
  /* font-size: 50px;
  color: blue;
  background-color: var(--color-brand-500);
  padding: 20px;
  border: 1px solid var(--color-yellow-100);
  border-radius: 5px; */
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 50px;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 30px;
      font-weight: 500;
      text-align: center;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 10px;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 10px;
      font-weight: 500;
      text-align: center;
    `}
`;
export default Heading;
