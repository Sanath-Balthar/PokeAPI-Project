import React from 'react'

const Pagination = ({ currentPage, totalPages, pokemonsPerPage, setCurrentPage, fetchHook }) => {
  return (
    <div className="flex md:ml-[30%]">
      <div className="flex space-x-2 items-center">
        <button
          className={`p-1 md:p-2 rounded-lg font-bold ${currentPage === 1 ? 'bg-grey-200' : 'bg-amber-300 hover:bg-amber-500'}`}
          disabled={currentPage === 1}
          onClick={() => {
            const newPage = currentPage - 1
            setCurrentPage(newPage)
            fetchHook.fetchPokemon((newPage - 1) * pokemonsPerPage, pokemonsPerPage)
          }}>
          ‹Previous
        </button>

        {currentPage > 2 && (
          <>
            <button
              className="p-1 md:p-2 rounded-lg font-bold bg-orange-200"
              onClick={() => {
                setCurrentPage(1)
                fetchHook.fetchPokemon(0, pokemonsPerPage)
              }}>
              1
            </button>
            {currentPage > 3 && <span className="p-1">...</span>}
          </>
        )}

        {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
          const pageNo = Math.max(0, currentPage - 2) + index
          // console.log('pageno: ', pageNo, ', totalPages: ', totalPages)
          if (pageNo >= totalPages) return
          return (
            <button
              key={pageNo}
              className={`p-1 md:p-2 rounded-lg font-bold ${currentPage === pageNo + 1 ? 'bg-orange-500 text-white' : 'bg-orange-200'}`}
              onClick={() => {
                const newPage = pageNo + 1
                setCurrentPage(newPage)
                if (totalPages === 8 && newPage === totalPages) fetchHook.fetchPokemon((newPage - 1) * pokemonsPerPage, 10)
                else fetchHook.fetchPokemon((newPage - 1) * pokemonsPerPage, pokemonsPerPage)
              }}>
              {pageNo + 1}
            </button>
          )
        })}

        {currentPage < totalPages - 1 && pokemonsPerPage != 50 && (
          <>
            {currentPage < totalPages - 2 && <span className="p-1">...</span>}
            <button
              className="p-1 md:p-2 rounded-lg font-bold bg-orange-200"
              onClick={() => {
                setCurrentPage(totalPages)
                if (totalPages === 8) {
                  fetchHook.fetchPokemon((totalPages - 1) * pokemonsPerPage, 10)
                } else {
                  fetchHook.fetchPokemon((totalPages - 1) * pokemonsPerPage, pokemonsPerPage)
                }
              }}>
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`p-1 md:p-2 rounded-lg font-bold ${currentPage === totalPages ? 'bg-grey-200' : 'bg-amber-300 hover:bg-amber-500'}`}
          disabled={currentPage === totalPages}
          onClick={() => {
            const newPage = currentPage + 1
            setCurrentPage(newPage)
            if (totalPages === 8 && newPage === totalPages) {
              fetchHook.fetchPokemon((newPage - 1) * pokemonsPerPage, 10)
            } else {
              fetchHook.fetchPokemon((newPage - 1) * pokemonsPerPage, pokemonsPerPage)
            }
          }}>
          ›Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
