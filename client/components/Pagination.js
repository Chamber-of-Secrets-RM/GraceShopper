import React from 'react'

const Pagination = ({postsPerPage, totalPosts, handlePage}) => {
  const pageNumbers = []
  //Pagenumbers start at 1, not 0
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="paginationScroll">
        {pageNumbers.map(pageNum => {
          return (
            <li className="pageLink" key={pageNum}>
              <a href="#top" onClick={() => handlePage(pageNum)}>
                {pageNum}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Pagination
