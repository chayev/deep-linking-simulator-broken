import React from "react"
import styled from "styled-components"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

import { HeaderAfLogo, HeaderOlLogo } from "../svg-components"

const TopBarWrapper = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  padding-left: 20px;

  background: #414a55;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  position: sticky;
  top: 0;
  z-index: 10;
`

const Divider = styled.div`
  width: 15px;
  height: 0px;

  border: 1px solid #ffffff;
  transform: rotate(90deg);
`

const Toggle = styled.div`
  margin-left: auto;
`

const OlLogo = styled(HeaderOlLogo)`
  margin-bottom: 7px;
`

export default function TopBar() {
  return (
    <TopBarWrapper>
      <HeaderAfLogo />
      <Divider />
      <OlLogo />
      <Toggle>
        <FormControlLabel control={<Switch />} label="Deep Link" />
      </Toggle>
    </TopBarWrapper>
  )
}
