import { Card, Image } from "antd";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { Movie as MovieType } from "../../../services/movieService.type";

const StyledCard = styled(Card)`
  max-width: 25em;
  border-radius: 25px;

  @media (max-width: 480px) {
    max-width: 17.5em;
  }

  .ant-card-body {
    padding: 1.5em 2em;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 18px;
    justify-content: space-between;

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

const Score = styled.span``;

export default function ListItem({ movieData }: { movieData: MovieType }) {
  const navigate = useNavigate();

  return (
    <StyledCard
      onClick={() => navigate(`detail/${movieData.id}`)}
      hoverable
      variant={"borderless"}
    >
      <div>
        <Image
          preview={false}
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          fallback="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
        />
      </div>
      <div>
        <Title>{movieData.original_title || movieData.original_title}</Title>
        <Score>
          <b>{movieData.vote_average.toFixed(2)}</b> / 10
        </Score>
      </div>
    </StyledCard>
  );
}
