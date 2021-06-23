import React from "react"
import styled from "styled-components"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import { IconDropDownMenu } from "@appsflyer/fe-ui-core"
import MenuItem from "@material-ui/core/MenuItem"
import SettingsIcon from "@material-ui/icons/Settings"

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

const Toggle = styled(FormControlLabel)`
  padding-left: 15px;
`

const DropMenu = styled(IconDropDownMenu)`
  color: white;
`

const DropMenuContainer = styled.div`
  margin-left: auto;
  margin-right: 20px;
`

const OlLogo = styled(HeaderOlLogo)`
  margin-bottom: 7px;
`

export default function TopBar({
  universalLinks,
  setUniversalLinks,
  appLinks,
  setAppLinks,
  uriScheme,
  setUriScheme,
}) {
  return (
    <TopBarWrapper>
      <HeaderAfLogo />
      <Divider />
      <OlLogo />
      <DropMenuContainer>
        <DropMenu id="one" ariaLabel="3 dots icon" icon={<SettingsIcon />}>
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
        </DropMenu>
      </DropMenuContainer>
    </TopBarWrapper>
  )
}
