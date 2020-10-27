import React from "react";
import axios from "axios";
import _ from 'lodash';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: null,
            searchInput: ""
        };
        this.debouncedSearch = _.debounce(this.searchText, 1000);
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.debouncedSearch()
    };

    // debounce this
    searchText = () => {
		const text = this.state.searchInput;
		if(text.length > 0){
			this.setState({
				loading : true
			});
			axios.get(`${process.env.REACT_APP_API}/search?text=${text}`)
			.then((res) => {
				this.setState({
					data: res.data.data,
					loading : false
				});
			})
			.catch((err) =>{
				this.setState({ loading : false	}) 
				alert(err)
			});
		}
    };

    render() {
        return (
            <div className="container">
                <div className="searchBar">
                    <input
                        type="text"
                        name="searchInput"
                        value={this.state.searchInput}
                        placeholder="Enter here to search"
                        onChange={this.handleInput}
                    />
                </div>
				{
					this.state.loading &&
					<div className = "spinner-grow text-primary mt-5" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				}
				{
					this.state.data !== [] && this.state.data !== null &&
					<div name="results">
                    	{
							this.state.data.map((person,index) => {
								return(
									<div key = {index}>
										<p>
											{person.name}
										</p>
										<p>
											{person.age}
										</p>
									</div>
								)
							})
						}
					</div>
				}
				{
					this.state.data !== null && this.state.data.length === 0 &&
					<p>
						No result found
					</p>
				}
            </div>
        );
    }
}

export default Main;
