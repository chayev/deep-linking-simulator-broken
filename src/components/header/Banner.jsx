import React from "react"
import styled from "styled-components"

import { BannerDesktop, BannerMobile } from "../svg-components"
import { Typography } from "@appsflyer/fe-ui-core"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 197px;
  background: #3b434d;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

  @media only screen and (min-width: 768px) {
    height: 179px;
  }
`

const HeaderTitle = styled(Typography)`
  font-weight: bold;
`

const TitleContainer = styled.div`
  width: 200px;
  color: #ffffff;

  padding-left: 20px;

  @media only screen and (min-width: 768px) {
    width: 225px;
    padding-left: 0px;
  }
`

const BannerMobileStyled = styled(BannerMobile)`
  margin-left: auto;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`

const BannerDesktopStyled = styled(BannerDesktop)`
  display: none;

  @media only screen and (min-width: 768px) {
    display: block;
  }
`

const Toggle = styled(FormControlLabel)`
  padding-left: 15px;
`

const MenuItem = styled.div`
  color: white;
`

const DropMenuContainer = styled.div`
  margin-left: auto;
  margin-right: 20px;
`

export default function Banner({
  universalLinks,
  setUniversalLinks,
  appLinks,
  setAppLinks,
  uriScheme,
  setUriScheme,
}) {
  return (
    <BannerWrapper>
      <TitleContainer>
        <HeaderTitle variant="h4">Deep Linking Simulator</HeaderTitle>
        <Typography variant="subtitle1">Powered by OneLink</Typography>
      </TitleContainer>
      <BannerMobileStyled />
      <BannerDesktopStyled />
      {/* <DropMenuContainer>
        <MenuItem>
          <Toggle
            control={
              <Switch
                checked={universalLinks}
                onChange={(_, universalLinks) =>
                  setUniversalLinks(universalLinks)
                }
              />
            }
            label="Universal Links"
          />
        </MenuItem>

        <MenuItem>
          <Toggle
            control={
              <Switch
                checked={appLinks}
                onChange={(_, appLinks) => setAppLinks(appLinks)}
              />
            }
            label="App Links"
          />
        </MenuItem>

        <MenuItem>
          <Toggle
            control={
              <Switch
                checked={uriScheme}
                onChange={(_, uriScheme) => setUriScheme(uriScheme)}
              />
            }
            label="URI Scheme"
          />
        </MenuItem>
      </DropMenuContainer> */}
    </BannerWrapper>
  )
}
