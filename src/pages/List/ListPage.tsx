import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Button, Skeleton, Pagination, Input } from "antd";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import ListItem from "../List/component/ListItem";
import { getMovies } from "../../services/movieService";
import { TMDB_MAX_ITEM_PER_PAGE, TMDB_MAX_PAGE } from "../../lib/const";

const { Search } = Input;
const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(20em, auto));
  gap: 2.5em;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minMax(10em, auto));
    gap: 1em;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-bottom: 25px;
  padding: 10px 0;

  @media (max-width: 480px) {
    width: 300px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const CategoryHeader = styled.h3`
  margin: 0;
`;

const StyledSearch = styled(Search)`
  margin-bottom: 2.5em;

  .ant-btn {
    background-color: var(--blue-accent);

    &:hover {
      background-color: var(--blue-accent) !important;
      filter: brightness(1.25);
    }
  }
`;

const CategoryButton = styled.button`
  text-align: left;
  color: black;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: unset;
  border: unset;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--blue-accent);
    text-decoration-thickness: 5px;
  }

  &[data-active="true"] {
    text-decoration: underline;
    text-decoration-color: var(--blue-accent);
    text-decoration-thickness: 5px;
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
  const [category, setCategory] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
  });

  const { data: movieData, loading } = useRequest(
    () =>
      getMovies({
        ...(category && { category }),
        query: searchText,
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
    const currentParams = new URLSearchParams();
    currentParams.set("category", category);
    currentParams.set("page", "1");

    navigate(`?${currentParams.toString()}`);
  }

  function handlePageChange(newPage: number) {
    const currentParams = new URLSearchParams(location.search);

    currentParams.set("page", newPage.toString());

    navigate(`?${currentParams.toString()}`);
  }

  function handleSearchSubmit(searchQuery: string) {
    const currentParams = new URLSearchParams();

    currentParams.set("query", searchQuery);
    currentParams.set("page", "1");

    console.log(currentParams.toString());

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
    } else {
      setCategory(null);
    }
  }, [location.search]);

  return (
    <div>
      <StyledSearch
        placeholder="Find your favorite movie..."
        enterButton="Search"
        size="large"
        loading={loading}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={handleSearchSubmit}
      />
      <CategoryContainer>
        <CategoryButton
          data-active={category === "now_playing"}
          onClick={(e) => handleCategoryBtnClick("now_playing")}
        >
          Now Playing
        </CategoryButton>
        <CategoryButton
          data-active={category === "popular"}
          onClick={(e) => handleCategoryBtnClick("popular")}
        >
          Popular
        </CategoryButton>
        <CategoryButton
          data-active={category === "top_rated"}
          onClick={(e) => handleCategoryBtnClick("top_rated")}
        >
          Top Rated
        </CategoryButton>
        <CategoryButton
          data-active={category === "upcoming"}
          onClick={(e) => handleCategoryBtnClick("upcoming")}
        >
          Upcoming
        </CategoryButton>
      </CategoryContainer>
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
            pageSize={TMDB_MAX_ITEM_PER_PAGE}
            total={
              movieData.total_results / TMDB_MAX_ITEM_PER_PAGE > TMDB_MAX_PAGE
                ? TMDB_MAX_PAGE * TMDB_MAX_ITEM_PER_PAGE
                : movieData.total_results
            }
          />
        )}
      </PaginationContainer>
    </div>
  );
}
