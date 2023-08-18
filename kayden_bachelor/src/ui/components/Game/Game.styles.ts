import {styled} from "styled-components";

//This is the typing for the Props (Properties)
export interface Props {
    left: string,
    top: string
}

export const GameHeading = styled.h2`
  color: azure;
  font-weight: bold;
  font-size: 2rem;
`

//This takes in two properties called top and left. When the state of left and top change, the css will update
// accordingly.
export const Sprite = styled.div<Props>`
  background: white;
  height: 50px;
  left: ${p => p.left ? p.left : 0};
  position: absolute;
  top: ${p => p.top ? p.top : 0};
  transition-duration: 1s;
  transition-property: left,top;
  width: 50px;
`
