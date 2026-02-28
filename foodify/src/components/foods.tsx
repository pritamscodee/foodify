import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router";
import prices from "@/fakedata/pricelist";
import { rating } from "@/fakedata/review";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FoodBy_First_Name, FoodsByName } from "../Api/api";

type user_input_props = {
  data: string;
};

type meals = {
  name: string;
  img: string;
  category: string;
  area: string;
  price: number;
  rating: number;
};

type ContextCart = {
  cart: meals[];
  setcart: React.Dispatch<React.SetStateAction<meals[]>>;
};

type loadingState = "success" | "loading" | "data not found" | null;

function Foods({ data }: user_input_props) {
  const [getfoods, setfoods] = useState<meals[]>([]);
  const [loading, setloading] = useState<loadingState>(null);
  const { cart, setcart } = useOutletContext<ContextCart>();

  useEffect(() => {
    async function fetchingmeals() {
      if (getfoods.length === 0) {
        setloading("loading");
      }

      const foods =
        data.length === 1
          ? await FoodBy_First_Name(data)
          : await FoodsByName(data);

      const mapped =
        foods["meals"]?.map((meal: any, i: number) => ({
          name: meal.strMeal,
          img: meal.strMealThumb,
          category: meal.strCategory,
          area: meal.strArea,
          price: prices[i % prices.length].price,
          rating: rating[i % rating.length].review,
        })) ?? [];

      setfoods(mapped);
      setloading(null);
    }

    fetchingmeals();
  }, [data]);

  function handleCart(cartitems: meals) {  // passing object and revoke duplicate entry


    if (cart) {

      const filterCarts = cart.some((e: any) =>  //returning true if items already exixt in cart state::
        e.name === cartitems.name

      )
      if (!filterCarts) {

        setcart((prev)=>[...prev,cartitems])
      }




    } else {


      setcart(



        (prev: any) => [...prev, cartitems])
    }







  }

  return (
    <div className="m-29 flex justify-center flex-wrap">
      {loading === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <Button disabled size="sm">
            <Spinner data-icon="inline-start" />
            Loading... Your request ⏳⏳
          </Button>
        </div>
      )}

      {getfoods && getfoods.length > 0 ? (
        getfoods.map((e, idx) => (
          <Card
            key={idx}
            className="relative mx-auto w-full max-w-sm pt-0 hover:shadow-xl transition-all duration-300 border bg-fuchsia-950"
          >
            <img src={e.img} alt="Event cover" className="w-full h-full object-cover" />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>₹ {e.price}</CardTitle>
              <CardDescription className="bg-amber-200">
                rating : {e.rating}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-50 bg-amber-700 hover:bg-blue-950 hover:text-shadow-amber-950 transition"
                onClick={() => handleCart(e)}
              >
                Add-to-Cart
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-5xl"></div>
      )}
    </div>
  );
}

export default Foods;

export function Cartitems() {
  const { cart } = useOutletContext<ContextCart>();
  console.log(cart)

  return (
    <>

      <div className="flex flex-wrap gap-4 mt-15 ml-4">
        {cart && cart.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-amber-700 border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80"
          >
            <img
              className="rounded-md max-h-40 w-full object-cover"
              src={item.img}
              alt={item.name}
            />
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}