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
import Button from "@material-ui/core/Button"
import { v4 as uuidv4 } from "uuid"

import TopBar from "./components/header/TopBar"
import Banner from "./components/header/Banner"

const BodyWrapper = styled.div`
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`

const URL = "http://jeff.afsatools.com:5000"

function App() {
  const [appId, setAppId] = useState("")
  const [devKey, setDevKey] = useState("")
  const [installType, setInstallType] = useState("")
  const [numUsers, setNumUsers] = useState("1")
  const [appsflyerId, setAppsflyerId] = useState("")
  const [shouldSetSessions, setShouldSetSessions] = useState("no")
  const [shouldSetEvents, setShouldSetEvents] = useState("no")
  const [sessionRange, setSessionRange] = useState([5, 15])
  const [eventRange, setEventRange] = useState([5, 15])
  const [events, setEvents] = useState([])

  const getRandomNum = (min, max) => Math.random() * (max - min) + min

  const setSessionsAndEvents = async (url) => {
    if (shouldSetSessions === "yes") {
      const num = getRandomNum(sessionRange[0], sessionRange[1])
      for (let i = 1; i <= num; i++) {
        const sessionUrl = url.replace("counter=1", "counter=3")
        await fetch(sessionUrl)
        console.log("sessionUrl", sessionUrl)
      }
    }

    if (shouldSetEvents === "yes") {
      events.forEach(async (e) => {
        const num = getRandomNum(eventRange[0], eventRange[1])
        for (let i = 1; i <= num; i++) {
          let eventUrl = url.replace("counter=1", "counter=3")
          eventUrl = eventUrl.replace("launch", "inapps")
          eventUrl = `${eventUrl}&event_name=${e.value}`
          await fetch(eventUrl)
          console.log("eventUrl", eventUrl)
        }
      })
    }
  }

  const submitNewUser = async () => {
    for (let i = 1; i <= parseInt(numUsers); i++) {
      const uid = uuidv4()
      const url = `${URL}/launch?appid=${appId}&devkey=${devKey}&uid=${uid}&idfa=123456789-987654321&counter=1`

      try {
        await fetch(url)
        console.log("installUrl", url)
        setSessionsAndEvents(url)
      } catch (e) {
        console.log("submitNewUser ERROR", e)
      }
    }
  }

  const submitLinkData = () => {
    const url = `${URL}/launch?appid=${appId}&devkey=${devKey}&uid=${appsflyerId}&idfa=123456789-987654321&counter=1`
    try {
      setSessionsAndEvents(url)
    } catch (e) {
      console.log("submitLinkData ERROR", e)
    }
  }

  const submit = async () => {
    if (!appId || !devKey) {
      return alert("Please provide App ID and Dev Key.")
    }

    if (!installType) {
      return alert("Please select an option for Question 2.")
    }

    if (installType.value === "newUser") {
      return submitNewUser()
    }

    if (installType.value === "linkData") {
      if (!appsflyerId) return alert("Please provide an Appsflyer ID.")
      return submitLinkData()
    }
  }

  return (
    <ThemeProvider>
      <CssBaseline />

      <TopBar />
      <Banner />

      <BodyWrapper>
        <div>
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

            <ItemWrapper>
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
          </ItemWrapper>

          <ItemWrapper>
            <Typography variant="body1" weight="bold" color="primary">
              3. Do you want to link session data?
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
                <ItemWrapper>
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
                    onChange={(event, newValue) => setSessionRange(newValue)}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    max={20}
                  />
                </ItemWrapper>
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
                <ItemWrapper>
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
                    onChange={(event, newValue) => setEventRange(newValue)}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    max={20}
                  />
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
              </>
            )}
          </ItemWrapper>

          <ItemWrapper>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={submit}
            >
              Submit
            </Button>
          </ItemWrapper>
        </div>
      </BodyWrapper>
    </ThemeProvider>
  )
}

export default App
