import Position from "./components/Position";
import Test from "./components/test"; // 修正: ファイル名の大文字小文字を一致させる

export default function Home() {
  return (
    <section className="mt-14 ml-64">
      <Test/>
      <Position/>
    </section>
  );
}
