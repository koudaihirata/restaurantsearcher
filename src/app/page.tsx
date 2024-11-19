import App from "./app";
import ShopDetail from "./components/pages/Home/ShopDetail";
import ShopList from "./components/pages/Home/ShopList";
import { white } from "./style/color";

export default function Home() {

  return (
    <App>
        <div className="pt-8 pl-10 pr-10">
          <div className="flex gap-8">
            <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto" style={{backgroundColor:white}}>
              <ShopList />
            </div>
            <div className="w-full h-70vh opacity-90 rounded-lg  overflow-auto" style={{backgroundColor:white}}>
              <ShopDetail />
            </div>
          </div>
        </div>
    </App>
  );
}
