'use client';

import { useState } from "react";
import { NabFlagContext } from "./components/header/Header";
import Header from "./components/header/Header";
import HomeP from "./pages/HomeP/page";

export default function Home() {
  const [nabFlag, setNabFlag] = useState<boolean>(true);

  return (
    <NabFlagContext.Provider value={{ nabFlag, setNabFlag }}>
      <Header />
      <section className={`mt-14 ${nabFlag ? 'ml-0' : 'ml-64'} transition-all duration-500`}>
        <HomeP />
      </section>
    </NabFlagContext.Provider>
  );
}
