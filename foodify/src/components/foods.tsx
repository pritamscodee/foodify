import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  rating:number
};

type loadingState = "success" | "loading" | "data not found" | null;

function Foods({ data }: user_input_props) {
  const [getfoods, setfoods] = useState<meals[]>([]);

  const [loading, setloading] = useState<loadingState>(null);

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
          price: prices[i % prices.length].price, // i is index  0 1 2 .... mapped datas and i%prices.len gives 0 1 2
          rating: rating[i % rating.length].review
        })) ?? [];

      setfoods(mapped);
      setloading(null);
    }

    fetchingmeals();
  }, [data]);

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
            className="relative mx-auto w-full max-w-sm pt-0   hover:shadow-xl transition-all duration-300 border bg-lime-500"
          >
            <img
              src={e.img}
              alt="Event cover"
              className="w-full h-full object-cover"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle> ₹ {e.price}</CardTitle>
              <CardDescription className="bg-amber-200"> rating : {e.rating}</CardDescription>
            </CardHeader> 
            <CardFooter>
              <Button className="w-full">{e.area}</Button>
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
