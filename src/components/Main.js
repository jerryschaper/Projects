import React from 'react';
import {connect} from "react-redux";
import {GetDecks, GetCards} from './Api.js';
import {ReduxActionService} from './reduxActionService.js';
import DeckSelect from './DeckSelect.js';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state={currentCardIndex:null, IsQuestion:true};
  }
  render() {
      let currentCard = this.props.reduxFlashCards.cards[this.state.currentCardIndex];
      let question = currentCard ? currentCard.Question : "Error";
      let answer = currentCard ? currentCard.Answer : "Error";
      let innerCSS = this.state.IsQuestion ? "flip-card-inner" : "flip-card-inner flip-card-transform";
      
      return (
        <div className="center">
          <div className="title">Flashcard Tutor &trade;</div>
          <DeckSelect className="deck" onSelectChange={this.handleSelectChange}/>
          <div className="flip-card card" onClick={this.toggleCard.bind(this)}>
            <div className={innerCSS} id="inner">
              <div className="flip-card-front">
                <h5 className="card-title">Question</h5>
                <p className="card-text" id="question">{question}</p>
              </div>
              <div className="flip-card-back">
                <h5 className="card-title">Answer</h5>
                <p className="card-text" id="answer">{answer}</p>
              </div>
            </div>
            
          </div>
          <div class="marginTop50 ">
            <div class="text-center">
              <button id="prevButton" onClick={this.previous.bind(this)} className="btn btn-primary buttons" type="button">Previous</button>
            </div>
            <div class="text-center">
              <button id="nextButton" onClick={this.next.bind(this)} className="btn btn-primary buttons" type="button">Next</button>
            </div>
          </div>
        </div>
      );
  }
  previous = () => {
    let index = this.state.currentCardIndex;
    if (index <= 0){
      return;
    }
    index--;
    this.setState({currentCardIndex: index});
  }
  next = () => {
    let index = this.state.currentCardIndex;
    if (index >= this.props.reduxFlashCards.cards.length -1){
      return;
    }
    index++;
    this.setState({currentCardIndex: index});
  }
  toggleCard = () => {
    let isQuestion = !this.state.IsQuestion;
    this.setState({IsQuestion:isQuestion})
  }
  handleSelectChange = (selectedValue) =>{
    let deckId = parseInt(selectedValue, 10);
    this.props.updateDecks({SelectedDeck:deckId});
    this.getCards(deckId);
  }
  componentWillMount(){
    this.getDecks();

  }
  getCards(deckId){
    let apiPromise = GetCards(deckId);
    apiPromise.then((response) => {
      //The first deck is the one selected to start.
      //var newState = Object.assign({}, this.props.reduxFlashCards);
      //newState.cards = response;
      this.props.updateDecks({cards:response});
      this.setState({currentCardIndex:0});
    },
    (err)=> {
        console.log(err);
    });
  }
  getDecks(){
    let apiPromise = GetDecks();

    apiPromise.then((response) => {
        //The first deck is the one selected to start.
        this.props.updateDecks({decks:response, SelectedDeck:response[0].Id});
        this.getCards(response[0].Id);
    },
    (err)=> {
        console.log(err);
    });
  }
}
function mapStateToProps(state){
  return {
    reduxFlashCards:state.reduxFlashCards
  }
}
function mapDispatchToProps(dispatch){
  return {
    updateDecks: (results) => dispatch(ReduxActionService.UpdateDecks(results))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);