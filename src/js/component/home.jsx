import { stringify } from "query-string";
import React, { useState, useEffect } from "react";

//create your first component
//

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [shopping, setShopping] = useState([]);
	// const deleteItem = (id) => {
	// 	setShopping(shopping.filter((item) => item.id !== id));
	// };
	const [message, setMessage] = useState()
	console.log("Esta es mi info", message)

	const getToDos = () => {
		fetch("https://playground.4geeks.com/todo/users/moninilat")
			.then(resp => resp.json())
			.then(respJson => {
				const serverShopping = respJson.todos;
				setShopping(serverShopping)
			})
	};


	useEffect(() => {
		getToDos()
	}, [])
	console.log(shopping)

	const createShopping = async (task) => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/moninilat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: task,
					is_done: false
				})
			})
			if (response.ok) {
				getToDos()
				const data = response.json()
				return data
			}
		}
		catch (error) {
			console.log(error)
		}
	}

	const deleteShopping = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify()
			})
			if (response.ok) {
				getToDos()
				const data = response.json()
				return data
			}
		}
		catch (error) {
			console.log(error)
		}
	}

	const deleteAllShopping = async () => {
		try {
			const response = await fetch(
				"https://playground.4geeks.com/todo/users/moninilat",
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				alert("Usuario eliminado")
				setMessage("El usuario ha sido eliminado")
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (message) return <div className="delete-message">{message}</div>

	return (
		<div className="content">

			
			<div className="container">
			<div className="tittle">
				<h1>
					Shopping list{" "}
					<i className="fa-solid fa-basket-shopping" style={{ color: "purple" }}></i>
				</h1>
			</div>
				<div>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter" && inputValue.trim() !== "") {

								createShopping(inputValue)
								setInputValue("");
							}
						}}
						placeholder="What do you need to buy?"
					/>

				</div>

				<ul>
					{message && (<div style={{ color: "purple" }}><li>{message}</li></div>)}

					{shopping.length === 0 ? (
						<li>There's nothing in the shopping list, add items</li>
					) : (
						shopping.map((item) => (
							<li
								key={item.id}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center"
								}}

							>
								{item.label}

								<i
									className="fa-solid fa-x"
									onClick={() => deleteShopping(item.id)}

								></i>

							</li>
						))
					)}
				</ul>
				<div className="button-container">
					<button onClick={deleteAllShopping} className="btn btn-danger">
						Delete All Tasks
					</button>
				</div>

			</div>
		</div>
	);
};

export default Home;
