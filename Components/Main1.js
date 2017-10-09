/*****************************************************************
File: Main.js
Author: Christian Josef Jurt

Description: This is React Application displays a list on the Main page.
it also allows you to add a new item to the list.

Version: 0.0.1
Updated: Oct 1, 2017

*****************************************************************/

//creating a header and populating it with a heading and logo for list page
let Header = React.createClass({
	propTypes: {
	},
	render: function() {
		return(
			React.createElement('div', {className: 'header'}, //setting header className
				React.createElement('p', {}, 'Bronson Centre Inventory'), //hardcoding Page Title
				React.createElement('p', {},
					React.createElement('img', {src: 'images/launcher_white_copy.png', width: '200px'}) //creating logo and setting size
				)
			)
		);
	}
}); 
        
//creating a header and populating it with a heading and logo for items page
        
let Header2 = React.createClass({
	propTypes: {
        
	},
	render: function() {
		return(
			React.createElement('div', {className: 'header'}, //setting header className
				React.createElement('p', {}, 'Item Details', //hardcoding Page Title
					React.createElement('p', {},
						React.createElement('img', {src: 'images/launcher_white_copy.png', width: '200px'}) //creating logo and setting size
					)
				)
			)
		);}
});
        
//creating a header and populating it with a heading and logo for add page   
        
let Header3 = React.createClass({
	propTypes: {
	},
	render: function() {
		return(
			React.createElement('div', {className: 'header'}, //setting header className
				React.createElement('p', {}, 'Add an Item'), //hardcoding Page Title
				React.createElement('p', {},
					React.createElement('img', {src: 'images/launcher_blue.png', width: '200px'}) //creating logo and setting size
				)
			)
		);
	}
});

//Creating a Navigation Menu

let NavMenu = React.createClass({
	render: function() {
		return (
			React.createElement('ul', {className: 'nav-menu'},//creating an underordered list. assigning className
				React.createElement('li', {}, //adding a menu item
					React.createElement('a', {href: '#'}, 'Inventory Items')//directs to default hash
				),

				React.createElement('li', {},//adding a menu item
					React.createElement('a', {href: '#newitem'}, 'Add an Item')//directs to newitem page
				)
			)
		);
	}
}); 


//creating list of items for list to be displayed in the Main List page.
let ListItem = React.createClass({
	propTypes: {
		id: React.PropTypes.number, //setting the id # as a property
		name: React.PropTypes.string.isRequired, //setting the name of the accomplishment as property
		year: React.PropTypes.string.isRequired, //setting the year as a property
		description: React.PropTypes.string, // setting the description as a property
		image: React.PropTypes.src //setting the image. not required
	},

	//creating a render function to actually create the html element of the list item.
	render: function() {
		return (
			React.createElement('li', {},
				React.createElement('a', {className: 'menu-item-link', href: '#/item/' + this.props.id}, //setting custom href
					React.createElement('h2', {className: 'list-item-name'}, this.props.name), //passing the item name in the h2 element
                    React.createElement('img', {className: "year", src: this.props.image, width: '60px'})
					//React.createElement('div', {className: 'year'}, this.props.year)//passing the year property into a div 
				)
			)
		);
	}
});


let ListItems = React.createClass({  //Creating List of the items
	propTypes: {
		items: React.PropTypes.array.isRequired //only property required is the list item
	},

	render: function() {
		var listOfListItems = this.props.items.map(function(item) {
			//looping through my items and creating an element for each one.
			return React.createElement(ListItem, item);
                                 
		});
		return (//putting my list items into my list
			React.createElement('ul', {className: 'list-menu'},
				listOfListItems           
			)
            
		);
	}
});


//Creating the the Main list page
let ListPage = React.createClass({
	propTypes: {
		items: React.PropTypes.array.isRequired //only property required is the list item(s)
	},

	render: function() {
		return ( 
			React.createElement('div', {},   
				React.createElement(Header, {}), 
				React.createElement(NavMenu, {}), 
				React.createElement(ListItems, {items: this.props.items}) //populating the list page with the list
			)
		);}
}); 

//creating pages to showcase the details of the individual list items.

let ItemPage = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired, //name will be required
		year: React.PropTypes.string.isRequired, //year is required
		description: React.PropTypes.string, //description is optional
		image: React.PropTypes.src
	},

	render: function() {
		return ( //creating item page view
			React.createElement('div', {},   
				React.createElement(Header2, {}), 
				React.createElement(NavMenu, {}), 
				React.createElement('div', {className: 'list-menu'},
					React.createElement('h2', {className: 'list-name-header'}, this.props.name + " (" + this.props.year + ")"),
					React.createElement('p', {className: 'list-name-header'}, this.props.description),
					React.createElement('img', {className: "bottle", src: this.props.image, width: '400px'})

				)
			)
		);}
}); 

//Creating and entry form page so the user can add a new item to the list.

let AddEntryForm = React.createClass({
	propTypes: {
		listItem: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired
	},
	onNameChange: function(e) {
		this.props.onChange(Object.assign({}, this.props.listItem, {name: e.target.value})); 
	},
	onYearChange: function(e) {
		this.props.onChange(Object.assign({}, this.props.listItem, {year: e.target.value}));
	},
	onDescriptionChange: function(e) {
		this.props.onChange(Object.assign({}, this.props.listItem, {description: e.target.value}));
	},
	onSubmit: function() {
		//checking to make sure the required fields have been input by user
		if (this.props.listItem.name != '' && this.props.listItem.year != ''){
			this.props.onSubmit(this.props.listItem);
            
		}else{
			alert('Name and year field are required!!!'); 
		}
	},
	render: function() { //setting up the form
		return (
			React.createElement('form', {},
				React.createElement('input', {
					type: 'text',
					placeholder: 'Name of Accomplishment',
					value: this.props.listItem.name,
					onChange: this.onNameChange
				}),
				React.createElement('input', {
					type: 'text',
					placeholder: 'Year',
					value: this.props.listItem.year,
					onChange: this.onYearChange
				}),
				React.createElement('textarea', {
					placeholder: 'Description',
					value: this.props.listItem.description,
					onChange: this.onDescriptionChange
				}),
				React.createElement('button', {type: 'button', onClick: this.onSubmit}, 'Add Accomplishment')
			)
		);
	}
});

//Creating the page where the add entry form will live
let FormView = React.createClass({
	propTypes: {
		listItem: React.PropTypes.object.isRequired,
		onNewListItemChange: React.PropTypes.func.isRequired,
		onSubmitNewItem: React.PropTypes.func.isRequired
	},

	render: function() {
		return (
			React.createElement('div', {},   
				React.createElement(Header3, {}), 
				React.createElement(NavMenu, {}),    
				React.createElement('div', {},
					React.createElement(AddEntryForm, {listItem: this.props.listItem, onChange: this.props.onNewListItemChange, onSubmit: this.props.onSubmitNewItem})
				)
			)
		);}
}); 

    
//setting up switch statement so user can navigate pages
let state = {};
let setState = function(changes) {
	let component;
	let Properties = {};

	Object.assign(state, changes);

	let splittedUrl = state.location.replace(/^#\/?|\/$/g, '').split('/'); //spliting the URL into two

	switch(splittedUrl[0]) { //starting point for switch statement is first half of the url
	case 'newitem':
		component = FormView; //bring you to add new entry form
		Properties = { 
			listItem: state.listItem,
			onNewListItemChange: function(item) {
				setState({listItem: item});
			},
			onSubmitNewItem: function(item) {
				let itemList = state.items; //getting the existing list of items
				const newKey = itemList.length + 1; //determining the key of the new item
				itemList.push(Object.assign({}, {key: newKey, id: newKey}, item)); //adding the new item into the items array.
                
			}
		};
		break;
	case 'item':
		component = ItemPage;
		//determining what to display on items page based on the hash and compared to the item key
		Properties = state.items.find(i => i.key == splittedUrl[1]);  
		break;
	default: //pages always goes to the list when it doesn't meet any of the other switch statements
		component = ListPage;
		Properties = {items: state.items};
	}
    
    
	//the rootElement where I will put everything I want to render on the DOM
	let masterElement = React.createElement('div', {className: 'content-area'},
		React.createElement(component, Properties)
	);

    
	//Rendering everthing i've built to the DOM
	ReactDOM.render(masterElement, document.getElementById('react-app'));
};

//adding an event listen to the window so that when the has changes so does the content
window.addEventListener('hashchange', ()=>setState({location: location.hash}));

//Start the app by declaring the initial state
setState({listItem: {
	name: '', 
	description: '', 
	year: '', 
	image: ''
},  location: location.hash, 
items: items});
