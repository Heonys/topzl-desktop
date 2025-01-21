import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { searchResultAtom, searchMediaTypeAtom } from "@/atom";
import type { SupportMediaType } from "@shared/plugin/type";

export const useSearch = () => {
  // const currentQueryRef = useRef("");
  /*
    최근 검색어 저장
    페이지 번호 설정 등

    useSeach 참고

    -> 이전검색에 대한 쿼리와 데이터를 저장
    현재 검색어와 쿼리와 타입이 같다면 저장한 데이터를 다시 보여면됨


    새로운 데이터를 받으면 ref를 업데이트

    사용자가 입력한 데이터가 없으면 이전 검색어를 사용하여 보여줌 -> ref갱신



    ref는 현재 검색어의 값을 추적하기 위해 사용함
    왜냐하면 비동기 작업중에 검색어가 바뀌었을때 ref와 쿼리가 다르면 업데이틀르 방지하기 위함


    검색 요청이 완료되었을 때, currentQueryRef와 일치하지 않으면 결과를 무시
  */

  const [searchResult, setSearchResult] = useAtom(searchResultAtom);
  const [mediaType, setMediaType] = useAtom(searchMediaTypeAtom);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(
    async (query: string, page: number, method: SupportMediaType) => {
      setIsLoading(true);
      try {
        const data = await window.plugin.callPluginMethod({ method, query, page });
        setSearchResult({ query, data });
        setIsLoading(false);
        return data;
      } catch {
        setIsLoading(false);
        return { isEnd: true, data: [] };
      }
    },
    [setSearchResult],
  );

  const onChangeType = (type: SupportMediaType) => {
    setMediaType(type);
  };

  return { search, searchResult, isLoading, mediaType, onChangeType };
};
