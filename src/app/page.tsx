'use client';

import Position from "./components/Position";
import Test from "./components/test";
import { useState } from "react";
import { NabFlagContext } from "./components/header/Header";
import Header from "./components/header/Header";

export default function Home() {
  const [nabFlag, setNabFlag] = useState<boolean>(true);

  return (
    <NabFlagContext.Provider value={{ nabFlag, setNabFlag }}>
      <Header />
      <section className={`mt-14 ${nabFlag ? 'ml-0' : 'ml-64'} transition-all duration-500`}>
        <Test/>
        <Position/>
      </section>
    </NabFlagContext.Provider>
  );
}
