export type Position = {
    id: number,
    name: string,
    shortName: string
  }
  export const getPositions = (allData: any) => {
      let positions: Position[] = []
        allData?.element_types?.map((item: any) => {
          positions?.push({
            id: item?.id,
            name: item?.singular_name,
            shortName: item?.singular_name_short
          })
          return null
        })
        return positions
  }