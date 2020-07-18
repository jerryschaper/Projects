import React from 'react';
import {connect} from "react-redux";

class DeckSelect extends React.Component {
  render() {
    let myDecks = this.props.reduxFlashCards.decks;
    let options = myDecks.map((data) => 
            <option key={data.Id} value={data.Id}>
                {data.DeckName}
            </option>
    );
   
      return (
        <div>
            <select className="selectDeck" name="decks" onChange={this.handleChange.bind(this)}>
                {options}
            </select>
        </div>
      );
  }
  //On the change event for the select box pass the selected value back to the parent
  handleChange = (event) =>
  {
      let selectedValue = event.target.value;
      this.props.onSelectChange(selectedValue);
  }
}
function mapStateToProps(state){
  return {
    reduxFlashCards:state.reduxFlashCards
  }
}
function mapDispatchToProps(dispatch){
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckSelect);