import App from "./app";
import ShopList from "./components/pages/Home/ShopList";

export default function Home() {

  return (
    <App>
        <div className="pt-8 pl-10">
            <ShopList />
        </div>
    </App>
  );
}
