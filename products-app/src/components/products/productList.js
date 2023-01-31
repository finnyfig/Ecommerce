import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductService from "../../services/productService";

export default function Products(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["capital", "name", "numericCode"]);
    const [filterParam, setFilterParam] = useState(["All"]);
    const [isLoading, setIsLoading] = useState(false)
    

    // useEffect(() => {
    //     setIsLoading(true)
    //     axios
    //       .get(url)
    //       .then(response => {
    //         setUsers(response.data)
    //         setIsLoading(false)
    //       })
    //       .catch(error => {
    //         setError("Sorry, something went wrong")
    //         setIsLoading(false)
    //       })
    //   }, [url])

    useEffect( () => {
        
        setIsLoading(true)
        ProductService.getallProducts()
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    setItems(result);
                },
                (error) => {
                    setIsLoading(false)
                    setError(error);
                }
            );
    }, []);

    const data = Object.values(items);

    function search(items) {
        return items.filter((item) => {
            if (item.region == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    // const searchItems = (searchValue) => {
    //     setSearchInput(searchValue)
    //     if (searchInput !== '') {
    //         const filteredData = APIData.filter((item) => {
    //             return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
    //         })
    //         setFilteredResults(filteredData)
    //     }
    //     else{
    //         setFilteredResults(APIData)
    //     }
    // }

    if (isLoading) {
        return <div>Loading..</div>
      }
      if (error) {
        return <div>{error}</div>
      }
     
        return (
            <div className="wrapper">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <span className="sr-only">Search countries here</span>
                    </label>

                    <div className="select">
                        <select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Countries By Region"
                        >
                            <option value="All">Filter By Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                        <span className="focus"></span>
                    </div>

                </div>
                <ul className="card-grid">
                    {search(data).map((item) => (
                        <li>
                            <article className="card" key={item.alpha3Code}>
                                <div className="card-image">
                                    <img
                                        src={item.flag.large}
                                        alt={item.name}
                                    />
                                </div>
                                <div className="card-content">
                                    <h2 className="card-name">{item.name}</h2>
                                    <ol className="card-list">
                                        <li>
                                            population:{" "}
                                            <span>{item.population}</span>
                                        </li>
                                        <li>
                                            Region: <span>{item.region}</span>
                                        </li>
                                        <li>
                                            Capital: <span>{item.capital}</span>
                                        </li>
                                    </ol>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }


