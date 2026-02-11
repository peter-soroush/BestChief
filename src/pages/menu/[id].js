import DetailsPage from "@/components/templates/DetailsPage";
import { useRouter } from "next/router";
import React from "react";

function Details({ data }) {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading Page...</div>;
  }

  return <DetailsPage {...data} />;
}

export default Details;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/data");
  const json = await res.json();
  const data = json.slice(0, 20);

  const paths = data.map((food) => ({
    params: { id: food.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(`http://localhost:4000/data/${params.id}`);
  const data = await res.json();
  console.log(data.id);

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
    revalidate: 10,
  };
}
