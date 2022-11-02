import React from 'react';


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination mt-3' >
        {pageNumbers.map(number => (
          <li key={number} style={{"marginRight":"10px"}}>
            <button onClick={() => paginate(number)}  className='btn btn-primary btn-sm  '  >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;