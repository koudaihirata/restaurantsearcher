'use client';

import { useState } from "react";
import { NabFlagContext } from "./components/header/Header";
import Header from "./components/header/Header";
import Image from "next/image";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [nabFlag, setNabFlag] = useState<boolean>(false);

  return (
    <NabFlagContext.Provider value={{ nabFlag, setNabFlag }}>
      <Header />
      <section className={`mt-14 ${nabFlag ? 'ml-0' : 'ml-64'} transition-all duration-500`}>
        <Image src="/bgLogo.svg" alt="背景" width={600} height={600} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="relative z-10">
          {children}
        </div>
      </section>
    </NabFlagContext.Provider>
  );
}
