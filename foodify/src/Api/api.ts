import axios from "axios";
async function FoodsByName(data: string) {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function FoodBy_First_Name(data: string) {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${data}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { FoodsByName, FoodBy_First_Name };
