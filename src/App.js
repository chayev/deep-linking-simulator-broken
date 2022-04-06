import React, { useState } from "react"
import { ThemeProvider } from "@appsflyer/fe-ui-theme"
import {
  TextField,
  Select,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  MultiSelect,
} from "@appsflyer/fe-ui-core"
import CssBaseline from "@material-ui/core/CssBaseline"
import styled from "styled-components"
import Slider from "@material-ui/core/Slider"

import TopBar from "./components/header/TopBar"
import Banner from "./components/header/Banner"

const BodyWrapper = styled.div`
  background: #f2f2f2;
  display: flex;
  flex-direction: column;

  padding: 16px;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`

function App() {
  const [appId, setAppId] = useState("")
  const [devKey, setDevKey] = useState("")
  const [installType, setInstallType] = useState("")
  const [numUsers, setNumUsers] = useState("")
  const [appsflyerId, setAppsflyerId] = useState("")
  const [shouldSetSessions, setShouldSetSessions] = useState("no")
  const [shouldSetEvents, setShouldSetEvents] = useState("no")
  const [sessionRange, setSessionRange] = useState([5, 15])
  const [eventRange, setEventRange] = useState([5, 15])
  const [events, setEvents] = useState([])

  const handleSessionRange = (event, newValue) => {
    setSessionRange(newValue)
  }

  const handleEventRange = (event, newValue) => {
    setEventRange(newValue)
  }

  return (
    <ThemeProvider>
      <CssBaseline />

      <TopBar />
      <Banner />

      <BodyWrapper>
        <ItemWrapper>
          <Typography variant="body1" weight="bold" color="primary">
            1. What is the App ID and Dev Key? (required)
          </Typography>
          <TextField
            id="1"
            placeholder="App ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          />
          <TextField
            id="2"
            placeholder="Dev Key"
            value={devKey}
            onChange={(e) => setDevKey(e.target.value)}
          />
        </ItemWrapper>

        <ItemWrapper>
          <Typography variant="body1" weight="bold" color="primary">
            2. Do you want to create new users or do you want to link events
            and/or sessions to an exisitng one?
          </Typography>
          <Select
            options={[
              { value: "newUser", label: "Create new user(s)" },
              {
                value: "linkData",
                label: "Link data to existing user",
              },
            ]}
            value={installType}
            onChange={setInstallType}
            size="medium"
          />

          {installType.value === "newUser" ? (
            <>
              <Typography variant="body1" weight="bold" color="primary">
                2a. How many new users do you want to create?
              </Typography>
              <TextField
                id="3"
                placeholder="Number of users"
                value={numUsers}
                onChange={(e) => setNumUsers(e.target.value)}
              />
            </>
          ) : installType.value === "linkData" ? (
            <>
              <Typography variant="body1" weight="bold" color="primary">
                2a. Please provide Appsflyer ID
              </Typography>
              <TextField
                id="4"
                placeholder="Appsflyer ID"
                value={appsflyerId}
                onChange={(e) => setAppsflyerId(e.target.value)}
              />
            </>
          ) : null}
        </ItemWrapper>

        <ItemWrapper>
          <Typography variant="body1" weight="bold" color="primary">
            3. Do you wnat to link session data?
          </Typography>
          <ToggleButtonGroup
            size="small"
            value={shouldSetSessions}
            onChange={(_, choice) => setShouldSetSessions(choice)}
            exclusive
          >
            <ToggleButton value="yes" label="Yes" />
            <ToggleButton value="no" label="No" />
          </ToggleButtonGroup>

          {shouldSetSessions === "yes" && (
            <>
              <Typography variant="body1" weight="bold" color="primary">
                3a. Number of sessions to generate
              </Typography>
              <Slider
                value={sessionRange}
                marks={[
                  {
                    value: 0,
                    label: "0",
                  },
                  {
                    value: 5,
                    label: "5",
                  },
                  {
                    value: 10,
                    label: "10",
                  },
                  {
                    value: 15,
                    label: "15",
                  },
                  {
                    value: 20,
                    label: "20",
                  },
                ]}
                onChange={handleSessionRange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                max={20}
              />
            </>
          )}
        </ItemWrapper>

        <ItemWrapper>
          <Typography variant="body1" weight="bold" color="primary">
            4. Do you want to link inapp events?
          </Typography>
          {/* Do you want to link events to users */}
          <ToggleButtonGroup
            size="small"
            value={shouldSetEvents}
            onChange={(_, choice) => setShouldSetEvents(choice)}
            exclusive
          >
            <ToggleButton value="yes" label="Yes" />
            <ToggleButton value="no" label="No" />
          </ToggleButtonGroup>
          {shouldSetEvents === "yes" && (
            <>
              <Typography variant="body1" weight="bold" color="primary">
                4a. Number of events to generate
              </Typography>
              <Slider
                value={eventRange}
                marks={[
                  {
                    value: 0,
                    label: "0",
                  },
                  {
                    value: 5,
                    label: "5",
                  },
                  {
                    value: 10,
                    label: "10",
                  },
                  {
                    value: 15,
                    label: "15",
                  },
                  {
                    value: 20,
                    label: "20",
                  },
                ]}
                onChange={handleEventRange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                max={20}
              />
            </>
          )}
        </ItemWrapper>

        <ItemWrapper>
          <Typography variant="body1" weight="bold" color="primary">
            4b. Select the events you want to include:
          </Typography>
          <MultiSelect
            options={[
              { value: "af_login", label: "af_login" },
              { value: "af_search", label: "af_search" },
              { value: "af_list_view", label: "af_list_view" },
              { value: "af_content_view", label: "af_content_view" },
              { value: "af_add_to_cart", label: "af_add_to_cart" },
              { value: "af_purchase", label: "af_purchase" },
              { value: "af_start_trial", label: "af_start_trial" },
              { value: "af_subscribe", label: "af_subscribe" },
            ]}
            values={events}
            onChange={setEvents}
          />
        </ItemWrapper>
      </BodyWrapper>
    </ThemeProvider>
  )
}

export default App
