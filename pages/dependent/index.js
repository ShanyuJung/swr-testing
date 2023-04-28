import styled from "styled-components";
import Container from "@/components/Layout/Container";
import useSWR from "swr";

const Trending = styled.div`
  font-size: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0px;
`;

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Question = styled.h4`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Dependent = () => {
  const { data: trending, isLoading: trendingLoading } = useSWR(
    `https://api.stackexchange.com/2.3/tags?page=1&pagesize=1&order=desc&sort=popular&site=stackoverflow`,
    fetcher
  );

  const { data: questions, isLoading: questionsLoading } = useSWR(
    () =>
      `https://api.stackexchange.com/2.3/questions?page=1&pagesize=20&order=desc&sort=activity&tagged=${trending.items[0].name}&site=stackoverflow`,
    fetcher
  );

  console.log(trending);
  console.log(questions);

  return (
    <Container>
      <h2>Dependent</h2>
      {trendingLoading && <h3>Loading trending...</h3>}
      {trending &&
        trending.items.map((item) => (
          <Trending key={item.name}>{item.name}</Trending>
        ))}
      <Wrapper>
        {questionsLoading && <h3>Loading questions...</h3>}
        {questions &&
          questions?.items.map((item) => (
            <Question key={item.question_id}>{item.title}</Question>
          ))}
      </Wrapper>
    </Container>
  );
};

export default Dependent;
