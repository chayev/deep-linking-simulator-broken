import React, { useState, useRef } from "react"
import { ThemeProvider } from "@appsflyer/fe-ui-theme"
import CssBaseline from "@material-ui/core/CssBaseline"

import TopBar from "./components/header/TopBar"
import Banner from "./components/header/Banner"
import OneLinkForm from "./components/OneLinkForm"
import QROutput from "./components/QROutput"

import styled from "styled-components"
import * as FullStory from "@fullstory/browser"

FullStory.init({ orgId: "ZKPBZ" })

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;

  background: #f2f2f2;

  padding: 16px;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    padding: 24px;
  }
`

function App() {
  const [selectedPage, setSelectedPage] = useState("peaches")
  const [fruitAmount, setFruitAmount] = useState(null)
  const [iOSRedirect, setIOSRedirect] = useState({
    value: "appStore",
    label: "App Store",
  })
  const [androidRedirect, setAndroidRedirect] = useState({
    value: "playStore",
    label: "Play Store",
  })
  const [webRedirect, setWebRedirect] = useState({
    value: `https://chayev.github.io/appsflyer-smartbanner-fruits/`,
    // value: `https://www.appsflyer.com/web-Demo/`,
    label: "Web Page",
  })
  const [oneLinkURL, setOneLinkURL] = useState("")
  const qrCodeRef = useRef(null)
  const [universalLinks, setUniversalLinks] = useState(true)
  const [appLinks, setAppLinks] = useState(true)
  const [uriScheme, setUriScheme] = useState(true)

  return (
    <ThemeProvider>
      <CssBaseline />

      <TopBar
        universalLinks={universalLinks}
        setUniversalLinks={setUniversalLinks}
        appLinks={appLinks}
        setAppLinks={setAppLinks}
        uriScheme={uriScheme}
        setUriScheme={setUriScheme}
      />
      <Banner
        universalLinks={universalLinks}
        setUniversalLinks={setUniversalLinks}
        appLinks={appLinks}
        setAppLinks={setAppLinks}
        uriScheme={uriScheme}
        setUriScheme={setUriScheme}
      />

      <BodyWrapper>
        <OneLinkForm
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          fruitAmount={fruitAmount}
          setFruitAmount={setFruitAmount}
          iOSRedirect={iOSRedirect}
          setIOSRedirect={setIOSRedirect}
          androidRedirect={androidRedirect}
          setAndroidRedirect={setAndroidRedirect}
          webRedirect={webRedirect}
          setWebRedirect={setWebRedirect}
          setOneLinkURL={setOneLinkURL}
          qrCodeRef={qrCodeRef}
          universalLinks={universalLinks}
          appLinks={appLinks}
          uriScheme={uriScheme}
        />
        <QROutput oneLinkURL={oneLinkURL} qrCodeRef={qrCodeRef} />
      </BodyWrapper>
    </ThemeProvider>
  )
}

export default App
