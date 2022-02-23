import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';


import { getPuzzles } from '../../store/puzzle';

// import AddServerModal from '../AddServerModal';
import './PuzzlePage.css'
import logo from '../../logo-black.png'
import logoBW from '../../logo-black.png'

// import Intro from '../Intro';


const Puzzle = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [pieceCount, setPieceCount] = useState(() => {
    const saved = localStorage.getItem("pieceCount");
    const initialValue = JSON.parse(saved);
    return initialValue || 'empty';
  });
  const [category, setCategory] = useState(() => {
    const saved = localStorage.getItem("category");
    const initialValue = JSON.parse(saved);
    return initialValue || 'empty';
  });
  const [difficulty, setDifficulty] = useState(() => {
    const saved = localStorage.getItem("difficulty");
    const initialValue = JSON.parse(saved);
    return initialValue || 'empty';
  });
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem("location");
    const initialValue = JSON.parse(saved);
    return initialValue || 'empty';
  });
  const [orderBy, setOrderBy] = useState(() => {
    const saved = localStorage.getItem("orderBy");
    const initialValue = JSON.parse(saved);
    return initialValue || 'empty';
  });


  const [filteredPuzzles, setFilteredPuzzles] = useState(null);

  const user = useSelector(state => state.session.user);

  let puzzles = useSelector(state => {
    return state.puzzles.puzzleArray
  })


  useEffect(async () => {
    await dispatch(getPuzzles());

    return
  }, [dispatch])


  useEffect(async () => {
    localStorage.setItem('difficulty', JSON.stringify(difficulty));

    return
  }, [dispatch, difficulty])

  useEffect(async () => {
    localStorage.setItem('category', JSON.stringify(category));

    return
  }, [dispatch, category])

  useEffect(async () => {
    localStorage.setItem('location', JSON.stringify(location));

    return
  }, [dispatch, location])

  useEffect(async () => {
    localStorage.setItem('pieceCount', JSON.stringify(pieceCount));

    return
  }, [dispatch, pieceCount])



  useEffect(async () => {
    const savedCategory = localStorage.getItem("category");
    const parsedCategory = JSON.parse(savedCategory);
    if (parsedCategory != 'empty') {
      console.log('calling make+CategoryTag in useeffect')
      makeCategoryTag()
    }

    const savedLocation = localStorage.getItem("location");
    const parsedLocation = JSON.parse(savedLocation);
    if (parsedLocation != 'empty') {
      makeLocationTag()
    }

    const savedDifficulty = localStorage.getItem("difficulty");
    const parsedDifficulty = JSON.parse(savedDifficulty);
    if (parsedDifficulty != 'empty') {
      makeDifficultyTag()
    }

    const pieceCount = localStorage.getItem("pieceCount");
    const parsedPieceCount = JSON.parse(pieceCount);
    if (parsedPieceCount != 'empty') {
      makePieceCountTag()
    }
    return

  }, [dispatch, category, puzzles])

  // if (!user) {
  //     return <Redirect to='/' />;
  // }


  let pieceCountKey = [[0, 99], [100, 200], [201, 500], [501, 1000], [1001, 2000], [2001, 5000], [5001, 99999999]]

  const makeDifficultyTag = () => {
    const checkButton = document.getElementById('difficulty_tag_button')
    if (!checkButton) {
      const ul = document.getElementById("filter_tags_ul");
      if (!ul) return
      const li = document.createElement("li");
      li.id = 'difficulty_tag_li'
      const button = document.createElement("button");
      button.id = 'difficulty_tag_button'
      button.className = "tag_remove_btn"
      button.innerHTML = '<div id="difficulty_tag_div">x</div>';
      button.value = 'empty'
      button.onclick = () => {
        console.log('set---Difficulty (filterDifficulty)')

        setDifficulty('empty');
        filter('difficulty', 'empty')
        const liToDelete = document.getElementById('difficulty_tag_li')
        const buttonToDelete = document.getElementById('difficulty_tag_button')
        const divToDelete = document.getElementById('difficulty_tag_div')
        liToDelete?.remove()
        buttonToDelete?.remove()
        divToDelete?.remove()
      }
      li.className = "li-nostyle filter_tag"
      li.innerHTML = '<div id="difficulty_tag">Difficulty</div>';
      ul.appendChild(li);
      ul.appendChild(button);
    }
  }

  const makePieceCountTag = () => {
    const checkButton = document.getElementById('piece_count_tag_button')
    if (!checkButton) {
      const ul = document.getElementById("filter_tags_ul");
      if (!ul) return
      const li = document.createElement("li");
      li.id = 'piece_count_tag_li'
      const button = document.createElement("button");
      button.id = 'piece_count_tag_button'
      button.className = "tag_remove_btn"
      button.innerHTML = '<div id="piece_count_tag_div">x</div>';
      button.value = 'empty'
      button.onclick = () => {
        setPieceCount('empty');
        filter('pieceCount', 'empty')
        const liToDelete = document.getElementById('piece_count_tag_li')
        const buttonToDelete = document.getElementById('piece_count_tag_button')
        const divToDelete = document.getElementById('piece_count_tag_div')
        liToDelete?.remove()
        buttonToDelete?.remove()
        divToDelete?.remove()
      }
      li.className = "li-nostyle filter_tag"
      li.innerHTML = '<div id="piece_count_tag">Piece Count</div>';
      ul.appendChild(li);
      ul.appendChild(button);
    }
  }

  const makeCategoryTag = () => {
    console.log('make=CategoryTag')
    const checkButton = document.getElementById('category_tag_button')
    if (!checkButton) {
      const ul = document.getElementById("filter_tags_ul");
      if (!ul) return
      const li = document.createElement("li");
      li.id = 'category_tag_li'
      const button = document.createElement("button");
      button.id = 'category_tag_button'
      button.className = "tag_remove_btn"
      button.innerHTML = '<div id="category_tag_div">x</div>';
      button.value = 'empty'
      button.onclick = () => {
        setCategory('empty');
        filter('category', 'empty')
        const liToDelete = document.getElementById('category_tag_li')
        const buttonToDelete = document.getElementById('category_tag_button')
        const divToDelete = document.getElementById('category_tag_div')
        liToDelete?.remove()
        buttonToDelete?.remove()
        divToDelete?.remove()
      }
      li.className = "li-nostyle filter_tag"
      li.innerHTML = '<div id="category_tag">Category</div>';
      ul.appendChild(li);
      ul.appendChild(button);
    }
  }

  const makeLocationTag = () => {
    const checkButton = document.getElementById('location_tag_button')
    if (!checkButton) {
      const ul = document.getElementById("filter_tags_ul");
      if (!ul) return
      const li = document.createElement("li");
      li.id = 'location_tag_li'
      const button = document.createElement("button");
      button.id = 'location_tag_button'
      button.className = "tag_remove_btn"
      button.innerHTML = '<div id="location_tag_div">x</div>';
      button.value = 'empty'
      button.onclick = () => {
        setLocation('empty');
        filter('location', 'empty')
        const liToDelete = document.getElementById('location_tag_li')
        const buttonToDelete = document.getElementById('location_tag_button')
        const divToDelete = document.getElementById('location_tag_div')
        liToDelete?.remove()
        buttonToDelete?.remove()
        divToDelete?.remove()
      }
      li.className = "li-nostyle filter_tag"
      li.innerHTML = '<div id="location_tag">Location</div>';
      ul.appendChild(li);
      ul.appendChild(button);
    }
  }

  const filterPieceCount = (arr, val) => {
    let filteredArr
    if (val == 'empty') {
      setFilteredPuzzles(arr)
      // delete tag
      const liToDelete = document.getElementById('piece_count_tag_li')
      const buttonToDelete = document.getElementById('piece_count_tag_button')
      const divToDelete = document.getElementById('piece_count_tag_div')
      liToDelete.remove()
      buttonToDelete.remove()
      divToDelete.remove()
      return arr
    }
    filteredArr = arr.filter(puzzle =>
      parseInt(puzzle.pieceCount) <= parseInt(pieceCountKey[val][1])
      && parseInt(puzzle.pieceCount) >= parseInt(pieceCountKey[val][0]))
    setFilteredPuzzles(filteredArr)
    if (pieceCount && pieceCount !== 'empty') {
      return filteredArr
    }

    // TAG:
    makePieceCountTag()

    return filteredArr
  }

  const filterCategory = (arr, val) => {
    let filteredArr


    if (val == 'empty') {
      setFilteredPuzzles(arr)
      // delete tag
      const liToDelete = document.getElementById('category_tag_li')
      const buttonToDelete = document.getElementById('category_tag_button')
      const divToDelete = document.getElementById('category_tag_div')
      liToDelete.remove()
      buttonToDelete.remove()
      divToDelete.remove()
      return arr
    }
    filteredArr = arr.filter(puzzle =>
      puzzle.categoryId == val)
    setFilteredPuzzles(filteredArr)
    if (category && category !== 'empty') {
      return filteredArr
    }

    // TAG:
    makeCategoryTag()
    return filteredArr
  }

  const filterLocation = (arr, val) => {
    let filteredArr
    if (val == 'empty') {
      setFilteredPuzzles(arr)
      // delete tag
      const liToDelete = document.getElementById('location_tag_li')
      const buttonToDelete = document.getElementById('location_tag_button')
      const divToDelete = document.getElementById('location_tag_div')
      liToDelete.remove()
      buttonToDelete.remove()
      divToDelete.remove()
      return arr
    }
    filteredArr = arr.filter(puzzle =>
      puzzle.cityId == val)
    setFilteredPuzzles(filteredArr)
    if (location && location !== 'empty') {
      return filteredArr
    }

    // TAG:
    makeLocationTag()
    return filteredArr
  }

  const filterDifficulty = (arr, val) => {



    let filteredArr
    if (val == 'empty') {
      setFilteredPuzzles(arr)
      // delete tag
      const liToDelete = document.getElementById('difficulty_tag_li')
      const buttonToDelete = document.getElementById('difficulty_tag_button')
      const divToDelete = document.getElementById('difficulty_tag_div')
      liToDelete?.remove()
      buttonToDelete.remove()
      divToDelete.remove()
      return arr
    }

    filteredArr = arr.filter(puzzle =>
      puzzle.difficulty == val)

    setFilteredPuzzles(filteredArr)
    if (difficulty && difficulty !== 'empty') {
      return filteredArr
    }

    // TAG:
    makeDifficultyTag()
    return filteredArr
  }

  // const filterCategory = (arr, val) => {
  //   let filteredArr
  //   if (val == 'empty') {
  //     setFilteredPuzzles(arr)
  //     return arr
  //   }
  //   filteredArr = arr.filter(puzzle =>
  //     puzzle.categoryId == val)
  //   setFilteredPuzzles(filteredArr)
  //   return filteredArr
  // }

  // const filterLocation = (arr, val) => {
  //   let filteredArr
  //   if (val == 'empty') {
  //     setFilteredPuzzles(arr)
  //     return arr
  //   }
  //   filteredArr = arr.filter(puzzle =>
  //     puzzle.cityId == val)
  //   setFilteredPuzzles(filteredArr)
  //   return filteredArr
  // }
  // const filterDifficulty = (arr, val) => {
  //   let filteredArr
  //   if (val == 'empty') {
  //     setFilteredPuzzles(arr)
  //     return arr
  //   }
  //   filteredArr = arr.filter(puzzle =>
  //     puzzle.difficulty == val)

  //   setFilteredPuzzles(filteredArr)
  //   return filteredArr
  // }

  const filter = (type, value) => {

    const savedDifficulty = localStorage.getItem("difficulty");
    const parsedDifficulty = JSON.parse(savedDifficulty);

    const savedCategory = localStorage.getItem("category");
    const parsedCategory = parseInt(JSON.parse(savedCategory));

    const savedLocation = localStorage.getItem("location");
    const parsedLocation = JSON.parse(savedLocation);

    const savedPieceCount = localStorage.getItem("pieceCount");
    const parsedPieceCount = JSON.parse(savedPieceCount);

    // return setFilteredPuzzles(puzzles.slice(0, 2))
    let dominoPuzzles
    if (type == 'pieceCount') {
      dominoPuzzles = filterPieceCount(puzzles, value)

      // if (category) {
      //   dominoPuzzles = filterCategory(dominoPuzzles, category)
      // }
      if (parsedCategory && parsedCategory != 'empty') {
        dominoPuzzles = filterDifficulty(dominoPuzzles, parsedCategory)
      }
      // if (location) {
      //   dominoPuzzles = filterLocation(dominoPuzzles, location)
      // }
      if (parsedLocation && parsedLocation != 'empty') {
        dominoPuzzles = filterDifficulty(dominoPuzzles, parsedLocation)
      }
      // if (difficulty) {
      //   dominoPuzzles = filterDifficulty(dominoPuzzles, difficulty)
      // }
      if (parsedDifficulty && parsedDifficulty != 'empty') {
        dominoPuzzles = filterDifficulty(dominoPuzzles, parsedDifficulty)
      }

    }
    else if (type == 'category') {

      dominoPuzzles = filterCategory(puzzles, value)

      // if (pieceCount && pieceCount != 'empty') {
      //   dominoPuzzles = filterPieceCount(dominoPuzzles, pieceCount)
      // }
      if (parsedPieceCount && parsedPieceCount != 'empty') {
        dominoPuzzles = filterPieceCount(dominoPuzzles, parsedPieceCount)
      }
      // if (location && location != 'empty') {
      //   dominoPuzzles = filterLocation(dominoPuzzles, location)
      // }
      if (parsedLocation && parsedLocation != 'empty') {
        dominoPuzzles = filterLocation(dominoPuzzles, parsedLocation)
      }
      // if ((difficulty && difficulty != 'empty') || dif) {
      //   if (dif) {
      //     dominoPuzzles = filterDifficulty(dominoPuzzles, dif)
      //   } else {
      //     dominoPuzzles = filterDifficulty(dominoPuzzles, difficulty)
      //   }
      // }
      if (parsedDifficulty && parsedDifficulty != 'empty') {
        dominoPuzzles = filterDifficulty(dominoPuzzles, parsedDifficulty)
      }
    }
    else if (type == 'location') {
      dominoPuzzles = filterLocation(puzzles, value)

      // if (pieceCount && pieceCount != 'empty') {
      //   dominoPuzzles = filterPieceCount(dominoPuzzles, pieceCount)
      // }
      if (parsedPieceCount && parsedPieceCount != 'empty') {
        dominoPuzzles = filterPieceCount(dominoPuzzles, parsedPieceCount)
      }
      // if (difficulty && difficulty != 'empty') {
      //   dominoPuzzles = filterDifficulty(dominoPuzzles, difficulty)
      // }
      if (parsedDifficulty && parsedDifficulty != 'empty') {
        dominoPuzzles = filterDifficulty(dominoPuzzles, parsedDifficulty)
      }

      // if (category && category != 'empty') {
      //   dominoPuzzles = filterCategory(dominoPuzzles, category)
      // }
      if (parsedCategory && parsedCategory != 'empty') {
        dominoPuzzles = filterCategory(dominoPuzzles, parsedCategory)
      }
    }
    else if (type == 'difficulty') {
      dominoPuzzles = filterDifficulty(puzzles, value)
      // if (pieceCount && pieceCount != 'empty') {
      //   dominoPuzzles = filterPieceCount(dominoPuzzles, pieceCount)
      // }
      if (parsedPieceCount && parsedPieceCount != 'empty') {
        dominoPuzzles = filterPieceCount(dominoPuzzles, parsedPieceCount)
      }
      // if (location && location != 'empty') {
      //   dominoPuzzles = filterLocation(dominoPuzzles, location)
      // }
      if (parsedLocation && parsedLocation != 'empty') {
        dominoPuzzles = filterLocation(dominoPuzzles, parsedLocation)
      }
      // if (category && category != 'empty') {
      //   dominoPuzzles = filterCategory(dominoPuzzles, category)
      // }
      if (parsedCategory && parsedCategory != 'empty') {
        dominoPuzzles = filterCategory(dominoPuzzles, parsedCategory)
      }
    }
  }

  const updatePieceCount = (e) => {

    setPieceCount(e.target.value);
    filter('pieceCount', e.target.value)
  };
  const updateCategory = (e) => {
    setCategory(e.target.value);
    filter('category', e.target.value)
  };
  const updateDifficulty = (e) => {
    setDifficulty(e.target.value);
    filter('difficulty', e.target.value)
  };
  const updateLocation = (e) => {
    setLocation(e.target.value);
    filter('location', e.target.value)
  };
  const updateOrderBy = (e) => {
    setOrderBy(e.target.value);
    filter('orderBy', e.target.value)
  };



  if (puzzles) {
    return (



      <div className='puz-page-holder'>

        <ul className='puz-filter-ul'>
          <li className='li-nostyle'>
            <div className='LabelAndInputContainer'>
              {/* <label className="puzzle-form-label">Number of Pieces</label> */}
              <select name="category" id="category-select" className="puzzle-form-input puz-form-sel puz-filter" id='difficulty-input'

                onChange={updateCategory}
                value={category}
              >

                <option value="empty">Category</option>
                <option value={1}>Movies</option>
                <option value={2}>Nature</option>
                <option value={3}>Architecture</option>
                <option value={4}>Landmarks</option>
                <option value={5}>History</option>
                <option value={6}>Fantasy</option>
                <option value={7}>Animals</option>
                <option value={8}>Kids</option>
                <option value={9}>Art</option>
                <option value={10}>Religious</option>
                <option value={11}>Food</option>
                <option value={12}>Comedy</option>
                <option value={13}>Holidays</option>
                <option value={14}>Celebrities</option>
                <option value={15}>Sport</option>
                <option value={16}>Space</option>
                <option value={17}>Technology</option>
                <option value={18}>Cars</option>
                <option value={19}>Miscellaneous</option>
              </select>
            </div>
          </li>
          <li className='li-nostyle'>
            <div className='LabelAndInputContainer'>
              {/* <label className="puzzle-form-label">Number of Pieces</label> */}
              <select name="category" id="category-select" className="puzzle-form-input puz-form-sel puz-filter" id='difficulty-input'

                onChange={updateLocation}
                value={location}
              >

                <option value="empty">Location</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
                <option value='expert'>Expert</option>

              </select>
            </div>
          </li>
          <li className='li-nostyle'>
            <div className='LabelAndInputContainer'>
              {/* <label className="puzzle-form-label">Number of Pieces</label> */}
              <select name="category" id="category-select" className="puzzle-form-input puz-form-sel puz-filter" id='difficulty-input'

                onChange={updateDifficulty}
                value={difficulty}
              >

                <option value="empty">Difficulty level</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
                <option value='expert'>Expert</option>

              </select>
            </div>
          </li>
          <li className='li-nostyle'>
            <div className='LabelAndInputContainer'>
              {/* <label className="puzzle-form-label">Number of Pieces</label> */}
              <select name="category" id="category-select" className="puzzle-form-input puz-form-sel puz-filter" id='difficulty-input'

                onChange={updatePieceCount}
                value={pieceCount}
              >
                <option value="empty">Piece Count</option>
                <option value={0}> - 99</option>
                <option value={1}>100 - 200</option>
                <option value={2}>201 - 500</option>
                <option value={3}>501 - 1000</option>
                <option value={4}>1001 - 2000</option>
                <option value={5}>2001 - 5000</option>
                <option value={6}>5000+</option>
              </select>
            </div>
          </li>
          <li className='li-nostyle'>
            <div className='LabelAndInputContainer'>
              {/* <label className="puzzle-form-label">Number of Pieces</label> */}
              <select name="category" id="category-select" className="puzzle-form-input puz-form-sel puz-filter" id='difficulty-input'

                onChange={updateOrderBy}
                value={orderBy}
              >

                <option value="empty">Order By</option>
                <option value='easy'>Newest</option>
                <option value='medium'>Oldest</option>

              </select>
            </div>
          </li>

        </ul>

        <ul id='filter_tags_ul'>



        </ul>

        <div className='latest'>Latest Puzzles</div>
        <ul id="puzzle-cards">
          {filteredPuzzles ?

            filteredPuzzles.map(puzzle => {
              let color
              if (puzzle.image !== 'none') {
                color = 'transparent'
              } else {
                color = 'white'
              }
              return (
                <li key={puzzle.id} className='puzzle-card-wrapper' id={`puzzle-${puzzle.id}`}>
                  <div className={puzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                    <span className='puzzle-card-title'>{puzzle.title}</span>
                    <span className='puzzle-card-rating'></span>
                    <NavLink to={`/puzzles/${puzzle.id}`}>
                      <img className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={puzzle.image ? puzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                    </NavLink>


                  </div>

                </li >
              )
            })
            :
            puzzles.map(puzzle => {
              let color
              if (puzzle.image !== 'none') {
                color = 'transparent'
              } else {
                color = 'white'
              }
              return (
                <li key={puzzle.id} className='puzzle-card-wrapper' id={`puzzle-${puzzle.id}`}>
                  <div className={puzzle.image ? 'puzzle-card' : 'puzzle-card puzzle-card-background'}>
                    <span className='puzzle-card-title'>{puzzle.title}</span>
                    <span className='puzzle-card-rating'></span>
                    <NavLink to={`/puzzles/${puzzle.id}`}>
                      <img className={puzzle.image ? 'puzzle-card-image' : 'puzzle-card-logo'} src={puzzle.image ? puzzle.image : logoBW} alt='Puzzle Thumbnail'></img>
                    </NavLink>


                  </div>

                </li >
              )
            })

          }
        </ul >
      </div >



    )
  }
  return (<div className="loader"></div>
  )
}

export default Puzzle;
