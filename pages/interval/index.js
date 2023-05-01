import Container from "@/components/Layout/Container";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const RefetchOnInterval = () => {
  const { data } = useSWR(
    "https://worldtimeapi.org/api/timezone/Asia/Taipei",
    fetcher,
    {
      refreshInterval: 500,
    }
  );

  return (
    <Container>
      <h2>Refetch On Interval</h2>
      <h3>{data && data?.datetime}</h3>
    </Container>
  );
};

export default RefetchOnInterval;
