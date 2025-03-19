import { notification, Skeleton, Image, Button } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRequest } from "ahooks";
import { styled } from "styled-components";
import { getMovieById } from "../../services/movieService";
import { formatDuration } from "../../lib/formatDuration";
import ErrorResult from "../../component/ErrorResult";

const DetailContainer = styled.div`
  height: 100vh;
  padding: 0 5em;

  @media (max-width: 1024px) {
    padding: 0 1em;
  }
`;

const UpperInfo = styled.div`
  font-size: 18px;

  @media (max-width: 720px) {
    font-size: 14px;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 25px;
`;

const DetailContent = styled.div`
  display: flex;
  gap: 2.5em;
  margin-top: 14px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  @media (max-width: 1024px) {
    max-width: unset;
  }
`;

const RightSection = styled.div`
  flex-grow: 1;
`;

const Synopsis = styled.div``;

const Score = styled.div`
  font-size: 24px;
  margin: 24px 0;

  @media (max-width: 720px) {
    font-size: 18px;
    margin: 12px 0;
  }
`;

const Title = styled.div`
  text-decoration: underline;
  text-decoration-color: var(--blue-accent);

  @media (max-width: 1024px) {
    h1 {
      font-size: 24px;
    }
  }
`;

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notiApi, notiContextHolder] = notification.useNotification();
  const [showErrorPage, setShowErrorPage] = useState(false);

  const { data: movieData, loading } = useRequest(
    () => (id ? getMovieById({ id }) : Promise.reject(new Error("Invalid ID"))),
    {
      onError: (e) => {
        notiApi.open({
          type: "error",
          message: e?.message,
          placement: "topRight",
        });
        setShowErrorPage(true);
      },
      ready: id !== undefined,
    }
  );

  return (
    <div>
      {notiContextHolder}
      {loading ? (
        <Skeleton />
      ) : showErrorPage ? (
        <ErrorResult />
      ) : (
        movieData && (
          <DetailContainer>
            <Button type="primary" ghost onClick={() => navigate(-1)}>
              {"< Back"}
            </Button>
            <DetailContent>
              <LeftSection>
                <StyledImage
                  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                  width={"17.5em"}
                />
              </LeftSection>
              <RightSection style={{ flexGrow: 1 }}>
                <Title>
                  <h1>{`${movieData.title} (${
                    movieData.release_date?.split("-")[0]
                  })`}</h1>
                </Title>
                <UpperInfo>
                  {`${movieData.genres
                    .map((genre) => genre.name)
                    .join(", ")} • ${formatDuration(movieData.runtime)}`}
                </UpperInfo>
                <Score>
                  <b>{movieData.vote_average.toFixed(2)}</b> / 10
                </Score>
                <Synopsis>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Overview
                  </div>
                  {movieData.overview}
                </Synopsis>
              </RightSection>
            </DetailContent>
          </DetailContainer>
        )
      )}
    </div>
  );
}
