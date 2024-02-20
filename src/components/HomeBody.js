import React, { useState, useEffect} from "react";
import { Box, Button, Container, InputWrapper, Stack } from "./styled";
import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import {useDispatch, useSelector} from "react-redux"
import PhotoSection from "./Photo-Section";
import Paginator from "./Paginator";
import {catchError, fetchData, saveQuery, updatePage} from "../redux/reducers/api-reducer"
import { rowalizer } from "../utils/helpers";

const HomeBody = () => {
  const dispatch = useDispatch();
  const {
    photos,
     error, 
     loading, 
     rate_limit, 
     query:lastSearch,
    } = useSelector((state) => state.photos);

    const [itemPerPage, setItemPerPage] = useState(lastSearch.itemPerPage || 12);
    const [query, setQuery] = useState(lastSearch.query || "");

  const fetchPhotos = (type = "latest", page = 1) => {
    let apiUrl;
    if (type === "search") {
      if(query && query.length > 1 && query !== " ") {
        apiUrl = `/search/photos?query=${query}&`;
      } else {
        dispatch(catchError(["Inserisci una parola chiave valida"]
        ));
        return;
      }
    } else {
      apiUrl = "photos?";
    }

dispatch(updatePage(page));
dispatch(fetchData(`${apiUrl}per_page=${itemPerPage}&page=${page}`));
dispatch(
  saveQuery({
      path: ` ${apiUrl}`.trim(),
      itemPerPage,
      type,
      query,
    })
    );
  };

  const searchPhoto = (page = 1) => {
    fetchPhotos("search", page);
  };

  useEffect(
    () => {
    if (!lastSearch.query) {
      fetchPhotos();
    } else {
      fetchPhotos(lastSearch.type)
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [itemPerPage]);

  
  return (
    <Container size="fullwidth">
      <Container mt="96px">
<Stack justify="space-between" align="end">
<h4>search your photos</h4>
<p style={{
  color: "var(--grey-700)"
}}>
{`Richieste: ${rate_limit.remaining}/${rate_limit.total}`}
</p>
</Stack>
<Box mt="24px">
<Stack
width="fit-content"
bg="grey.900"
borderRadius="100px"
border="1px solid"
borderColor={error.status ? "error" : "grey.700"}
px="18px"
style={{
  overflowX: "hidden",
}}>

<InputWrapper 
placeholder="Cerca foto"
border="none"
pl="opx"
value={query}
onChange={(e) => {
  setQuery(e.target.value)
}} />
<Button 
rightIcon={<SearchIcon />}
isLoading={false}
disabled={false}
variant="text" 
iconColor="grey.700"
bg="grey.900"
onClick={() => searchPhoto()}
/>

</Stack>
</Box>
<Container mt="72px">
  <Stack direction="column" spacing="118px">
    {!loading &&
     !error.status &&
      (photos.length > 0 || photos?.results?.length > 0)
    ? (
        rowalizer(photos.results ? photos.results :
          photos).map((el) => {
         return <PhotoSection row={el} />
        }
        )
      ) : !loading && error.status ? (
       error.message && error.message.length > 0 ? (
       error.message.join(" ") 
       ) : (
        "Error"
       )
       ) : (
         <h3> Loading </h3>
    )}
    <Stack justify="flex-end">
<p style={{
  color:"var(--grey-700)"
}}>
  Item per page <select
  value={itemPerPage}
  onChange={(e) => setItemPerPage(e.target.value)}
  >
    {
      Array.from({length: 7}, (_, index) => {
        return (index + 1) * 3;
      }).map(el => {
        return <option value={el} key={`option-${el}`}>
          {el}
        </option>
      })
    }
  </select>
</p>
    </Stack>
    </Stack>
    
    </Container >
      </Container>
      <Paginator />

    </Container>
  )
};

export default HomeBody;


