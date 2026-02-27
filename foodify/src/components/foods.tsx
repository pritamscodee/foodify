import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
};

type loadingState = "success" | "loading" | "data not found" | null;

function Foods({ data }: user_input_props) {
  const [getfoods, setfoods] = useState<meals[]>([]);
  const [emptyinput, setinput] = useState<Boolean>(true);

  const [loading, setloading] = useState<loadingState>(null);

  useEffect(() => {
    async function fetchingmeals() {
      if (data.length === 0 || !data) {
        setinput(true);
      } else {
        setinput(false);
      }

      if (getfoods.length === 0) {
        setloading("loading");
      }

      const foods =
        data.length === 1
          ? await FoodBy_First_Name(data)
          : await FoodsByName(data);

      const mapped =
        foods["meals"]?.map((meal: any) => ({
          name: meal.strMeal,
          img: meal.strMealThumb,
          category: meal.strCategory,
          area: meal.strArea,
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
          <Card key={idx} className="relative mx-auto w-full max-w-sm pt-0">
            <img
              src={e.img}
              alt="Event cover"
              className="w-full h-full object-cover"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>{e.name}</CardTitle>
              <CardDescription>{e.category}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">{e.area}</Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-5xl">
     
        </div>
      )}
    </div>
  );
}

export default Foods;
