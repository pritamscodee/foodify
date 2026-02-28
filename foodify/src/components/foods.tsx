import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router";
import prices from "@/fakedata/pricelist";
import { rating } from "@/fakedata/review";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardContent,
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

      const q = data.trim();

      if (!q) {
        setfoods([]);
        setloading(null);
        return;
      }

      const foods =
        data.trim().length === 1
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

  function handleCart(cartitems: meals) {
    // passing object and revoke duplicate entry

    if (cart) {
      const filterCarts = cart.some(
        (
          e: any, //returning true if items already exixt in cart state::
        ) => e.name === cartitems.name,
      );
      if (!filterCarts) {
        setcart((prev) => [...prev, cartitems]);
      }
    } else {
      setcart((prev: any) => [...prev, cartitems]);
    }
  }

  return (
    <div className="m-29 flex justify-center flex-wrap">
      {loading === "loading" && (
        <Card className="w-full max-w-xs  bg-gray-600  animate-pulse animate-caret-blink">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
      )}

      {!data.trim() && (
        <div className="flex flex-col items-center mt-24 text-center text-gray-400">
          <div className="text-6xl mb-3">🍽️</div>
          <h2 className="text-xl font-semibold">Discover Meals</h2>
          <p className="text-sm mt-2">Please Search your favorite dishes</p>
        </div>
      )}

      {getfoods && getfoods.length > 0 ? (
        getfoods.map((e, idx) => (
          <Card
            key={idx}
            className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={e.img}
                alt="Event cover"
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Badge */}
              <Badge className="absolute top-3 right-3 bg-white/10 text-white backdrop-blur-md border border-white/20">
                Featured
              </Badge>

              <h2 className="absolute bottom-3 left-3 text-xl font-bold tracking-wide">
                ₹ {e.price}
              </h2>
            </div>

            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">
                ⭐ Rating: {e.rating}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button
                className="w-full rounded-xl bg-white text-black font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-[1.03]"
                onClick={() => handleCart(e)}
              >
                Add to Cart
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
  console.log(cart);

  return (
    <>
      <div className="flex flex-wrap gap-6 mt-14 ml-4">
        {cart &&
          cart.map((item, idx) => (
            <div
              key={idx}
              className="group flex w-full max-w-xl items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                className="h-28 w-28 rounded-xl object-cover"
                src={item.img}
                alt={item.name}
              />

              <div className="flex flex-1 flex-col">
                <h2 className="text-lg font-semibold tracking-wide">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Rating: ⭐ {item.rating ?? "4.5"}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xl font-bold text-green-400">
                    ₹ {item.price ?? 499}
                  </span>

                  <div className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1">
                    <button className="text-lg font-bold hover:text-red-400">
                      −
                    </button>
                    <span className="text-sm">1</span>
                    <button className="text-lg font-bold hover:text-green-400">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button className="text-sm text-red-400 opacity-0 transition group-hover:opacity-100 hover:text-red-600">
                Remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
