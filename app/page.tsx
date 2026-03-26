// app/page.tsx

import HeroHeader from "./components/header";
import HeroHeader1 from "./components/header1";
import HeroHeader3 from "./components/header3";
import HeroHeader4 from "./components/header4";
import HeroHeader5 from "./components/header5";
import HeroHeader6 from "./components/header6";
import HeroHeader7 from "./components/header7";

export default function Home() {
  return (
    <main>
      <HeroHeader />
      <HeroHeader1 />
      <HeroHeader5 />
      <HeroHeader3 />
      <HeroHeader4 />
      <HeroHeader6 />
      <HeroHeader7 />
    </main>
  );
}