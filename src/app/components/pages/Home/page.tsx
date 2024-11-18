import Position from "@/app/components/Position";
import ShopList from "./ShopList";


export default function Home() {
    return(
        <div className="pt-8 pl-10">
            <ShopList />
            <Position />
        </div>
    )
}