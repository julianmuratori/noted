import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './noteCard.js';

const config = {
	    apiKey: "AIzaSyBOhLHIjNNsY6JZbJSfNPJv3ng4VU8eEGs",
	    authDomain: "noted-9a2bb.firebaseapp.com",
	    databaseURL: "https://noted-9a2bb.firebaseio.com",
	    projectId: "noted-9a2bb",
	    storageBucket: "noted-9a2bb.appspot.com",
	    messagingSenderId: "433720991299"
  };
  firebase.initializeApp(config);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			notes: []
		}
		this.showSidebar = this.showSidebar.bind(this);
		this.addNote = this.addNote.bind(this);
	}

	ComponentDidMount() {
		firebase.database().ref().on('value', (res) => {
			console.log(res.val);
		})
	}	

	showSidebar(e) {
		e.preventDefault();
		this.sidebar.classList.toggle("show");
	}

	addNote(e) {
		e.preventDefault();
		console.log("worked");
		const note = {
			title: this.noteTitle.value,
			text: this.noteText.value
		};
		
		const dbRef = firebase.database().ref();

		dbRef.push(note);

		this.noteTitle.value = "";
		this.noteText.value = "";
		this.showSidebar(e);
	}
	render() {
		return (
			<div>
				<header className="mainHeader">
					<h1>Noted</h1>
					<nav>
						<a href="" onClick={this.showSidebar}>Add New Note</a>
					</nav>
				</header>
				<section className="notes">
					{this.state.notes.map((note,i) => {
						return (
							<NoteCard note={note} key={`note-${i}`} />
						)
					})}
				</section>
				<aside className="sidebar" ref = {ref => this.sidebar = ref}>
					<form onSubmit={this.addNote}> 
						<h3>Add New Note</h3>
						<div className="close-btn" onClick={this.showSidebar}>
							<i className="fa fa-times"></i>
						</div>
						<label htmlFor="note-title">Title:</label>
						<input type="text" name="note-title" ref={ref => this.noteTitle = ref}/>
						<label htmlFor="note-text">Text:</label>
						<textarea name="note-text" ref={ref => this.noteText = ref}></textarea>
						<input type="submit" value="Add New Note"/>
					</form>
				</aside>
			</div>
		)
	}
}

ReactDom.render(<App/>, document.getElementById("app"));