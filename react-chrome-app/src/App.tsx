import "./App.css"
import React, { useState, useEffect } from "react";


function App() {


  const [isActive, setIsActive] = useState(true);

    const [filters, setFilters] = useState(
      localStorage.getItem("filters")
        ? JSON.parse(localStorage.getItem("filters") || "")
        : {
            saved: true,
            visited: true,
            responsiveEmployer: true,
            easilyApply: true,
            urgentlyHiring: true,
            hiringMultipleCandidates: true,
            easilyArrange: true,
            jobTitle: false,
            company: false,
            location: false,
            minRating: 2.5,
            maxDays: 7,
          }
    );


  const [blacklist, setBlacklist] = useState<any[]>(
    JSON.parse(localStorage.getItem("blacklist") || "[]")
  );
  const [newItem, setNewItem] = useState("");


const handleFilterChange = (e: any) => {
  const { name, checked } = e.target;
  setFilters((prevFilters: any) => {
    return {
      ...prevFilters,
      [name]: checked,
    };
  });
};


  const handleChange = (e: any) => {
    // setValue(event.target.value);

    const { name, value } = e.target;

    setFilters((prevFilters: any) => {
      return {
        ...prevFilters,
        [name]: value,
      };
    });
  };



function refreshFilter() {
  filterPosts();
}



  const handleAdd = () => {
    setBlacklist([...blacklist, newItem]);
    setNewItem("");
  };

  const handleRemove = (index: any) => {
    const newList = [...blacklist];
    newList.splice(index, 1);
    setBlacklist(newList);
  };

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));

    refreshFilter();
  }, [filters]);

  useEffect(() => {
    filterPosts();
  }, []);

  useEffect(() => {
    localStorage.setItem("blacklist", JSON.stringify(blacklist));
  }, [blacklist]);




  function filterPosts() {
    let divs = document.querySelectorAll<HTMLElement>(".cardOutline");
    for (let i = 0; i < divs.length; i++) {
      // console.log(divs[i]);

      let myJobsStateEl = divs[i].querySelector<HTMLElement>(".myJobsState");
      let indeedApplyEl = divs[i].querySelector<HTMLElement>(".indeedApply");
      let urgentlyHiringEl =
        divs[i].querySelector<HTMLElement>(".urgentlyHiring");
      let hiringMultipleCandidatesEl = divs[i].querySelector<HTMLElement>(
        ".hiringMultipleCandidates"
      );
      let responsiveEmployerEl = divs[i].querySelector<HTMLElement>(
        ".responsiveEmployer"
      );
      let smbD2iInterviewEl =
        divs[i].querySelector<HTMLElement>(".smbD2iInterview");

      let companyNameEl = divs[i].querySelector<HTMLElement>(".companyName a");
      let companyLocationEl =
        divs[i].querySelector<HTMLElement>(".companyLocation");
      let ratingNumberEl =
        divs[i].querySelector<HTMLElement>(".ratingNumber span");

      let dateEl = divs[i].querySelector<HTMLElement>(".date");


      // console.log(dateEl?.innerText);
      // console.log(companyLocationEl?.innerText);
      // console.log(ratingNumberEl?.innerText);



      if (myJobsStateEl) {

        if (myJobsStateEl.innerText.toLowerCase().includes("saved")) {
          if (filters.saved) {
            divs[i].style.display = "block";
          } else {
            divs[i].style.display = "none";
          }
        } else if (myJobsStateEl.innerText.toLowerCase().includes("visited")) {
          if (filters.visited) {
            divs[i].style.display = "block";
          } else {
            divs[i].style.display = "none";
          }
        }
      }

      if (indeedApplyEl) {
        if (filters.easilyApply) {
          divs[i].style.display = "block";
        } else {
          divs[i].style.display = "none";
        }
      }

      if (urgentlyHiringEl) {
        if (filters.urgentlyHiring) {
          divs[i].style.display = "block";
        } else {
          divs[i].style.display = "none";
        }
      }

      if (hiringMultipleCandidatesEl) {
        if (filters.hiringMultipleCandidates) {
          divs[i].style.display = "block";
        } else {
          divs[i].style.display = "none";
        }
      }

      if (responsiveEmployerEl) {
        if (filters.responsiveEmployer) {
          divs[i].style.display = "block";
        } else {
          divs[i].style.display = "none";
        }
      }
      if (smbD2iInterviewEl) {
        if (filters.easilyArrange) {
          divs[i].style.display = "block";
        } else {
          divs[i].style.display = "none";
        }
      }

      // if (ratingNumberEl) {
      //   if (Number(ratingNumberEl?.innerText) < filters.minRating) {
      //     if (filters.company) {
      //       divs[i].style.display = "block";
      //     } else {
      //       divs[i].style.display = "none";
      //     }
      //   }
      // } else {
      //   divs[i].style.display = "none";
      // }


      // if (companyLocationEl) {
      //   if (filters.location) {
      //     blacklist.forEach((keyword) => {
      //       if (companyLocationEl?.innerText.toLowerCase().includes(keyword.toLowerCase())) {
      //         divs[i].style.display = "none";
      //       } else {
      //         divs[i].style.display = "block";
      //       }
      //     });
      //   }
      // }

      // if (dateEl?.innerText.includes("Posted")) {

      // }

    }
  }



  return (
    <div className="App">
      <header>
        <h3 className="">Indeed Job Search Helper</h3>
      </header>

      <div className="filter-btns">
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Deactivate" : "Activate"}
        </button>

        <div className="filter-btns">
          <label>
            <input
              type="checkbox"
              name="jobTitle"
              checked={filters.jobTitle}
              onChange={handleFilterChange}
            />
            Job Title
          </label>
          <label>
            <input
              type="checkbox"
              name="company"
              checked={filters.company}
              onChange={handleFilterChange}
            />
            Company
          </label>
          <label>
            <input
              type="checkbox"
              name="location"
              checked={filters.location}
              onChange={handleFilterChange}
            />
            Location
          </label>

          <label>
            <input
              type="checkbox"
              name="saved"
              checked={filters.saved}
              onChange={handleFilterChange}
            />
            Show Saved Jobs
          </label>
          <label>
            <input
              type="checkbox"
              name="visited"
              checked={filters.visited}
              onChange={handleFilterChange}
            />
            Show Visited Jobs
          </label>
          <label>
            <input
              type="checkbox"
              name="responsiveEmployer"
              checked={filters.responsiveEmployer}
              onChange={handleFilterChange}
            />
            Responsive Employer
          </label>
          <label>
            <input
              type="checkbox"
              name="easilyApply"
              checked={filters.easilyApply}
              onChange={handleFilterChange}
            />
            Easily Apply
          </label>
          <label>
            <input
              type="checkbox"
              name="urgentlyHiring"
              checked={filters.urgentlyHiring}
              onChange={handleFilterChange}
            />
            Urgently Hiring
          </label>
          <label>
            <input
              type="checkbox"
              name="hiringMultipleCandidates"
              checked={filters.hiringMultipleCandidates}
              onChange={handleFilterChange}
            />
            Hiring Multiple Candidates
          </label>

          <label>
            <input
              type="checkbox"
              name="easilyArrange"
              checked={filters.easilyArrange}
              onChange={handleFilterChange}
            />
            Easily Arrange Interviews
          </label>

          <div className="filter-blacklist">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={handleAdd}>Add to Blacklist</button>
            <div>
              <h3>Blacklist</h3>
              <ul className="blacklist-box">
                {blacklist.map((item, index) => (
                  <li key={item}>
                    <button onClick={() => handleRemove(index)}>
                      <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={filters.minRating}
              onChange={handleChange}
              name="minRating"
            />
            <p>Minimum Rating: {filters.minRating}</p>
          </div>

          <div>
            <input
              type="range"
              min={0}
              max={30}
              step={1}
              value={filters.maxDays}
              onChange={handleChange}
              name="maxDays"
            />
            <p>Maximum Days: {filters.maxDays}</p>
          </div>
        </div>
        {/* <button onClick={() => window.location.reload()}>Reload</button> */}
        <button onClick={filterPosts}>Refresh</button>
      </div>
    </div>
  );
}

export default App;



