import { Link } from "react-router";
import { Button } from "../ui/button";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen relative">
        <div className="w-full h-full absolute -z-10">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            alt=""
          />
        </div>
        <div className="w-full h-full bg-slate-600/70 grid place-items-center">
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-bold text-7xl text-white">Vigovia</h2>
            <p className="font-bold text-lg text-white">
              We will plane your next Destination
            </p>
            <Link to={"/itenaryForm"}>
              <Button className="!bg-themeviolet mt-10 !text-xl">
                Create Itenary
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
