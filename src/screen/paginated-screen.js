import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/layout";
import { useSelector, useDispatch } from "react-redux";
import PhotoSection from "../components/Photo-Section";
import Paginator from "../components/Paginator";
import { Container, Stack } from "../components/styled";
// import { rowalizer } from "../utils/helpers";
import { useParams } from "react-router-dom";
import {
  fetchData,
  saveQuery,
  updatePage,
} from "../redux/reducers/api-reducer";
import { rowalizer } from "../utils/helpers";

const PaginatedScreen = () => {
  const { page } = useParams();
  const {
    query: {query,path, type, itemPerPage},
     error, 
     loading, 
  photos
} = useSelector((store) => store.photos);
  const [item_per_page, set_item_per_page] = useState(itemPerPage);
  const dispatch = useDispatch();

  // const selectItemPerPage = (e) => {
  //   const { value } = e.target;
  //   set_item_per_page(parseInt(value, 10));
  // };
  const fetchPaginatedData = useCallback(() => {
    dispatch(updatePage(page))
    dispatch(fetchData(`${path}&per_page=${item_per_page}&page=${page}`))
    dispatch(saveQuery({path, itemPerPage: item_per_page, type, query}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, item_per_page])

useEffect(() => {
fetchPaginatedData()
}, [fetchPaginatedData])

  return (
    <Layout>
      <Container mt="72">
        <Stack direction="column" spacing="118">
          {
            !loading &&
            !error.status &&
            (photos.length > 0 ||
             photos.results.length > 0 ) ? (
            rowalizer(photos.results ? photos.results : photos).map(
              (row, index) => <PhotoSection row={row} key={index} />
            ) 
            ) : !loading && error.status ? (
        <h3>
              {
                error?.message && error?.message?.length > 0 
                ? error.message.join("")
                 : "Errore sconosciuto"
              }
            </h3> 
            ) : (
               <h3>Caricamento...</h3>
          )}
           <Stack justify="flex-end">
<p style={{
  color:"var(--grey-700)"
}}>
  Item per page <select
  value={item_per_page}
  onChange={(e) => set_item_per_page(e.target.value)}
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
      </Container>
      <Paginator />
    </Layout>
  );
};

export default PaginatedScreen;
