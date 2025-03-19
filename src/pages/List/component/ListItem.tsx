import { Card, Image } from "antd";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { Movie as MovieType } from "../../../services/movieService.type";

const StyledCard = styled(Card)`
  max-width: 25em;

  @media (max-width: 480px) {
    max-width: 17.5em;
  }

  .ant-card-body {
    padding: 1.5em 2em;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 18px;

    @media (max-width: 480px) {
      font-size: 12px;
    }

    :first-child {
      align-self: center;
      margin-bottom: 0.75em;
    }
  }
`;

const Title = styled.h3`
  text-decoration: underline;
  text-decoration-color: var(--blue-accent);
  text-decoration-thickness: 3px;
  font-size: 20px;
  font-weight: bold;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Metadata = styled.p`
  color: #666;
  margin: 0.2em 0;
`;

const Score = styled.span``;

const GenreList = styled.p`
  color: #888;
  margin: 0.25em 0;
`;

export default function ListItem({ movieData }: { movieData: MovieType }) {
  const navigate = useNavigate();

  return (
    <StyledCard
      //   onClick={() => navigate(`detail/${animeData.mal_id}`)}
      hoverable
    >
      <div style={{ flexBasis: "60%" }}>
        <Image
          preview={false}
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          fallback="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
        />
      </div>
      <div style={{ flexBasis: "40%" }}>
        <Title>{movieData.original_title || movieData.original_title}</Title>
        {/* <Metadata>
          {animeData.type} | {animeData.episodes ?? "?"} episodes
        </Metadata> */}
        <Score>
          <b>{movieData.vote_average}</b> / 10
        </Score>
        {/* <GenreList>{animeData.genres.map((g) => g.name).join(", ")}</GenreList> */}
      </div>
    </StyledCard>
  );
}
