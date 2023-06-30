export default function List({ items, emptyState, renderItem }){
  return (
    <>
      {
        !items.length ? emptyState : (
          items.map((item, index) => renderItem(item, index))
        )
      }
    </>
  )
}