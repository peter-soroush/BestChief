import React, { useEffect, useState } from "react";
import styles from "../../styles/CategoriesPage.module.css";
import { useRouter } from "next/router";
import Card from "../modules/Card";
function CategoriesPage({ data }) {
  const router = useRouter();
  const [query, setQuery] = useState({ difficulty: "", time: "", cuisine: "" });

  useEffect(() => {
    const { difficulty, time, cuisine } = router.query;
    if (query.time !== time) {
      setQuery({ ...query, time });
    }
    if (query.cuisine !== cuisine) {
      setQuery({ ...query, cuisine });
    }
    if (query.difficulty !== difficulty) {
      setQuery({ ...query, difficulty });
    }
  }, []);

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
          <select name="cuisine" value={query.cuisine} onChange={changeHandler}>
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
        <div className={styles.cards}>
          {!data.length ? (
            <img src="../images/search.png" alt="Category" />
          ) : null}
          {data.map((food) => (
            <Card key={food.id} {...food} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
