import React, { useState } from "react";
import styles from "../../styles/CategoriesPage.module.css";
import { useRouter } from "next/router";
function CategoriesPage() {
  const router = useRouter();
  const [query, setQuery] = useState({ difficulty: "", time: "", cuisine: "" });

  function changeHandler(e) {
    setQuery({ ...query, [e.target.name]: e.target.value });
  }
  function searchHandler() {
    router.push({
      pathname: "/categories",
      query,
    });
  }

  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.subContainer}>
        <div className={styles.select}>
          <select
            value={query.difficulty}
            name="difficulty"
            onChange={changeHandler}
          >
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select value={query.time} name="time" onChange={changeHandler}>
            <option value="">Cooking Time</option>
            <option value="more">More than 30 min</option>
            <option value="less">less than 30 min</option>
          </select>
          <select
            name="cuisines"
            value={query.cuisine}
            onChange={changeHandler}
          >
            <option value="">Cuisines</option>
            <option value="american">American</option>
            <option value="anglo-indian">Anglo-Indian</option>
            <option value="austrian">Austrian</option>
            <option value="belgian">Belgian</option>
            <option value="brazilian">Brazilian</option>
            <option value="british">British</option>
            <option value="cambodian">Cambodian</option>
            <option value="canadian">Canadian</option>
            <option value="central-asian">Central Asian</option>
            <option value="chinese">Chinese</option>
            <option value="french">French</option>
            <option value="greek">Greek</option>
            <option value="healthy-diet">Healthy/Diet</option>
            <option value="hungarian">Hungarian</option>
            <option value="indian">Indian</option>
            <option value="indonesian">Indonesian</option>
            <option value="italian">Italian</option>
            <option value="jamaican">Jamaican</option>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="levantine">Levantine</option>
            <option value="malaysian">Malaysian</option>
            <option value="mexican">Mexican</option>
            <option value="middle-eastern">Middle Eastern</option>
            <option value="moroccan">Moroccan</option>
            <option value="peruvian">Peruvian</option>
            <option value="persian">Persian</option>
            <option value="polish">Polish</option>
            <option value="portuguese">Portuguese</option>
            <option value="south-american">South American</option>
            <option value="spanish">Spanish</option>
            <option value="sri-lankan">Sri Lankan</option>
            <option value="swedish">Swedish</option>
            <option value="thai">Thai</option>
            <option value="vietnamese">Vietnamese</option>
            <option value="west-african">West African</option>
          </select>
          <button onClick={searchHandler}>Search</button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;

export async function getServerSideProps(context) {
  const { query: difficulty, time, cuisines } = context;
  const res = await fetch(`http://localhost:4000/data`);
  const data = await res.json();

  const filteredData = data.filter((item) => {
    const difficultyResult = item.details.filter(
      (detail) => detail.difficulty && detail.difficulty === difficulty,
    );
    const timeResult = item.details.filter(
      (detail) => detail.time && detail.time === time,
    );
    const cookingTime = detail["Cooking Time"] || "";
    const cuisineResult = item.details.filter(
      (detail) => detail.cuisine && detail.cuisine === cuisines,
    );
    return difficultyResult && timeResult && cuisineResult;
  });

  return {
    props: {
      query,
    },
  };
}
