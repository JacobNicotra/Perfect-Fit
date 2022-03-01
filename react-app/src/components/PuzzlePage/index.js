import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useParams, useLocation, useHistory } from 'react-router-dom';


import { getPuzzles } from '../../store/puzzle';

// import AddServerModal from '../AddServerModal';
import './PuzzlePage.css'
import logo from '../../logo-black.png'
import logoBW from '../../logo-black.png'

// import Intro from '../Intro';


const Puzzle = () => {
  const history = useHistory()

  const user = useSelector(state => state.session.user);
  if (!user) {
    history.push(`/`)

  }

  let loc = useLocation();
  let cat = loc?.state?.filter?.category
  let city = loc?.state?.filter?.location
  window.history.replaceState({}, '')


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
    if (cat) {
      makeCategoryTag(categoryKey[parseInt(cat) - 1])
      filter('category', parseInt(cat))
      localStorage.setItem('category', JSON.stringify(cat));

      localStorage.setItem('difficulty', JSON.stringify('empty'));
      localStorage.setItem('location', JSON.stringify('empty'));
      localStorage.setItem('pieceCount', JSON.stringify('empty'));

      setDifficulty('empty')
      setLocation('empty')
      setPieceCount('empty')
      console.log(' **** ** * * * * CAT ')
      return setCategory(parseInt(cat))
    } else if (city) {
      makeLocationTag(parseInt(city))
      filter('location', parseInt(city))
      localStorage.setItem('location', JSON.stringify(city));

      localStorage.setItem('difficulty', JSON.stringify('empty'));
      localStorage.setItem('category', JSON.stringify('empty'));
      localStorage.setItem('pieceCount', JSON.stringify('empty'));

      setDifficulty('empty')
      setCategory('empty')
      setPieceCount('empty')
      return setLocation(parseInt(city))
    }
    return
  }, [dispatch])


  useEffect(async () => {

    if (!puzzles) return

    const savedCategory = localStorage.getItem("category");
    const parsedCategory = JSON.parse(savedCategory);
    if (parsedCategory != 'empty') {
      console.log('useEffect setCat() -> ', parsedCategory)
      makeCategoryTag(categoryKey[parseInt(parsedCategory) - 1])
      filter('category', parseInt(parsedCategory))
      setCategory(parseInt(parsedCategory))
    }

    const savedLocation = localStorage.getItem("location");
    const parsedLocation = JSON.parse(savedLocation);
    if (parsedLocation != 'empty') {

      makeLocationTag(locationKey[parseInt(parsedLocation) - 1])
      filter('location', parseInt(parsedLocation))
      setLocation(parseInt(parsedLocation))

    }

    const savedDifficulty = localStorage.getItem("difficulty");
    const parsedDifficulty = JSON.parse(savedDifficulty);
    if (parsedDifficulty != 'empty') {
      makeDifficultyTag(parsedDifficulty)
    }

    const pieceCount = localStorage.getItem("pieceCount");
    const parsedPieceCount = JSON.parse(pieceCount);
    if (parsedPieceCount != 'empty') {
      makePieceCountTag(parsedPieceCount)
    }
    return

  }, [dispatch, puzzles, category, location, difficulty, pieceCount])

  // if (!user) {
  //     return <Redirect to='/' />;
  // }


  let pieceCountKey = [[0, 99], [100, 200], [201, 500], [501, 1000], [1001, 2000], [2001, 5000], [5001, 99999999]]
  let pieceCountStringKey = [' - 99', '100 - 200', '201 - 500', '501 - 1000', '1001 - 2000', '2001 - 5000', '5000+']
  let locationKey = ['San Francisco	', 'New York', 'Chicago', 'Los Angeles', 'Miami', 'Boston', 'Denver',
    'San Diego', 'Dallas', 'Las Vegas', 'Seattle', 'Philidelphia', 'Houston', 'Pheonix']
  let categoryKey = ['Movies/TV', 'Nature', 'Architecture', 'Landmarks', 'History', 'Fantasy', 'Animals',
    'Kids', 'Art', 'Religious', 'Food', 'Comedy', 'Holidays', 'Celebrities', 'Sports', 'Space', 'Tech', 'Cars', 'Misc']

  const makeDifficultyTag = (val) => {
    const checkButton = document.getElementById('difficulty_tag_button')
    if (!checkButton) {
      const ul = document.getElementById("filter_tags_ul");
      if (!ul) return
      const li = document.createElement("li");
      li.id = 'difficulty_tag_li'
      li.className = "li-nostyle filter_tag"
      const button = document.createElement("button");
      button.id = 'difficulty_tag_button'
      button.className = "tag_remove_btn"
      button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
      button.value = 'empty'
      button.onclick = () => {

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
      li.innerHTML = `<div id="difficulty_tag_div" class="tag_div">${val}</div>`
      ul.appendChild(li);
      li.appendChild(button);
    } else {
      const divToChange = document.getElementById('difficulty_tag_div')
      if (divToChange) divToChange.innerHTML = `${val}`
    }
  }

  const makePieceCountTag = (val) => {

    const checkButton = document.getElementById('piece_count_tag_button')
    if (!checkButton) {
      const ul = document.getElementById("filter_tags_ul");
      if (!ul) return
      const li = document.createElement("li");
      li.id = 'piece_count_tag_li'
      const button = document.createElement("button");
      button.id = 'piece_count_tag_button'
      button.className = "tag_remove_btn"
      button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
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
      li.innerHTML = `<div id="piece_count_tag_div" class="tag_div">${pieceCountStringKey[parseInt(val)]}</div>`
      ul.appendChild(li);
      li.appendChild(button);
    } else {
      const divToChange = document.getElementById('piece_count_tag_div')
      if (divToChange) divToChange.innerHTML = `${pieceCountStringKey[parseInt(val)]}`
    }
  }

  const makeCategoryTag = (val) => {
    const checkLi = document.getElementById('category_tag_li')
    if (!checkLi) {
      const ul = document.getElementById("filter_tags_ul");
      if (!ul) return
      const li = document.createElement("li");
      li.id = 'category_tag_li'
      const button = document.createElement("button");
      button.id = 'category_tag_button'
      button.className = "tag_remove_btn"
      button.value = 'empty'
      button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
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
      li.innerHTML = `<div id="category_tag_div" class="tag_div">${val}</div>`
      ul.appendChild(li);
      li.appendChild(button);
    } else {
      const divToChange = document.getElementById('category_tag_div')
      if (divToChange) divToChange.innerHTML = `${val}`
    }
  }

  const makeLocationTag = (val) => {
    const checkLi = document.getElementById('location_tag_li')
    if (!checkLi) {
      const ul = document.getElementById("filter_tags_ul");
      if (!ul) return
      const li = document.createElement("li");
      li.id = 'location_tag_li'
      const button = document.createElement("button");
      button.id = 'location_tag_button'
      button.className = "tag_remove_btn"
      button.value = 'empty'
      button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
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
      li.innerHTML = `<div id="location_tag_div" class="tag_div">${val}</div>`
      ul.appendChild(li);
      li.appendChild(button);
    } else {
      const divToChange = document.getElementById('location_tag_div')
      if (divToChange) divToChange.innerHTML = `${val}`
    }
  }

  const filterPieceCount = (arr, val) => {
    if (!arr || !val) return

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
    makePieceCountTag(val)

    return filteredArr
  }

  const filterCategory = (arr, val) => {
    if (!arr || !val) return
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
    makeCategoryTag(categoryKey[category - 1])
    return filteredArr
  }

  const filterLocation = (arr, val) => {
    if (!arr || !val) return

    let filteredArr
    if (val == 'empty') {
      setFilteredPuzzles(arr)
      // delete tag
      const liToDelete = document.getElementById('location_tag_li')
      const buttonToDelete = document.getElementById('location_tag_button')
      const divToDelete = document.getElementById('location_tag_div')
      liToDelete?.remove()
      buttonToDelete?.remove()
      divToDelete?.remove()
      return arr
    }
    filteredArr = arr.filter(puzzle =>
      puzzle.cityId == val)
    setFilteredPuzzles(filteredArr)
    if (location && location !== 'empty') {
      return filteredArr
    }

    // TAG:
    makeLocationTag(locationKey[parseInt(val) - 1])
    return filteredArr
  }

  const filterDifficulty = (arr, val) => {
    if (!arr || !val) return

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
    makeDifficultyTag(val)
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
    const parsedLocation = parseInt(JSON.parse(savedLocation));

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
    console.log('update Cat')
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

  let puzzleCount;
  if (!filteredPuzzles) {
    if (puzzles) {
      puzzleCount = puzzles.length
      console.log('! ! ! !  ! puzzleCount', puzzleCount)
    }
  } else {
    puzzleCount = filteredPuzzles.length
  }

  if (puzzles) {
    return (



      <div className='puz-page-holder'>
        <div id='tag_wrapper'>


          <ul className='puz-filter-ul'>
            <li className='li-nostyle filter_li'>
              <div className=' filter_input'>
                {/* <label className="puzzle-form-label">Number of Pieces</label> */}
                <select name="category" id="category-select" className=" filter_select" id='category-input'

                  onChange={updateCategory}
                  value={category}
                >

                  <option value="empty">Category</option>
                  <option value={1}>Movies / TV</option>
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
            <li className='li-nostyle  filter_li'>
              <div className=' filter_input'>
                {/* <label className="puzzle-form-label">Number of Pieces</label> */}
                <select name="category" id="category-select" className=" filter_select" id='location-input'

                  onChange={updateLocation}
                  value={location}
                >

                  <option value="empty">Location</option>
                  <option value={1} >San Francisco</option>
                  <option value={2} >New York	</option>
                  <option value={3} >Chicago	</option>
                  <option value={4} >Los Angeles	</option>
                  <option value={5} >Miami	</option>
                  <option value={6} >Boston</option>
                  <option value={7} >Denver</option>
                  <option value={8} >San Diego	</option>
                  <option value={9} >Dallas</option>
                  <option value={10}>Las Vegas	</option>
                  <option value={11}>Seattle</option>
                  <option value={12}>Philadelphia</option>
                  <option value={13}>Houston</option>
                  <option value={14}>Phoenix</option>

                </select>
              </div>
            </li>
            <li className='li-nostyle filter_li'>
              <div className=' filter_input'>
                {/* <label className="puzzle-form-label">Number of Pieces</label> */}
                <select name="category" id="category-select" className=" filter_select" id='difficulty-input'

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
            <li className='li-nostyle filter_li'>
              <div className='filter_input'>
                {/* <label className="puzzle-form-label">Number of Pieces</label> */}
                <select name="category" id="category-select" className=" filter_select" id='pieceCount-input'

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
          </ul>

          <ul id='filter_tags_ul'>



          </ul>

          <div className='filter_div'>
            {puzzleCount > 1 ?
              <div id='puzzle_count' >{puzzleCount} puzzles</div>
              :
              <div id='puzzle_count' >{puzzleCount} puzzle</div>
            }
            <div className='' id='order_input_wrapper'>
              {/* <label className="puzzle-form-label">Number of Pieces</label> */}
              <label id='order_label'>
                Sort By:

                <select name="category" id="category-select" id='order-input'

                  onChange={updateOrderBy}
                  value={orderBy}
                >
                  <option value='easy'>Newest</option>
                  <option value='medium'>Oldest</option>

                </select>
              </label>
            </div>
          </div>


        </div>

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
