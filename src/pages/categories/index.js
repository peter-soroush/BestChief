import React from "react";
import styles from "../../styles/CategoriesPage.module.css";
import CategoriesPage from "@/components/templates/CategoriesPage";

function categories({ data }) {
  return <CategoriesPage data={data} />;
}

export default categories;

export async function getServerSideProps(context) {
  const { query } = context;
  const { difficulty, time, cuisine } = query;
  const res = await fetch(`http://localhost:4000/data`);
  const data = await res.json();

  const filteredData = data.filter((item) => {
    const difficultyResult = item.details.filter(
      (detail) => detail.Difficulty && detail.Difficulty === difficulty,
    );
    const timeResult = item.details.filter((detail) => {
      const cookingTime = detail["Cooking Time"] || "";
      const [timeDetail] = cookingTime.split(" ");
      if (time === "less" && timeDetail && +timeDetail <= 30) {
        return detail;
      } else if (time === "more" && timeDetail && +timeDetail >= 30) {
        return detail;
      }
      return null;
    });
    const cuisineResult = item.details.filter((detail) => {
      const cuisineDetail = detail.Cuisine || "";
      if (cuisine) {
        if (cuisine.toLowerCase() === cuisineDetail.toLowerCase()) {
          return detail;
        }
        return null;
      }
    });

    if (time && difficulty && cuisine) {
      return (
        timeResult.length &&
        difficultyResult.length &&
        cuisineResult.length &&
        item
      );
    } else if (time && difficulty && !cuisine) {
      return timeResult.length && difficultyResult.length && item;
    } else if (time && !difficulty && cuisine) {
      return timeResult.length && cuisineResult.length && item;
    } else if (!time && difficulty && cuisine) {
      return difficultyResult.length && cuisineResult.length && item;
    } else if (time && !difficulty && !cuisine) {
      return timeResult.length && item;
    } else if (!time && difficulty && !cuisine) {
      return difficultyResult.length && item;
    } else if (!time && !difficulty && cuisine) {
      return cuisineResult.length && item;
    } else if (!time && !difficulty && !cuisine) {
      return item;
    } else {
      return item;
    }
  });

  return {
    props: {
      data: filteredData,
    },
  };
}
