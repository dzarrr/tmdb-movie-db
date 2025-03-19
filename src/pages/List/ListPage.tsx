import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Button, Skeleton, Pagination } from "antd";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import ListItem from "../List/component/ListItem";
import { getMovies } from "../../services/movieService";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(20em, auto));
  gap: 2.5em;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minMax(10em, auto));
    gap: 1em;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4em;

  ul {
    display: flex;
    align-items: center;
  }
`;

export default function ListPage() {
  const [category, setCategory] = useState<string>("");
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
  });

  const { data: movieData, loading } = useRequest(
    () =>
      getMovies({
        category,
        page: pagination.currentPage,
      }),
    {
      onError: (e) => {
        alert(e);
      },
      onSuccess: (data) => console.log(data),
      refreshDeps: [pagination],
    }
  );

  function handleCategoryBtnClick(
    category: "top_rated" | "now_playing" | "popular" | "upcoming"
  ) {
    const currentParams = new URLSearchParams(location.search);

    currentParams.set("category", category);
    currentParams.set("page", "1");

    navigate(`?${currentParams.toString()}`);
  }

  function handlePageChange(newPage: number) {
    const currentParams = new URLSearchParams(location.search);

    currentParams.set("page", newPage.toString());

    navigate(`?${currentParams.toString()}`);
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromQueryParam = Number(params.get("page")) || 1;
    const categoryFromQueryParam = params.get("category");

    setPagination({
      currentPage: pageFromQueryParam,
    });

    if (categoryFromQueryParam) {
      setCategory(categoryFromQueryParam);
    }
  }, [location.search]);

  return (
    <div>
      <div>
        <Button onClick={(e) => handleCategoryBtnClick("now_playing")}>
          Now Playing
        </Button>
        <Button onClick={(e) => handleCategoryBtnClick("popular")}>
          Popular
        </Button>
        <Button onClick={(e) => handleCategoryBtnClick("top_rated")}>
          Top Rated
        </Button>
        <Button onClick={(e) => handleCategoryBtnClick("upcoming")}>
          Upcoming
        </Button>
      </div>
      <ListContainer>
        {loading && <Skeleton />}
        {!loading &&
          movieData?.results?.map((movie) => (
            <ListItem key={movie.id} movieData={movie} />
          ))}
      </ListContainer>
      <PaginationContainer
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "4em",
        }}
      >
        {movieData && movieData?.results.length > 0 && !loading && (
          <Pagination
            simple
            showSizeChanger={false}
            current={pagination.currentPage}
            onChange={handlePageChange}
            total={movieData.total_results}
          />
        )}
      </PaginationContainer>
    </div>
  );
}
